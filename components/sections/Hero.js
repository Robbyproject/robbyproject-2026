"use client";
import { motion } from "framer-motion";
import { MapPin, Image as ImageIcon, Sparkles } from "lucide-react"; 
import { useLanguage } from "@/components/providers/AppProviders";
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiReact, SiFigma, 
  SiAdobephotoshop, SiGithub, SiVercel, SiNetlify, 
  SiHtml5, SiJavascript, SiPhp, SiMysql, SiPython
} from "react-icons/si";

const mySkills = [
    { name: "HTML", icon: SiHtml5, color: "#E34F26" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "Next.js", icon: SiNextdotjs, color: "#888888" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
    { name: "Github", icon: SiGithub, color: "#888888" },
    { name: "Vercel", icon: SiVercel, color: "#888888" },
    { name: "Netlify", icon: SiNetlify, color: "#00C7B7" }, 
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="pt-6 pb-10 border-b border-zinc-200 dark:border-white/5 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* --- HEADER --- */}
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors">
                {t.hero_greeting} Robby Fabian
            </h1>
            <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-sm transition-colors">
                <span className="flex items-center gap-1">
                    <MapPin size={14} /> {t.hero_based} 🇮🇩
                </span>
                <span className="w-1 h-1 bg-zinc-400 dark:bg-zinc-600 rounded-full"></span>
                <span>{t.hero_remote}</span>
            </div>
        </div>

        {/* --- DESCRIPTION --- */}
        <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px] max-w-3xl transition-colors">
            <p>{t.hero_desc}</p>
        </div>

        {/* --- SKILLS --- */}
        <div className="pt-2">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-white flex items-center gap-2 mb-4 transition-colors">
                <span className="text-zinc-500 font-mono">{"</>"}</span> {t.hero_skills}
            </h3>
            <div className="flex flex-wrap gap-3">
                {mySkills.map((skill, index) => (
                    <div 
                        key={index}
                        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-zinc-100 dark:bg-[#1e1e1e] border border-zinc-200 dark:border-white/5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg z-10 hover:z-50"
                        style={{ "--hover-color": skill.color }}
                    >
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[var(--hover-color)] transition-colors duration-300 opacity-50"></div>
                        <skill.icon size={24} className="text-zinc-500 dark:text-zinc-400 transition-colors duration-300 group-hover:text-[var(--hover-color)] z-10" />
                        <span className="hidden md:block absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl z-[9999]">
                            {skill.name}
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 rotate-45"></span>
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* ========================================================= */}
        {/* --- CHARACTER 1: ALYA (Video Kiri, Teks Kanan) --- */}
        {/* ========================================================= */}
         <div className="pt-8 border-t border-zinc-200 dark:border-white/5 transition-colors">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-white flex items-center gap-2 mb-6 transition-colors">
                 <ImageIcon size={16} className="text-cyan-500" /> {t.hero_video}
            </h3>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="w-full md:w-1/2 lg:max-w-md rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black shadow-lg relative aspect-video shrink-0 group">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        <source src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Kujou.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="flex-1 space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Sparkles size={12} /> {t.alya_role || "Anime"}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{t.alya_name}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.alya_desc}</p>
                    <div className="flex gap-6 pt-3 border-t border-zinc-200 dark:border-white/5 mt-2">
                        <div><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.alya_job_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.alya_job_val}</span></div>
                        <div><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.alya_origin_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.alya_origin_val}</span></div>
                    </div>
                </div>
            </div>
         </div>

        {/* ========================================================= */}
        {/* --- CHARACTER 2: CASTORICE (Video Kanan, Teks Kiri) --- */}
        {/* ========================================================= */}
        <div className="h-[1px] w-full bg-zinc-200 dark:bg-white/5 my-8"></div>
        <div className="transition-colors">
            <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 items-start">
                <div className="w-full md:w-1/2 lg:max-w-md rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black shadow-lg relative aspect-video shrink-0 group">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        {/* 👇 Pastikan URL Video Castorice benar */}
                        <source src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Castorice.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="flex-1 space-y-3 md:text-right">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Sparkles size={12} /> {t.wife2_role}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{t.wife2_name}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.wife2_desc}</p>
                    <div className="flex gap-6 pt-3 border-t border-zinc-200 dark:border-white/5 mt-2 justify-start md:justify-end">
                        <div className="text-left md:text-right"><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife2_job_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife2_job_val}</span></div>
                        <div className="text-left md:text-right"><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife2_origin_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife2_origin_val}</span></div>
                    </div>
                </div>
            </div>
         </div>

        {/* ========================================================= */}
        {/* --- CHARACTER 3: SHOREKEEPER (Video Kiri, Teks Kanan) --- */}
        {/* ========================================================= */}
        <div className="h-[1px] w-full bg-zinc-200 dark:bg-white/5 my-8"></div>
        <div className="transition-colors">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="w-full md:w-1/2 lg:max-w-md rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black shadow-lg relative aspect-video shrink-0 group">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        {/* 👇 Pastikan URL Video Shorekeeper benar */}
                        <source src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Shore.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="flex-1 space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Sparkles size={12} /> {t.wife3_role}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{t.wife3_name}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.wife3_desc}</p>
                    <div className="flex gap-6 pt-3 border-t border-zinc-200 dark:border-white/5 mt-2">
                        <div><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife3_job_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife3_job_val}</span></div>
                        <div><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife3_origin_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife3_origin_val}</span></div>
                    </div>
                </div>
            </div>
         </div>

        {/* ========================================================= */}
        {/* --- CHARACTER 4: CHISA (Video Kanan, Teks Kiri) --- */}
        {/* ========================================================= */}
        <div className="h-[1px] w-full bg-zinc-200 dark:bg-white/5 my-8"></div>
        <div className="transition-colors">
            <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 items-start">
                <div className="w-full md:w-1/2 lg:max-w-md rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black shadow-lg relative aspect-video shrink-0 group">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                        {/* 👇 Pastikan URL Video Chisa benar */}
                        <source src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa-Me.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="flex-1 space-y-3 md:text-right">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Sparkles size={12} /> {t.wife4_role}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">{t.wife4_name}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.wife4_desc}</p>
                    <div className="flex gap-6 pt-3 border-t border-zinc-200 dark:border-white/5 mt-2 justify-start md:justify-end">
                        <div className="text-left md:text-right"><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife4_job_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife4_job_val}</span></div>
                        <div className="text-left md:text-right"><span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">{t.wife4_origin_label}</span><span className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">{t.wife4_origin_val}</span></div>
                    </div>
                </div>
            </div>
         </div>

      </motion.div>
    </section>
  );
}