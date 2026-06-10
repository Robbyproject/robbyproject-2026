"use client";

import { useMemo, useRef } from "react";
import { useLanguage } from "@/components/providers/AppProviders";
import { motion } from "framer-motion";
import Link from "next/link";
import { Palette, Code, LayoutTemplate, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
    const { t } = useLanguage();

    const services = useMemo(() => {
        return [
            {
                id: "graphic",
                title: t.serv_graphic_title || "Graphic Design",
                desc: t.serv_graphic_desc || "Visual storytelling through compelling imagery and brand identity.",
                list: t.serv_graphic_list ? t.serv_graphic_list.split(", ") : ["Logo Design", "Brand Identity", "Social Media"],
                icon: Palette,
            },
            {
                id: "web",
                title: t.serv_web_title || "Web Development",
                desc: t.serv_web_desc || "Building fast, responsive, and scalable web applications.",
                list: t.serv_web_list ? t.serv_web_list.split(", ") : ["Frontend Dev", "React/Next.js", "Performance"],
                icon: Code,
            },
            {
                id: "uiux",
                title: t.serv_uiux_title || "UI/UX Design",
                desc: t.serv_uiux_desc || "User-centric interfaces that are intuitive and engaging.",
                list: t.serv_uiux_list ? t.serv_uiux_list.split(", ") : ["Prototyping", "User Research", "Wireframing"],
                icon: LayoutTemplate,
            }
        ];
    }, [t]);

    return (
        <div className="w-full space-y-8 pb-20 pt-4">

            {/* ── HEADER ── */}
            <div className="border-b border-zinc-200 dark:border-white/5 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2 max-w-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <LayoutTemplate className="text-emerald-500 fill-emerald-500/10" size={32} />
                        My Services
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                        Specialized in delivering high-quality digital solutions tailored to your needs.
                    </p>
                </div>

                {/* CTA Button */}
                <Link
                    href="/contact"
                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5"
                >
                    <span>Let&apos;s Talk</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* ── SERVICES GRID ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                ))}
            </div>

            {/* ── CSS ── */}
            <style jsx global>{`
                .glow-overlay {
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .group:hover .glow-overlay {
                    opacity: 1;
                }

                .shine-sweep {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 60%;
                    height: 100%;
                    background: linear-gradient(
                        105deg,
                        transparent 30%,
                        rgba(255, 255, 255, 0.04) 45%,
                        rgba(16, 185, 129, 0.06) 50%,
                        rgba(255, 255, 255, 0.04) 55%,
                        transparent 70%
                    );
                    transform: skewX(-15deg);
                    transition: none;
                    pointer-events: none;
                }

                .group:hover .shine-sweep {
                    animation: shine-pass 0.8s ease-out forwards;
                }

                @keyframes shine-pass {
                    0% {
                        left: -100%;
                    }
                    100% {
                        left: 150%;
                    }
                }
            `}</style>
        </div>
    );
}

// ── SERVICE CARD ──
function ServiceCard({ service, index }: { service: any; index: number }) {
    const glowRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !glowRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.background =
            `radial-gradient(300px circle at ${x}px ${y}px, rgba(16,185,129,0.08), transparent 50%)`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                className="group relative flex flex-col h-full p-6 bg-white dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/30"
            >
                {/* Cursor Glow */}
                <div
                    ref={glowRef}
                    className="glow-overlay pointer-events-none absolute -inset-px rounded-xl z-10"
                />

                {/* Shine Sweep */}
                <div className="pointer-events-none absolute inset-0 rounded-xl z-10 overflow-hidden">
                    <div className="shine-sweep" />
                </div>

                {/* Content */}
                <div className="relative z-20 flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center mb-5 text-emerald-500 transition-transform duration-500 group-hover:scale-110">
                        <service.icon size={22} />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {service.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
                        {service.desc}
                    </p>

                    {/* Feature List */}
                    <div className="space-y-2.5 mt-auto">
                        {service.list.map((item: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2.5">
                                <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <CheckCircle2 size={12} className="text-emerald-500" />
                                </div>
                                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Link */}
                    <div className="pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                            Learn more
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </div>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-all duration-700 opacity-80 z-20" />
            </div>
        </motion.div>
    );
}
