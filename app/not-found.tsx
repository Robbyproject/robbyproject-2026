"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] text-center px-4">
      
      {/* Animasi Angka 404 */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-9xl font-black text-zinc-200 dark:text-zinc-800"
      >
        404
      </motion.h1>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative -mt-12 z-10"
      >
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            Oops! Halaman Tidak Ditemukan
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md mx-auto">
            Sepertinya Anda tersesat di dimensi lain. Halaman yang Anda cari tidak ada atau sudah dipindahkan.
        </p>

        <div className="flex justify-center gap-4">
            <Link 
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform"
            >
                <Home size={18} /> Kembali ke Home
            </Link>
        </div>
      </motion.div>

    </div>
  );
}