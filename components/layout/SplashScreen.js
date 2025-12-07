"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Logo tampil selama 2 detik, lalu hilang
    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-zinc-800 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
                <Image 
                    // Ganti dengan URL Logo Anda
                    src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp" 
                    alt="Logo" 
                    fill 
                    className="object-cover"
                    priority
                />
            </motion.div>
            
            {/* Loading Bar Kecil */}
            <motion.div 
                className="absolute bottom-10 w-32 h-1 bg-zinc-800 rounded-full overflow-hidden"
            >
                <motion.div 
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                />
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}