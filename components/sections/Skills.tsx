"use client";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";

// Import Icon dari react-icons
import {
  SiFigma,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiJavascript,
} from "react-icons/si";
import { FaPaintBrush, FaPen } from "react-icons/fa";

// Data Skills
interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

const skills: Skill[] = [
  { name: "Photoshop", icon: FaPaintBrush, color: "#31A8FF" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "Illustrator", icon: FaPen, color: "#FF9A00" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
];

// KITA DUPLIKASI ARRAY INI 4 KALI AGAR CUKUP PANJANG UNTUK LAYAR LEBAR
// Ini trik utama agar tidak ada bagian kosong (gap)
const duplicatedSkills: Skill[] = [...skills, ...skills, ...skills, ...skills];

export default function Skills() {
  return (
    <section className="py-6 bg-black/20 border-y border-white/5 overflow-hidden">
      <div className="flex overflow-hidden relative w-full mask-gradient px-4">
        <motion.div
            className="flex gap-10 min-w-max items-center"
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
            {duplicatedSkills.map((skill, index) => (
                <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer shrink-0">
                    <div className="relative transition-transform duration-300 transform group-hover:scale-110">
                       <skill.icon
                         className="text-2xl sm:text-3xl text-zinc-600 transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                         style={{ "--hover-color": skill.color } as React.CSSProperties}
                       />
                    </div>
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
