"use client";
import Sidebar from "@/components/layout/Sidebar";
import AnimeList from "@/components/sections/AnimeList";
import { useLanguage } from "@/components/providers/AppProviders"; 

export default function AnimePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <div className="flex w-full">
        <Sidebar />

        {/* Layout Responsive */}
        <main className="flex-1 w-full min-h-screen pt-20 lg:pt-0">
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
             
             {/* HEADER */}
             <div className="mb-8 border-b border-zinc-200 dark:border-white/5 pb-8 transition-colors">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors">
                    {t.anime_title}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    {t.anime_subtitle}
                </p>
             </div>

             {/* KOMPONEN LIST ANIME */}
             <AnimeList />

          </div>
        </main>
      </div>
    </div>
  );
}