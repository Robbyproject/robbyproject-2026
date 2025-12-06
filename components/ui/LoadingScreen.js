"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TextScramble } from "./TextEffects";

export default function LoadingScreen({ onComplete }) {
    const [text, setText] = useState("SYSTEM INITIALIZING...");

    useEffect(() => {
        const t1 = setTimeout(() => setText("少々お待ちください..."), 1500);
        const t2 = setTimeout(onComplete, 3500);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
        >
            <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 3, repeat: Infinity }} className="relative w-48 h-48 mb-8">
                <Image src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Alya-Load.png" alt="Loading..." fill unoptimized className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            </motion.div>
            <div className="w-64 flex flex-col items-center gap-4">
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-green-500" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3.5, ease: "linear" }} />
                </div>
                <h2 className="text-green-400 font-pixel text-sm tracking-widest text-center h-8">
                    <TextScramble text={text} />
                </h2>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
        </motion.div>
    );
};