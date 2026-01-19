"use client";
import { useLanguage } from "@/components/providers/AppProviders";
import { motion } from "framer-motion";
import Link from "next/link";
import { Palette, Code, LayoutTemplate, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
    const { t } = useLanguage();

    const services = [
        {
            id: "graphic",
            title: t.serv_graphic_title || "Graphic Design",
            desc: t.serv_graphic_desc || "Visual storytelling through compelling imagery and brand identity.",
            list: t.serv_graphic_list ? t.serv_graphic_list.split(", ") : ["Logo Design", "Brand Identity", "Social Media"],
            icon: Palette,
            // Define colors explicitly for Tailwind JIT
            color: "text-pink-500",
            bg: "bg-pink-500/10 dark:bg-pink-500/20",
            border: "group-hover:border-pink-500/50",
            gradient: "via-pink-500"
        },
        {
            id: "web",
            title: t.serv_web_title || "Web Development",
            desc: t.serv_web_desc || "Building fast, responsive, and scalable web applications.",
            list: t.serv_web_list ? t.serv_web_list.split(", ") : ["Frontend Dev", "React/Next.js", "Performance"],
            icon: Code,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10 dark:bg-cyan-500/20",
            border: "group-hover:border-cyan-500/50",
            gradient: "via-cyan-500"
        },
        {
            id: "uiux",
            title: t.serv_uiux_title || "UI/UX Design",
            desc: t.serv_uiux_desc || "User-centric interfaces that are intuitive and engaging.",
            list: t.serv_uiux_list ? t.serv_uiux_list.split(", ") : ["Prototyping", "User Research", "Wireframing"],
            icon: LayoutTemplate,
            color: "text-orange-500",
            bg: "bg-orange-500/10 dark:bg-orange-500/20",
            border: "group-hover:border-orange-500/50",
            gradient: "via-orange-500"
        }
    ];

    return (
        // 👇 CLEAN ROOT: Full width, spacing diurus parent
        <div className="w-full space-y-8">

            {/* HEADER SECTION */}
            <div className="border-b border-zinc-200 dark:border-white/5 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">

                        {t.services_title || "My Services"}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl leading-relaxed">
                        {t.services_subtitle || "Specialized in delivering high-quality digital solutions tailored to your needs."}
                    </p>
                </div>

                {/* CTA Button */}
                <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                >
                    <span>Let's Talk</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* SERVICES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className={`group relative p-6 bg-zinc-100 dark:bg-[#18181b] border border-zinc-200 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden ${service.border}`}
                    >
                        {/* Background Glow Effect (Optional) */}
                        <div className={`absolute top-0 right-0 p-20 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl rounded-full ${service.bg.split(' ')[0]}`} />

                        {/* Icon Header */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${service.bg} ${service.color}`}>
                            <service.icon size={26} />
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                            {service.title}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 min-h-[40px]">
                            {service.desc}
                        </p>

                        {/* Feature List */}
                        <div className="space-y-3 mb-4">
                            {service.list.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                                    <CheckCircle2 size={16} className={service.color} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Gradient Line Animation */}
                        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent ${service.gradient} to-transparent w-0 group-hover:w-full transition-all duration-700 opacity-80`}></div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}