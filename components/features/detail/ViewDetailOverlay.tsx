"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/AppProviders";

/**
 * Overlay hover pada card daftar: menampilkan petunjuk "Lihat Detail".
 * Tampil saat parent `.group` di-hover. Bilingual via useLanguage().
 * Letakkan di dalam container `relative` di dalam elemen `.group`.
 */
export default function ViewDetailOverlay() {
    const { t } = useLanguage();
    const label = t?.detail_view || "View Details";

    return (
        <div className="absolute inset-0 z-[15] flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-white text-xs font-bold shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {label}
                <ArrowUpRight size={14} />
            </span>
        </div>
    );
}
