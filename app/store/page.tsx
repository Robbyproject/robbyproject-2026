"use client";

import { useState, useEffect, useMemo, useRef, memo } from "react";
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
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Tilt from "react-parallax-tilt";
import ViewDetailOverlay from "@/components/features/detail/ViewDetailOverlay";

// Helper Formatter
const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
};

// --- STAGGER VARIANTS (Framer Motion — no animejs needed) ---
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
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } // easeOutExpo approximation
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 }
    }
};

export default function StorePage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // --- STATES FOR SEARCH & FILTER ---
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // State untuk Dropdown Filter
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // 1. FETCH DATA
    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (isMounted) {
                    if (error) throw error;
                    setProducts(data || []);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProducts();

        return () => { isMounted = false; };
    }, []);

    // Logic Click Outside Dropdown
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

    // --- LOGIC: EXTRACT CATEGORIES ---
    const categories = useMemo(() => {
        const uniqueCats = new Set(products.map(p => p.category).filter(Boolean));
        return ["All", ...Array.from(uniqueCats).sort()];
    }, [products]);

    // --- LOGIC: FILTER PRODUCTS ---
    const filteredProducts = useMemo(() => {
        if (!products.length) return [];

        const query = searchQuery.toLowerCase().trim();
        const isAllCat = selectedCategory === "All";

        if (!query && isAllCat) return products;

        return products.filter((item) => {
            const matchesCategory = isAllCat || item.category === selectedCategory;
            if (!matchesCategory) return false;

            if (!query) return true;

            return item.name?.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query);
        });
    }, [products, searchQuery, selectedCategory]);

    return (
        <div className="w-full max-w-[1600px] mx-auto space-y-10 min-h-screen pb-20 pt-4">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-zinc-200 dark:border-white/5 pb-8">
                <div className="space-y-2 max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <ShoppingBag className="text-emerald-500 fill-emerald-500/10" size={32} />
                        Store Collection
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        Premium digital assets, templates, and resources curated for professionals.
                    </p>
                </div>

                {/* --- CONTROLS (SEARCH & FILTER) --- */}
                <div className="flex flex-row items-center gap-2 w-full lg:w-auto relative z-20">

                    {/* 1. Search Bar */}
                    <div className="relative flex-1 group min-w-0 sm:min-w-[200px]">
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
                                    transition={{ duration: 0.2 }}
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
                                                <span className="truncate">{cat}</span>
                                                {selectedCategory === cat && <Check size={14} className="shrink-0" />}
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
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-4">
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
                    ))}
                </div>
            ) : filteredProducts.length === 0 ? (
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
                // Stagger grid — Framer Motion handles enter/exit/reorder natively
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
                >
                    <AnimatePresence>
                        {filteredProducts.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* --- CSS for shimmer & glow --- */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-12deg); }
                    100% { transform: translateX(200%) skewX(-12deg); }
                }
                .store-btn-shimmer {
                    position: relative;
                    overflow: hidden;
                }
                .store-btn-shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transform: translateX(-100%) skewX(-12deg);
                    transition: none;
                }
                .group:hover .store-btn-shimmer::after {
                    animation: shimmer 0.8s ease-out;
                }
                .glow-overlay {
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .group:hover .glow-overlay {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
}

// --- ENHANCED PRODUCT CARD (Memoized) ---
const ProductCard = memo(function ProductCard({ item }: { item: any }) {
    const price = item.price || 0;
    const router = useRouter();
    const goToDetail = () => router.push(`/store/${item.id}`);

    // Refs for glow — updated imperatively, NO state = NO re-renders on mouse move
    const glowRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !glowRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Direct DOM update — zero React re-renders
        glowRef.current.style.background =
            `radial-gradient(300px circle at ${x}px ${y}px, rgba(16,185,129,0.08), transparent 50%)`;
    };

    return (
        <motion.div
            variants={cardVariants}
            exit="exit"
        >
            <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                glareEnable={true}
                glareMaxOpacity={0.12}
                glareBorderRadius="16px"
                glarePosition="all"
                scale={1.02}
                transitionSpeed={400}
                tiltEnable={true}
                className="w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
            >
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onClick={goToDetail}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") goToDetail(); }}
                    className="group relative flex flex-col h-full p-2 sm:p-3 rounded-2xl transition-all duration-300 cursor-pointer
                        bg-white border border-zinc-200 shadow-sm
                        hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/20
                        dark:bg-zinc-900/40 dark:backdrop-blur-md dark:border-white/10
                        dark:hover:bg-zinc-900/60 dark:hover:border-emerald-500/30"
                >

                    {/* --- CURSOR GLOW OVERLAY --- */}
                    <div
                        ref={glowRef}
                        className="glow-overlay pointer-events-none absolute -inset-px rounded-2xl z-10"
                    />

                    {/* 1. IMAGE SECTION */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-2.5 sm:mb-4 border border-zinc-100 dark:border-white/5">
                        {item.image_url ? (
                            <Image
                                src={item.image_url}
                                alt={item.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-115"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-zinc-300 dark:text-zinc-600">
                                <ShoppingBag size={32} />
                            </div>
                        )}

                        {/* Price Badge */}
                        <div className="absolute top-3 right-3 px-3 py-1 text-xs font-bold text-zinc-900 dark:text-white bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-lg border border-black/5 dark:border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-105 origin-top-right">
                            {price === 0 ? "FREE" : `Rp ${formatRupiah(price)}`}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]" />

                        {/* View Detail Overlay */}
                        <ViewDetailOverlay />
                    </div>

                    {/* 2. TEXT CONTENT */}
                    <div className="flex flex-col flex-1 px-1 relative z-20">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-800/50 transition-transform duration-300 group-hover:scale-105 origin-left">
                                {item.category || "Asset"}
                            </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                            {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-3 sm:mb-4 flex-1">
                            {item.description}
                        </p>

                        {/* 3. BUTTON SECTION */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/contact?product=${encodeURIComponent(item.name)}`);
                            }}
                            className="store-btn-shimmer
                                flex items-center justify-center gap-2 w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300
                                bg-zinc-900 text-white hover:bg-emerald-600 active:scale-95
                                dark:bg-white dark:text-zinc-900 dark:hover:bg-emerald-500 dark:hover:text-white
                            "
                        >
                            <span>Order Now</span>
                            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>
            </Tilt>
        </motion.div>
    );
});
