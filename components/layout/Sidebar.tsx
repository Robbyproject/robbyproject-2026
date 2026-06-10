"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers/AppProviders";
import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs";
import {
  Home, User, Briefcase, Trophy, Mail, Sun, Moon, Menu,
  Clapperboard, Heart, Zap, LayoutDashboard, ChevronDown, Gamepad2,
  ShoppingBag, ChevronRight
} from "lucide-react";
import { scrollToId } from "@/utils/helpers";

const PROFILE_IMG = "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setIsMobileOpen(false); }, [pathname]);
  useEffect(() => {
    if (pathname && (pathname.startsWith("/anime") || pathname.startsWith("/waifu"))) {
      setOpenDropdown("Entertainment");
    }
  }, [pathname]);

  const navItems = useMemo(() => [
    { name: t.nav_home, id: "hero", icon: Home, type: "scroll" },
    { name: t.nav_about, path: "/about", icon: User, type: "page" },
    { name: t.nav_services, path: "/services", icon: Zap, type: "page" },
    { name: t.nav_projects, path: "/projects", icon: Briefcase, type: "page" },
    { name: t.nav_achievements, path: "/achievements", icon: Trophy, type: "page" },
    { name: "Store", path: "/store", icon: ShoppingBag, type: "page" },
    {
      name: t.nav_entertainment || "Entertainment",
      icon: Gamepad2, type: "dropdown", id: "Entertainment",
      children: [
        { name: t.nav_anime, path: "/anime", icon: Clapperboard, type: "page" },
        { name: t.nav_waifu, path: "/waifu", icon: Heart, type: "page" },
      ]
    },
    { name: t.nav_dashboard, path: "/dashboard", icon: LayoutDashboard, type: "page" },
    { name: t.nav_contact, path: "/contact", icon: Mail, type: "page" },
  ], [t]);

  // --- Rolling pill indicator with bounce keyframes ---
  const movePill = useCallback((el: HTMLButtonElement | null) => {
    if (!el || !pillRef.current || !navContainerRef.current) return;
    const container = navContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const targetTop = elRect.top - containerRect.top + container.scrollTop;

    anime({
      targets: pillRef.current,
      top: [
        { value: targetTop - 6, duration: 250, easing: "easeOutCubic" },
        { value: targetTop + 3, duration: 180, easing: "easeInOutSine" },
        { value: targetTop, duration: 120, easing: "easeOutQuad" },
      ],
      height: elRect.height,
      opacity: [0, 1],
      duration: 550,
    });
  }, []);

  // Trigger pill on route change
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      const activeIndex = navItems.findIndex(item =>
        item.type === "page" && pathname === item.path
      );
      if (activeIndex >= 0) {
        const el = navRefs.current.get(activeIndex);
        movePill(el);
      } else {
        if (pillRef.current) {
          anime({ targets: pillRef.current, opacity: 0, duration: 300, easing: "easeOutCubic" });
        }
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [pathname, mounted, movePill, navItems]);

  // Smooth pill tracking during dropdown animation (real-time, no delay)
  useEffect(() => {
    if (!mounted) return;

    const activeIndex = navItems.findIndex(item =>
      item.type === "page" && pathname === item.path
    );
    if (activeIndex < 0 || !pillRef.current || !navContainerRef.current) return;

    const el = navRefs.current.get(activeIndex);
    if (!el) return;

    // Cancel any running anime.js animation so it doesn't fight with rAF
    anime.remove(pillRef.current);

    let running = true;
    const startTime = performance.now();
    const duration = 350; // Match dropdown animation (300ms) + buffer

    function trackPosition() {
      if (!running) return;

      const container = navContainerRef.current!;
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const targetTop = elRect.top - containerRect.top + container.scrollTop;

      // Direct style update — smooth, no bounce, instant follow
      pillRef.current!.style.top = `${targetTop}px`;
      pillRef.current!.style.height = `${elRect.height}px`;
      pillRef.current!.style.opacity = '1';

      if (performance.now() - startTime < duration) {
        requestAnimationFrame(trackPosition);
      }
    }

    requestAnimationFrame(trackPosition);

    return () => { running = false; };
  }, [openDropdown, mounted, navItems, pathname]);

  // --- Hover scale with anime.js ---
  const handleNavHover = useCallback((index: number, entering: boolean) => {
    const el = navRefs.current.get(index);
    if (!el) return;
    anime({ targets: el, scale: entering ? 1.02 : 1, duration: 300, easing: "easeOutCubic" });
  }, []);

  const handleNavigation = (item) => {
    if (item.type === "dropdown") { setOpenDropdown(openDropdown === item.id ? null : item.id); return; }
    if (item.type === "page") {
      router.push(item.path);
    } else if (item.type === "scroll") {
      if (pathname === "/") { scrollToId(item.id); } else { router.push(`/#${item.id}`); }
    }
    setIsMobileOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* --- MOBILE HEADER --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-100">
            <Image src={PROFILE_IMG} alt="Profile" fill className="object-cover" />
          </div>
          <span className="font-semibold text-sm">Robby Fabian</span>
        </div>
        <button onClick={() => setIsMobileOpen(true)} className="p-2 text-zinc-600 dark:text-zinc-400 focus:outline-none" aria-label="Open menu">
          <Menu size={20} />
        </button>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      {isMobileOpen && (
        <div onClick={() => setIsMobileOpen(false)} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200" aria-hidden="true" />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`fixed top-0 left-0 z-[70] h-full w-64 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-zinc-200 dark:border-white/5 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 flex flex-col`}>

        {/* PROFILE */}
        <div className="group/profile p-6 flex flex-col items-center border-b border-zinc-100 dark:border-white/5">
          <div className="relative w-20 h-20 mb-4 rounded-full p-1 border-2 border-zinc-200 dark:border-zinc-800 group-hover/profile:border-emerald-500/50 transition-colors duration-500">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image src={PROFILE_IMG} alt="Profile" fill className="object-cover grayscale group-hover/profile:grayscale-0 group-hover/profile:scale-110 transition-all duration-700 ease-out" priority />
            </div>
          </div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">Robby Fabian</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Graphic Designer | IT Enthusiast</p>
          <div className="flex items-center gap-3 mt-4">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" aria-label="Toggle theme">
              {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800"></div>
            <button onClick={() => toggleLang(lang === 'en' ? 'id' : 'en')} className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 focus:outline-none" aria-label="Toggle language">
              {lang === 'en' ? 'EN' : 'ID'}
            </button>
          </div>
        </div>

        {/* NAV */}
        <div ref={navContainerRef} className="nav-list flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar relative">
          {/* Rolling pill background with integrated arrow */}
          <div ref={pillRef} className="absolute left-3 right-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 pointer-events-none border border-emerald-200/50 dark:border-emerald-500/15 flex items-center justify-end pr-3" style={{ top: 0, height: 36, opacity: 0 }}>
            <ChevronRight size={14} className="text-emerald-500" />
          </div>

          {navItems.map((item, index) => {
            const isActive = item.type === "page" ? pathname === item.path : false;
            const isDropdownOpen = openDropdown === item.id;

            if (item.type === "dropdown") {
              const isChildActive = item.children.some(child => pathname === child.path);
              return (
                <div key={index} className="flex flex-col">
                  <button onClick={() => handleNavigation(item)} aria-expanded={isDropdownOpen} className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${(isChildActive || isDropdownOpen) ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/5" : "text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5"}`}>
                    <div className="flex items-center gap-3">
                      <item.icon size={18} strokeWidth={2} className={`transition-colors duration-300 ${(isChildActive || isDropdownOpen) ? "text-emerald-500" : ""}`} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isDropdownOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} className="overflow-hidden">
                        <div className="flex flex-col gap-1 pl-4 ml-4 border-l border-emerald-500/30 dark:border-emerald-500/20 mt-1 pb-1">
                          {item.children.map((subItem) => (
                            <button key={subItem.path} onClick={() => handleNavigation(subItem)} className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${pathname === subItem.path ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10" : "text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"}`}>
                              <subItem.icon size={14} />
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={index}
                ref={(el) => { if (el) navRefs.current.set(index, el); }}
                onClick={() => handleNavigation(item)}
                onMouseEnter={() => handleNavHover(index, true)}
                onMouseLeave={() => handleNavHover(index, false)}
                className={`group w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 relative overflow-hidden ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"}`}
              >
                <div className="pointer-events-none absolute inset-0 nav-shine" />
                <item.icon size={18} strokeWidth={2} className={`transition-colors duration-300 ${isActive ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500"}`} />
                <span className="flex-1 text-left">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-zinc-100 dark:border-white/5">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Available for work</span>
          </div>
        </div>
      </aside>

      {/* CSS */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(150, 150, 150, 0.2); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(150, 150, 150, 0.4); }

        .nav-shine {
          position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 45%, rgba(16,185,129,0.08) 50%, rgba(255,255,255,0.06) 55%, transparent 70%);
          transform: skewX(-15deg); transition: none; pointer-events: none; z-index: 1;
        }
        .group:hover .nav-shine { animation: nav-shine-sweep 0.6s ease-out forwards; }
        @keyframes nav-shine-sweep { 0% { left: -100%; } 100% { left: 150%; } }
      `}</style>
    </>
  );
}
