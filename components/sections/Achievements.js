"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Filter, ExternalLink, Award } from "lucide-react";
import CardSpotlight from "@/components/ui/CardSpotlight";
import { useLanguage } from "@/components/providers/AppProviders"; // Import

const certificates = [
  { id: 1, title: "SQL Basic", issuer: "HackerRank", date: "Nov 2025", image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/sql_basic%20certificate.webp", category: "Code" },
  { id: 2, title: "SQL Intermediate", issuer: "HackerRank", date: "Nov 2025", image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/sql_intermediate%20certificate.webp", category: "Code" },
  { id: 3, title: "Python Basic", issuer: "HackerRank", date: "Nov 2025", image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/python_basic%20certificate.webp", category: "Code" },
];

export default function Achievements() {
  const [query, setQuery] = useState("");
  const filtered = certificates.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));
  const { t } = useLanguage(); // Panggil t

  return (
    <section id="achievements" className="py-8 border-t border-zinc-200 dark:border-white/5 mt-8 transition-colors">
      <div className="flex items-center gap-2 mb-6">
          <Award className="text-cyan-600 dark:text-cyan-500" size={24} />
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors">
              {t.ach_title}
          </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder={t.ach_search} // <-- Translated
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((cert, idx) => (
             <CardSpotlight 
                key={cert.id}
                color="rgba(34, 211, 238, 0.1)"
                className="group flex gap-4 bg-white dark:bg-[#18181b] p-4 rounded-2xl border border-zinc-200 dark:border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-sm dark:shadow-none"
             >
                <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image src={cert.image} alt={cert.title} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex flex-col justify-center flex-1 relative z-10">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{cert.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{cert.issuer} • {cert.date}</p>
                    
                    <button className="mt-2 flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                        {t.btn_view_cred} <ExternalLink size={10} /> {/* <-- Translated */}
                    </button>
                </div>
             </CardSpotlight>
          ))}
      </div>
    </section>
  );
}