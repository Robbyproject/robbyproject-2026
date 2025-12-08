"use client";
import { useState, useEffect } from "react"; 
import Sidebar from "@/components/layout/Sidebar";
import { Briefcase, GraduationCap, Download, FileText } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/AppProviders";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "@/components/pdf/ResumePDF";

// ... (Data careerList & educationList TETAP SAMA, tidak perlu diubah) ...
const careerList = [
  { role: "IT Support Intern", company: "Disinfolahtaau", location: "Jakarta, Indonesia 🇮🇩", period: "Jul 2024 - Des 2024", type: "internship", mode: "WFO", logo: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Disinfo.jpg" },
  { role: "UI/UX Designer Intern", company: "Disinfolahtaau", location: "Jakarta, Indonesia 🇮🇩", period: "Jul 2024 - Des 2024", type: "internship", mode: "WFO", logo: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Disinfo.jpg" },
];

const educationList = [
  { degree: "Computer Science", school: "Cakrawala University", level: "Bachelor Degree", period: "2025 - Present", location: "Jakarta, Indonesia 🇮🇩", logo: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Cakrawala.png" },
  { degree: "Software Engineering", school: "SMK Prestasi Prima", level: "High School", period: "2022 - 2025", location: "Jakarta, Indonesia 🇮🇩", logo: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Prestasi-prima.png" },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    // Tambahkan bg-zinc-50 dark:bg-[#0a0a0a] agar background konsisten
    <div className="min-h-screen font-sans transition-colors duration-300 bg-zinc-50 dark:bg-[#0a0a0a]">
      <div className="flex w-full">
        <Sidebar />

        {/* 👇 UPDATE MAIN DISINI 👇 */}
        {/* 1. pt-20 diganti pt-28 (agar tidak ketutup header mobile) */}
        {/* 2. lg:pl-72 DIHAPUS */}
        <main className="flex-1 w-full min-h-screen pt-28 lg:pt-0">
          
          {/* 👇 PERBAIKAN GRID DISINI 👇 */}
          {/* Ganti 'max-w-5xl' jadi 'max-w-6xl' */}
          {/* Ganti 'px-6' jadi 'px-4' */}
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
             
             {/* HEADER */}
             <div className="mb-8 border-b border-zinc-200 dark:border-white/5 pb-8 transition-colors">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors">{t.about_title}</h1>
                <p className="text-zinc-500 dark:text-zinc-400">{t.about_subtitle}</p>
             </div>

             {/* INTRO TEXT */}
             <div className="space-y-6 text-zinc-600 dark:text-zinc-300 leading-relaxed text-[15px] transition-colors">
                <p>{t.about_intro_1}</p>
                <p>{t.about_intro_2}</p>
             </div>

             <div className="w-full h-[1px] bg-zinc-200 dark:bg-white/5 my-10 transition-colors"></div>

             {/* CAREER SECTION */}
             <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <Briefcase size={20} className="text-zinc-400" />
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors">{t.about_career}</h2>
                </div>
                <div className="flex flex-col gap-4"> 
                    {careerList.map((job, index) => (
                        <div key={index} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-zinc-300 dark:hover:border-white/10 transition-all shadow-sm dark:shadow-none">
                            <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-white/5 p-2 flex items-center justify-center">
                                <Image src={job.logo} alt="Company Logo" fill className="object-contain p-1" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white transition-colors">{job.role}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2">{job.company} • {job.location}</p>
                                <div className="flex flex-wrap gap-3 text-xs text-zinc-500 font-mono mb-4">
                                    <span>{job.period}</span>•<span>{job.type}</span>•<span>{job.mode}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>

             {/* EDUCATION & DOWNLOAD SECTION */}
             <div>
                <div className="flex items-center gap-2 mb-6">
                    <GraduationCap size={20} className="text-zinc-400" />
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors">{t.about_edu}</h2>
                </div>
                
                {/* TOMBOL DOWNLOAD CV ATS */}
                <div className="flex justify-end mb-6">
                    {isClient ? (
                        <PDFDownloadLink 
                            document={<ResumePDF />} 
                            fileName="Robby_Fabian_Resume.pdf"
                            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black border border-zinc-200 dark:border-white/10 rounded-xl text-xs font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95"
                        >
                            {({ loading }) => (
                                <>
                                    {loading ? (
                                        "Generating..."
                                    ) : (
                                        <>
                                            <FileText size={16} /> Download ATS CV
                                        </>
                                    )}
                                </>
                            )}
                        </PDFDownloadLink>
                    ) : (
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-200 dark:bg-white/10 text-zinc-500 rounded-xl text-xs font-bold cursor-wait">
                            <FileText size={16} /> Loading CV...
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    {educationList.map((edu, index) => (
                        <div key={index} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-zinc-300 dark:hover:border-white/10 transition-all relative overflow-hidden shadow-sm dark:shadow-none">
                            <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-white/5 p-2 flex items-center justify-center">
                                <Image src={edu.logo} alt="School Logo" fill className="object-contain p-1" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white transition-colors">{edu.degree}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{edu.school} • {edu.level}</p>
                                <p className="text-xs text-zinc-500 font-mono mt-2">{edu.period} • {edu.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
             

          </div>
        </main>
      </div>
    </div>
  );
}