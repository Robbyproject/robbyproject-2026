"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// Pastikan path ini benar mengarah ke file TextEffects.js kamu
import { TextScramble } from "@/components/ui/TextEffects"; 

export default function LoadingScreen({ onComplete }) {
    const [text, setText] = useState("SYSTEM INITIALIZING...");

    useEffect(() => {
        // Ganti teks jadi Jepang/Lainnya setelah 1.5 detik
        const t1 = setTimeout(() => setText("ACCESS GRANTED..."), 1500);
        // Selesai loading setelah 3.5 detik
        const t2 = setTimeout(onComplete, 3500);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-mono"
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
        >
            {/* Gambar Alya Floating */}
            <motion.div 
                animate={{ y: [-15, 15, -15] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                className="relative w-48 h-48 mb-8"
            >
                <Image 
                    src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Alya-Load.png" 
                    alt="Loading..." 
                    fill 
                    unoptimized 
                    className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                />
            </motion.div>

            {/* Progress Bar & Text */}
            <div className="w-64 flex flex-col items-center gap-4">
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden border border-white/10">
                    <motion.div 
                        className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]" 
                        initial={{ width: "0%" }} 
                        animate={{ width: "100%" }} 
                        transition={{ duration: 3.5, ease: "linear" }} 
                    />
                </div>
                <h2 className="text-green-400 font-bold text-sm tracking-widest text-center h-8 uppercase">
                    <TextScramble text={text} />
                </h2>
            </div>

            {/* Overlay Garis CRT */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-40"></div>
        </motion.div>
    );
};