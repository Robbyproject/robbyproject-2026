"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/layout/LoadingScreen"; 
import InteractiveIntro from "@/components/features/InteractiveIntro"; // <-- IMPORT YANG BARU

export default function SystemLayout({ children }) {
  const [stage, setStage] = useState(null);

  useEffect(() => {
    // Cek Session: Kalau sudah pernah masuk (isVisited), langsung konten
    const isVisited = sessionStorage.getItem("isVisited");

    if (isVisited) {
      setStage("content");
    } else {
      // Kalau belum, mulai dari Loading -> Intro
      setStage("init");
    }
  }, []);

  // 1. Selesai Loading Alya -> Masuk Intro
  const handleInitComplete = () => {
    setStage("intro");
  };

  // 2. Klik Enter di Intro -> Masuk Konten
  const handleEnterSystem = () => {
    sessionStorage.setItem("isVisited", "true"); // Tandai sudah berkunjung
    setStage("content"); 
  };

  // Render Layar Hitam saat cek session
  if (stage === null) return <div className="fixed inset-0 bg-black z-[9999]" />;

  return (
    <>
      {/* TAHAP 1: LOADING SCREEN (Alya Glitch) */}
      <AnimatePresence>
        {stage === "init" && (
          <LoadingScreen onComplete={handleInitComplete} />
        )}
      </AnimatePresence>

      {/* TAHAP 2: INTERACTIVE INTRO (Ganti Lockscreen Lama) */}
      <AnimatePresence>
        {stage === "intro" && (
          <InteractiveIntro onEnter={handleEnterSystem} />
        )}
      </AnimatePresence>

      {/* TAHAP 3: KONTEN WEBSITE */}
      {stage === "content" && (
        <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}     
            transition={{ duration: 1, ease: "easeOut" }}               
            className="w-full h-full"
        >
            {children}
        </motion.div>
      )}
    </>
  );
}