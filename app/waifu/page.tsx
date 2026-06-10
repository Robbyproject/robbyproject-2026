"use client";

import { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import { useLanguage } from "@/components/providers/AppProviders";
import { AnimatePresence } from "framer-motion";
import anime from "animejs";
import {
    Heart,
    Search,
    Sparkles,
    PlayCircle,
    ListFilter,
    ChevronDown,
    Check
} from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function WaifuPage() {
    const { t } = useLanguage();
    const [waifuList, setWaifuList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSource, setSelectedSource] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    // FETCH DATA
    useEffect(() => {
        let isMounted = true;
        const fetchWaifu = async () => {
            try {
                const { data, error } = await supabase
                    .from('waifu_list')
                    .select('*')
                    .order('name', { ascending: true });
                if (isMounted) {
                    if (error) throw error;
                    setWaifuList(data || []);
                }
            } catch (err) {
                console.error("Error fetching waifus:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchWaifu();
        return () => { isMounted = false; };
    }, []);

    // HANDLERS
    const toggleFilter = useCallback(() => setIsFilterOpen(prev => !prev), []);
    const selectSource = useCallback((source: string) => {
        setSelectedSource(source);
        setIsFilterOpen(false);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        if (isFilterOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFilterOpen]);

    // SOURCES
    const sources = useMemo(() => {
        const uniqueSources = new Set(waifuList.map(item => item.anime_source).filter(Boolean));
        return ["All", ...Array.from(uniqueSources).sort()];
    }, [waifuList]);

    // FILTER
    const filteredWaifu = useMemo(() => {
        if (!waifuList.length) return [];
        const query = searchQuery.toLowerCase().trim();
        const isAllSource = selectedSource === "All";
        if (!query && isAllSource) return waifuList;
        return waifuList.filter((item) => {
            const matchesSource = isAllSource || item.anime_source === selectedSource;
            if (!matchesSource) return false;
            if (!query) return true;
            return item.name?.toLowerCase().includes(query);
        });
    }, [waifuList, searchQuery, selectedSource]);

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

    // ANIME.JS — Cards stagger entrance
    useEffect(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll(".waifu-card");
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
    }, [filteredWaifu, loading]);

    return (
        <div className="w-full space-y-8 min-h-screen pb-20 pt-4">

            {/* --- HEADER --- */}
            <div
                ref={headerRef}
                className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 dark:border-white/5 pb-8"
            >
                <div className="space-y-2 max-w-lg" style={{ opacity: 0 }}>
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Heart className="text-emerald-500 fill-emerald-500/10" size={32} />
                        {t?.waifu_title || "Waifu Collection"}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        {t?.waifu_subtitle || "A curated gallery of favorite characters. Muse, inspiration, and aesthetic appreciation."}
                    </p>
                </div>

                {/* CONTROLS */}
                <div className="flex flex-row items-center gap-2 w-full lg:w-auto relative z-20" style={{ opacity: 0 }}>
                    {/* Search */}
                    <div className="relative flex-1 group min-w-[200px]">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search character..."
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
                            ${isFilterOpen || selectedSource !== "All"
                                    ? "bg-white dark:bg-zinc-800 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 shadow-sm"
                                    : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <ListFilter size={16} />
                                <span className="hidden xs:inline truncate max-w-[80px] md:max-w-none">
                                    {selectedSource === "All" ? "Source" : selectedSource}
                                </span>
                            </div>
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {isFilterOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 p-1">
                                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                        <div className="px-2 py-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                                            Anime Source
                                        </div>
                                        {sources.map((source) => (
                                            <button
                                                key={source}
                                                onClick={() => selectSource(source)}
                                                className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg transition-colors text-left
                                                ${selectedSource === source
                                                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium"
                                                        : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                                    }`}
                                            >
                                                <span className="truncate">{source}</span>
                                                {selectedSource === source && <Check size={14} className="shrink-0" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* --- CONTENT --- */}
            {loading ? (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="break-inside-avoid mb-4">
                            <div className={`w-full bg-zinc-200 dark:bg-zinc-900 rounded-xl animate-pulse ${i % 2 === 0 ? 'h-64' : 'h-96'}`} />
                        </div>
                    ))}
                </div>
            ) : filteredWaifu.length === 0 ? (
                <div className="py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-400 text-sm bg-zinc-50/50 dark:bg-zinc-900/20">
                    <Sparkles size={24} className="mb-2 opacity-50" />
                    <p>No characters found.</p>
                    <button
                        onClick={() => { setSearchQuery(""); setSelectedSource("All"); }}
                        className="mt-2 text-xs font-bold text-emerald-500 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div ref={gridRef} className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {filteredWaifu.map((char) => (
                        <WaifuCard key={char.id} char={char} />
                    ))}
                </div>
            )}

            {/* Shared card effects CSS */}
            <style jsx global>{`
                .waifu-glow-overlay {
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .waifu-card:hover .waifu-glow-overlay {
                    opacity: 1;
                }
                .waifu-shine-sweep {
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
                .waifu-card:hover .waifu-shine-sweep {
                    animation: waifu-shine-pass 0.8s ease-out forwards;
                }
                @keyframes waifu-shine-pass {
                    0% { left: -100%; }
                    100% { left: 150%; }
                }
            `}</style>
        </div>
    );
}

// --- CARD ---
const WaifuCard = memo(function WaifuCard({ char }: { char: any }) {
    const cardRef = useRef(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const isVideo = useMemo(() => char.image_url?.match(/\.(mp4|webm|ogg|mov)$/i), [char.image_url]);

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
        anime({ targets: cardRef.current, translateY: -5, duration: 400, easing: "easeOutCubic" });
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        anime({ targets: cardRef.current, translateY: 0, duration: 400, easing: "easeOutCubic" });
    }, []);

    return (
        <div className="break-inside-avoid mb-4 waifu-card group relative">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/30"
            >
                {/* Cursor glow */}
                <div ref={glowRef} className="waifu-glow-overlay pointer-events-none absolute -inset-px rounded-xl z-10" />

                {/* Shine sweep */}
                <div className="pointer-events-none absolute inset-0 rounded-xl z-10 overflow-hidden">
                    <div className="waifu-shine-sweep" />
                </div>

                {/* Media */}
                <div className="relative w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                    {isVideo ? (
                        <video
                            src={char.image_url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="w-full h-auto object-cover"
                        />
                    ) : (
                        <Image
                            src={char.image_url}
                            alt={char.name}
                            width={500}
                            height={700}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    )}

                    {/* Video indicator */}
                    {isVideo && (
                        <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 bg-black/60 backdrop-blur-sm text-emerald-400 rounded-full flex items-center justify-center">
                                <PlayCircle size={14} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-3 relative z-[1]">
                    {char.anime_source && (
                        <span className="inline-block px-2 py-0.5 mb-2 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500">
                            {char.anime_source}
                        </span>
                    )}

                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {char.name}
                    </h3>

                    {char.description && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                            {char.description}
                        </p>
                    )}
                </div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-all duration-700 opacity-80 z-20" />
            </div>
        </div>
    );
});
