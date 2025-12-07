"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Star, Info, X, Clapperboard, BookOpen, Tv } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CardSpotlight from "@/components/ui/CardSpotlight";
import { useLanguage } from "@/components/providers/AppProviders";

// =========================================
// 1. DATA ANIME (Tambahkan/Hapus disini)
// =========================================
const animeData = [
  {
    id: 1,
    title: "Tensei shitara Slime Datta Ken 2nd Season Part 2",
    stats: "12 Eps",
    rating: 10,
    type: "TV Series",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/113727l.jpg",
    synopsis: "The nation of Tempest is in a festive mood after successfully overcoming the surprise attack from the Falmuth Army and the Western Holy Church."
  },
  {
    id: 2,
    title: "Jujutsu Kaisen 2nd Season",
    stats: "23 Eps",
    rating: 9.9,
    type: "TV Series",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/138022l.jpg",
    synopsis: "The year is 2006, and the halls of Tokyo Prefectural Jujutsu High School echo with the endless bickering and intense debate between two inseparable best friends. Exuding unshakeable confidence, Satoru Gojou and Suguru Getou believe there is no challenge too great for young and powerful Special Grade sorcerers such as themselves."
  },
  {
    id: 3,
    title: "Haikyuu!! Karasuno Koukou vs. Shiratorizawa Gakuen Koukou",
    stats: "10 Eps",
    rating: 9.5,
    type: "TV Series",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/79231l.jpg",
    synopsis: "After the victory against Aoba Jousai High, Karasuno High School, once called “a fallen powerhouse, a crow that can’t fly,” has finally reached the climax of the heated Spring tournament."
  },
  {
    id: 4,
    title: "Bocchi the Rock!",
    stats: "12 Eps",
    rating: 9.8,
    type: "TV Series",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/112176l.jpg",
    synopsis: "Hitori Gotou is a high school girl who's starting to learn to play the guitar because she dreams of being in a band."
  },
];

// =========================================
// 2. DATA MANGA / MANHWA (Section Baru)
// =========================================
const mangaData = [
  {
    id: 101,
    title: "Black Clover",
    stats: "Ongoing",
    rating: 10,
    type: "Manga", // Bisa Manhwa/Manga
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/manga_thumbnail-Manga-Black-Clover.jpg",
    synopsis: "Set in a world where magic is an important part of everyday life, this story follows Asta, a boy born without magical abilities. Even so, he dreams of becoming the Wizard King, the most powerful figure who protects the kingdom."
  },
  {
    id: 102,
    title: "Haikyuu!!",
    stats: "Ongoing",
    rating: 9.9,
    type: "Manga",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/manga_thumbnail-Manga-Haikyuu.jpg",
    synopsis: "Haikyuu!! tells the story of Shoyo Hinata, a high school student who is inspired to become a volleyball player after watching a short athlete excel in a national volleyball tournament. Despite his short stature, Hinata's passion and determination drive him to join his school's volleyball club and work hard to hone his skills in order to defeat his rivals."
  },
  {
    id: 103,
    title: "Juujika no Rokunin",
    stats: "Ongoing",
    rating: 10,
    type: "Manga",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/manga_thumbnail-Manga-Juujika-no-Rokunin.jpg",
    synopsis: "Juujika no Rokunin tells the story of a man named Akitsu Tetsuya who lived a quiet life with his family until a tragedy changed everything. He suffered greatly after his family fell victim to the cruelty of a group of individuals."
  },
  {
    id: 104,
    title: "Kaoru Hana wa Rin to Saku",
    stats: "Ongoing",
    rating: 9.8,
    type: "Manga",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/manga_thumbnail-Manga-Kaoru-Hana-wa-Rin-to-Saku.jpg",
    synopsis: "Kaoru lives with characteristic determination, always showing strength and resolve in her every move. Her daily life is filled with the struggle to maintain her honor and prove that gentleness does not mean weakness."
  },
];

