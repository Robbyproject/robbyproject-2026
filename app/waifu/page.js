"use client";
import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useLanguage } from "@/components/providers/AppProviders";
import { motion } from "framer-motion";
import { Image as ImageIcon, Sparkles, Play } from "lucide-react"; // Heart dihapus dari sini

// --- KOMPONEN SMART VIDEO ---
const SmartVideo = ({ src }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile || !videoRef.current) return; 
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current.play().catch(() => {}); 
                    setIsPlaying(true);
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.6 } 
        );
        observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, [isMobile]);

    const handleMouseEnter = () => {
        if (!isMobile && videoRef.current) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play().catch(() => {});
                setIsPlaying(true);
            }
        }
    };

    return (
        <div className="relative w-full h-full cursor-pointer group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={togglePlay}>
            <video ref={videoRef} src={src} loop muted playsInline preload="metadata" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30 text-white shadow-lg backdrop-blur-sm">
                        <Play size={20} fill="currentColor" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default function WaifuPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-zinc-50 dark:bg-[#0a0a0a]">
      <div className="flex w-full">
        <Sidebar />

        <main className="flex-1 w-full min-h-screen pt-28 lg:pt-0">
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
             
             {/* HEADER TANPA ICON HEART */}
             <div className="mb-8 border-b border-zinc-200 dark:border-white/5 pb-8 transition-colors">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors">
                    {t.waifu_title}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">{t.waifu_subtitle}</p>
             </div>

             {/* KONTEN KARAKTER */}
             <div className="space-y-12">

                {/* --- CHARACTER 1: ALYA --- */}
                <div className="transition-colors">
                    <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start">
                        <div className="w-full md:w-1/2 lg:max-w-md rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black shadow-lg relative aspect-video shrink-0">
                            <SmartVideo src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Kujou.mp4" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                                <Sparkles size={12} /> {t.alya_role || "Anime"}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{t.alya_name}</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.alya_desc}</p>
                            <div className="flex gap-4 pt-2 border-t border-zinc-200 dark:border-white/5 mt-2">
                                <div><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.alya_job_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.alya_job_val}</span></div>
                                <div><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.alya_origin_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.alya_origin_val}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CHARACTER 2: CASTORICE --- */}
                <div className="transition-colors">
                    <div className="flex flex-col md:flex-row-reverse gap-5 md:gap-6 items-start">
                        <div className="w-full md:w-1/2 lg:max-w-md rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black shadow-lg relative aspect-video shrink-0">
                            <SmartVideo src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Castorice.mp4" />
                        </div>
                        <div className="flex-1 space-y-2 md:text-right">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                                <Sparkles size={12} /> {t.wife2_role}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{t.wife2_name}</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.wife2_desc}</p>
                            <div className="flex gap-4 pt-2 border-t border-zinc-200 dark:border-white/5 mt-2 justify-start md:justify-end">
                                <div className="text-left md:text-right"><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife2_job_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife2_job_val}</span></div>
                                <div className="text-left md:text-right"><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife2_origin_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife2_origin_val}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CHARACTER 3: SHOREKEEPER --- */}
                <div className="transition-colors">
                    <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start">
                        <div className="w-full md:w-1/2 lg:max-w-md rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black shadow-lg relative aspect-video shrink-0">
                            <SmartVideo src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Shore.mp4" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                                <Sparkles size={12} /> {t.wife3_role}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{t.wife3_name}</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.wife3_desc}</p>
                            <div className="flex gap-4 pt-2 border-t border-zinc-200 dark:border-white/5 mt-2">
                                <div><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife3_job_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife3_job_val}</span></div>
                                <div><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife3_origin_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife3_origin_val}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CHARACTER 4: CHISA --- */}
                <div className="transition-colors">
                    <div className="flex flex-col md:flex-row-reverse gap-5 md:gap-6 items-start">
                        <div className="w-full md:w-1/2 lg:max-w-md rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black shadow-lg relative aspect-video shrink-0">
                            <SmartVideo src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa2.mp4" />
                        </div>
                        <div className="flex-1 space-y-2 md:text-right">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                                <Sparkles size={12} /> {t.wife4_role}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{t.wife4_name}</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.wife4_desc}</p>
                            <div className="flex gap-4 pt-2 border-t border-zinc-200 dark:border-white/5 mt-2 justify-start md:justify-end">
                                <div className="text-left md:text-right"><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife4_job_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife4_job_val}</span></div>
                                <div className="text-left md:text-right"><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife4_origin_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife4_origin_val}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

             </div>
             

          </div>
        </main>
      </div>
    </div>
  );
}