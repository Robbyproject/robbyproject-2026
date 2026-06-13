"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
    Mail, MapPin, Briefcase,
    GraduationCap, User, Download
} from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/components/providers/AppProviders";

// --- GLOBAL CACHE VARIABLES ---
let cachedEducation = null;
let cachedExperience = null;

// --- VARIAN ANIMASI ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: "easeOut" as const }
    }
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "backOut" as const }
    }
};

export default function AboutPage() {
    const { t } = useLanguage();
    const [educationList, setEducationList] = useState(cachedEducation);
    const [experienceList, setExperienceList] = useState(cachedExperience);

    useEffect(() => {
        if (cachedEducation && cachedExperience) return;

        const fetchData = async () => {
            try {
                const [eduRes, expRes] = await Promise.all([
                    supabase
                        .from('education')
                        .select('*')
                        .order('id', { ascending: false }),
                    supabase
                        .from('experience')
                        .select('*')
                        .eq('is_active', true)
                        .order('id', { ascending: false })
                ]);

                if (eduRes.data) {
                    setEducationList(eduRes.data);
                    cachedEducation = eduRes.data;
                } else {
                    setEducationList([]);
                }

                if (expRes.data) {
                    setExperienceList(expRes.data);
                    cachedExperience = expRes.data;
                } else {
                    setExperienceList([]);
                }

            } catch (error) {
                console.error("Error loading about data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full flex flex-col gap-10"
            >

                {/* --- HEADER SECTION --- */}
                <motion.div variants={itemVariants} className="space-y-2 border-b border-zinc-200 dark:border-white/5 pb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                        <User className="text-zinc-500" size={32} /> {t.about_title}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-sm md:text-lg">
                        {t.about_subtitle}
                    </p>
                </motion.div>

                {/* --- MAIN GRID LAYOUT --- */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">

                    {/* --- SIDEBAR (Profile Picture & Quick Info) --- */}
                    <motion.div variants={itemVariants} className="md:col-span-4 space-y-6">
                        <div className="rounded-[2rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#111] p-2 overflow-hidden md:sticky md:top-24">

                            {/* Profile Image */}
                            <motion.div variants={imageVariants} className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                                <img
                                    src="https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Elaina.jpg"
                                    alt="Profile"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-md text-green-400 text-xs font-medium mb-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        {t.about_open_to_work}
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Robby Fabian</h3>
                                    <p className="text-zinc-300 text-sm">{t.about_role}</p>
                                </div>
                            </motion.div>

                            <div className="p-4 space-y-4">
                                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm">
                                    <MapPin size={16} /> Jakarta, Indonesia
                                </div>
                                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm">
                                    <Mail size={16} /> robbyfabian20@gmail.com
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Link href="https://github.com/Robbyproject" target="_blank" className="flex-1 h-10 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors">
                                        <SiGithub size={18} />
                                    </Link>
                                    <Link href="https://linkedin.com/in/robby-fabian" target="_blank" className="flex-1 h-10 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors">
                                        <FaLinkedin size={18} />
                                    </Link>
                                    <Link href="https://instagram.com/mikocwk" target="_blank" className="flex-1 h-10 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-colors">
                                        <SiInstagram size={18} />
                                    </Link>
                                </div>

                                <button className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                                    <Download size={18} /> {t.about_download_cv}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- MAIN CONTENT --- */}
                    <motion.div variants={itemVariants} className="md:col-span-8 space-y-8">

                        {/* Biography */}
                        <motion.div variants={itemVariants} className="rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#111] p-4 sm:p-6 md:p-10">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="text-emerald-500">#</span> {t.about_biography}
                            </h2>
                            <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
                                <p>
                                    {t.about_bio_1}
                                </p>
                                <p>
                                    {t.about_bio_2}
                                </p>
                            </div>
                        </motion.div>

                        {/* EXPERIENCE SECTION */}
                        <motion.div variants={itemVariants} className="rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#111] p-4 sm:p-6 md:p-10">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
                                <Briefcase size={24} className="text-zinc-500" /> {t.about_work_experience}
                            </h2>

                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 dark:before:via-zinc-800 before:to-transparent">

                                {!experienceList ? (
                                    [1, 2].map((i) => (
                                        <div key={i} className="ml-10 space-y-3 animate-pulse">
                                            <div className="h-6 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                                            <div className="h-4 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                                            <div className="h-16 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded"></div>
                                        </div>
                                    ))
                                ) : experienceList.length > 0 ? (
                                    experienceList.map((job) => (
                                        <div key={job.id} className="relative flex items-start gap-6 group">
                                            {/* Dot Indicator */}
                                            <div className="absolute left-0 top-1 mt-1 ml-3.5 h-3 w-3 rounded-full border-2 border-white dark:border-[#111] bg-zinc-400 dark:bg-zinc-600 group-hover:bg-emerald-500 transition-colors z-10" />

                                            <div className="ml-10 w-full">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                        {job.role}
                                                    </h3>
                                                    <span className="text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-white/5 px-2 py-1 rounded border border-zinc-200 dark:border-white/5">
                                                        {job.period}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">{job.company}</p>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed">
                                                    {job.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="ml-10 text-zinc-500 italic">{t.about_no_experience}</p>
                                )}
                            </div>
                        </motion.div>

                        {/* EDUCATION SECTION */}
                        <motion.div variants={itemVariants} className="rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#111] p-4 sm:p-6 md:p-10">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
                                <GraduationCap size={24} className="text-zinc-500" /> {t.about_education}
                            </h2>

                            <div className="grid grid-cols-1 gap-4">

                                {!educationList ? (
                                    [1].map((i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 animate-pulse">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="h-5 w-1/3 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
                                                <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                                            </div>
                                            <div className="h-4 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                                        </div>
                                    ))
                                ) : educationList.length > 0 ? (
                                    educationList.map((edu) => (
                                        <div key={edu.id} className="group p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-white/20 transition-all">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-zinc-900 dark:text-white font-bold">{edu.major}</h3>
                                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">{edu.school_name}</p>
                                                </div>
                                                <span className="text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-[#1a1a1a] px-2 py-1 rounded border border-zinc-200 dark:border-white/5">
                                                    {edu.years}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-zinc-500 text-sm italic">{t.about_no_education}</p>
                                )}
                            </div>
                        </motion.div>

                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
}
