"use client";
import { useState } from "react"; // Hapus useEffect jika tidak dipakai lagi
import { AnimatePresence } from "framer-motion"; // AnimatePresence mungkin masih dipakai Chatbot

// Components
import Sidebar from "@/components/layout/Sidebar";
import Hero from "@/components/sections/Hero";
import ChatBot from "@/components/features/ChatBot";
// HAPUS IMPORT LOADING SCREEN DARI SINI

export default function Home() {
  // HAPUS STATE isLoading
  const [isChatOpen, setIsChatOpen] = useState(false);

  // HAPUS useEffect LOGIC LOADING LAMA

  return (
    <div className="min-h-screen font-sans transition-colors duration-300">
      
      {/* HAPUS AnimatePresence LOADING SCREEN DARI SINI */}

      {/* Langsung render konten tanpa cek !isLoading */}
      <div className="flex w-full">
            <Sidebar />

            <main className="flex-1 lg:pl-72 w-full min-h-screen flex flex-col">
                <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10 flex-1 w-full">
                    <Hero />
                    
                </div>
            </main>

            <button 
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 group"
            >
               {/* Efek Ping (Glow) di belakang */}
               <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:bg-white/40 transition-colors duration-500 animate-pulse"></div>
               
               {/* Tombol Utama */}
               <div className="relative w-14 h-14 bg-[#18181b] border border-white/10 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform duration-300">
                   {/* Icon Pesan */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-zinc-200"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
               </div>
            </button>

            <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}