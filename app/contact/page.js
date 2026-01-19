"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/AppProviders";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import CardSpotlight from "@/components/ui/CardSpotlight";
import {
  SiGmail, SiInstagram, SiLinkedin, SiWhatsapp, SiGithub, SiBehance
} from "react-icons/si";

export default function ContactPage() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    {
      id: "email",
      title: t?.email_title || "Email Me",
      desc: t?.email_desc || "For project inquiries or just to say hi.",
      btn: t?.btn_email || "Send Email",
      icon: SiGmail,
      url: "mailto:robbyfabian20@gmail.com",
      bg: "group-hover:from-red-900/80 group-hover:to-red-600/80",
      border: "group-hover:border-red-500/50",
      isEmail: true
    },
    {
      id: "ig",
      title: t?.ig_title || "Instagram",
      desc: t?.ig_desc || "Daily updates & photography.",
      icon: SiInstagram,
      url: "https://instagram.com/mikookatsunagi",
      bg: "group-hover:from-purple-900/80 group-hover:via-pink-900/80 group-hover:to-orange-900/80",
      border: "group-hover:border-pink-500/50",
    },
    {
      id: "linkedin",
      title: t?.li_title || "LinkedIn",
      desc: t?.li_desc || "Professional connections & resume.",
      icon: SiLinkedin,
      url: "https://linkedin.com/in/robby-fabian",
      bg: "group-hover:from-blue-900/80 group-hover:to-blue-600/80",
      border: "group-hover:border-blue-500/50",
    },
    {
      id: "behance",
      title: t?.be_title || "Behance",
      desc: t?.be_desc || "Design portfolio case studies.",
      icon: SiBehance,
      url: "https://behance.net/robby-fabian",
      bg: "group-hover:from-blue-800/80 group-hover:to-[#0041c2]/80",
      border: "group-hover:border-blue-400/50",
    },
    {
      id: "github",
      title: t?.gh_title || "GitHub",
      desc: t?.gh_desc || "Code repositories & contributions.",
      icon: SiGithub,
      url: "https://github.com/Robbyproject",
      bg: "group-hover:from-zinc-800 group-hover:to-black",
      border: "group-hover:border-zinc-500/50",
    },
    {
      id: "wa",
      title: t?.wa_title || "WhatsApp",
      desc: t?.wa_desc || "Fast response chat.",
      icon: SiWhatsapp,
      url: "https://wa.me/6285715135847",
      bg: "group-hover:from-emerald-900/80 group-hover:to-green-600/80",
      border: "group-hover:border-emerald-500/50",
    },
  ];

  const firstItem = socialLinks[0];
  const FirstIcon = firstItem.icon;
  const otherItems = socialLinks.slice(1);

  if (!mounted) return null;

  return (
    <div className="w-full space-y-8 pb-20">

      {/* HEADER SECTION */}
      <div className="border-b border-zinc-200 dark:border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
          <Mail className="text-cyan-500" size={28} />
          {t?.contact_title || "Get in Touch"}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-2xl leading-relaxed">
          {t?.contact_subtitle || "Feel free to reach out for collaborations, questions, or just to share your favorite anime recommendations."}
        </p>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* 1. HERO CARD (EMAIL) - Span 2 Columns */}
        <CardSpotlight
          color="rgba(255, 255, 255, 0.15)"
          className={`
                    md:col-span-2 lg:col-span-2 row-span-2 
                    bg-zinc-100 dark:bg-zinc-900/50 
                    rounded-3xl relative overflow-hidden group 
                    border border-zinc-200 dark:border-white/5 
                    ${firstItem.border}
                    transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]
                `}
        >
          {/* Full Card Link Overlay */}
          <a
            href={firstItem.url}
            className="absolute inset-0 z-30"
            aria-label={firstItem.title}
          />

          {/* Optimized Shine Effect (No CSS Keyframes needed) */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine pointer-events-none" />

          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${firstItem.bg}`} />

          <div className="p-8 md:p-10 relative z-20 h-full flex flex-col justify-between min-h-[320px]">
            <div className="flex justify-between items-start">
              <div className="p-4 bg-white dark:bg-white/5 rounded-2xl backdrop-blur-md border border-zinc-200 dark:border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                <FirstIcon size={32} className="text-zinc-900 dark:text-white" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-white/10 text-black dark:text-white group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:rotate-45 shadow-sm">
                <ArrowUpRight size={20} />
              </div>
            </div>

            <div className="space-y-6 mt-8">
              <div>
                <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
                  {firstItem.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-md text-base leading-relaxed group-hover:text-white/90 transition-colors">
                  {firstItem.desc}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-sm group-hover:bg-white group-hover:text-red-600 transition-colors shadow-lg">
                <Send size={16} />
                <span>{firstItem.btn}</span>
              </div>
            </div>
          </div>
        </CardSpotlight>

        {/* 2. OTHER CARDS (Small Grid) */}
        {otherItems.map((item) => {
          const Icon = item.icon;
          return (
            <CardSpotlight
              key={item.id}
              color="rgba(255, 255, 255, 0.1)"
              className={`
                            bg-zinc-100 dark:bg-zinc-900/50 
                            rounded-3xl relative overflow-hidden group 
                            border border-zinc-200 dark:border-white/5 
                            ${item.border}
                            transition-all duration-500 hover:-translate-y-1 hover:shadow-lg
                        `}
            >
              {/* Full Card Link Overlay */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-30"
                aria-label={item.title}
              />

              {/* Hover Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${item.bg}`} />

              <div className="p-6 relative z-20 h-full flex flex-col justify-between min-h-[180px]">
                <div className="flex justify-between items-start mb-4">
                  <Icon size={28} className="text-zinc-500 dark:text-zinc-500 group-hover:text-white transition-colors duration-300" />
                  <ArrowUpRight size={18} className="text-zinc-400 group-hover:text-white opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-white/80 transition-colors line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </CardSpotlight>
          );
        })}
      </div>
    </div>
  );
}