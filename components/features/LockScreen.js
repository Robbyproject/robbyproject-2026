"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, User, Key, Unlock } from "lucide-react";
import Image from "next/image";

export default function LockScreen({ onUnlock }) {
  const [showLogin, setShowLogin] = useState(false);
  const [time, setTime] = useState(new Date());
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString = time.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username.trim() !== "" && credentials.password.trim() !== "") {
      setIsUnlocking(true);
      setTimeout(() => {
        onUnlock(); 
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      {!isUnlocking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[10000] bg-black text-white font-sans overflow-hidden select-none"
          onClick={() => !showLogin && setShowLogin(true)}
        >
          {/* --- BACKGROUND VIDEO --- */}
          <div className="absolute inset-0 z-0">
             <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover scale-105"
             >
                <source src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Action.mp4 " type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          </div>

          {/* --- CONTAINER UTAMA --- */}
          <div className="relative z-10 w-full h-full">
            
            {/* 1. TAMPILAN JAM (Layout: Tengah & Agak Atas) */}
            <AnimatePresence>
              {!showLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  // 👇 PERUBAHAN POSISI DISINI (Top 15% & Center)
                  className="absolute top-[15%] w-full flex flex-col items-center text-center px-4"
                >
                  <div className="flex items-center gap-2 text-cyan-400 mb-4 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 animate-pulse">
                      <Lock size={14} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">System Locked</span>
                  </div>

                  {/* Font Jam Besar */}
                  <h1 className="text-[6rem] md:text-[9rem] font-black leading-none tracking-tighter font-mono text-white drop-shadow-2xl">
                    {timeString}
                  </h1>
                  
                  {/* Tanggal */}
                  <p className="text-lg md:text-2xl font-light text-white/90 mt-2 tracking-wide">
                    {dateString}
                  </p>
                  
                  {/* Hint Text */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute top-[80vh] text-xs text-white/50 tracking-[0.3em] uppercase animate-bounce"
                  >
                    Click to unlock
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. FORM LOGIN (Center Screen) */}
            <AnimatePresence>
              {showLogin && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      onClick={(e) => e.stopPropagation()} 
                      className="w-[320px]"
                    >
                      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl ring-1 ring-white/5">
                        
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-lg mb-4 relative group">
                                <Image 
                                    src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp" 
                                    alt="User" fill className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                            </div>
                            <h3 className="text-white font-bold text-lg">Robby Fabian</h3>
                            <p className="text-white/40 text-xs">Administrator</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-cyan-400" size={16} />
                            <input 
                              type="text" 
                              placeholder="Username" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-cyan-500/50 transition-all text-center"
                              value={credentials.username}
                              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                              autoFocus
                            />
                          </div>
                          
                          <div className="relative group">
                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-cyan-400" size={16} />
                            <input 
                              type="password" 
                              placeholder="Password" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-cyan-500/50 transition-all text-center"
                              value={credentials.password}
                              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            />
                          </div>

                          <button 
                            type="submit"
                            disabled={!credentials.username || !credentials.password}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl mt-2 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-900/20"
                          >
                            {isUnlocking ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>Unlock <Unlock size={16} /></>
                            )}
                          </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button 
                                onClick={(e) => { e.stopPropagation(); setShowLogin(false); }}
                                className="text-xs text-white/30 hover:text-white transition-colors"
                            >
                                BACK TO LOCK SCREEN
                            </button>
                        </div>
                      </div>
                    </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}