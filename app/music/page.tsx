"use client";
import Sidebar from "@/components/layout/Sidebar";
import MusicRoom from "@/components/sections/MusicRoom"; // Import komponen MusicRoom

export default function MusicPage() {
  return (
    <div className="min-h-screen font-sans">
      <div className="flex w-full">
        <Sidebar />

        <main className="flex-1 lg:pl-72 w-full min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
             {/* Header Halaman */}
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Chill Zone</h1>
                <p className="text-zinc-400">Coding soundtrack and favorites playlist.</p>
             </div>

             {/* Panggil Komponen MusicRoom */}
             <MusicRoom />
          </div>
        </main>
      </div>
    </div>
  );
}