"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

export default function ImageLightbox({ image, onClose }) {
    if (!image) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-red-500 transition bg-black/50 p-2 rounded-full border border-white/20 z-50">
                <X size={32} />
            </button>

            <motion.div
                initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                className="relative w-full max-w-6xl h-[60vh] md:h-[85vh] rounded-lg overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={image}
                    alt="Preview"
                    fill
                    className="object-contain"
                    sizes="100vw"
                />
            </motion.div>
        </motion.div>
    );
};