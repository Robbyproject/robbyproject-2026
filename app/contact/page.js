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
      bg: "bg-gradient-to-br from-red-600 to-red-900", // Sedikit diperdalam gradasinya
      btnBg: "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
    },
    {
      id: "ig",
      title: t.ig_title,
      desc: t.ig_desc,
      btn: t.btn_ig,
      icon: SiInstagram,
      url: "https://instagram.com/mikookatsunagi",
      bg: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600", 
      btnBg: "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
    },
    {
      id: "linkedin",
      title: t.li_title,
      desc: t.li_desc,
      btn: t.btn_li,
      icon: SiLinkedin,
      url: "https://linkedin.com/in/robby-fabian",
      bg: "bg-gradient-to-br from-blue-600 to-blue-900", 
      btnBg: "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
    },
    {
      id: "behance",
      title: t.be_title,
      desc: t.be_desc,
      btn: t.btn_be,
      icon: SiBehance,
      url: "https://behance.net/robby-fabian",
      bg: "bg-gradient-to-br from-[#1769ff] to-[#0041c2]",
      btnBg: "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
    },
    {
      id: "github",
      title: t.gh_title,
      desc: t.gh_desc,
      btn: t.btn_gh,
      icon: SiGithub,
      url: "https://github.com/Robbyproject",
      bg: "bg-gradient-to-br from-slate-800 to-black", 
      btnBg: "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
    },
    {
      id: "wa",
      title: t.wa_title,
      desc: t.wa_desc,
      btn: t.btn_wa,
      icon: SiWhatsapp,
      url: "https://wa.me/6285715135847",
      bg: "bg-gradient-to-br from-green-500 to-emerald-800", 
      btnBg: "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md"
    },
  ];

  const firstItem = socialLinks[0];
  const FirstIcon = firstItem.icon;
  const otherItems = socialLinks.slice(1);

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      <div className="flex w-full">
        <Sidebar />

        <main className="flex-1 w-full min-h-screen pt-20 lg:pt-0">
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

             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* 1. KARTU UTAMA (EMAIL) - LEBIH BESAR */}
                <CardSpotlight 
                    color="rgba(255, 255, 255, 0.15)" 
                    className={`md:col-span-2 ${firstItem.bg} rounded-3xl relative overflow-hidden group border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
                >
                    <div className="p-8 relative z-20 h-full flex flex-col justify-between">
                        {/* Gradient Shine Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                        
                        {/* Dekorasi Blur Belakang */}
                        <div className="absolute top-0 right-0 p-24 bg-white/10 rounded-full blur-3xl translate-x-10 -translate-y-10 group-hover:bg-white/20 transition-colors duration-500"></div>
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-md">{firstItem.title}</h3>
                                <p className="text-white/90 max-w-lg text-sm font-medium leading-relaxed">{firstItem.desc}</p>
                            </div>
                            {/* Icon Besar dengan Efek Putar */}
                            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <FirstIcon size={40} className="text-white" />
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <a href={firstItem.url} target="_blank" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all ${firstItem.btnBg} border border-white/20`}>
                                {firstItem.btn} <ArrowUpRight size={16} />
                            </a>
                        </div>
                    </div>
                </CardSpotlight>

                {/* 2. KARTU LAINNYA - GRID */}
                {otherItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <CardSpotlight 
                            key={item.id}
                            color="rgba(255, 255, 255, 0.15)" 
                            className={`${item.bg} rounded-3xl relative overflow-hidden group border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 min-h-[180px] flex flex-col`}
                        >
                            <div className="p-6 relative z-20 flex-1 flex flex-col justify-between h-full">
                                {/* Gradient Shine */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                                
                                <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-2xl translate-x-8 -translate-y-8 group-hover:bg-white/15 transition-colors duration-500"></div>
                                
                                <div className="flex justify-between items-start">
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-sm">{item.title}</h3>
                                        <p className="text-white/80 text-[11px] leading-relaxed max-w-[85%] font-medium">{item.desc}</p>
                                    </div>
                                    
                                    {/* Icon Floating */}
                                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                                        <Icon size={24} className="text-white" />
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 relative z-10">
                                    <a href={item.url} target="_blank" className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold w-fit shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all ${item.btnBg} border border-white/20`}>
                                        {item.btn} <ArrowUpRight size={12} />
                                    </a>
                                </div>
                            </div>
                        </CardSpotlight>
                    );
                })}

             </div>

          </div>
        </main>
      </div>
    </div>
  );
}