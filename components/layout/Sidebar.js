"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; 
import { useTheme } from "next-themes"; 
import { useLanguage } from "@/components/providers/AppProviders"; 
// 👇 Tambahkan 'LayoutDashboard' ke import
import { 
  BadgeCheck, Home, User, Briefcase, Trophy, Mail, Sun, Moon, Menu, X, Clapperboard, Heart, Zap, LayoutDashboard 
} from "lucide-react"; 
import { scrollToId } from "@/utils/helpers";

export default function Sidebar() {
  const pathname = usePathname(); 
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { name: t.nav_home, id: "hero", icon: Home, type: "scroll" },
    { name: t.nav_about, path: "/about", icon: User, type: "page" },
    { name: t.nav_services, path: "/services", icon: Zap, type: "page" },
    { name: t.nav_projects, path: "/projects", icon: Briefcase, type: "page" }, 
    { name: t.nav_achievements, path: "/achievements", icon: Trophy, type: "page" },
    { name: t.nav_anime, path: "/anime", icon: Clapperboard, type: "page" },
    { name: t.nav_waifu, path: "/waifu", icon: Heart, type: "page" },
    // 👇 MENU DASHBOARD BARU (Di atas Contact)
    { name: t.nav_dashboard, path: "/dashboard", icon: LayoutDashboard, type: "page" },
    { name: t.nav_contact, path: "/contact", icon: Mail, type: "page" },
  ];

  const handleNavigation = (item) => {
    if (item.type === "page") {
      router.push(item.path);
    } else {
      if (pathname === "/") {
        scrollToId(item.id);
      } else {
        router.push(`/#${item.id}`);
      }
    }
    setIsMobileOpen(false);
  };

  const ToggleControls = ({ className = "" }) => (
    <div className={`flex gap-2 ${className}`}>
        <div className="flex bg-zinc-200 dark:bg-zinc-900 rounded-full p-1 border border-zinc-300 dark:border-white/5">
            <button onClick={() => toggleLang('en')} className={`px-2 py-1 text-[10px] rounded-full font-bold transition-all ${lang === 'en' ? 'bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm' : 'text-zinc-500'}`}>EN</button>
            <button onClick={() => toggleLang('id')} className={`px-2 py-1 text-[10px] rounded-full font-bold transition-all ${lang === 'id' ? 'bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm' : 'text-zinc-500'}`}>ID</button>
        </div>
        <div className="flex bg-zinc-200 dark:bg-zinc-900 rounded-full p-1 border border-zinc-300 dark:border-white/5">
            <button onClick={() => setTheme('light')} className={`p-1 rounded-full transition-all ${theme === 'light' ? 'bg-white text-yellow-500 shadow-sm' : 'text-zinc-500'}`}><Sun size={12}/></button>
            <button onClick={() => setTheme('dark')} className={`p-1 rounded-full transition-all ${theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500'}`}><Moon size={12}/></button>
        </div>
    </div>
  );

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- HEADER MOBILE --- */}
      {!isMobileOpen && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-[100] px-4 py-3 flex justify-between items-center bg-zinc-50/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-200 dark:border-white/5 transition-all">
            <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-300 dark:border-white/20 shadow-sm">
                    <Image src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp" alt="Profile" fill className="object-cover" />
                </div>
                <div className="flex flex-col hidden sm:flex">
                    <span className="font-bold text-xs text-zinc-900 dark:text-white leading-none">Robby Fabian</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="animate-in fade-in zoom-in duration-300 mr-1">
                    <ToggleControls />
                </div>
                <button onClick={() => setIsMobileOpen(true)} className="p-2 rounded-lg bg-zinc-200 dark:bg-white/10 text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-white/20 transition-colors active:scale-95">
                    <Menu size={18} />
                </button>
            </div>
        </div>
      )}

      {/* --- OVERLAY --- */}
      {isMobileOpen && (
        <div onClick={() => setIsMobileOpen(false)} className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden"></div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
          lg:sticky lg:top-0 lg:left-0 lg:h-screen lg:translate-x-0 lg:w-72 lg:flex
          fixed top-0 left-0 h-screen w-72 flex flex-col 
          z-[95] transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          bg-zinc-50 dark:bg-[#0a0a0a] 
          border-r border-zinc-200 dark:border-white/5 
          overflow-y-auto scrollbar-hide
      `}>
        
        <div className="lg:hidden absolute top-4 right-4 z-50">
            <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-lg bg-zinc-200 dark:bg-white/10 text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-white/20 transition-colors active:scale-95">
                <X size={18} />
            </button>
        </div>

        <div className="flex flex-col items-center text-center p-8 pb-6 flex-shrink-0 mt-8 lg:mt-0">
          <div className="relative w-24 h-24 mb-4 group cursor-pointer">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-yellow-500 to-green-500 p-[3px] animate-[spin_4s_linear_infinite]">
                <div className="w-full h-full bg-white dark:bg-[#0a0a0a] rounded-full"></div>
            </div>
            <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white dark:bg-[#0a0a0a] border-2 border-transparent">
                <Image src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp" alt="Profile" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 justify-center mb-1">
              <h2 className="text-xl font-bold text-zinc-800 dark:text-white">Robby Fabian</h2>
              <BadgeCheck size={20} className="text-blue-500 fill-blue-500/10 animate-pulse" strokeWidth={2.5} />
          </div>
          <p className="text-sm text-zinc-500 mb-5">@robbyfabian</p>

          <div className="flex justify-center w-full">
             <ToggleControls className="scale-110" />
          </div>
        </div>

        <div className="h-[1px] bg-zinc-200 dark:bg-white/5 w-full mb-4 flex-shrink-0"></div>

        <nav className="flex-1 px-4 space-y-2 pb-4">
          {navItems.map((item) => {
            const isActive = item.type === "page" ? pathname === item.path : false;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`
                    group w-full flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ease-out relative overflow-hidden flex-shrink-0
                    ${isActive 
                        ? "bg-zinc-200 dark:bg-white/10 text-black dark:text-white shadow-sm" 
                        : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                    }
                `}
              >
                {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-500 rounded-r-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"></span>}
                <div className={`relative z-10 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-125 group-hover:-rotate-12"}`}>
                    <item.icon size={18} className={`transition-colors duration-300 ${isActive ? "text-cyan-600 dark:text-cyan-400" : "group-hover:text-cyan-600 dark:group-hover:text-cyan-400"}`} />
                </div>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 mt-auto bg-zinc-50 dark:bg-[#0a0a0a] flex-shrink-0"> 
           <div className="text-center">
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold tracking-wider">{t.copyright} &copy; 2025</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-600 mt-1">{t.rights}</p>
           </div>
        </div>
      </aside>
    </>
  );
}