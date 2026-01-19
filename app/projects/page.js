"use client";

import { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import { useLanguage } from "@/components/providers/AppProviders";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    Search,
    ArrowUpRight,
    ListFilter,
    Check,
    ChevronDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ProjectsPage() {
    const { t } = useLanguage();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // State Search & Filter
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // State untuk Dropdown
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);

    // 1. FETCH DATA (Hanya sekali saat mount)
    useEffect(() => {
        let isMounted = true; // Flag untuk mencegah state update jika komponen sudah unmount

        const fetchProjects = async () => {
            // Cek apakah data sudah ada di session/local storage (Optional caching strategy)
            // Untuk sekarang kita fetch langsung tapi aman

            const { data, error } = await supabase
                .from('projects')
                .select('*')
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

    // 2. OPTIMIZED CLICK OUTSIDE (Menggunakan useCallback)
    const toggleFilter = useCallback(() => setIsFilterOpen(prev => !prev), []);

    const selectCategory = useCallback((cat) => {
        setSelectedCategory(cat);
        setIsFilterOpen(false);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }
        // Bind event listener hanya jika dropdown terbuka untuk hemat resource
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

    // 4. MEMOIZED FILTERING LOGIC
    const filteredProjects = useMemo(() => {
        // Jika tidak ada data, kembalikan array kosong segera
        if (!projects.length) return [];

        const query = searchQuery.toLowerCase().trim();
        const isAllCats = selectedCategory === "All";

        // Jika search kosong dan kategori All, kembalikan semua (Fast Path)
        if (!query && isAllCats) return projects;

        return projects.filter((project) => {
            const matchesCategory = isAllCats || project.category === selectedCategory;

            // Optimasi: Jika kategori tidak cocok, skip pengecekan search text (Short-circuit evaluation)
            if (!matchesCategory) return false;

            if (!query) return true;

            const title = project.title?.toLowerCase() || "";
            // Cek title dulu karena paling sering dicari
            if (title.includes(query)) return true;

            const desc = project.description?.toLowerCase() || "";
            if (desc.includes(query)) return true;

            const toolsString = Array.isArray(project.tools) ? project.tools.join(" ").toLowerCase() : "";
            return toolsString.includes(query);
        });
    }, [projects, searchQuery, selectedCategory]);

    return (
        <div className="w-full space-y-10 min-h-screen pb-20 pt-4">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 dark:border-white/5 pb-8">
                <div className="space-y-2 max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Briefcase className="text-cyan-500" size={32} />
                        Selected Works
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        A collection of projects, experiments, and things I've built using various technologies.
                    </p>
                </div>

                <div className="flex flex-row items-center gap-2 w-full lg:w-auto relative z-20">
                    {/* Search Bar */}
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-zinc-400 group-focus-within:text-cyan-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-cyan-500/50 rounded-xl pl-9 pr-3 text-sm outline-none transition-all placeholder:text-zinc-400 dark:text-white"
                        />
                    </div>

                    {/* Dropdown Filter */}
                    <div className="relative shrink-0" ref={filterRef}>
                        <button
                            onClick={toggleFilter}
                            className={`flex items-center justify-between gap-2 h-10 px-3 md:px-4 rounded-xl border text-sm font-medium transition-all w-auto
                            ${isFilterOpen || selectedCategory !== "All"
                                    ? "bg-white dark:bg-zinc-800 border-cyan-500/50 text-cyan-600 dark:text-cyan-400 shadow-sm"
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
                                    transition={{ duration: 0.15 }} // Lebih cepat sedikit biar snappy
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
                                                        ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 font-medium"
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

            {/* --- CONTENT GRID --- */}
            {loading ? (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
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
                        className="mt-2 text-xs font-bold text-cyan-600 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

// --- OPTIMIZED CARD COMPONENT (Wrapped in Memo) ---
// Memoization prevents re-renders of EVERY card when you type in the search bar.
const ProjectCard = memo(function ProjectCard({ project }) {
    const hasLink = !!project.link_url;
    const Wrapper = hasLink ? Link : "div";
    const wrapperProps = hasLink ? { href: project.link_url, target: "_blank" } : {};

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="break-inside-avoid mb-4 group"
        >
            <Wrapper
                {...wrapperProps}
                className={`block bg-white dark:bg-[#121212] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-lg hover:border-cyan-500/30 ${hasLink ? 'cursor-pointer' : ''}`}
            >
                <div className="relative w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                    {project.image_url ? (
                        <div className="relative w-full h-auto">
                            <Image
                                src={project.image_url}
                                alt={project.title}
                                width={500}
                                height={350}
                                // OPTIMISASI PENTING: Sizes prop
                                // Memberitahu browser ukuran gambar yang diperlukan berdasarkan viewport.
                                // Ini mencegah download gambar resolusi tinggi (misal 2000px) untuk tampilan HP.
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                placeholder="blur" // Jika kamu punya blurDataURL, bagus. Jika tidak, hapus baris ini atau biarkan default (empty)
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                            />
                        </div>
                    ) : (
                        <div className="w-full aspect-[4/3] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-zinc-300">
                            <span className="text-[10px]">No Preview</span>
                        </div>
                    )}

                    {hasLink && (
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                            <span className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                <ArrowUpRight size={14} />
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700">
                            {project.category || "Project"}
                        </span>
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                        {project.description}
                    </p>
                    {Array.isArray(project.tools) && project.tools.length > 0 && (
                        <div className="pt-3 mt-1 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-1.5">
                            {project.tools.slice(0, 3).map((tool, i) => (
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
            </Wrapper>
        </motion.div>
    );
});