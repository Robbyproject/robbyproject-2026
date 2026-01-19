"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import {
  MapPin, ArrowRight, Laptop, User, Trophy,
  MessageSquare, LayoutGrid, Zap, ShoppingBag,
  Gamepad2, LayoutDashboard, ArrowUpRight,
  BadgeCheck
} from "lucide-react";
import {
  SiNextdotjs, SiTailwindcss, SiReact, SiFigma,
  SiGithub, SiHtml5, SiJavascript, SiPhp, SiPython
} from "react-icons/si";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// --- GLOBAL CACHE VARIABLES (Added for Performance) ---
// Variable ini ditaruh di luar component agar datanya tidak hilang saat pindah halaman
let cachedBanner = null;
let cachedProjects = null;

// --- KOMPONEN BENTO CARD ---
const BentoCard = ({ children, className, href = "#" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111] p-8 hover:bg-[#161616] transition-all duration-500 ${className}`}
    >
      <Link href={href} className="absolute inset-0 z-30" aria-label="View Details" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`
          ),
        }}
      />
      <div className="relative z-20 h-full flex flex-col justify-between pointer-events-none">
        {children}
      </div>
      <ArrowUpRight size={18} className="absolute top-8 right-8 text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-30" />
    </motion.div>
  );
};

// --- KOMPONEN MAGNETIC ---
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    position.x.set((clientX - (left + width / 2)) * 0.3);
    position.y.set((clientY - (top + height / 2)) * 0.3);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => { position.x.set(0); position.y.set(0); }} style={{ x, y }} className="relative z-10">
      {children}
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, filter: "blur(5px)", y: 20 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const mySkills = [
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "JS", icon: SiJavascript, color: "#F7DF1E" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Github", icon: SiGithub, color: "#ffffff" },
];

const heroDescription = `I am a Graphic Designer and Front-End Developer skilled in creating visually appealing, clean, and functional digital interfaces. I work with Next.js, TypeScript, and Tailwind CSS to build responsive user experiences, combining creative design with technical precision. As a detail-oriented and collaborative individual, I am committed to delivering high-quality, modern, and user-friendly results.`;

export default function Home() {
  // LOGIKA CACHING:
  // 1. Cek apakah di variabel global (cachedBanner) sudah ada datanya?
  // Jika ada, pakai itu. Jika tidak, baru null.
  const [featuredContent, setFeaturedContent] = useState(cachedBanner);
  const [projects, setProjects] = useState(cachedProjects || []);

  // 2. Loading hanya true jika data BELUM ada di cache
  const [loading, setLoading] = useState(!cachedBanner);

  useEffect(() => {
    // 3. Jika data sudah ada di cache, stop di sini. Tidak perlu fetch ulang.
    if (cachedBanner && cachedProjects && cachedProjects.length > 0) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Banner
        const { data: bannerData } = await supabase
          .from("banners")
          .select("*")
          .eq("is_active", true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (bannerData) {
          setFeaturedContent(bannerData);
          cachedBanner = bannerData; // Simpan ke global variable
        }

        // Fetch Projects
        const { data: projectData } = await supabase
          .from("projects")
          .select("id, title, image_url")
          .order("id", { ascending: false })
          .limit(4);

        if (projectData) {
          setProjects(projectData);
          cachedProjects = projectData; // Simpan ke global variable
        }

      } catch (error) {
        console.error("Error loading data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col space-y-16 w-full">

        {/* --- HERO SECTION --- */}
        <motion.section variants={itemVariants} className="flex flex-col gap-6">
          <div className="flex justify-between items-start w-full">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-2">
                Hi, I'm Robby Fabian
                <BadgeCheck size={28} className="text-blue-500 fill-blue-500/20" />
              </h1>
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5"><MapPin size={14} /> Based in Jakarta, Indonesia 🇮🇩</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                <span className="flex items-center gap-1.5 text-green-500 font-medium animate-pulse">Onsite/Freelance</span>
              </div>
            </div>
          </div>

          <div className="max-w-3xl">
            <TextGenerateEffect
              words={heroDescription}
              className="text-zinc-400"
            />
          </div>

          <hr className="border-white/5 my-2" />

          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-zinc-500 font-mono text-sm">{"</>"}</span> Skills
              </h3>
              <p className="text-sm text-zinc-500">My professional skills.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {mySkills.map((skill, i) => (
                <Magnetic key={i}>
                  <div className="group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-[#151515] border border-white/5 hover:border-white/20 transition-all cursor-pointer">
                    <skill.icon size={24} style={{ color: skill.color }} className="filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                  </div>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- DYNAMIC BANNER SECTION --- */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap size={20} className="text-zinc-400" /> Featured Highlight
              </h3>
              <p className="text-sm text-zinc-500">Latest showcase and announcements.</p>
            </div>
          </div>

          {loading ? (
            // SKELETON
            <div className="w-full h-[380px] md:h-[420px] rounded-[2.5rem] bg-zinc-900 border border-white/10 relative overflow-hidden flex flex-col justify-end animate-pulse">
              <div className="p-12 space-y-4 w-full max-w-lg">
                <div className="h-6 w-24 bg-zinc-800 rounded-full" />
                <div className="h-10 w-full bg-zinc-800 rounded-lg" />
                <div className="h-4 w-2/3 bg-zinc-800 rounded" />
              </div>
            </div>
          ) : featuredContent && (
            <Link href="/contact" className="block group relative w-full h-[380px] md:h-[420px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">

              <Image
                src={featuredContent.image_url}
                alt={featuredContent.title || "Featured Banner"}
                fill
                priority={true}
                quality={85}
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

              <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 z-20">
                <div className="space-y-2 md:space-y-3 flex-1">
                  <span className="inline-block px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                    {featuredContent.tag}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-2xl">
                    {featuredContent.title}
                  </h2>
                  <p className="text-zinc-300 text-sm md:text-base max-w-xl line-clamp-2">
                    {featuredContent.description}
                  </p>
                </div>
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowRight size={24} className="md:w-7 md:h-7" />
                </div>
              </div>
            </Link>
          )}
        </motion.section>

        {/* --- BENTO GRID SECTION --- */}
        <motion.section variants={itemVariants} className="flex flex-col gap-6 !mt-20 pb-20">
          <div className="space-y-1">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <LayoutGrid size={20} className="text-zinc-500" /> Featured Sections
            </h2>
            <p className="text-sm text-zinc-500">Explore everything I've crafted and accomplished.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">

            {/* --- PROJECT SHOWCASE CARD --- */}
            <BentoCard href="/projects" className="md:col-span-2 relative group">
              <div className="flex flex-col h-full relative z-20">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-auto">
                  <Laptop size={20} className="text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Projects Showcase</h3>
                  <p className="text-sm text-zinc-500 max-w-xs">Real apps built to solve real problems.</p>
                </div>
              </div>

              {/* IMAGES GRID */}
              <div className="absolute top-4 -right-2 md:right-4 w-[60%] md:w-[45%] h-full flex flex-col justify-center pointer-events-none">
                <div className="grid grid-cols-2 gap-3 transform rotate-6 opacity-40 grayscale group-hover:grayscale-0 group-hover:rotate-0 group-hover:opacity-100 transition-all duration-500 ease-out origin-center">
                  {projects.length > 0 ? (
                    projects.map((proj, idx) => (
                      <div key={proj.id} className={`relative aspect-[4/3] rounded-lg overflow-hidden border border-white/20 bg-zinc-800 shadow-lg ${idx % 2 !== 0 ? 'translate-y-4' : ''}`}>
                        {proj.image_url ? (
                          <Image
                            src={proj.image_url}
                            alt={proj.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                            <Laptop size={12} className="text-white/20" />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    [1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-[4/3] rounded-lg bg-white/5 border border-white/5 animate-pulse" />
                    ))
                  )}
                </div>
              </div>
            </BentoCard>

            <BentoCard href="/about" className="md:row-span-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <User size={20} className="text-zinc-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">About Me</h3>
              <p className="text-sm text-zinc-500">The person behind the code.</p>

              <div className="mt-8 relative flex-1 w-full h-full rounded-2xl overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image
                  src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp"
                  alt="Robby Fabian"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </BentoCard>

            <BentoCard href="/store">
              <ShoppingBag size={20} className="text-zinc-400 mb-4" />
              <h3 className="font-bold text-white text-sm">Digital Store</h3>
              <p className="text-[10px] text-zinc-500">Premium assets & templates.</p>
            </BentoCard>

            <BentoCard href="/achievements">
              <Trophy size={20} className="text-zinc-400 mb-4" />
              <h3 className="font-bold text-white text-sm">Achievements</h3>
              <p className="text-[10px] text-zinc-500">Milestones & Certificates.</p>
            </BentoCard>

            <BentoCard href="/services" className="md:col-span-2 flex-row items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Zap size={24} className="text-zinc-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Professional Services</h3>
                <p className="text-sm text-zinc-500">Full-stack web & mobile solutions.</p>
              </div>
            </BentoCard>

            <BentoCard href="/dashboard">
              <LayoutDashboard size={20} className="text-zinc-400 mb-4" />
              <h3 className="font-bold text-white text-sm">Dashboard</h3>
              <p className="text-[10px] text-zinc-500">Personal analytics & stats.</p>
            </BentoCard>

            <BentoCard href="/anime" className="md:col-span-2 flex-row items-center gap-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Gamepad2 size={20} className="text-zinc-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Entertainment</h3>
                <p className="text-[10px] text-zinc-500">Anime & Waifu List</p>
              </div>
            </BentoCard>

            <BentoCard href="/contact">
              <MessageSquare size={20} className="text-zinc-400 mb-4" />
              <h3 className="font-bold text-white text-sm">Contact</h3>
              <p className="text-[10px] text-zinc-500">Let's start a conversation.</p>
            </BentoCard>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}