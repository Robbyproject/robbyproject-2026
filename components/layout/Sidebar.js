"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers/AppProviders";
import {
  Home, User, Briefcase, Trophy, Mail, Sun, Moon, Menu,
  Clapperboard, Heart, Zap, LayoutDashboard, ChevronDown, Gamepad2,
  ShoppingBag, X, LogOut
} from "lucide-react";
import { scrollToId } from "@/utils/helpers";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tutup sidebar mobile saat pindah halaman
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Auto open dropdown jika berada di halaman anak
  useEffect(() => {
    if (pathname === "/anime" || pathname === "/waifu") {
      setOpenDropdown("Entertainment");
    }
  }, [pathname]);

  const navItems = [
    { name: t.nav_home, id: "hero", icon: Home, type: "scroll" },
    { name: t.nav_about, path: "/about", icon: User, type: "page" },
    { name: t.nav_services, path: "/services", icon: Zap, type: "page" },
    { name: t.nav_projects, path: "/projects", icon: Briefcase, type: "page" },
    { name: t.nav_achievements, path: "/achievements", icon: Trophy, type: "page" },
    { name: "Store", path: "/store", icon: ShoppingBag, type: "page" },
    {
      name: t.nav_entertainment || "Entertainment",
      icon: Gamepad2,
      type: "dropdown",
      id: "Entertainment",
      children: [
        { name: t.nav_anime, path: "/anime", icon: Clapperboard, type: "page" },
        { name: t.nav_waifu, path: "/waifu", icon: Heart, type: "page" },
      ]
    },
    { name: t.nav_dashboard, path: "/dashboard", icon: LayoutDashboard, type: "page" },
    { name: t.nav_contact, path: "/contact", icon: Mail, type: "page" },
  ];

  const handleNavigation = (item) => {
    if (item.type === "page") {
      router.push(item.path);
    } else if (item.type === "scroll") {
      if (pathname === "/") {
        scrollToId(item.id);
      } else {
        router.push(`/#${item.id}`);
      }
    } else if (item.type === "dropdown") {
      setOpenDropdown(openDropdown === item.id ? null : item.id);
      return;
    }
    // Jangan tutup mobile menu langsung jika klik dropdown, user mungkin mau klik anaknya
    if (item.type !== "dropdown") setIsMobileOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* --- MOBILE HEADER / TOGGLE --- */}
      {/* Hanya muncul di layar kecil */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-100">
            <Image src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp" alt="Profile" fill className="object-cover" />
          </div>
          <span className="font-semibold text-sm">Robby Fabian</span>
        </div>
        <button onClick={() => setIsMobileOpen(true)} className="p-2 text-zinc-600 dark:text-zinc-400">
          <Menu size={20} />
        </button>
      </div>

      {/* --- OVERLAY MOBILE --- */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <aside className={`
          fixed top-0 left-0 z-[70] h-full w-64 
          bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl
          border-r border-zinc-200 dark:border-white/5
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
      `}>

        {/* 1. PROFILE HEADER (Minimalist) */}
        <div className="p-6 flex flex-col items-center border-b border-zinc-100 dark:border-white/5">
          <div className="relative w-20 h-20 mb-4 rounded-full p-1 border border-zinc-200 dark:border-zinc-800">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp"
                alt="Profile"
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">Robby Fabian</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Graphic Designer | IT Enthusiast</p>

          {/* Controls (Theme & Lang) */}
          <div className="flex items-center gap-3 mt-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
            </button>

            <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800"></div>

            {/* Lang Toggle */}
            <button
              onClick={() => toggleLang(lang === 'en' ? 'id' : 'en')}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              {lang === 'en' ? 'EN' : 'ID'}
            </button>
          </div>
        </div>

        {/* 2. NAVIGATION MENU */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          {navItems.map((item, index) => {
            const isActive = item.type === "page" ? pathname === item.path : false;
            const isDropdownOpen = openDropdown === item.id;

            // --- RENDER DROPDOWN ---
            if (item.type === "dropdown") {
              const isChildActive = item.children.some(child => pathname === child.path);
              return (
                <div key={index} className="flex flex-col">
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`
                                    w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                                    ${(isChildActive || isDropdownOpen)
                        ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-900"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-white/5"
                      }
                                `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} strokeWidth={2} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Items */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                    <div className="flex flex-col gap-1 pl-4 ml-4 border-l border-zinc-200 dark:border-zinc-800">
                      {item.children.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => handleNavigation(subItem)}
                          className={`
                                                w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-all
                                                ${pathname === subItem.path
                              ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/10"
                              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            }
                                            `}
                        >
                          <subItem.icon size={14} />
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            // --- RENDER REGULAR MENU ---
            return (
              <button
                key={index}
                onClick={() => handleNavigation(item)}
                className={`
                            group w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative
                            ${isActive
                    ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-900"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-white/5"
                  }
                        `}
              >
                {/* Active Indicator (Small Dot) */}
                {isActive && <div className="absolute left-0 w-1 h-5 bg-cyan-500 rounded-r-full" />}

                <item.icon size={18} strokeWidth={2} className={`transition-transform duration-300 ${isActive ? "scale-105" : "group-hover:scale-105"}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* 3. FOOTER */}
        <div className="p-4 border-t border-zinc-100 dark:border-white/5">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Available for work</span>
          </div>
        </div>
      </aside>

      {/* --- CSS UTILS (Optional if configured in global css) --- */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(150, 150, 150, 0.2); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(150, 150, 150, 0.4); }
      `}</style>
    </>
  );
}