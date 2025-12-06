"use client";
import { useState } from "react";
import Image from "next/image";
import { initialGallery } from "@/data"; 
import CardSpotlight from "@/components/ui/CardSpotlight"; 
import { AnimatePresence, motion } from "framer-motion"; 
import { X, Eye } from "lucide-react"; 
import { useLanguage } from "@/components/providers/AppProviders"; // Import
import { 
  SiAdobephotoshop, SiHtml5, SiCss3, SiJavascript, SiPhp, SiMysql, 
  SiReact, SiNextdotjs, SiTailwindcss, SiAdobeillustrator 
} from "react-icons/si";

// (techIcons definition sama seperti sebelumnya...)
const techIcons = { /* ... kode sama ... */ 
  "Photoshop": { icon: SiAdobephotoshop, color: "#31A8FF" },
  "Illustrator": { icon: SiAdobeillustrator, color: "#FF9A00" },
  "HTML": { icon: SiHtml5, color: "#E34F26" },
  "CSS": { icon: SiCss3, color: "#1572B6" },
  "Javascript": { icon: SiJavascript, color: "#F7DF1E" },
  "PHP": { icon: SiPhp, color: "#777BB4" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "React": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  "Tailwind": { icon: SiTailwindcss, color: "#38B2AC" },
};

export default function Gallery() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { t } = useLanguage(); // Panggil Hooks

  return (
    <>
      <section id="galeri" className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialGallery.map((item) => (
            <CardSpotlight 
              key={item.id} 
              color="rgba(34, 211, 238, 0.15)" 
              className="group bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/5 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 flex flex-col"
            >
              <div 
                className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
                onClick={() => setSelectedProject(item)}
              >
                  <Image 
                    src={item.image} alt={item.title} fill 
                    className="object-cover group-hover:scale-105 transition duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* --- BUTTON TRANSLATED --- */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold text-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl hover:scale-105">
                          <Eye size={16} /> {t.btn_view_project} {/* <-- Translate */}
                      </button>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20 pointer-events-none">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">{item.category}</span>
                  </div>
              </div>
              
              <div className="p-5 relative z-20 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                      {item.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-auto pt-4 border-t border-zinc-100 dark:border-white/5">
                      <div className="flex items-center gap-2">
                          {item.tech && item.tech.map((techName, index) => {
                              const TechInfo = techIcons[techName];
                              if (TechInfo) {
                                  return (
                                      <div key={index} className="relative group/icon cursor-help">
                                          <TechInfo.icon size={16} className="text-zinc-400 dark:text-zinc-500 hover:text-[var(--icon-color)] transition-colors" style={{ "--icon-color": TechInfo.color }} />
                                      </div>
                                  );
                              }
                              return null;
                          })}
                      </div>
                  </div>
              </div>
            </CardSpotlight>
          ))}
        </div>
      </section>

      {/* Popup Lightbox (Kode sama seperti sebelumnya...) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 border border-white/10"><X size={20} /></button>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full h-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-contain" priority />
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl">
                    <span className="text-white font-medium text-xs">{selectedProject.title}</span>
                    <div className="w-[1px] h-3 bg-white/20"></div>
                    <span className="text-zinc-400 text-[10px] uppercase tracking-wider">{selectedProject.category}</span>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}