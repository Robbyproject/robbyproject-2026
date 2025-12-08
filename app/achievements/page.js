"use client";
import Sidebar from "@/components/layout/Sidebar";
import { useLanguage } from "@/components/providers/AppProviders"; // Import Bahasa
import { motion } from "framer-motion";
import { Trophy, Award, Search } from "lucide-react";
import Image from "next/image";

// 👇 DATA ACHIEVEMENTS
const certificates = [
  {
    id: 1,
    title: "SQL Basic",
    issuer: "HackerRank",
    date: "Nov 2025",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/sql_basic%20certificate.webp", 
    link: "#"
  },
  {
    id: 2,
    title: "SQL Intermediate",
    issuer: "HackerRank",
    date: "Nov 2025",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/sql_intermediate%20certificate.webp",
    link: "#"
  },
  {
    id: 3,
    title: "Python Basic",
    issuer: "HackerRank",
    date: "Nov 2025",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/python_basic%20certificate.webp", 
    link: "#"
  },
];

export default function AchievementsPage() {
  const { t } = useLanguage(); 

  return (
    <div className="flex w-full min-h-screen font-sans bg-zinc-50 dark:bg-[#0a0a0a]">
      <Sidebar />

      {/* 👇 PERBAIKAN: pt-24 & px-6 */}
      <main className="flex-1 w-full pt-24 lg:pt-0 lg:pl-0 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-8 lg:px-12 lg:py-16">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-zinc-200 dark:border-white/5 pb-8">
              <div>
                  <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
                      <Trophy className="text-yellow-500" /> {t?.ach_title || "Achievements"}
                  </h1>
                  <p className="text-zinc-500 dark:text-zinc-400">My professional certifications & awards.</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <input 
                      type="text" 
                      placeholder="Search..." 
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                  />
              </div>
            </div>

            {/* GRID LAYOUT (Pengganti Achievements Component) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                  <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-[#18181b] rounded-2xl p-4 border border-zinc-200 dark:border-white/5 hover:border-yellow-500/50 transition-all group shadow-sm hover:shadow-lg"
                  >
                      {/* Gambar Sertifikat */}
                      <div className="relative w-full aspect-[4/3] bg-zinc-100 dark:bg-black rounded-xl overflow-hidden mb-4 border border-zinc-100 dark:border-white/5">
                          <Image 
                              src={cert.image} 
                              alt={cert.title} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold border border-white/20 shadow-sm flex items-center gap-1">
                              <Award size={12} className="text-yellow-500" /> {cert.issuer}
                          </div>
                      </div>

                      {/* Info */}
                      <div>
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight mb-1 group-hover:text-yellow-500 transition-colors">
                              {cert.title}
                          </h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                              Issued: {cert.date}
                          </p>
                      </div>
                  </motion.div>
              ))}
            </div>

        </div>
      </main>
    </div>
  );
}