export default function AnimeList() {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const { t } = useLanguage();

  // Filter Logic (Sort by Rating Highest -> Lowest)
  const filteredAnime = animeData
    .sort((a, b) => b.rating - a.rating)
    .filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  const filteredManga = mangaData
    .sort((a, b) => b.rating - a.rating)
    .filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  // Component Card (Reusable untuk Anime & Manga)
  const MediaCard = ({ item }) => (
    <CardSpotlight 
        color={item.type === "Manhwa" || item.type === "Manga" ? "rgba(34, 211, 238, 0.15)" : "rgba(255, 215, 0, 0.15)"} 
        className="group relative bg-white dark:bg-[#18181b] rounded-2xl border border-zinc-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
        {/* Poster Image */}
        <div 
            className="relative w-full aspect-[3/4] overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-800"
            onClick={() => setSelectedItem(item)}
        >
            <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Rating Badge */}
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1 shadow-lg z-10">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-white">{item.rating}</span>
            </div>

            {/* Overlay Hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/20 flex items-center gap-2 hover:bg-white/30 transition-colors">
                    <Info size={14} /> Synopsis
                </button>
            </div>
        </div>

        {/* Info Bawah */}
        <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1 mb-1" title={item.title}>
                {item.title}
            </h3>
            <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-[10px] text-zinc-500 font-mono bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-white/5">
                    {item.stats}
                </span>
                <span className={`text-[10px] font-bold ${item.type === 'Manhwa' || item.type === 'Manga' ? 'text-cyan-500' : 'text-yellow-500'}`}>
                    {item.type}
                </span>
            </div>
        </div>
    </CardSpotlight>
  );

  return (
    <section className="py-2 space-y-12">
      
      {/* SEARCH BAR (Global) */}
      <div className="relative group max-w-md">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-cyan-500 transition-colors" size={20} />
         <input 
            type="text" 
            placeholder={t.anime_search || "Search title..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-sm"
         />
      </div>

      {/* --- SECTION 1: ANIME SERIES --- */}
      {filteredAnime.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-200 dark:border-white/5 pb-4">
                <Tv className="text-yellow-500" size={24} />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Anime Series</h2>
                <span className="ml-auto text-xs text-zinc-400 font-mono">{filteredAnime.length} Titles</span>
            </div>
            
            {/* GRID LAYOUT (Otomatis Gap & Responsive) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAnime.map((item) => (
                    <MediaCard key={item.id} item={item} />
                ))}
            </div>
          </div>
      )}

      {/* --- SECTION 2: MANGA / MANHWA --- */}
      {filteredManga.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-200 dark:border-white/5 pb-4">
                <BookOpen className="text-cyan-500" size={24} />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Manga & Manhwa</h2>
                <span className="ml-auto text-xs text-zinc-400 font-mono">{filteredManga.length} Titles</span>
            </div>

            {/* GRID LAYOUT (Otomatis Gap & Responsive) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredManga.map((item) => (
                    <MediaCard key={item.id} item={item} />
                ))}
            </div>
          </div>
      )}

      {/* MODAL POPUP DETAIL */}
      <AnimatePresence>
        {selectedItem && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setSelectedItem(null)}
            >
                <div 
                    className="relative w-full max-w-2xl bg-[#18181b] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Gambar Modal */}
                    <div className="relative w-full md:w-56 h-64 md:h-auto bg-zinc-900 shrink-0">
                        <Image src={selectedItem.image} alt={selectedItem.title} fill className="object-cover" />
                        <button 
                            onClick={() => setSelectedItem(null)} 
                            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white md:hidden"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Konten Text Modal */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1 leading-tight">{selectedItem.title}</h2>
                                <div className="flex items-center gap-2 text-sm text-zinc-400">
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-white text-xs">{selectedItem.type}</span>
                                    <span>•</span>
                                    <span>{selectedItem.stats}</span>
                                </div>
                            </div>
                            
                            <div className="hidden md:flex flex-col items-end">
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star size={20} className="fill-yellow-400" />
                                    <span className="text-2xl font-bold">{selectedItem.rating}</span>
                                </div>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest">Score</span>
                            </div>
                        </div>

                        <div className="h-[1px] w-full bg-white/10 mb-4"></div>

                        <h4 className="text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">Synopsis</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed overflow-y-auto max-h-[200px] pr-2 custom-scrollbar">
                            {selectedItem.synopsis}
                        </p>

                        <div className="mt-auto pt-6 flex justify-end">
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="px-5 py-2 rounded-lg bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}