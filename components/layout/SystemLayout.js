"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import LoadingScreen from "@/components/layout/LoadingScreen";
import FrozenRoute from "@/components/layout/FrozenRoute";
import Sidebar from "@/components/layout/Sidebar";

function DashboardLayout({ children }) {
  const pathname = usePathname();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex w-full h-screen bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* AREA KANAN */}
      {/* lg:ml-64 tetap diperlukan untuk memberi ruang sidebar */}
      <div className="flex-1 relative flex flex-col h-full min-w-0 bg-zinc-50 dark:bg-[#0a0a0a] lg:ml-64 transition-all duration-300 ease-in-out">

        <div
          ref={containerRef}
          className="flex-1 h-full overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth"
        >
          <div className="flex flex-col min-h-full">

            <motion.div
              className="sticky top-0 left-0 right-0 h-[2px] bg-cyan-500 z-[50] origin-left shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              style={{ scaleX }}
            />

            {/* --- PERBAIKAN DISINI --- */}
            {/* 1. Hapus 'max-w-7xl mx-auto' -> Agar konten tidak terjepit di tengah.
                       2. Hapus 'p-4 md:p-8' -> Agar tidak ada double padding.
                       3. Gunakan 'w-full' saja.
                       
                       Alasannya: Dari screenshot Image 3, komponen di dalam {children} 
                       sudah punya padding sendiri (pt-24 px-6, dst). 
                    */}
            <main className="flex-1 w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  className="w-full" // Pastikan div animasi juga full width
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <FrozenRoute>
                    {children}
                  </FrozenRoute>
                </motion.div>
              </AnimatePresence>
            </main>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function SystemLayout({ children }) {
  const [stage, setStage] = useState(null);

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

  if (stage === "init") {
    return (
      <AnimatePresence>
        <LoadingScreen onComplete={handleInitComplete} />
      </AnimatePresence>
    );
  }

  if (stage === "content") {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return <div className="fixed inset-0 bg-black z-[9999]" />;
}