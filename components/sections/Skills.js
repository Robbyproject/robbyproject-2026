"use client";
import { motion } from "framer-motion";

// Import Icon dari react-icons
import { 
  SiAdobephotoshop, 
  SiFigma, 
  SiNextdotjs, 
  SiReact, 
  SiTailwindcss, 
  SiAdobeillustrator,
  SiJavascript,
} from "react-icons/si";

// Data Skills
const skills = [
  { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
];

// KITA DUPLIKASI ARRAY INI 4 KALI AGAR CUKUP PANJANG UNTUK LAYAR LEBAR
// Ini trik utama agar tidak ada bagian kosong (gap)
const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

// ... imports sama

export default function Skills() {
  return (
    <section className="py-6 bg-black/20 border-y border-white/5 overflow-hidden"> {/* Padding dikurangi */}
      <div className="flex overflow-hidden relative w-full mask-gradient px-4">
        <motion.div 
            className="flex gap-10 min-w-max items-center" // Gap dikurangi jadi 10
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
            {duplicatedSkills.map((skill, index) => (
                <div key={index} className="flex flex-col items-center gap-2 group cursor-pointer shrink-0">
                    <div className="relative transition-transform duration-300 transform group-hover:scale-110">
                       {/* Ukuran icon jadi text-3xl (sekitar 30px) */}
                       <skill.icon 
                         className="text-3xl text-zinc-600 transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                         style={{ "--hover-color": skill.color }}
                       />
                    </div>
                </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}