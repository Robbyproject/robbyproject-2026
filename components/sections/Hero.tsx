"use client";

import { useRef, useEffect, useState, useMemo, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import {
  MapPin, ArrowRight, User,
  LayoutGrid, ArrowUpRight,
  BadgeCheck, Sparkles, Code2, BarChart3,
  Store, Award, Mail,
  Eye, Star, Trophy, Heart, Clapperboard,
  Hand, Briefcase, Users2, Send
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiNextdotjs, SiTailwindcss, SiReact, SiFigma,
  SiGithub, SiHtml5, SiJavascript, SiPhp, SiPython
} from "react-icons/si";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useLanguage } from "@/components/providers/AppProviders";

// --- TYPES ---
interface BannerData {
  image_url: string;
  title?: string;
  tag?: string;
  description?: string;
}

interface ProjectData {
  id: number;
  title: string;
  image_url: string | null;
}

interface ProductData {
  id: number;
  name: string;
  image_url: string | null;
  price: number;
}

interface AchievementData {
  id: number;
  title: string;
  image_url: string | null;
}

interface AnimeData {
  id: number;
  title: string;
  cover_url: string | null;
  rating: number;
}

interface WaifuData {
  id: number;
  name: string;
  image_url: string | null;
}

interface SkillItem {
  name: string;
  icon: IconType;
}

// --- GLOBAL CACHE ---
let cachedBanner: BannerData | null = null;
let cachedProjects: ProjectData[] | null = null;
let cachedProducts: ProductData[] | null = null;
let cachedAchievements: AchievementData[] | null = null;
let cachedAnime: AnimeData[] | null = null;
let cachedWaifu: WaifuData[] | null = null;
let cachedVisitCount: number | null = null;

// --- BENTO CARD ---
interface BentoCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

const BentoCard = ({ children, className, href = "#" }: BentoCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#111] p-7 hover:bg-zinc-50 dark:hover:bg-[#161616] transition-all duration-500 hover:border-emerald-500/20 ${className}`}
    >
      <Link href={href} className="absolute inset-0 z-30" aria-label="View Details" />

      {/* Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(16,185,129,0.07), transparent 40%)`
          ),
        }}
      />

      {/* Shine Sweep */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl z-10 overflow-hidden">
        <div className="shine-sweep-hero" />
      </div>

      <div className="relative z-20 h-full flex flex-col justify-between pointer-events-none">
        {children}
      </div>

      <ArrowUpRight size={16} className="absolute top-7 right-7 text-zinc-400 dark:text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-30" />
    </motion.div>
  );
};

// --- MAGNETIC ---
interface MagneticProps {
  children: ReactNode;
}

