"use client";

// Komponen Kecil untuk Kotak Abu-abu Berdenyut
function Skeleton({ className }) {
  return (
    <div className={`animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg ${className}`} />
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen font-sans bg-zinc-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="flex w-full">
        
        {/* --- 1. SIDEBAR SKELETON (Hanya muncul di Desktop) --- */}
        <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-72 flex-col border-r border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#0a0a0a] z-50 p-6">
            
            {/* Profile Area */}
            <div className="flex flex-col items-center mb-8 pt-4">
                <Skeleton className="w-24 h-24 rounded-full mb-4" /> {/* Foto */}
                <Skeleton className="w-32 h-6 mb-2" /> {/* Nama */}
                <Skeleton className="w-20 h-4" /> {/* Username */}
            </div>
            
            <div className="h-[1px] bg-zinc-200 dark:bg-white/5 w-full mb-6"></div>

            {/* Menu Items */}
            <div className="space-y-3 flex-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="w-full h-10" />
                ))}
            </div>
        </aside>

        {/* --- 2. MAIN CONTENT SKELETON --- */}
        <main className="flex-1 lg:pl-72 w-full min-h-screen flex flex-col pt-20 lg:pt-0">
          <div className="max-w-6xl mx-auto px-6 py-10 lg:py-14 w-full space-y-8">
             
             {/* Header Title Skeleton */}
             <div className="space-y-4">
                 <Skeleton className="w-1/2 md:w-1/3 h-10" /> {/* Title */}
                 <Skeleton className="w-1/3 md:w-1/4 h-6" />  {/* Subtitle */}
             </div>

             {/* Content Block Skeleton (Hero / Grid) */}
             <div className="w-full h-64 md:h-80 rounded-2xl bg-zinc-200 dark:bg-zinc-800/50 animate-pulse border border-zinc-200 dark:border-white/5 mt-8"></div>
             
             {/* Small Grid Skeleton */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-40 w-full rounded-xl" />
                ))}
             </div>

          </div>
        </main>

      </div>
    </div>
  );
}