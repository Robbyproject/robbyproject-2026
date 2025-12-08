"use client";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Download } from "lucide-react"; // Import ikon
import Link from "next/link"; // Import Link
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
    <section id="hero" className="pt-2 pb-10 lg:pt-10 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        // Gunakan flex-col dengan gap yang konsisten daripada space-y
        className="flex flex-col gap-6 lg:gap-8" 
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
        <div className="space-y-3 text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px] max-w-3xl transition-colors">
            <p>{t.hero_desc}</p>
        </div>

        {/* --- CALL TO ACTION (CTA) BARU --- */}
        <div className="flex flex-wrap gap-4 pt-2">
            <Link 
                href="/projects" 
                className="px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg"
            >
                {t.btn_view_project || "View Projects"} <ArrowRight size={16} />
            </Link>
            
            <Link 
                href="/about" 
                className="px-6 py-3 rounded-full border border-zinc-300 dark:border-white/20 bg-transparent text-zinc-900 dark:text-white font-bold text-sm flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-white/10 transition-all active:scale-95"
            >
                {t.btn_resume || "Resume"} <Download size={16} />
            </Link>
        </div>

        {/* --- SKILLS --- */}
        <div className="pt-4 border-t border-zinc-200 dark:border-white/5 mt-4">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-white flex items-center gap-2 mb-3 transition-colors">
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

      </motion.div>
    </section>
  );
}