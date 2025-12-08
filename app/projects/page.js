"use client";
import Sidebar from "@/components/layout/Sidebar";
import { useLanguage } from "@/components/providers/AppProviders";
import { motion } from "framer-motion";
// Pastikan icon di-import
import { Briefcase, ExternalLink } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";

// 👇 INI DATA YANG HILANG TADI. JANGAN DIHAPUS.
const projects = [
  {
    id: 1,
    title: "Paris Saint Germain Poster",
    category: "Graphic Design",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design1.webp",
    desc: "PSG Poster Design for matchday visualization.",
    tools: ["Photoshop"],
    link: "#"
  },
  {
    id: 2,
    title: "Liverpool FC Poster",
    category: "Graphic Design",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design2.webp",
    desc: "Liverpool FC matchday visualization.",
    tools: ["Photoshop"],
    link: "#"
  },
  {
    id: 3,
    title: "Kylian Mbappe Poster",
    category: "Graphic Design",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design3.webp",
    desc: "Kylian Mbappe Poster Design for matchday visualization.",
    tools: ["Photoshop"],
    link: "#"
  },
  {
    id: 4,
    title: "Huo Huo Poster",
    category: "Graphic Design",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design4.webp",
    desc: "Honkai Star Rail Fan Poster Design.",
    tools: ["Photoshop"],
    link: "#"
  },
  {
    id: 5,
    title: "Acheron Poster",
    category: "Graphic Design",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design5.webp",
    desc: "Honkai Star Rail Fan Poster Design.",
    tools: ["Photoshop"],
    link: "#"
  },
  {
    id: 6,
    title: "Shorekeeper Poster",
    category: "Graphic Design",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/design6.webp",
    desc: "Wuthering Waves Fan Poster Design.",
    tools: ["Photoshop"],
    link: "#"
  },
  {
    id: 7,
    title: "Open Donate Poster",
    category: "Graphic Design",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Poster-Donasi.jpg",
    desc: "Poster For Organitazion Social Media.",
    tools: ["Photoshop"],
    link: "#"
  },
  {
    id: 8,
    title: "Pray For Sumatera Poster",
    category: "Graphic Design",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Sumatera.jpg",
    desc: "Poster For Organitazion Social Media.",
    tools: ["Photoshop"],
    link: "#"
  },
  {
    id: 9,
    title: "Alexandrina Poster",
    category: "Graphic Design",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Rani.jpg",
    desc: "Zenless Zone Zero Fan Poster Design.",
    tools: ["Photoshop"],
    link: "#"
  },
  {
    id: 10,
    title: "The Witcher Poster",
    category: "Graphic Design",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Witcher.jpg",
    desc: "The Witcher 3 Fan Poster Design.",
    tools: ["Photoshop"],
    link: "#"
  },
  {
    id: 11,
    title: "Gallery Football Website",
    category: "Website Development",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/project1.webp",
    desc: "Website to showcase football galleries.",
    tools: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/Robbyproject/Gallery-Foto-Football"
  },
  {
    id: 12,
    title: "Restaurant Website",
    category: "Website Development",
    image: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/project2.webp",
    desc: "Website for a local restaurant to display menu and take orders.",
    tools: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/Robbyproject/Kasir_Resto"
  },
  // Tambahkan project lain di sini...
];

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex w-full min-h-screen font-sans bg-zinc-50 dark:bg-[#0a0a0a]">
      <Sidebar />

      <main className="flex-1 w-full pt-24 lg:pt-0 lg:pl-0 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-8 lg:px-12 lg:py-16">
            
            {/* HEADER */}
            <div className="mb-10 border-b border-zinc-200 dark:border-white/5 pb-8 transition-colors">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
                  <Briefcase className="text-cyan-500" /> {t.proj_title}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400">
                  {t.proj_subtitle}
              </p>
            </div>

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Di sini kode memanggil variabel 'projects' yang ada di atas */}
              {projects.map((project, index) => (
                  <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white dark:bg-[#18181b] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-sm hover:shadow-xl flex flex-col"
                  >
                      {/* Gambar */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                          <Image 
                              src={project.image} 
                              alt={project.title} 
                              fill 
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                              <Link href={project.link} className="px-4 py-2 bg-white text-black rounded-full text-xs font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                                  View Detail <ExternalLink size={12} />
                              </Link>
                          </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                              <span className="px-2 py-1 bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold uppercase tracking-wider rounded-md">
                                  {project.category}
                              </span>
                          </div>
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-cyan-500 transition-colors">
                              {project.title}
                          </h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4 flex-1">
                              {project.desc}
                          </p>
                          <div className="flex gap-2 pt-4 border-t border-zinc-100 dark:border-white/5">
                              {project.tools.map((tool, i) => (
                                  <span key={i} className="text-xs text-zinc-400 font-mono bg-zinc-50 dark:bg-zinc-900 px-2 py-1 rounded">
                                      {tool}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </motion.div>
              ))}
            </div>
            
        </div>
      </main>
    </div>
  );
}