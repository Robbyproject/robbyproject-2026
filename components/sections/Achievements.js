"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Filter, Maximize2, Award, X } from "lucide-react"; // Ganti ExternalLink jadi Maximize2 & X
import { motion, AnimatePresence } from "framer-motion"; // Import Animation
import CardSpotlight from "@/components/ui/CardSpotlight";
import { useLanguage } from "@/components/providers/AppProviders";

// --- DATA ASLI ANDA (TETAP AMAN) ---
const certificates = [
  { 
    id: 1, 
    title: "SQL Basic", 
    issuer: "HackerRank", 
    date: "Nov 2025", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/sql_basic%20certificate.webp", 
    category: "Code" 
  },
  { 
    id: 2, 
    title: "SQL Intermediate", 
    issuer: "HackerRank", 
    date: "Nov 2025", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/sql_intermediate%20certificate.webp", 
    category: "Code" 
  },
  { 
    id: 3, 
    title: "Python Basic", 
    issuer: "HackerRank", 
    date: "Nov 2025", 
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/python_basic%20certificate.webp", 
    category: "Code" 
  },
];

export default function Achievements() {
  const [query, setQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState(null); // State untuk Popup
  const filtered = certificates.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));
  const { t } = useLanguage();

  return (
    <>
      <section id="achievements" className="py-8 border-t border-zinc-200 dark:border-white/5 mt-8 transition-colors">
        <div className="flex items-center gap-2 mb-6">
            <Award className="text-cyan-600 dark:text-cyan-500" size={24} />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors">
                {t.ach_title}
            </h2>
        </div>

        {/* --- Toolbar (Search & Filter) --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="text" 
                  placeholder={t.ach_search}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500/50 transition-colors shadow-sm dark:shadow-none"
                />
            </div>
            
            <div className="relative w-full md:w-48">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <select className="w-full bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none appearance-none cursor-pointer hover:bg-zinc-50 dark:hover:bg-[#202023] shadow-sm dark:shadow-none transition-colors">
                    <option>All Categories</option>
                    <option>Design</option>
                    <option>Code</option>
                </select>
            </div>
        </div>

        {/* --- Grid Certificates (Card Lebih Besar) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((cert) => (
               <CardSpotlight 
                  key={cert.id}
                  color="rgba(34, 211, 238, 0.1)"
                  // PADDING DIPERBESAR (p-6) agar lebih lega
                  className="group flex flex-col sm:flex-row gap-6 bg-white dark:bg-[#18181b] p-6 rounded-2xl border border-zinc-200 dark:border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-md dark:shadow-none items-start sm:items-center"
               >
                  {/* GAMBAR LEBIH BESAR (w-32 h-32 / 128px) */}
                  <div 
                    className="relative w-full sm:w-32 h-48 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 cursor-pointer"
                    onClick={() => setSelectedCert(cert)}
                  >
                      <Image 
                        src={cert.image} 
                        alt={cert.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      {/* Overlay Icon saat hover */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <Maximize2 className="text-white drop-shadow-md" size={20} />
                      </div>
                  </div>

                  <div className="flex flex-col justify-center flex-1 w-full relative z-10">
                      {/* FONT LEBIH BESAR */}
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                        {cert.issuer} • <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs">{cert.date}</span>
                      </p>
                      
                      {/* BUTTON BUKA POPUP (Bukan External Link lagi) */}
                      <button 
                          onClick={() => setSelectedCert(cert)}
                          className="flex w-fit items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
                      >
                          <Maximize2 size={12} /> View Full Page
                      </button>
                  </div>
               </CardSpotlight>
            ))}
        </div>
      </section>

      {/* --- POPUP MODAL (LIGHTBOX) --- */}
      <AnimatePresence>
        {selectedCert && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                // Z-Index Tinggi (9999) agar di atas segalanya
                className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
                onClick={() => setSelectedCert(null)}
            >
                {/* Tombol Close */}
                <button 
                    onClick={() => setSelectedCert(null)} 
                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 border border-white/10"
                >
                    <X size={24} />
                </button>

                {/* Konten Gambar Besar */}
                <motion.div 
                    initial={{ scale: 0.9, y: 20, opacity: 0 }} 
                    animate={{ scale: 1, y: 0, opacity: 1 }} 
                    exit={{ scale: 0.9, y: 20, opacity: 0 }} 
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-5xl h-full max-h-[85vh] flex flex-col items-center justify-center" 
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl bg-[#121212] border border-white/10">
                        <Image 
                            src={selectedCert.image} 
                            alt={selectedCert.title} 
                            fill 
                            className="object-contain" // Agar gambar tidak terpotong
                            priority 
                        />
                    </div>
                    
                    {/* Caption di Bawah Popup */}
                    <div className="mt-4 flex flex-col items-center text-center">
                        <h3 className="text-xl font-bold text-white">{selectedCert.title}</h3>
                        <p className="text-zinc-400 text-sm mt-1">{selectedCert.issuer} — {selectedCert.date}</p>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}