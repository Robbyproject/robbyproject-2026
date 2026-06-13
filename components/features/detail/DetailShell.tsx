"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, FileQuestion } from "lucide-react";
import { useLanguage } from "@/components/providers/AppProviders";

interface DetailShellProps {
    /** Label seksi untuk breadcrumb (mis. "Store") */
    sectionLabel: string;
    /** Path kembali ke daftar (mis. "/store") */
    sectionHref: string;
    /** Judul item (nama/judul). Kosong saat loading. */
    title?: string;
    /** Sedang memuat data */
    loading?: boolean;
    /** Gagal memuat */
    error?: boolean;
    /** Item tidak ditemukan */
    notFound?: boolean;
    children: ReactNode;
}

export default function DetailShell({
    sectionLabel,
    sectionHref,
    title,
    loading,
    error,
    notFound,
    children
}: DetailShellProps) {
    const { t } = useLanguage();
    const backLabel = t?.detail_back || "Back";

    return (
        <div className="w-full max-w-[1600px] mx-auto min-h-screen pb-20 pt-4 space-y-8">
            {/* --- BACK + BREADCRUMB --- */}
            <div className="flex items-center gap-2 text-sm flex-wrap">
                <Link
                    href={sectionHref}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                >
                    <ArrowLeft size={14} />
                    <span className="font-medium">{backLabel}</span>
                </Link>
                <span className="text-zinc-300 dark:text-zinc-700">/</span>
                <Link href={sectionHref} className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 transition-colors">
                    {sectionLabel}
                </Link>
                <span className="text-zinc-300 dark:text-zinc-700">/</span>
                <span className="text-zinc-900 dark:text-white font-medium truncate max-w-[60vw]">
                    {title || (loading ? "Loading…" : "—")}
                </span>
            </div>

            {/* --- STATES --- */}
            {loading ? (
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="w-full aspect-[16/10] rounded-2xl bg-zinc-200 dark:bg-zinc-900 animate-pulse" />
                    <div className="space-y-4">
                        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-900 rounded animate-pulse" />
                        <div className="h-9 w-3/4 bg-zinc-200 dark:bg-zinc-900 rounded animate-pulse" />
                        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-900 rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-900 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-900 rounded animate-pulse" />
                        <div className="h-11 w-40 bg-zinc-200 dark:bg-zinc-900 rounded-xl animate-pulse mt-4" />
                    </div>
                </div>
            ) : error ? (
                <div className="py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center bg-zinc-50/50 dark:bg-zinc-900/20">
                    <AlertTriangle size={28} className="text-amber-500 mb-2" />
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        {t?.detail_error || "Failed to load details."}
                    </p>
                    <Link
                        href={sectionHref}
                        className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                        {t?.detail_back || "Back"}
                    </Link>
                </div>
            ) : notFound ? (
                <div className="py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center bg-zinc-50/50 dark:bg-zinc-900/20">
                    <FileQuestion size={28} className="text-zinc-400 mb-2" />
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        {t?.detail_notfound || "This item could not be found."}
                    </p>
                    <Link
                        href={sectionHref}
                        className="mt-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                        {t?.detail_back || "Back"}
                    </Link>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            )}
        </div>
    );
}
