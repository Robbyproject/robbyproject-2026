"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ArrowUpRight,
    ShoppingBag,
    ListFilter,
    Check,
    ChevronDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function StorePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- STATES FOR SEARCH & FILTER ---
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // State untuk Dropdown Filter
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Logic Click Outside Dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [filterRef]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- LOGIC: EXTRACT CATEGORIES ---
    const categories = useMemo(() => {
        // Ambil kategori dari data produk, hilangkan duplikat & nilai kosong
        const uniqueCats = new Set(products.map(p => p.category).filter(Boolean));
        // Urutkan abjad
        return ["All", ...Array.from(uniqueCats).sort()];
    }, [products]);

    // --- LOGIC: FILTER PRODUCTS ---
    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    return (
        <div className="w-full max-w-[1600px] mx-auto space-y-10 min-h-screen pb-20 pt-4">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 dark:border-white/5 pb-8">
                <div className="space-y-2 max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <ShoppingBag className="text-emerald-500" size={32} />
                        Store Collection
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        Premium digital assets, templates, and resources curated for professionals.
                    </p>
                </div>

                {/* --- CONTROLS (SEARCH & FILTER) --- */}
                {/* Menggunakan 'flex-row' agar selalu sejajar ke samping di Mobile */}
                <div className="flex flex-row items-center gap-2 w-full lg:w-auto relative z-20">

                    {/* 1. Search Bar (flex-1 agar mengisi ruang sisa) */}
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search assets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 rounded-xl pl-9 pr-3 text-sm outline-none transition-all placeholder:text-zinc-400 dark:text-white"
                        />
                    </div>

                    {/* 2. Dropdown Filter Button */}
                    <div className="relative shrink-0" ref={filterRef}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center justify-between gap-2 h-10 px-3 md:px-4 rounded-xl border text-sm font-medium transition-all w-auto
                        ${isFilterOpen || selectedCategory !== "All"
                                    ? "bg-white dark:bg-zinc-800 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 shadow-sm"
                                    : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <ListFilter size={16} />
                                {/* Teks sembunyi di HP kecil */}
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

            {/* --- CONTENT AREA --- */}
            {loading ? (
                // SKELETON LOADER
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : filteredProducts.length === 0 ? (
                // EMPTY STATE
                <div className="py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-400 text-sm bg-zinc-50/50 dark:bg-zinc-900/20">
                    <ShoppingBag size={24} className="mb-2 opacity-50" />
                    <p>No products match your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                        className="mt-2 text-xs font-bold text-emerald-600 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                // REAL CONTENT
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((item, index) => (
                            <GlassCard key={item.id} item={item} index={index} />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

// --- COMPONENT: SKELETON CARD ---
function SkeletonCard() {
    return (
        <div className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-4">
            <div className="w-full aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
            <div className="space-y-2">
                <div className="flex justify-between gap-4">
                    <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3 animate-pulse" />
                    <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 animate-pulse" />
                </div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full animate-pulse" />
            </div>
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full mt-2 animate-pulse" />
        </div>
    );
}

// --- COMPONENT: GLASS CARD (Product) ---
function GlassCard({ item, index }) {
    const formatRupiah = (num) => new Intl.NumberFormat("id-ID").format(num);
    const price = item.price || 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col h-full"
        >
            <div className="relative flex flex-col h-full p-3 rounded-2xl transition-all duration-300
                bg-white border border-zinc-200 shadow-sm hover:shadow-xl hover:-translate-y-1
                dark:bg-zinc-900/40 dark:backdrop-blur-md dark:border-white/10 dark:hover:bg-zinc-900/60 dark:hover:border-white/20
            ">

                {/* 1. IMAGE SECTION */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-4">
                    {item.image_url ? (
                        <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-zinc-300 dark:text-zinc-600">
                            <ShoppingBag size={32} />
                        </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-zinc-900 dark:text-white bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-lg border border-black/5 dark:border-white/10 shadow-sm">
                        {price === 0 ? "FREE" : `Rp ${formatRupiah(price)}`}
                    </div>
                </div>

                {/* 2. TEXT CONTENT */}
                <div className="flex flex-col flex-1 px-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-800/50">
                            {item.category || "Asset"}
                        </span>
                    </div>

                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-1">
                        {item.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4 flex-1">
                        {item.description}
                    </p>

                    {/* 3. BUTTON SECTION */}
                    <Link
                        href={`/contact?product=${encodeURIComponent(item.name)}`}
                        className="
                            flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all
                            bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95
                            dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200
                        "
                    >
                        <span>Order Now</span>
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}