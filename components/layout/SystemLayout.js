"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react"; // Ikon untuk tombol back to top
import LoadingScreen from "@/components/layout/LoadingScreen";
import FrozenRoute from "@/components/layout/FrozenRoute";
import Sidebar from "@/components/layout/Sidebar";

function DashboardLayout({ children }) {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // 1. Progress Bar Logic
  const { scrollYProgress } = useScroll({
    container: containerRef
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 2. AUTO SCROLL TO TOP saat ganti halaman (PENTING untuk UX)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  // 3. Logic Tombol Back to Top (Custom untuk container ini)
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setShowScrollBtn(containerRef.current.scrollTop > 300);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex w-full h-screen bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden">

      {/* Sidebar (Fixed kiri) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col h-full min-w-0 bg-zinc-50 dark:bg-[#0a0a0a] lg:ml-64 transition-all duration-300 ease-in-out">

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          className="flex-1 h-full overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth relative"
        >
          {/* Progress Bar Sticky */}
          <motion.div
            className="sticky top-0 left-0 right-0 h-[3px] bg-cyan-500 z-[50] origin-left shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            style={{ scaleX }}
          />

          <main className="flex-1 w-full min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                className="w-full"
                initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <FrozenRoute>
                  {children}
                </FrozenRoute>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* INTERNAL SCROLL TO TOP BUTTON */}
          <AnimatePresence>
            {showScrollBtn && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-[100] p-3 rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-colors"
              >
                <ArrowUp size={20} />
              </motion.button>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}

export default function SystemLayout({ children }) {
  const [stage, setStage] = useState(null);

  useEffect(() => {
    // Cek sessionStorage untuk loading screen
    const isVisited = sessionStorage.getItem("isVisited");
    setStage(isVisited ? "content" : "init");
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

  // Render konten jika sudah pernah visit atau loading selesai
  if (stage === "content") {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  // Fallback hitam saat state belum ter-set (mencegah flash)
  return <div className="fixed inset-0 bg-[#0a0a0a] z-[9999]" />;
}