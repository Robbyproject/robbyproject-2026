"use client";

import { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import { useLanguage } from "@/components/providers/AppProviders";
import { motion, AnimatePresence } from "framer-motion";
import {
    Tv,
    Search,
    Star,
    ExternalLink,
    PlayCircle,
    CheckCircle2,
    Clock,
    ListFilter,
    ChevronDown,
    Check
} from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function AnimePage() {
    const { t } = useLanguage();
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- STATE PENCARIAN & FILTER ---
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");

    // State Dropdown
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);

    // 1. FETCH DATA (Optimized with isMounted)
    useEffect(() => {
        let isMounted = true;

        const fetchAnime = async () => {
            try {
                const { data, error } = await supabase
                    .from('anime_list')
                    .select('*')
                    .order('id', { ascending: false });

                if (isMounted) {
                    if (error) throw error;
                    setAnimeList(data || []);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching anime:", error);
                if (isMounted) setLoading(false);
            }
        };

        fetchAnime();

        return () => { isMounted = false; };
    }, []);

    // 2. OPTIMIZED EVENT HANDLERS
    const toggleFilter = useCallback(() => setIsFilterOpen(prev => !prev), []);

    const selectStatus = useCallback((status) => {
        setSelectedStatus(status);
        setIsFilterOpen(false);
    }, []);

    // Logic Click Outside Dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }
        if (isFilterOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFilterOpen]);

    // 3. MEMOIZED STATUSES
    const statuses = useMemo(() => {
        const uniqueStatus = new Set(animeList.map(item => item.status).filter(Boolean));
        return ["All", ...Array.from(uniqueStatus).sort()];
    }, [animeList]);

    // 4. MEMOIZED FILTER LOGIC (With Fast Path)
    const filteredAnime = useMemo(() => {
        // Jika data belum ada
        if (!animeList.length) return [];

        const query = searchQuery.toLowerCase().trim();
        const isAllStatus = selectedStatus === "All";

        // Fast Path: Jika tidak ada search & status All, return semua (hemat resource)
        if (!query && isAllStatus) return animeList;

        return animeList.filter((item) => {
            // Cek Status dulu (lebih cepat)
            const matchesStatus = isAllStatus || item.status === selectedStatus;
            if (!matchesStatus) return false;

            // Jika status cocok, baru cek search query
            if (!query) return true;
            return item.title?.toLowerCase().includes(query);
        });
    }, [animeList, searchQuery, selectedStatus]);

    return (
        <div className="w-full space-y-8 min-h-screen pb-20 pt-4">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 dark:border-white/5 pb-8">
                <div className="space-y-2 max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Tv className="text-cyan-500" size={32} />
                        {t?.anime_title || "Anime Watchlist"}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        {t?.anime_subtitle || "Tracking my journey through animation. Shows I'm watching, completed, or planning to watch."}
                    </p>
                </div>

                {/* --- CONTROLS (SEARCH & FILTER) --- */}
                <div className="flex flex-row items-center gap-2 w-full lg:w-auto relative z-20">

                    {/* 1. Search Bar */}
                    <div className="relative flex-1 group min-w-[200px]">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-zinc-400 group-focus-within:text-cyan-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search titles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-cyan-500/50 rounded-xl pl-9 pr-3 text-sm outline-none transition-all placeholder:text-zinc-400 dark:text-white"
                        />
                    </div>

                    {/* 2. Dropdown Filter Button */}
                    <div className="relative shrink-0" ref={filterRef}>
                        <button
                            onClick={toggleFilter}
                            className={`flex items-center justify-between gap-2 h-10 px-3 md:px-4 rounded-xl border text-sm font-medium transition-all w-auto
                        ${isFilterOpen || selectedStatus !== "All"
                                    ? "bg-white dark:bg-zinc-800 border-cyan-500/50 text-cyan-600 dark:text-cyan-400 shadow-sm"
                                    : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <ListFilter size={16} />
                                <span className="hidden xs:inline truncate max-w-[80px] md:max-w-none">
                                    {selectedStatus === "All" ? "Status" : selectedStatus}
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
                                            Watch Status
                                        </div>
                                        {statuses.map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => selectStatus(status)}
                                                className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg transition-colors text-left
                                                ${selectedStatus === status
                                                        ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 font-medium"
                                                        : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                                    }`}
                                            >
                                                {status}
                                                {selectedStatus === status && <Check size={14} />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT (MASONRY LAYOUT) --- */}
            {loading ? (
                // SKELETON LOADING
                <div className="columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="break-inside-avoid mb-4">
                            <div className={`w-full bg-zinc-200 dark:bg-zinc-900 rounded-xl animate-pulse ${i % 2 === 0 ? 'h-64' : 'h-80'}`} />
                            <div className="mt-2 space-y-2 px-1">
                                <div className="h-3 bg-zinc-200 dark:bg-zinc-900 rounded w-full animate-pulse" />
                                <div className="h-2 bg-zinc-200 dark:bg-zinc-900 rounded w-1/2 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredAnime.length === 0 ? (
                // EMPTY STATE
                <div className="py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-400 text-sm bg-zinc-50/50 dark:bg-zinc-900/20">
                    <Search size={24} className="mb-2 opacity-50" />
                    <p>No anime found.</p>
                    <button
                        onClick={() => { setSearchQuery(""); setSelectedStatus("All"); }}
                        className="mt-2 text-xs font-bold text-cyan-600 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                // REAL CONTENT
                <div className="columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredAnime.map((anime) => (
                            <AnimeCard
                                key={anime.id}
                                anime={anime}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}

        </div>
    );
}

// --- OPTIMIZED CARD COMPONENT (Wrapped in Memo) ---
const AnimeCard = memo(function AnimeCard({ anime }) {

    // Helper untuk warna status (Static logic, aman di dalam render)
    const getStatusColor = (status) => {
        const s = status?.toLowerCase() || "";
        if (s === 'watching') return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
        if (s === 'completed') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
        if (s === 'dropped') return 'bg-red-500/20 text-red-400 border-red-500/30';
        if (s.includes('plan')) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
        return 'bg-zinc-800/80 text-zinc-300 border-white/10';
    };

    const getStatusIcon = (status) => {
        const s = status?.toLowerCase() || "";
        if (s === 'watching') return <PlayCircle size={10} className="mr-1" />;
        if (s === 'completed') return <CheckCircle2 size={10} className="mr-1" />;
        return <Clock size={10} className="mr-1" />;
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="break-inside-avoid mb-4"
        >
            <motion.a
                href={anime.link_url || "#"}
                target={anime.link_url ? "_blank" : "_self"}
                rel={anime.link_url ? "noopener noreferrer" : ""}
                // Prevent click if no link
                onClick={(e) => !anime.link_url && e.preventDefault()}

                className={`block relative rounded-xl overflow-hidden bg-zinc-900 group
                ${!anime.link_url ? 'cursor-default' : 'cursor-pointer'}`}

                // Animasi Hover (Spring Physics)
                whileHover={anime.link_url ? { y: -5, scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {/* IMAGE AREA */}
                <div className="relative w-full">
                    {anime.cover_url ? (
                        <Image
                            src={anime.cover_url}
                            alt={anime.title}
                            width={300} // Base width, overridden by CSS/Sizes
                            height={450}
                            // OPTIMASI: Penting untuk kolom responsif
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            className="w-full h-auto object-cover min-h-[150px] transform-gpu"
                        />
                    ) : (
                        <div className="w-full aspect-[2/3] bg-zinc-800 flex items-center justify-center text-zinc-600">
                            <span className="text-xs">No Cover</span>
                        </div>
                    )}

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />

                    {/* External Link Icon (Fade in smooth) */}
                    {anime.link_url && (
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-7 h-7 bg-white text-black rounded-full flex items-center justify-center shadow-lg">
                                <ExternalLink size={14} />
                            </div>
                        </div>
                    )}

                    {/* CONTENT OVERLAY (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                        {/* Title */}
                        <h3 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-2 drop-shadow-md">
                            {anime.title}
                        </h3>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between">
                            {/* Status Badge */}
                            {anime.status && (
                                <div className={`flex items-center px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${getStatusColor(anime.status)}`}>
                                    {getStatusIcon(anime.status)}
                                    {anime.status}
                                </div>
                            )}

                            {/* Rating */}
                            {anime.rating && (
                                <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold drop-shadow-md bg-black/40 px-1.5 py-0.5 rounded-md backdrop-blur-sm border border-white/5">
                                    <Star size={10} fill="currentColor" />
                                    <span>{anime.rating}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.a>
        </motion.div>
    );
});