"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; 
import { useTheme } from "next-themes"; 
import { useLanguage } from "@/components/providers/AppProviders"; 
import { 
  BadgeCheck, 
  Home, 
  User, 
  Briefcase, 
  Trophy, 
  Mail, 
  Sun, 
  Moon 
} from "lucide-react";
import { scrollToId } from "@/utils/helpers";

export default function Sidebar() {
  const pathname = usePathname(); 
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: t.nav_home, id: "hero", icon: Home, type: "scroll" },
    { name: t.nav_about, path: "/about", icon: User, type: "page" },
    { name: t.nav_projects, path: "/projects", icon: Briefcase, type: "page" }, 
    { name: t.nav_achievements, path: "/achievements", icon: Trophy, type: "page" },
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
  };

  if (!mounted) return null;

  return (
    <>
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-72 flex-col bg-zinc-50 dark:bg-[#0a0a0a] border-r border-zinc-200 dark:border-white/5 z-50 transition-colors duration-300">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center p-8 pb-6">
          
          {/* --- FOTO PROFIL BARU (Flat Tricolor Border) --- */}
          <div className="relative w-24 h-24 mb-4">
            {/* Bingkai Gradasi 3 Warna (Merah, Kuning, Hijau) */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-yellow-500 to-green-500 p-[3px]">
                {/* Container Gambar */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#0a0a0a] border-2 border-white dark:border-[#0a0a0a]">
                    <Image src="/Chisa1.webp" alt="Profile" fill className="object-cover" />
                </div>
            </div>
          </div>

          {/* --- NAMA & VERIFIED BADGE --- */}
          {/* Menggunakan Lucide BadgeCheck dengan Fill tipis */}
<div className="flex items-center gap-1.5 justify-center mb-1">
    <h2 className="text-xl font-bold text-zinc-800 dark:text-white">
      Robby Fabian
    </h2>

    {/* Icon Verifikasi */}
    <BadgeCheck 
        size={20} 
        className="text-blue-500 fill-blue-500/10" // fill-... membuat bagian dalam agak berwarna
        strokeWidth={2.5} 
    />
</div>
          
          <p className="text-sm text-zinc-500 mb-5">@robbyfabian</p>

          {/* Button Group (Theme & Lang) */}
          <div className="flex gap-3 w-full justify-center">
             <div className="flex bg-zinc-200 dark:bg-zinc-900 rounded-full p-1 border border-zinc-300 dark:border-white/5">
                 <button 
                    onClick={() => toggleLang('en')}
                    className={`px-3 py-1 text-xs rounded-full font-bold transition-all ${lang === 'en' ? 'bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm' : 'text-zinc-500'}`}
                 >
                    EN
                 </button>
                 <button 
                    onClick={() => toggleLang('id')}
                    className={`px-3 py-1 text-xs rounded-full font-bold transition-all ${lang === 'id' ? 'bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm' : 'text-zinc-500'}`}
                 >
                    ID
                 </button>
             </div>

             <div className="flex bg-zinc-200 dark:bg-zinc-900 rounded-full p-1 border border-zinc-300 dark:border-white/5">
                 <button 
                    onClick={() => setTheme('light')}
                    className={`p-1 rounded-full transition-all ${theme === 'light' ? 'bg-white text-yellow-500 shadow-sm' : 'text-zinc-500'}`}
                 >
                    <Sun size={14}/>
                 </button>
                 <button 
                    onClick={() => setTheme('dark')}
                    className={`p-1 rounded-full transition-all ${theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500'}`}
                 >
                    <Moon size={14}/>
                 </button>
             </div>
          </div>
        </div>

        <div className="h-[1px] bg-zinc-200 dark:bg-white/5 w-full mb-4"></div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = item.type === "page" ? pathname === item.path : false;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-lg transition-all group text-left ${
                    isActive 
                    ? "bg-zinc-200 dark:bg-white/10 text-black dark:text-white" 
                    : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                }`}
              >
                <item.icon size={18} className={isActive ? "text-cyan-600 dark:text-cyan-400" : "group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 mt-auto">
           

           <div className="text-center">
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold tracking-wider">{t.copyright} &copy; 2025</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-600 mt-1">{t.rights}</p>
           </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-lg border-t border-zinc-200 dark:border-white/10 z-50 px-6 py-3 flex justify-between items-center transition-colors duration-300">
         {navItems.slice(0, 5).map((item) => (
             <button key={item.name} onClick={() => handleNavigation(item)} className="flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                 <item.icon size={20} />
             </button>
         ))}
      </div>
    </>
  );
}