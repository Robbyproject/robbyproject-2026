"use client";
import Image from "next/image";
import { Search, Filter, ArrowUpRight, Disc } from "lucide-react";
import { useLanguage } from "@/components/providers/AppProviders"; // Import

const playlists = [
  { 
    id: 1, title: "Nekon Dester", subtitle: "UI/UX Design Essentials", date: "October 2023", status: "Open",
    bg: "bg-gradient-to-r from-red-500 via-red-400 to-red-300 dark:from-red-900 dark:via-red-800 dark:to-red-600",
    image: "/hero-bg.gif" 
  },
  { 
    id: 2, title: "Betien Ccinuts", subtitle: "Frontend Vibes", date: "October 2023", status: "Open",
    bg: "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 dark:from-blue-900 dark:via-blue-800 dark:to-blue-600",
    image: "/hero-bg.gif"
  },
];

export default function MusicRoom() {
  const { t } = useLanguage(); // Hooks

  return (
    <section id="music-room" className="py-8 mt-8 border-t border-zinc-200 dark:border-white/5 transition-colors">
      
      {/* --- HEADER --- */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors">{t.music_title}</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">{t.music_subtitle}</p>
      </div>

      {/* --- CONTROLS --- */}
      <div className="space-y-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="text" 
                    placeholder={t.music_search} // Translated
                    className="w-full bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-300 dark:focus:border-white/20 transition-colors shadow-sm dark:shadow-none"
                  />
              </div>
              <div className="relative">
                  <select className="w-full bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm text-zinc-600 dark:text-zinc-400 focus:outline-none shadow-sm dark:shadow-none cursor-pointer">
                      <option>{t.music_filter}</option>
                  </select>
                  <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              </div>
          </div>
      </div>

      {/* --- CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((item) => (
              <div key={item.id} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden group hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-sm dark:shadow-none">
                  <div className={`relative h-28 w-full ${item.bg} p-4 flex items-start justify-between`}>
                      <div className="absolute inset-0 opacity-30 bg-[url('/hero-bg.gif')] bg-cover mix-blend-overlay"></div>
                      <div className="relative z-10 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full border-2 border-white/40 overflow-hidden bg-black/10">
                               <Image src="/p.jfif" alt="avatar" width={40} height={40} />
                          </div>
                          <div>
                              <h4 className="text-white font-bold text-lg leading-none drop-shadow-md">{item.title}</h4>
                              <p className="text-white/80 text-[10px] font-mono mt-1">Lofi 2024</p>
                          </div>
                      </div>
                      <span className="relative z-10 bg-white/20 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {item.status}
                      </span>
                  </div>

                  <div className="p-4">
                      <h4 className="text-zinc-800 dark:text-white font-medium mb-1 transition-colors">{item.subtitle}</h4>
                      <div className="flex items-center justify-between mt-4 text-zinc-500 dark:text-zinc-500 text-xs">
                          <span>Issued on</span>
                          <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:bg-zinc-100 dark:group-hover:bg-white/10 transition-colors">
                              <Disc size={14} />
                          </div>
                      </div>
                      <p className="text-zinc-400 text-xs mt-1">{item.date}</p>
                  </div>
              </div>
          ))}
      </div>
    </section>
  );
}