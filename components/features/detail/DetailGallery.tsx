"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Maximize2, ImageIcon } from "lucide-react";
import ImageLightbox from "@/components/ui/ImageLightbox";

const isVideoUrl = (url?: string | null) =>
    !!url && /\.(mp4|webm|ogg|mov)$/i.test(url);

interface DetailGalleryProps {
    /** Gambar/media utama (image_url / cover_url). */
    mainImage?: string | null;
    /** Array URL galeri tambahan (kolom gallery). */
    gallery?: string[] | null;
    /** Alt text untuk a11y. */
    title?: string;
    /** Orientasi konten: menentukan tinggi hero. */
    variant?: "landscape" | "portrait";
}

/**
 * Galeri detail: hero (object-contain, full terlihat tanpa perlu zoom) +
 * strip thumbnail (jika ada gallery). Tinggi hero responsif & compact.
 * Memakai ulang <ImageLightbox> untuk tampilan layar penuh opsional.
 */
export default function DetailGallery({
    mainImage,
    gallery,
    title = "Detail",
    variant = "landscape"
}: DetailGalleryProps) {
    const [active, setActive] = useState<string | null>(null);

    // Gabungkan main + gallery, dedupe, buang kosong.
    const allMedia = useMemo(() => {
        const arr: string[] = [];
        if (mainImage) arr.push(mainImage);
        if (Array.isArray(gallery)) {
            gallery.forEach((g) => g && !arr.includes(g) && arr.push(g));
        }
        return arr;
    }, [mainImage, gallery]);

    // Tinggi responsif: compact di mobile, lebih besar di desktop.
    const heroHeight =
        variant === "portrait"
            ? "h-[280px] sm:h-[400px] lg:h-[500px]"
            : "h-[220px] sm:h-[300px] lg:h-[380px]";

    if (!allMedia.length) {
        return (
            <div className={`relative w-full ${heroHeight} rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-300 dark:text-zinc-700`}>
                <ImageIcon size={30} strokeWidth={1.5} />
            </div>
        );
    }

    const hero = allMedia[0];
    const heroIsVideo = isVideoUrl(hero);

    return (
        <div className="space-y-3">
            {/* HERO — object-contain supaya full terlihat */}
            <div className={`group relative w-full ${heroHeight} rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center`}>
                {heroIsVideo ? (
                    <video
                        src={hero}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="h-full w-full object-contain"
                    />
                ) : (
                    <>
                        <Image
                            src={hero}
                            alt={title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain"
                        />
                        <button
                            type="button"
                            onClick={() => setActive(hero)}
                            aria-label="Perbesar"
                            className="absolute bottom-2.5 right-2.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black/55 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                        >
                            <Maximize2 size={14} />
                        </button>
                    </>
                )}
            </div>

            {/* THUMBNAILS */}
            {allMedia.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {allMedia.map((media, i) => {
                        const vid = isVideoUrl(media);
                        return (
                            <button
                                key={i}
                                type="button"
                                onClick={() => (vid ? null : setActive(media))}
                                className={`relative aspect-square rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${vid ? "cursor-default" : "cursor-zoom-in hover:border-emerald-500/50 transition-colors"}`}
                            >
                                {vid ? (
                                    <video src={media} muted className="h-full w-full object-cover" />
                                ) : (
                                    <Image
                                        src={media}
                                        alt={`${title} ${i + 1}`}
                                        fill
                                        sizes="120px"
                                        className="object-cover"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            <AnimatePresence>
                {active && (
                    <ImageLightbox image={active} onClose={() => setActive(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}
