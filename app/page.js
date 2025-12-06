"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Hero from "@/components/sections/Hero";
import ChatBot from "@/components/features/ChatBot";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      
      <div className="flex w-full">
            <Sidebar />

            {/* 👇 PERBAIKAN DI SINI: pt-20 lg:pt-0 */}
            <main className="flex-1 lg:pl-72 w-full min-h-screen flex flex-col pt-20 lg:pt-0 transition-all">
                <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10 flex-1 w-full">
                    <Hero />
                </div>
            </main>

            <button 
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 group z-[40]" // Z-Index biar ga ketutupan
            >
               <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:bg-white/40 transition-colors duration-500 animate-pulse"></div>
               <div className="relative w-14 h-14 bg-[#18181b] border border-white/10 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-zinc-200"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
               </div>
            </button>

            <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}