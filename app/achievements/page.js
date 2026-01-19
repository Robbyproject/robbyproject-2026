"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLanguage } from "@/components/providers/AppProviders";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy,
    Search,
    ArrowUpRight,
    CheckCircle2,
    Award,
    ListFilter,
    ChevronDown,
    Check
} from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Link from "next/link"; // Pastikan import Link jika pakai next/link

export default function AchievementsPage() {
    const { t } = useLanguage();
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- STATES FOR SEARCH & FILTER ---
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // State untuk Dropdown (Sama seperti Projects)
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await supabase
                .from('achievements')
                .select('*')
                .order('id', { ascending: false });

            if (data) setAchievements(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    // Logic Click Outside untuk Dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [filterRef]);

    // --- LOGIC: EXTRACT CATEGORIES ---
    const categories = useMemo(() => {
        // Ambil kategori unik, lalu urutkan abjad
        const uniqueCats = new Set(achievements.map(item => item.category || item.issuer).filter(Boolean));
        const sortedCats = Array.from(uniqueCats).sort();
        return ["All", ...sortedCats];
    }, [achievements]);

    // --- LOGIC: FILTER ITEMS ---
    const filteredAchievements = useMemo(() => {
        return achievements.filter((item) => {
            const matchesSearch =
                item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.issuer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchQuery.toLowerCase());

            const currentItemCategory = item.category || item.issuer;
            const matchesCategory =
                selectedCategory === "All" || currentItemCategory === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [achievements, searchQuery, selectedCategory]);

    return (
        <div className="w-full space-y-10 min-h-[101vh] pb-20 pt-4">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 dark:border-white/5 pb-8">

                {/* Judul & Deskripsi */}
                <div className="space-y-2 max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Trophy className="text-yellow-500" size={32} />
                        {t?.ach_title || "Achievements"}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        {t?.ach_subtitle || "My professional certifications, awards, and milestones collected throughout my journey."}
                    </p>
                </div>

                {/* --- CONTROLS (SEARCH & FILTER) --- */}
                {/* Menggunakan layout 'flex-row' agar sejajar di Mobile */}
                <div className="flex flex-row items-center gap-2 w-full lg:w-auto relative z-20">

                    {/* 1. Search Bar (flex-1 agar mengisi ruang sisa) */}
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-zinc-400 group-focus-within:text-yellow-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search awards..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-yellow-500/50 rounded-xl pl-9 pr-3 text-sm outline-none transition-all placeholder:text-zinc-400 dark:text-white"
                        />
                    </div>

                    {/* 2. Dropdown Filter (Menggantikan Tabs lama) */}
                    <div className="relative shrink-0" ref={filterRef}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center justify-between gap-2 h-10 px-3 md:px-4 rounded-xl border text-sm font-medium transition-all w-auto
                            ${isFilterOpen || selectedCategory !== "All"
                                    ? "bg-white dark:bg-zinc-800 border-yellow-500/50 text-yellow-600 dark:text-yellow-400 shadow-sm"
                                    : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <ListFilter size={16} />
                                {/* Teks 'Filter' sembunyi di HP kecil, muncul di HP normal/Desktop */}
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
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 p-1"
                                >
                                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                        <div className="px-2 py-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                                            Categories
                                        </div>
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => {
                                                    setSelectedCategory(cat);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-lg transition-colors text-left
                                                ${selectedCategory === cat
                                                        ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 font-medium"
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

            {/* --- MAIN CONTENT GRID --- */}
            {loading ? (
                // SKELETON LOADING: columns-1 (HP) -> sm:columns-2 -> md:columns-3
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="break-inside-avoid mb-4">
                            <div className="w-full bg-zinc-200 dark:bg-zinc-900 rounded-2xl animate-pulse h-64"></div>
                            <div className="mt-4 space-y-2 px-1">
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-900 rounded w-2/3 animate-pulse"></div>
                                <div className="h-3 bg-zinc-200 dark:bg-zinc-900 rounded w-1/3 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredAchievements.length === 0 ? (
                // EMPTY STATE
                <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-3 text-zinc-400">
                        <Search size={20} />
                    </div>
                    <h3 className="text-zinc-900 dark:text-white font-medium text-sm">No achievements found</h3>
                    <button
                        onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                        className="mt-2 text-xs font-bold text-yellow-600 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                // REAL CONTENT GRID: columns-1 (HP) -> sm:columns-2 -> md:columns-3 -> lg:columns-4
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredAchievements.map((item, index) => (
                            <AchievementCard
                                key={item.id}
                                item={item}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}

        </div>
    );
}

// --- CARD COMPONENT (Sedikit penyesuaian margin agar pas dengan kolom baru) ---
function AchievementCard({ item, index }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="break-inside-avoid mb-4 group relative"
        >
            <a
                href={item.link_url || "#"}
                target={item.link_url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`block bg-white dark:bg-[#121212] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-xl hover:border-yellow-500/30 
                ${!item.link_url ? 'cursor-default' : 'cursor-pointer hover:-translate-y-1'}`}
            >
                {/* IMAGE AREA */}
                <div className="relative w-full bg-zinc-100 dark:bg-black/20 p-4">
                    {item.image_url ? (
                        <Image
                            src={item.image_url}
                            alt={item.title}
                            width={500}
                            height={400}
                            className="w-full h-auto object-contain rounded-lg shadow-sm"
                        />
                    ) : (
                        <div className="w-full aspect-video flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-700">
                            <Award size={40} strokeWidth={1.5} />
                        </div>
                    )}

                    {/* External Link Icon */}
                    {item.link_url && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <div className="w-8 h-8 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-full flex items-center justify-center shadow-lg border border-zinc-100 dark:border-zinc-700">
                                <ArrowUpRight size={14} />
                            </div>
                        </div>
                    )}
                </div>

                {/* TEXT CONTENT */}
                <div className="p-5">
                    {/* Issuer Tag */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="px-2.5 py-1 rounded-md bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20 flex items-center gap-1.5">
                            {item.issuer && <Award size={12} className="text-yellow-600 dark:text-yellow-500" />}
                            <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-500">
                                {item.issuer || item.category || "Award"}
                            </span>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                        {item.title}
                    </h3>

                    {item.description && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                            {item.description}
                        </p>
                    )}

                    {/* Footer Info */}
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs mt-2">
                        <div className="flex flex-col">
                            <span className="text-zinc-400 text-[10px] uppercase tracking-wide">Issued</span>
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                {item.date_issued || "N/A"}
                            </span>
                        </div>

                        {/* Verified Badge */}
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                            <CheckCircle2 size={12} />
                            <span className="text-[10px] font-bold">Verified</span>
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
}