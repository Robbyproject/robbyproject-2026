"use client";

import { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import { useLanguage } from "@/components/providers/AppProviders";
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
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function WaifuPage() {
    const { t } = useLanguage();
    const [waifuList, setWaifuList] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- STATE PENCARIAN & FILTER ---
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSource, setSelectedSource] = useState("All");

    // State Dropdown
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);

    // 1. FETCH DATA (Safe for unmount)
    useEffect(() => {
        let isMounted = true;

        const fetchWaifu = async () => {
            try {
                // setLoading(true) dipindah ke inisialisasi state agar tidak flicker
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

    // 2. EVENT HANDLERS (Memoized)
    const toggleFilter = useCallback(() => setIsFilterOpen(prev => !prev), []);

    const selectSource = useCallback((source) => {
        setSelectedSource(source);
        setIsFilterOpen(false);
    }, []);

    // Logic Click Outside
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


    // 3. LOGIC: AMBIL SOURCE UNIK (Memoized)
    const sources = useMemo(() => {
        const uniqueSources = new Set(waifuList.map(item => item.anime_source).filter(Boolean));
        return ["All", ...Array.from(uniqueSources).sort()];
    }, [waifuList]);

    // 4. LOGIC: FILTER ITEM (Fast Path Optimized)
    const filteredWaifu = useMemo(() => {
        // Jika data kosong
        if (!waifuList.length) return [];

        const query = searchQuery.toLowerCase().trim();
        const isAllSource = selectedSource === "All";

        // Fast Path: Jika tidak ada filter aktif, return semua
        if (!query && isAllSource) return waifuList;

        return waifuList.filter((item) => {
            // Cek Source dulu (lebih murah operasinya)
            const matchesSource = isAllSource || item.anime_source === selectedSource;
            if (!matchesSource) return false;

            // Baru cek search query
            if (!query) return true;
            return item.name?.toLowerCase().includes(query);
        });
    }, [waifuList, searchQuery, selectedSource]);

    return (
        <div className="w-full space-y-8 min-h-screen pb-20 pt-4">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 dark:border-white/5 pb-8">
                <div className="space-y-2 max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Heart className="text-rose-500 fill-rose-500" size={32} />
                        {t?.waifu_title || "Waifu Collection"}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        {t?.waifu_subtitle || "A curated gallery of favorite characters. Muse, inspiration, and aesthetic appreciation."}
                    </p>
                </div>

                {/* --- CONTROLS (SEARCH & FILTER) --- */}
                <div className="flex flex-row items-center gap-2 w-full lg:w-auto relative z-20">

                    {/* 1. Search Bar */}
                    <div className="relative flex-1 group min-w-[200px]">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-zinc-400 group-focus-within:text-rose-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search character..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-rose-500/50 rounded-xl pl-9 pr-3 text-sm outline-none transition-all placeholder:text-zinc-400 dark:text-white"
                        />
                    </div>

                    {/* 2. Dropdown Filter Button */}
                    <div className="relative shrink-0" ref={filterRef}>
                        <button
                            onClick={toggleFilter}
                            className={`flex items-center justify-between gap-2 h-10 px-3 md:px-4 rounded-xl border text-sm font-medium transition-all w-auto
                        ${isFilterOpen || selectedSource !== "All"
                                    ? "bg-white dark:bg-zinc-800 border-rose-500/50 text-rose-600 dark:text-rose-400 shadow-sm"
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
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 p-1"
                                >
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
                                                        ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-medium"
                                                        : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                                    }`}
                                            >
                                                <span className="truncate">{source}</span>
                                                {selectedSource === source && <Check size={14} className="shrink-0" />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* --- GRID CONTENT (MASONRY) --- */}
            {loading ? (
                // SKELETON LOADING
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="break-inside-avoid mb-4">
                            <div className={`w-full bg-zinc-200 dark:bg-zinc-900 rounded-2xl animate-pulse ${i % 2 === 0 ? 'h-64' : 'h-96'}`} />
                        </div>
                    ))}
                </div>
            ) : filteredWaifu.length === 0 ? (
                // EMPTY STATE
                <div className="py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-400 text-sm bg-zinc-50/50 dark:bg-zinc-900/20">
                    <Sparkles size={24} className="mb-2 opacity-50" />
                    <p>No characters found.</p>
                    <button
                        onClick={() => { setSearchQuery(""); setSelectedSource("All"); }}
                        className="mt-2 text-xs font-bold text-rose-500 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                // REAL CONTENT
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredWaifu.map((char) => (
                            <WaifuCard key={char.id} char={char} />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

// --- OPTIMIZED COMPONENT: CARD (Wrapped in Memo) ---
const WaifuCard = memo(function WaifuCard({ char }) {
    // Cek apakah file adalah video (Regex sederhana & efisien)
    const isVideo = useMemo(() => char.image_url?.match(/\.(mp4|webm|ogg|mov)$/i), [char.image_url]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="break-inside-avoid mb-4 group relative"
        >
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 shadow-sm border border-zinc-200 dark:border-white/5 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500 hover:-translate-y-1">

                {/* MEDIA (Image or Video) */}
                <div className="relative w-full">
                    {isVideo ? (
                        <video
                            src={char.image_url}
                            autoPlay
                            muted
                            loop
                            playsInline // Penting untuk iOS agar tidak fullscreen
                            preload="metadata"
                            className="w-full h-auto object-cover"
                        />
                    ) : (
                        <Image
                            src={char.image_url}
                            alt={char.name}
                            width={500} // Base size untuk layout responsif
                            height={700}
                            // OPTIMASI: Ukuran kolom Masonry tidak pernah 100vw di desktop
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    )}
                </div>

                {/* OVERLAY GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* CONTENT (Text) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">

                    {/* Source Badge */}
                    {char.anime_source && (
                        <span className="inline-block px-2 py-0.5 mb-2 rounded text-[10px] font-bold uppercase tracking-widest bg-rose-500/20 text-rose-200 border border-rose-500/30 backdrop-blur-md">
                            {char.anime_source}
                        </span>
                    )}

                    {/* Name */}
                    <h2 className="text-white font-bold text-lg leading-tight drop-shadow-md">
                        {char.name}
                    </h2>

                    {/* Description (Visible on Hover) */}
                    {char.description && (
                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                            <p className="text-zinc-300 text-xs mt-2 line-clamp-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {char.description}
                            </p>
                        </div>
                    )}

                    {/* Video Indicator */}
                    {isVideo && (
                        <div className="absolute bottom-4 right-4 text-rose-400 opacity-80 animate-pulse">
                            <PlayCircle size={20} />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
});