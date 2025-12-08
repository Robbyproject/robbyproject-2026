"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; 
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"; // Tambah useScroll & useSpring
import LoadingScreen from "@/components/layout/LoadingScreen"; 

export default function SystemLayout({ children }) {
  const pathname = usePathname();
  const [stage, setStage] = useState(null);

  // --- LOGIC SCROLL PROGRESS ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const isVisited = sessionStorage.getItem("isVisited");
    if (isVisited) {
      setStage("content");
    } else {
      setStage("init");
    }
  }, []);

  const handleInitComplete = () => {
    sessionStorage.setItem("isVisited", "true");
    setStage("content");
  };

  if (stage === null) return <div className="fixed inset-0 bg-black z-[9999]" />;

  return (
    <>
      <AnimatePresence>
        {stage === "init" && (
          <LoadingScreen onComplete={handleInitComplete} />
        )}
      </AnimatePresence>

      {stage === "content" && (
        <div className="w-full h-full bg-zinc-50 dark:bg-[#0a0a0a]">
            
            {/* 👇 PROGRESS BAR DI PALING ATAS */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[9999] origin-left"
                style={{ scaleX }}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}     
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}               
                    className="w-full min-h-screen"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
      )}
    </>
  );
}