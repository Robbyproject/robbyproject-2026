"use client";
import Sidebar from "@/components/layout/Sidebar";
import { useLanguage } from "@/components/providers/AppProviders";
import { motion } from "framer-motion";
import Link from "next/link";
import { Palette, Code, LayoutTemplate, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      id: "graphic",
      title: t.serv_graphic_title,
      desc: t.serv_graphic_desc,
      list: t.serv_graphic_list.split(", "), // Memecah string jadi array
      icon: Palette,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "hover:border-pink-500/50"
    },
    {
      id: "web",
      title: t.serv_web_title,
      desc: t.serv_web_desc,
      list: t.serv_web_list.split(", "),
      icon: Code,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50"
    },
    {
      id: "uiux",
      title: t.serv_uiux_title,
      desc: t.serv_uiux_desc,
      list: t.serv_uiux_list.split(", "),
      icon: LayoutTemplate,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "hover:border-orange-500/50"
    }
  ];

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-zinc-50 dark:bg-[#0a0a0a]">
      <div className="flex w-full">
        <Sidebar />

        <main className="flex-1 w-full min-h-screen pt-28 lg:pt-0">
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
             
             {/* HEADER */}
             <div className="mb-10 border-b border-zinc-200 dark:border-white/5 pb-8 transition-colors">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors">
                    {t.services_title}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">{t.services_subtitle}</p>
             </div>

             {/* GRID LAYOUT */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`group relative p-6 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ${service.border}`}
                    >
                        {/* Icon Header */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${service.bg} ${service.color}`}>
                            <service.icon size={24} />
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 min-h-[60px]">
                            {service.desc}
                        </p>

                        {/* List Items */}
                        <div className="space-y-2 mb-6">
                            {service.list.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                                    <CheckCircle2 size={14} className={service.color} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Garis Dekorasi Bawah */}
                        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-${service.color.replace('text-', '')} to-transparent w-0 group-hover:w-full transition-all duration-700 opacity-50`}></div>
                    </motion.div>
                ))}
             </div>

             {/* CALL TO ACTION (CTA) DI BAWAH */}
             <div className="mt-16 p-8 bg-zinc-900 dark:bg-white/5 rounded-2xl border border-zinc-800 dark:border-white/10 text-center relative overflow-hidden">
                 <div className="relative z-10">
                     <h2 className="text-2xl font-bold text-white mb-4">{t.serv_cta_title}</h2>
                     <Link 
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform"
                     >
                        {t.serv_cta_btn} <ArrowRight size={16} />
                     </Link>
                 </div>
                 
                 {/* Background Effect */}
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 z-0"></div>
             </div>

          </div>
        </main>
      </div>
    </div>
  );
}