const Magnetic = ({ children }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
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

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, filter: "blur(5px)", y: 20 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const mySkills: SkillItem[] = [
  { name: "HTML", icon: SiHtml5 },
  { name: "JS", icon: SiJavascript },
  { name: "PHP", icon: SiPhp },
  { name: "Python", icon: SiPython },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Figma", icon: SiFigma },
  { name: "Github", icon: SiGithub },
];

// --- SERVICE ITEMS ---
const serviceItems = [
  { icon: "🎨", key: "hero_services_graphic" as const },
  { icon: "💻", key: "hero_services_web" as const },
  { icon: "📐", key: "hero_services_uiux" as const },
];

export default function Home() {
  const { t } = useLanguage();
  const [featuredContent, setFeaturedContent] = useState<BannerData | null>(cachedBanner || null);
  const [projects, setProjects] = useState<ProjectData[]>(cachedProjects || []);
  const [products, setProducts] = useState<ProductData[]>(cachedProducts || []);
  const [achievements, setAchievements] = useState<AchievementData[]>(cachedAchievements || []);
  const [animeList, setAnimeList] = useState<AnimeData[]>(cachedAnime || []);
  const [waifuList, setWaifuList] = useState<WaifuData[]>(cachedWaifu || []);
  const [visitCount, setVisitCount] = useState<number>(cachedVisitCount || 0);

  useEffect(() => {
    if (cachedBanner && cachedProjects?.length && cachedProducts?.length) return;

    const fetchData = async () => {
      try {
        const [bannerRes, projectRes, productRes, achieveRes, animeRes, waifuRes, visitRes] = await Promise.all([
          supabase.from("banners").select("*").eq("is_active", true).order('created_at', { ascending: false }).limit(1).single(),
          supabase.from("projects").select("id, title, image_url").order("id", { ascending: false }).limit(4),
          supabase.from("products").select("id, name, image_url, price").order("created_at", { ascending: false }).limit(3),
          supabase.from("achievements").select("id, title, image_url").order("id", { ascending: false }).limit(3),
          supabase.from("anime_list").select("id, title, cover_url, rating").order("id", { ascending: false }).limit(8),
          supabase.from("waifu_list").select("id, name, image_url").order("id", { ascending: false }).limit(8),
          supabase.from("app_visits").select("id", { head: true, count: "exact" }),
        ]);

        if (bannerRes.data) { setFeaturedContent(bannerRes.data as BannerData); cachedBanner = bannerRes.data as BannerData; }
        if (projectRes.data) { setProjects(projectRes.data as ProjectData[]); cachedProjects = projectRes.data as ProjectData[]; }
        if (productRes.data) { setProducts(productRes.data as ProductData[]); cachedProducts = productRes.data as ProductData[]; }
        if (achieveRes.data) { setAchievements(achieveRes.data as AchievementData[]); cachedAchievements = achieveRes.data as AchievementData[]; }
        if (animeRes.data) { setAnimeList(animeRes.data as AnimeData[]); cachedAnime = animeRes.data as AnimeData[]; }
        if (waifuRes.data) { setWaifuList(waifuRes.data as WaifuData[]); cachedWaifu = waifuRes.data as WaifuData[]; }
        if (visitRes.count !== null) { setVisitCount(visitRes.count); cachedVisitCount = visitRes.count; }

      } catch (error: any) {
        console.error("Error loading data:", error?.message);
      }
    };

    fetchData();
  }, []);

  const dashStats = useMemo(() => [
    { label: "Views", value: visitCount, icon: Eye },
    { label: "Projects", value: projects.length, icon: Code2 },
    { label: "Products", value: products.length, icon: Store },
  ], [visitCount, projects.length, products.length]);

  return (
    <div className="w-full">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col space-y-16 w-full">

        {/* ═══ HERO SECTION ═══ */}
        <motion.section variants={itemVariants} className="flex flex-col gap-6">
          <div className="flex justify-between items-start w-full">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
                Hi, I&apos;m Robby Fabian
                <BadgeCheck size={28} className="text-emerald-500 fill-emerald-500/20" />
              </h1>
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5"><MapPin size={14} /> {t.hero_based}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium animate-pulse">{t.hero_remote}</span>
              </div>
            </div>
          </div>

          <div className="max-w-3xl">
            <TextGenerateEffect words={t.hero_desc} className="text-zinc-400" />
          </div>

          <hr className="border-zinc-200 dark:border-white/5 my-2" />

          {/* Skills */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-sm">{"</>"}</span> {t.hero_skills_label}
              </h3>
              <p className="text-sm text-zinc-500">{t.hero_skills_sub}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {mySkills.map((skill, i) => (
                <Magnetic key={i}>
                  <div className="group/skill relative flex flex-col items-center gap-1.5 cursor-pointer">
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-[#151515] border border-zinc-200 dark:border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300">
                      <skill.icon size={24} className="text-zinc-900 dark:text-white transition-all duration-300 group-hover/skill:scale-110" />
                    </div>
                    <span className="text-[9px] text-zinc-500 dark:text-zinc-600 group-hover/skill:text-zinc-600 dark:group-hover/skill:text-zinc-400 transition-colors">{skill.name}</span>
                  </div>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══ FEATURED BANNER ═══ */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <Sparkles size={20} className="text-emerald-500" /> {t.hero_featured_highlight}
              </h3>
              <p className="text-sm text-zinc-500">{t.hero_featured_sub}</p>
            </div>
          </div>

          {!featuredContent ? (
            <div className="w-full h-[380px] md:h-[420px] rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 relative overflow-hidden flex flex-col justify-end animate-pulse">
              <div className="p-12 space-y-4 w-full max-w-lg">
                <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
          ) : (
            <Link href="/contact" className="block group relative w-full h-[380px] md:h-[420px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl shadow-emerald-500/5 bg-zinc-100 dark:bg-zinc-900">
              <Image src={featuredContent.image_url} alt={featuredContent.title || "Featured Banner"} fill priority quality={85} sizes="(max-width: 768px) 100vw, 100vw" className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 md:gap-6 z-20">
                <div className="space-y-1.5 sm:space-y-2 md:space-y-3 flex-1">
                  <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{featuredContent.tag}</span>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight max-w-2xl">{featuredContent.title}</h2>
                  <p className="text-zinc-300 text-xs sm:text-sm md:text-base max-w-xl line-clamp-2">{featuredContent.description}</p>
                </div>
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <ArrowRight size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
              </div>
            </Link>
          )}
        </motion.section>

        {/* ═══ BENTO GRID SECTION ═══ */}
        <motion.section variants={itemVariants} className="flex flex-col gap-6 !mt-20 pb-20">
          <div className="space-y-1">
            <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
              <LayoutGrid size={20} className="text-emerald-500" /> {t.hero_sections_title}
            </h2>
            <p className="text-sm text-zinc-500">{t.hero_sections_sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px] sm:auto-rows-[200px]">

            {/* ── PROJECTS (col-span-2, grayscale → color) ── */}
            <BentoCard href="/projects" className="md:col-span-2 relative group">
              <div className="flex flex-col h-full relative z-20">
                <div className="flex items-center gap-2.5 mb-auto">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Code2 size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-400 transition-colors duration-300">{t.hero_projects_title}</h3>
                    <p className="text-[11px] text-zinc-500">{projects.length} {t.hero_projects_built}</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 max-w-[160px] sm:max-w-[200px]">{t.hero_projects_desc}</p>
              </div>

              <div className="absolute top-3 -right-1 md:right-3 w-[65%] md:w-[50%] h-full flex flex-col justify-center pointer-events-none">
                <div className="grid grid-cols-2 gap-2.5 transform rotate-3 opacity-50 grayscale group-hover:rotate-0 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 ease-out origin-center">
                  {projects.length > 0 ? (
                    projects.map((proj, idx) => (
                      <div key={proj.id} className={`relative aspect-[4/3] rounded-lg overflow-hidden border border-zinc-200 dark:border-white/15 bg-zinc-200 dark:bg-zinc-800 shadow-lg group-hover:border-emerald-500/20 transition-all duration-500 ${idx % 2 !== 0 ? 'translate-y-3' : ''}`}>
                        {proj.image_url ? (
                          <Image src={proj.image_url} alt={proj.title} fill className="object-cover" sizes="200px" />
                        ) : (
                          <div className="w-full h-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center">
                            <Code2 size={12} className="text-zinc-400/40 dark:text-white/20" />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    [1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-[4/3] rounded-lg bg-zinc-100 dark:bg-white/05 border border-zinc-200 dark:border-white/5 animate-pulse" />
                    ))
                  )}
                </div>
              </div>
            </BentoCard>

            {/* ── ABOUT (row-span-2, grayscale → color) ── */}
            <BentoCard href="/about" className="md:row-span-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <User size={20} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-emerald-400 transition-colors duration-300">{t.hero_about_title}</h3>
              <p className="text-sm text-zinc-500">{t.hero_about_desc}</p>

              <div className="mt-6 relative flex-1 w-full h-full rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 group-hover:border-emerald-500/20 grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image
                  src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp"
                  alt="Robby Fabian" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </BentoCard>

            {/* ── STORE (credits roll) ── */}
            <BentoCard href="/store">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Store size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-emerald-400 transition-colors duration-300">{t.hero_store_title}</h3>
                  <p className="text-[10px] text-zinc-500">{products.length > 0 ? `${products.length}+ ${t.hero_store_assets}` : t.hero_store_premium}</p>
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative mt-1 h-full">
                <div className="credits-fade-mask pointer-events-none absolute inset-0 z-10" />
                <div className="credits-scroll-store">
                  {[...products, ...products].map((prod, i) => (
                    <div key={i} className="py-1.5 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 shrink-0">
                        {prod.image_url ? (
                          <Image src={prod.image_url} alt={prod.name} width={28} height={28} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Store size={10} className="text-zinc-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 truncate">{prod.name}</p>
                        <p className="text-[9px] text-emerald-400 font-medium">{prod.price === 0 ? 'FREE' : `Rp ${prod.price.toLocaleString('id-ID')}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* ── ACHIEVEMENTS (grayscale → color) ── */}
            <BentoCard href="/achievements">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Award size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-emerald-400 transition-colors duration-300">{t.hero_ach_title}</h3>
                  <p className="text-[10px] text-zinc-500">{achievements.length > 0 ? `${achievements.length} {t.hero_ach_certs}` : '{t.hero_ach_milestones}'}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-auto items-end grayscale group-hover:grayscale-0 transition-all duration-500">
                {achievements.length > 0 ? (
                  achievements.map((ach, idx) => (
                    <div key={ach.id} className={`relative flex-1 aspect-[4/3] rounded-lg overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-200 dark:bg-zinc-800 group-hover:border-emerald-500/20 transition-all duration-500 ${idx === 1 ? 'translate-y-2 group-hover:translate-y-0' : ''}`}>
                      {ach.image_url ? (
                        <Image src={ach.image_url} alt={ach.title} fill className="object-cover" quality={90} sizes="(max-width: 768px) 30vw, 150px" />
                      ) : (
                        <div className="w-full h-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center">
                          <Trophy size={12} className="text-emerald-500/40" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  [1, 2, 3].map((i) => (
                    <div key={i} className="flex-1 aspect-[4/3] rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 animate-pulse" />
                  ))
                )}
              </div>
            </BentoCard>

            {/* ── SERVICES (col-span-2, credits roll) ── */}
            <BentoCard href="/services" className="md:col-span-2">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex-1">
                  <h3 className="font-bold text-zinc-900 dark:text-white text-base group-hover:text-emerald-400 transition-colors duration-300">{t.hero_services_title}</h3>
                  <p className="text-[11px] text-zinc-500">{t.hero_services_desc}</p>
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative mt-1 h-full">
                {/* Fade masks */}
                <div className="credits-fade-mask pointer-events-none absolute inset-0 z-10" />

                {/* Scrolling credits — duplicated for seamless loop, positioned right */}
                <div className="credits-scroll absolute top-0 right-8">
                  {[...serviceItems, ...serviceItems].map((svc, i) => (
                    <div key={i} className="credits-line py-2 flex flex-col items-end">
                      <span className="text-lg font-bold text-zinc-700 dark:text-zinc-300 tracking-wide group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-500">{t[svc.key]}</span>
                      <span className="text-[9px] text-zinc-400 dark:text-zinc-600 mt-0.5 font-mono tracking-[0.2em] uppercase">━━━ ✦ ━━━</span>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* ── DASHBOARD ── */}
            <BentoCard href="/dashboard">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <BarChart3 size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-emerald-400 transition-colors duration-300">{t.hero_dashboard_title}</h3>
                  <p className="text-[10px] text-zinc-500">{t.hero_dashboard_sub}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-auto">
                {dashStats.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 group-hover:border-emerald-500/15 transition-all duration-500">
                    <stat.icon size={12} className="text-zinc-500 group-hover:text-emerald-400 transition-colors duration-500" />
                    <span className="text-sm font-bold text-zinc-900 dark:text-white tabular-nums">{stat.value}</span>
                    <span className="text-[8px] text-zinc-600">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-end gap-[3px] mt-3 h-6">
                {[40, 65, 30, 80, 55, 70, 45, 90, 35, 60].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-zinc-300 dark:bg-white/10 group-hover:bg-emerald-500/30 transition-all duration-500"
                    style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }}
                  />
                ))}
              </div>
            </BentoCard>

            {/* ── ANIME LIST (credits roll) ── */}
            <BentoCard href="/anime">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Clapperboard size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-emerald-400 transition-colors duration-300">{t.hero_anime_title}</h3>
                  <p className="text-[10px] text-zinc-500">{animeList.length} {t.hero_anime_watched}</p>
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative mt-1 h-full">
                <div className="credits-fade-mask pointer-events-none absolute inset-0 z-10" />
                <div className="credits-scroll-anime">
                  {[...animeList, ...animeList].map((anime, i) => (
                    <div key={i} className="py-1.5 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 shrink-0">
                        {anime.cover_url ? (
                          <Image src={anime.cover_url} alt={anime.title} width={28} height={28} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Clapperboard size={10} className="text-zinc-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 truncate">{anime.title}</p>
                        <p className="flex items-center gap-0.5 text-[9px] text-amber-400">
                          <Star size={8} fill="currentColor" /> {anime.rating}/10
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* ── WAIFU LIST (credits roll) ── */}
            <BentoCard href="/waifu">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Heart size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-emerald-400 transition-colors duration-300">{t.hero_waifu_title}</h3>
                  <p className="text-[10px] text-zinc-500">{waifuList.length} {t.hero_waifu_favorites}</p>
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative mt-1 h-full">
                <div className="credits-fade-mask pointer-events-none absolute inset-0 z-10" />
                <div className="credits-scroll-waifu">
                  {[...waifuList, ...waifuList].map((waifu, i) => (
                    <div key={i} className="py-1.5 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 shrink-0">
                        {waifu.image_url ? (
                          <Image src={waifu.image_url} alt={waifu.name} width={28} height={28} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Heart size={10} className="text-zinc-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 truncate">{waifu.name}</p>
                        <p className="text-[9px] text-pink-400/70">{t.hero_waifu_favchar}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* ── CONTACT (credits roll) ── */}
            <BentoCard href="/contact">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Mail size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-emerald-400 transition-colors duration-300">{t.hero_contact_title}</h3>
                  <p className="text-[10px] text-zinc-500">{t.hero_contact_sub}</p>
                </div>
              </div>

              <div className="flex-1 overflow-hidden relative mt-1 h-full">
                <div className="credits-fade-mask pointer-events-none absolute inset-0 z-10" />
                {(() => {
                  const contactItems = [
                    { Icon: Hand, title: t.hero_contact_hello, desc: t.hero_contact_hello_desc },
                    { Icon: Briefcase, title: t.hero_contact_inquiry, desc: t.hero_contact_inquiry_desc },
                    { Icon: Users2, title: t.hero_contact_collab, desc: t.hero_contact_collab_desc },
                    { Icon: Send, title: t.hero_contact_email, desc: t.hero_contact_email_desc },
                  ];
                  return (
                    <div className="credits-scroll-contact">
                      {[...contactItems, ...contactItems].map((item, i) => (
                        <div key={i} className="py-1.5 flex items-center gap-2.5">
                          <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                            <item.Icon size={14} className="text-emerald-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 truncate">{item.title}</p>
                            <p className="text-[9px] text-zinc-500">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </BentoCard>

          </div>
        </motion.section>
      </motion.div>

      {/* ── CSS ── */}
      <style jsx global>{`
        .shine-sweep-hero {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255, 255, 255, 0.03) 45%,
            rgba(16, 185, 129, 0.05) 50%,
            rgba(255, 255, 255, 0.03) 55%,
            transparent 70%
          );
          transform: skewX(-15deg);
          transition: none;
          pointer-events: none;
        }

        .group:hover .shine-sweep-hero {
          animation: shine-hero 0.8s ease-out forwards;
        }

        @keyframes shine-hero {
          0% { left: -100%; }
          100% { left: 150%; }
        }

        /* Credits roll animation */
        @keyframes credits-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        .credits-scroll {
          animation: credits-scroll 12s linear infinite;
        }

        .credits-scroll-store {
          animation: credits-scroll 14s linear infinite;
        }

        .credits-scroll-anime {
          animation: credits-scroll 20s linear infinite;
        }

        .credits-scroll-waifu {
          animation: credits-scroll 16s linear infinite;
        }

        .credits-scroll-contact {
          animation: credits-scroll 10s linear infinite;
        }

        .group:hover .credits-scroll,
        .group:hover .credits-scroll-store,
        .group:hover .credits-scroll-anime,
        .group:hover .credits-scroll-waifu,
        .group:hover .credits-scroll-contact {
          animation-play-state: paused;
        }

        .credits-fade-mask {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
          background: transparent;
        }
      `}</style>
    </div>
  );
}
