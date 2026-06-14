"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface ImageLightboxProps {
  image: string | null;
  onClose: () => void;
}

/**
 * Lightbox layar penuh untuk gambar detail (project, waifu, store, anime, achievement).
 *
 * Kenapa pakai portal ke <body>?
 * Komponen ini dipasang di dalam <motion.div> DetailShell yang punya `transform`
 * (animasi `y`). Dalam CSS, ancestor bert-transform jadi "containing block" untuk
 * elemen `position: fixed`, sehingga overlay malah menempel di kotak motion.div
 * (bukan viewport) → di mobile gambarnya tertutup & harus di-scroll dulu.
 * Dengan portal ke <body>, overlay selalu relatif viewport di semua perangkat.
 */
export default function ImageLightbox({ image, onClose }: ImageLightboxProps) {
    // Hindari hydration mismatch: portal hanya boleh dibuat di browser.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Kunci scroll background + dukung tombol ESC selama lightbox aktif.
    useEffect(() => {
        if (!image) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [image, onClose]);

    if (!image || !mounted) return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            // h-[100dvh] akomodasi toolbar browser mobile (lebih akurat dari 100vh);
            // inset-0 sebagai fallback untuk browser tanpa dukungan dvh.
            className="fixed inset-0 z-[1000] h-[100dvh] max-h-[100dvh] w-screen bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 cursor-zoom-out"
        >
            {/*
              Klik area blank → event bubble ke overlay → onClose.
              Klik DI ATAS gambar → stopPropagation di wrapper, tetap terbuka.

              Penting: wrapper TIDAK boleh w-full/h-full. Kalau full-size, ia
              menelan seluruh layar di mobile/tablet (max-w-6xl hanya cap di layar
              lebar) → hampir semua tap kena wrapper → stopPropagation → tidak bisa
              tutup. Makanya wrapper dibuat mengecil pas ke gambar (inline-flex),
              sehingga area gelap di sekeliling benar-benar milik overlay dan bisa
              ditepu di semua perangkat.
            */}
            <motion.div
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="relative inline-flex max-h-full max-w-full"
            >
                {/*
                  <img> natural-size (bukan next/image fill) supaya rasio asli
                  (portrait/landscape) terjaga & elemen mengecil pas ke konten —
                  bukan menutupi seluruh layar. Batas pakai viewport unit (bukan %)
                  agar tidak bergantung rantai tinggi parent.
                */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={image}
                    alt="Preview"
                    draggable={false}
                    className="block w-auto h-auto max-w-[94vw] max-h-[88dvh] select-none"
                />
            </motion.div>
        </motion.div>,
        document.body
    );
}
