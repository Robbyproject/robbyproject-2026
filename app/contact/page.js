"use client";
import Sidebar from "@/components/layout/Sidebar";
import { useLanguage } from "@/components/providers/AppProviders";
import { ArrowUpRight } from "lucide-react";
import CardSpotlight from "@/components/ui/CardSpotlight"; 
import { 
  SiGmail, SiInstagram, SiLinkedin, SiWhatsapp, SiGithub, SiBehance 
} from "react-icons/si";

export default function ContactPage() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      id: "email",
      title: t.email_title,
      desc: t.email_desc,
      btn: t.btn_email,
      icon: SiGmail,
      url: "mailto:robbyfabian20@gmail.com",
      bg: "bg-gradient-to-r from-red-700 to-red-500", 
      btnBg: "bg-white/20 hover:bg-white/30 text-white"
    },
    {
      id: "ig",
      title: t.ig_title,
      desc: t.ig_desc,
      btn: t.btn_ig,
      icon: SiInstagram,
      url: "https://instagram.com/mikookatsunagi",
      bg: "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500", 
      btnBg: "bg-white/20 hover:bg-white/30 text-white"
    },
    {
      id: "linkedin",
      title: t.li_title,
      desc: t.li_desc,
      btn: t.btn_li,
      icon: SiLinkedin,
      url: "https://linkedin.com/in/robby-fabian",
      bg: "bg-gradient-to-r from-blue-700 to-blue-500", 
      btnBg: "bg-white/20 hover:bg-white/30 text-white"
    },
    {
      id: "behance",
      title: t.be_title,
      desc: t.be_desc,
      btn: t.btn_be,
      icon: SiBehance,
      url: "https://behance.net/robby-fabian",
      bg: "bg-[#1769ff]",
      btnBg: "bg-white/20 hover:bg-white/30 text-white"
    },
    {
      id: "github",
      title: t.gh_title,
      desc: t.gh_desc,
      btn: t.btn_gh,
      icon: SiGithub,
      url: "https://github.com/Robbyproject",
      bg: "bg-gradient-to-r from-slate-900 to-slate-700", 
      btnBg: "bg-white/10 hover:bg-white/20 text-white"
    },
    {
      id: "wa",
      title: t.wa_title,
      desc: t.wa_desc,
      btn: t.btn_wa,
      icon: SiWhatsapp,
      url: "https://wa.me/6285715135847",
      bg: "bg-gradient-to-r from-green-600 to-green-400", 
      btnBg: "bg-white/20 hover:bg-white/30 text-white"
    },
  ];

  const firstItem = socialLinks[0];
  const FirstIcon = firstItem.icon;
  const otherItems = socialLinks.slice(1);

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <div className="flex w-full">
        <Sidebar />

        {/* 👇 PERBAIKAN DI SINI: pt-20 lg:pt-0 */}
        <main className="flex-1 lg:pl-72 w-full min-h-screen pt-20 lg:pt-0">
          <div className="max-w-6xl mx-auto px-6 py-10 lg:py-14">
             
             <div className="mb-8 border-b border-zinc-200 dark:border-white/5 pb-8 transition-colors">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors">
                    {t.contact_title}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    {t.contact_subtitle}
                </p>
             </div>

             <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mb-6 uppercase tracking-wider">
                {t.contact_socials}
             </h3>

             {/* Grid Responsif (1 Kolom Mobile, 2 Kolom Tablet+) */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Email Card (Lebar Penuh di atas) */}
                <CardSpotlight 
                    color="rgba(255, 255, 255, 0.2)" 
                    className={`md:col-span-2 ${firstItem.bg} rounded-xl relative overflow-hidden group shadow-md border border-white/10`}
                >
                    <div className="p-5 relative z-20">
                        <div className="absolute top-0 right-0 p-12 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10 group-hover:bg-white/20 transition-colors pointer-events-none"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{firstItem.title}</h3>
                                <p className="text-white/80 max-w-lg text-xs">{firstItem.desc}</p>
                            </div>
                            <FirstIcon size={36} className="text-white/20 absolute right-4 top-4 md:static md:text-white md:opacity-100" />
                        </div>
                        <a href={firstItem.url} target="_blank" className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold mt-4 transition-all ${firstItem.btnBg}`}>
                            {firstItem.btn} <ArrowUpRight size={14} />
                        </a>
                    </div>
                </CardSpotlight>

                {/* Sisa Kartu Lainnya */}
                {otherItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <CardSpotlight 
                            key={item.id}
                            color="rgba(255, 255, 255, 0.2)" 
                            className={`${item.bg} rounded-xl relative overflow-hidden group shadow-md border border-white/10 min-h-[160px] flex flex-col`}
                        >
                            <div className="p-4 relative z-20 flex-1 flex flex-col justify-between h-full">
                                <div className="absolute top-0 right-0 p-10 bg-white/10 rounded-full blur-xl translate-x-6 -translate-y-6 group-hover:bg-white/15 transition-colors pointer-events-none"></div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-white/70 text-[10px] leading-relaxed max-w-[85%]">{item.desc}</p>
                                    </div>
                                    <Icon size={24} className="text-white" />
                                </div>
                                <a href={item.url} target="_blank" className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold w-fit mt-3 transition-all ${item.btnBg}`}>
                                    {item.btn} <ArrowUpRight size={12} />
                                </a>
                            </div>
                        </CardSpotlight>
                    );
                })}
             </div>

             <footer className="py-8 text-zinc-500 dark:text-zinc-600 text-sm mt-12 border-t border-zinc-200 dark:border-white/5 transition-colors">
                 <p>© 2025 Robby Fabian.</p>
             </footer>

          </div>
        </main>
      </div>
    </div>
  );
}