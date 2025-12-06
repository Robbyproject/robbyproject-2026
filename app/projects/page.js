"use client";
import Sidebar from "@/components/layout/Sidebar";
import Gallery from "@/components/sections/Gallery";
import { useLanguage } from "@/components/providers/AppProviders"; // Import

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <div className="flex w-full">
        <Sidebar />

        <main className="flex-1 lg:pl-72 w-full min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
             
             {/* --- PAGE HEADER --- */}
             <div className="mb-8 border-b border-zinc-200 dark:border-white/5 pb-8 transition-colors">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors">
                    {t.proj_title}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    {t.proj_subtitle}
                </p>
             </div>

             <Gallery />

            

          </div>
        </main>
      </div>
    </div>
  );
}