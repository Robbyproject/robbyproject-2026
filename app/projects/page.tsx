"use client";

import { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import { useLanguage } from "@/components/providers/AppProviders";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    Search,
    ListFilter,
    Check,
    ChevronDown,
    Pin
} from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import ViewDetailOverlay from "@/components/features/detail/ViewDetailOverlay";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 }
    }
};

export default function ProjectsPage() {
    const { t } = useLanguage();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // State Search & Filter
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // State untuk Dropdown
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);

    // 1. FETCH DATA — pinned projects sorted first by database
    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('is_pinned', { ascending: false })
                .order('id', { ascending: false });

            if (isMounted) {
                if (data) setProjects(data);
                if (error) console.error("Error loading projects:", error);
                setLoading(false);
            }
        };

        fetchProjects();

        return () => { isMounted = false; };
    }, []);

    // Count pinned projects
    const pinnedCount = useMemo(() => projects.filter((p: any) => p.is_pinned).length, [projects]);

    // 2. OPTIMIZED CLICK OUTSIDE
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

    // 3. MEMOIZED CATEGORIES
    const categories = useMemo(() => {
        const uniqueCats = new Set(projects.map(p => p.category).filter(Boolean));
        const sortedCats = Array.from(uniqueCats).sort();
        return ["All", ...sortedCats];
    }, [projects]);

    // 4. MEMOIZED FILTERING LOGIC — pinned always on top
    const filteredProjects = useMemo(() => {
        if (!projects.length) return [];

        const query = searchQuery.toLowerCase().trim();
        const isAllCats = selectedCategory === "All";

        let result = projects;

        // Apply search & category filter
        if (query || !isAllCats) {
            result = projects.filter((project) => {
                const matchesCategory = isAllCats || project.category === selectedCategory;
                if (!matchesCategory) return false;
                if (!query) return true;

                const title = project.title?.toLowerCase() || "";
                if (title.includes(query)) return true;

                const desc = project.description?.toLowerCase() || "";
                if (desc.includes(query)) return true;

                const toolsString = Array.isArray(project.tools) ? project.tools.join(" ").toLowerCase() : "";
                return toolsString.includes(query);
            });
        }

        // Sort: pinned (is_pinned=true) always first, then original order
        return [...result].sort((a: any, b: any) => {
            const aPin = a.is_pinned ? 0 : 1;
            const bPin = b.is_pinned ? 0 : 1;
            return aPin - bPin;
        });
    }, [projects, searchQuery, selectedCategory]);

    return (
        <div className="w-full space-y-10 min-h-screen pb-20 pt-4">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 dark:border-white/5 pb-8">
                <div className="space-y-2 max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Briefcase className="text-emerald-500 fill-emerald-500/10" size={32} />
                        Selected Works
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        A collection of projects, experiments, and things I&apos;ve built using various technologies.
                    </p>
                    {pinnedCount > 0 && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                            <Pin size={12} /> {pinnedCount} pinned project{pinnedCount > 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                <div className="flex flex-row items-center gap-2 w-full lg:w-auto relative z-20">
                    {/* Search Bar */}
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 rounded-xl pl-9 pr-3 text-sm outline-none transition-all placeholder:text-zinc-400 dark:text-white"
                        />
                    </div>

                    {/* Dropdown Filter */}
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
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 p-1"
                                >
                                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                        <div className="px-2 py-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                                            Categories
                                        </div>
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* --- PINNED + REGULAR IN ONE GRID --- */}
            {loading ? (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="break-inside-avoid mb-4">
                            <div className="w-full bg-zinc-200 dark:bg-zinc-900 rounded-xl animate-pulse h-40"></div>
                            <div className="mt-2 h-3 w-2/3 bg-zinc-200 dark:bg-zinc-900 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-3 text-zinc-400">
                        <Search size={20} />
                    </div>
                    <p className="text-zinc-500 text-sm">No projects found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                        className="mt-2 text-xs font-bold text-emerald-600 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project: any) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            <style jsx global>{`
                .glow-overlay {
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .group:hover .glow-overlay {
                    opacity: 1;
                }

                .shine-sweep {
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

                .group:hover .shine-sweep {
                    animation: shine-pass 0.8s ease-out forwards;
                }

                @keyframes shine-pass {
                    0% { left: -100%; }
                    100% { left: 150%; }
                }
            `}</style>
        </div>
    );
}

const ProjectCard = memo(function ProjectCard({ project }: { project: any }) {
    const router = useRouter();
    const goToDetail = () => router.push(`/projects/${project.id}`);
    const isPinned = !!project.is_pinned;
    const glowRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !glowRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.background =
            `radial-gradient(300px circle at ${x}px ${y}px, rgba(16,185,129,0.08), transparent 50%)`;
    };

    const cardContent = (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onClick={goToDetail}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") goToDetail(); }}
            className={`group relative block bg-white dark:bg-[#121212] rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer hover:shadow-xl ${isPinned ? 'border-emerald-500/40 hover:border-emerald-500/60' : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/30'}`}
        >
            {/* Cursor Glow */}
            <div
                ref={glowRef}
                className="glow-overlay pointer-events-none absolute -inset-px rounded-xl z-10"
            />

            {/* Shine Sweep */}
            <div className="pointer-events-none absolute inset-0 rounded-xl z-10 overflow-hidden">
                <div className="shine-sweep" />
            </div>

            <div className="relative w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                {/* Pinned Badge (read-only from database) */}
                {isPinned && (
                    <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/90 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider shadow-lg">
                        <Pin size={10} className="fill-white" /> Pinned
                    </div>
                )}
                {project.image_url ? (
                    <div className="relative w-full h-auto">
                        <Image
                            src={project.image_url}
                            alt={project.title}
                            width={500}
                            height={350}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        />
                    </div>
                ) : (
                    <div className="w-full aspect-[4/3] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-zinc-300">
                        <span className="text-[10px]">No Preview</span>
                    </div>
                )}
                {/* View Detail Overlay */}
                <ViewDetailOverlay />
            </div>

            <div className="p-2.5 sm:p-4 flex flex-col gap-1.5 sm:gap-2 relative z-20">
                <div className="flex items-center justify-between">
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700 transition-transform duration-300 group-hover:scale-105 origin-left">
                        {project.category || "Project"}
                    </span>
                </div>
                <h3 className="text-[13px] sm:text-sm md:text-base font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {project.description}
                </p>
                {Array.isArray(project.tools) && project.tools.length > 0 && (
                    <div className="pt-3 mt-1 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-1.5">
                        {project.tools.slice(0, 3).map((tool: string, i: number) => (
                            <span key={i} className="text-[9px] font-medium text-zinc-500 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
                                {tool}
                            </span>
                        ))}
                        {project.tools.length > 3 && (
                            <span className="text-[9px] text-zinc-400 self-center">+{project.tools.length - 3}</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <motion.div
            variants={cardVariants}
            exit="exit"
            className="break-inside-avoid mb-4"
        >
            {cardContent}
        </motion.div>
    );
});
