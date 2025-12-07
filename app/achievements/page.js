"use client";
import Sidebar from "@/components/layout/Sidebar";
import Achievements from "@/components/sections/Achievements"; // Pastikan path benar
// Anda mungkin perlu import Achievements component disini
// Atau jika Achievements.js sudah berisi 1 halaman full, ganti isinya dengan layout sidebar.
// ASUMSI: File ini membungkus Component Achievements.js

export default function AchievementsPage() {
  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <div className="flex w-full">
        <Sidebar />

        {/* 👇 PERBAIKAN: pt-20 lg:pt-0 */}
        <main className="flex-1 w-full min-h-screen pt-20 lg:pt-0">
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
             
             {/* Komponen Achievements dipanggil disini */}
             <Achievements />

          </div>
        </main>
      </div>
    </div>
  );
}