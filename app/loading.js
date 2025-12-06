import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex w-full">
      
      {/* 1. SKELETON SIDEBAR (Kiri) */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-72 flex-col bg-[#0a0a0a] border-r border-white/5 z-50 p-6">
         {/* Profile */}
         <div className="flex flex-col items-center mt-6">
            <div className="w-24 h-24 bg-zinc-800 rounded-full animate-pulse mb-4"></div>
            <div className="w-32 h-6 bg-zinc-800 rounded animate-pulse mb-2"></div>
            <div className="w-20 h-4 bg-zinc-900 rounded animate-pulse"></div>
         </div>
         <div className="h-[1px] bg-white/5 w-full my-8"></div>
         {/* Nav Items */}
         <div className="space-y-4">
             {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="w-full h-10 bg-zinc-900 rounded-lg animate-pulse"></div>
             ))}
         </div>
      </aside>

      {/* 2. SKELETON MAIN CONTENT (Kanan) */}
      <main className="flex-1 lg:pl-72 w-full min-h-screen p-4 lg:p-10">
         <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
            
            {/* Header / Title Wireframe */}
            <div className="w-48 h-8 bg-zinc-800 rounded-lg"></div>
            <div className="w-96 h-4 bg-zinc-900 rounded"></div>

            {/* Content Wireframe (Kotak-kotak) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* Kotak Besar */}
                <div className="md:col-span-2 h-64 bg-zinc-900 rounded-2xl border border-white/5"></div>
                {/* Kotak Kecil */}
                <div className="h-64 bg-zinc-900 rounded-2xl border border-white/5"></div>
            </div>

            {/* List Wireframe */}
            <div className="space-y-4 mt-8">
                <div className="w-full h-20 bg-zinc-900 rounded-xl border border-white/5"></div>
                <div className="w-full h-20 bg-zinc-900 rounded-xl border border-white/5"></div>
                <div className="w-full h-20 bg-zinc-900 rounded-xl border border-white/5"></div>
            </div>

         </div>
      </main>
    </div>
  );
}