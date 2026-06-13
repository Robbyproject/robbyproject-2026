"use client";

import { ReactNode } from "react";
import Link from "next/link";

/** Strip chip tag (genres / skills / traits / features). */
export function TagChips({ tags, label }: { tags?: string[] | null; label?: string }) {
    if (!Array.isArray(tags) || tags.length === 0) return null;
    return (
        <div className="space-y-2">
            {label && (
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {label}
                </h3>
            )}
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

interface ActionButtonProps {
    href: string;
    children: ReactNode;
    icon?: ReactNode;
    /** "primary" = solid emerald, "secondary" = outline. */
    variant?: "primary" | "secondary";
    /** Buka di tab baru (untuk link eksternal). */
    external?: boolean;
    className?: string;
    /** Hentikan event bubbling (saat tombol berada di dalam card yang juga clickable). */
    stopPropagation?: boolean;
}

/** Tombol aksi di halaman detail (Order, Visit, Source, Demo). */
export function ActionButton({
    href,
    children,
    icon,
    variant = "primary",
    external = false,
    className = "",
    stopPropagation = false
}: ActionButtonProps) {
    const base =
        "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95";
    const styles =
        variant === "primary"
            ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
            : "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 bg-white dark:bg-zinc-900";

    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            onClick={(e) => stopPropagation && e.stopPropagation()}
            className={`${base} ${styles} ${className}`}
        >
            {icon}
            {children}
        </Link>
    );
}
