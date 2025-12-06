"use client";
import Sidebar from "@/components/layout/Sidebar";
import Achievements from "@/components/sections/Achievements"; // Import komponen Achievements

export default function AchievementsPage() {
  return (
    <div className="min-h-screen font-sans">
      <div className="flex w-full">
        {/* Panggil Sidebar agar tetap muncul */}
        <Sidebar />

        <main className="flex-1 lg:pl-72 w-full min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
             {/* Header Halaman */}
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">My Journey</h1>
                <p className="text-zinc-400">Certificates, Awards, and Milestones.</p>
             </div>
             
             {/* Panggil Komponen Achievements */}
             <Achievements />
          </div>
        </main>
      </div>
    </div>
  );
}