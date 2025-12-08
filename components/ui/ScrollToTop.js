"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          // Posisi diatur agar tidak menutupi tombol Chatbot atau konten penting
          className="fixed bottom-24 right-5 lg:bottom-10 lg:right-10 z-[40] p-3 bg-zinc-900/80 dark:bg-white/90 backdrop-blur-md text-white dark:text-black rounded-full shadow-lg border border-white/10 hover:scale-110 transition-transform"
        >
          <ArrowUp size={20} strokeWidth={3} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}