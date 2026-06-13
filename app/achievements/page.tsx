"use client";

import { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import { useLanguage } from "@/components/providers/AppProviders";
import { AnimatePresence } from "framer-motion";
import anime from "animejs";
import {
    Trophy, Search, CheckCircle2,
    Award, ListFilter, ChevronDown, Check
} from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import ViewDetailOverlay from "@/components/features/detail/ViewDetailOverlay";

export default function AchievementsPage() {
    const { t } = useLanguage();
    const [achievements, setAchievements] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    // FETCH DATA
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .order('id', { ascending: false });
            if (isMounted) {
                if (data) setAchievements(data);
                if (error) console.error("Error loading achievements:", error);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, []);

    // HANDLERS
    const toggleFilter = useCallback(() => setIsFilterOpen(prev => !prev), []);
    const selectCategory = useCallback((cat: string) => {
        setSelectedCategory(cat);
        setIsFilterOpen(false);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        if (isFilterOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFilterOpen]);

    // CATEGORIES
    const categories = useMemo(() => {
        const uniqueCats = new Set(achievements.map(item => item.issuer || item.category).filter(Boolean));
        const sortedCats = Array.from(uniqueCats).sort();
        return ["All", ...sortedCats];
    }, [achievements]);

    // FILTERING
    const filteredAchievements = useMemo(() => {
        if (!achievements.length) return [];
        const query = searchQuery.toLowerCase().trim();
        const isAllCats = selectedCategory === "All";
        if (!query && isAllCats) return achievements;
        return achievements.filter((item) => {
            const currentItemCategory = item.issuer || item.category;
            const matchesCategory = isAllCats || currentItemCategory === selectedCategory;
            if (!matchesCategory) return false;
            if (!query) return true;
            const title = item.title?.toLowerCase() || "";
            const issuer = item.issuer?.toLowerCase() || "";
            const desc = item.description?.toLowerCase() || "";
            return title.includes(query) || issuer.includes(query) || desc.includes(query);
        });
    }, [achievements, searchQuery, selectedCategory]);

    // ANIME.JS — Header entrance
    useEffect(() => {
        if (!headerRef.current) return;
        anime({
            targets: headerRef.current.children,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100, { start: 100 }),
            duration: 800,
            easing: "easeOutExpo",
        });
    }, []);

    // ANIME.JS — Cards stagger entrance when filtered list changes
    useEffect(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll(".ach-card");
        if (!cards.length) return;

        anime.set(cards, { opacity: 0, translateY: 40, scale: 0.95 });
        anime({
            targets: cards,
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.95, 1],
            delay: anime.stagger(60, { start: 200 }),
            duration: 700,
            easing: "easeOutExpo",
        });
    }, [filteredAchievements]);

    return (
        <div className="w-full min-h-[101vh] pb-20 pt-4">
            <div className="space-y-10">

                {/* --- HEADER --- */}
                <div
                    ref={headerRef}
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 dark:border-white/5 pb-8"
                >
                    <div className="space-y-2 max-w-lg" style={{ opacity: 0 }}>
                        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                            <Trophy className="text-emerald-500 fill-emerald-500/10" size={32} />
                            {t?.ach_title || "Achievements"}
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                            {t?.ach_subtitle || "My professional certifications, awards, and milestones collected throughout my journey."}
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-row items-center gap-2 w-full lg:w-auto relative z-20" style={{ opacity: 0 }}>
                        {/* Search */}
                        <div className="relative flex-1 group">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Search size={14} className="text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search awards..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 rounded-xl pl-9 pr-3 text-sm outline-none transition-all placeholder:text-zinc-400 dark:text-white"
                            />
                        </div>

                        {/* Filter */}
                        <div className="relative shrink-0" ref={filterRef}>
                            <button
                                onClick={toggleFilter}
                                className={`flex items-center justify-between gap-2 h-10 px-3 md:px-4 rounded-xl border text-sm font-medium transition-all w-auto
                                ${isFilterOpen || selectedCategory !== "All"
                                        ? "bg-white dark:bg-zinc-800 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 shadow-sm"
                                        : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <ListFilter size={16} />
                                    <span className="hidden xs:inline truncate max-w-[80px] md:max-w-none">
                                        {selectedCategory === "All" ? "Filter" : selectedCategory}
                                    </span>
                                </div>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {isFilterOpen && (
                                    <div
                                        className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 p-1"
                                    >
                                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => selectCategory(cat)}
                                                    className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg transition-colors text-left
                                                    ${selectedCategory === cat
                                                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium"
                                                            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                                        }`}
                                                >
                                                    {cat}
                                                    {selectedCategory === cat && <Check size={14} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT GRID --- */}
                {filteredAchievements.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-3 text-zinc-400">
                            <Search size={20} />
                        </div>
                        <h3 className="text-zinc-900 dark:text-white font-medium text-sm">No achievements found</h3>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="mt-2 text-xs font-bold text-emerald-500 hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div ref={gridRef} className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
                        {filteredAchievements.map((item) => (
                            <AchievementCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* Shared CSS for card effects (same as services page) */}
            <style jsx global>{`
                .ach-glow-overlay {
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .ach-card:hover .ach-glow-overlay {
                    opacity: 1;
                }

                .ach-shine-sweep {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 60%;
                    height: 100%;
                    background: linear-gradient(
                        105deg,
                        transparent 30%,
                        rgba(255, 255, 255, 0.04) 45%,
                        rgba(16, 185, 129, 0.06) 50%,
                        rgba(255, 255, 255, 0.04) 55%,
                        transparent 70%
                    );
                    transform: skewX(-15deg);
                    transition: none;
                    pointer-events: none;
                }

                .ach-card:hover .ach-shine-sweep {
                    animation: ach-shine-pass 0.8s ease-out forwards;
                }

                @keyframes ach-shine-pass {
                    0% { left: -100%; }
                    100% { left: 150%; }
                }
            `}</style>
        </div>
    );
}

// --- CARD COMPONENT with anime.js hover (matched to services style) ---
const AchievementCard = memo(function AchievementCard({ item }: { item: any }) {
    const router = useRouter();
    const goToDetail = () => router.push(`/achievements/${item.id}`);
    const cardRef = useRef(null);
    const glowRef = useRef<HTMLDivElement>(null);

    // Cursor-following glow (same as services)
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !glowRef.current) return;
        const rect = (cardRef.current as HTMLDivElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.background =
            `radial-gradient(300px circle at ${x}px ${y}px, rgba(16,185,129,0.08), transparent 50%)`;
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (!cardRef.current) return;
        anime({
            targets: cardRef.current,
            translateY: -6,
            duration: 400,
            easing: "easeOutCubic",
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        anime({
            targets: cardRef.current,
            translateY: 0,
            duration: 400,
            easing: "easeOutCubic",
        });
    }, []);

    return (
        <div className="break-inside-avoid mb-4 ach-card group relative">
            <div
                ref={cardRef}
                onClick={goToDetail}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") goToDetail(); }}
                className="block bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/30"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Cursor-following glow (same as services) */}
                <div
                    ref={glowRef}
                    className="ach-glow-overlay pointer-events-none absolute -inset-px rounded-xl z-10"
                />

                {/* Shine sweep (same as services) */}
                <div className="pointer-events-none absolute inset-0 rounded-xl z-10 overflow-hidden">
                    <div className="ach-shine-sweep" />
                </div>

                {/* Image area */}
                <div className="relative w-full bg-zinc-100 dark:bg-black/30 p-2 sm:p-4 z-[1]">
                    {item.image_url ? (
                        <div className="relative w-full h-auto">
                            <Image
                                src={item.image_url}
                                alt={item.title}
                                width={500}
                                height={400}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="w-full h-auto object-contain rounded-lg"
                            />
                        </div>
                    ) : (
                        <div className="w-full aspect-video flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-700">
                            <Award size={40} strokeWidth={1.5} />
                        </div>
                    )}
                    {/* View Detail Overlay */}
                    <ViewDetailOverlay />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5 z-[1] relative">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-100 dark:border-emerald-500/20 flex items-center gap-1.5">
                            {(item.issuer || item.category) && <Award size={12} className="text-emerald-500" />}
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                {item.issuer || item.category || "Award"}
                            </span>
                        </div>
                    </div>

                    <h3 className="text-sm sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {item.title}
                    </h3>

                    {item.description && (
                        <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-3 sm:mb-4">
                            {item.description}
                        </p>
                    )}

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs mt-2">
                        <div className="flex flex-col">
                            <span className="text-zinc-400 text-[10px] uppercase tracking-wide">Issued</span>
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                {item.date_issued || "N/A"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                            <CheckCircle2 size={12} />
                            <span className="text-[10px] font-bold">Verified</span>
                        </div>
                    </div>
                </div>

                {/* Bottom gradient line (same as services) */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-all duration-700 opacity-80 z-20" />
            </div>
        </div>
    );
});
