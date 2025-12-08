"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

const Typewriter = ({ text, delay = 0, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (hasCompleted) return;
    const timeout = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(timer);
          setHasCompleted(true);
          if (onComplete) onComplete();
        }
      }, 35); // Sedikit dipercepat (35ms)
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, onComplete, hasCompleted]);

  return <span>{displayedText}</span>;
};

export default function InteractiveIntro({ onEnter }) {
  const [step, setStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
        onEnter();
    }, 800); 
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className={`fixed inset-0 z-[10000] bg-black text-white font-mono overflow-hidden flex flex-col justify-center px-6 md:px-20 transition-all duration-700 ${isExiting ? "-translate-y-full opacity-0" : ""}`}
    >
      {/* BACKGROUND VIDEO (SAMA) */}
      <div className="absolute inset-0 z-0">
         <video 
            autoPlay loop muted playsInline
            className="w-full h-full object-cover scale-105 opacity-50"
         >
            <source src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Kujou.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      </div>

      {/* --- KONTEN UTAMA (LAYOUT FLEX AGAR TIDAK NABRAK) --- */}
      <div className="relative z-50 w-full max-w-4xl flex flex-col gap-4 md:gap-6">
        
        {/* BARIS 1: Status */}
        <div className="flex items-center gap-2 text-green-400 text-xs md:text-sm font-bold tracking-wider">
            <Terminal size={14} />
            <Typewriter text="> SYSTEM_READY..." delay={200} onComplete={() => setStep(2)} />
            {step < 3 && <span className="animate-pulse">_</span>}
        </div>

        {/* BARIS 2: Welcome (Ukuran Font Disesuaikan) */}
        {/* min-h dihapus, diganti div wrapper biar ngedorong ke bawah otomatis */}
        <div>
            {step >= 2 && (
                <div className="text-white/80 text-sm md:text-xl font-light leading-relaxed">
                    <Typewriter text="Welcome to the digital workspace of" delay={0} onComplete={() => setStep(3)} />
                </div>
            )}
        </div>

        {/* BARIS 3: NAMA BESAR */}
        <div>
            {step >= 3 && (
                <motion.h1 
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    // Ukuran font mobile diperkecil sedikit biar aman (text-4xl)
                    className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-none"
                >
                    ROBBY FABIAN
                    <span className="text-cyan-500 animate-pulse">.</span>
                </motion.h1>
            )}
        </div>

        {/* BARIS 4: SKILLS */}
        <div>
            {step >= 3 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] md:text-sm text-cyan-400/80 uppercase tracking-[0.15em]"
                >
                    <span>Fullstack Dev</span>
                    <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                    <span>Designer</span>
                    <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                    <span>Anime Enthusiast</span>
                </motion.div>
            )}
        </div>

        {/* TOMBOL ENTER */}
        <div className="pt-4"> {/* Tambah padding top biar ada jarak */}
            {step >= 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <button
                        onClick={handleEnter}
                        className="group relative px-6 py-3 md:px-8 md:py-4 bg-white hover:bg-cyan-400 text-black transition-all duration-300 ease-out font-bold uppercase tracking-widest text-xs md:text-base flex items-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10">Enter System</span>
                        <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 h-full w-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
                    </button>
                </motion.div>
            )}
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 md:left-20 text-[9px] md:text-[10px] text-white/30 tracking-widest uppercase z-50">
          v2.5.0 // Secure Connection Established
      </div>

    </motion.div>
  );
}