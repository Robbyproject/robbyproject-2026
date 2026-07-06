'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Notification {
  id: string;
  title: string;
  message: string;
  link_url?: string;
}

export default function NotificationPopup() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 1. Tambahkan state untuk mengunci render sebelum halaman web siap sepenuhnya
  const [isPageReady, setIsPageReady] = useState(false);

  // 2. Efek untuk memantau status pemuatan halaman website (bukan loading screen)
  useEffect(() => {
    const handlePageLoad = () => {
      // Berikan sedikit jeda manis (misal 800ms) setelah loading selesai agar transisinya mulus
      setTimeout(() => setIsPageReady(true), 800);
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);

  // 3. Modifikasi Fetch: Data hanya diambil ketika halaman utamamu sudah terbuka/ready
  useEffect(() => {
    if (!isPageReady) return;

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error || !data) return;
      setNotifications(data);
    };

    fetchNotifications();
  }, [isPageReady]);

  // 4. Modifikasi Toast Logic: Amankan agar tidak berjalan jika halaman belum siap
  useEffect(() => {
    if (!isPageReady || notifications.length === 0) return;

    const currentNotif = notifications[currentIndex];

    const showToast = () => {
      toast.custom((t) => (
        <div className="relative w-[320px] sm:w-[350px] p-6 bg-[#09090b] border border-zinc-800/80 rounded-xl shadow-2xl flex flex-col gap-4 font-sans overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* 1. LAYER GRID MEMUDAR */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              WebkitMaskImage: 'radial-gradient(ellipse at bottom right, black 20%, transparent 80%)',
              maskImage: 'radial-gradient(ellipse at bottom right, black 20%, transparent 80%)',
            }}
          />

          {/* 2. LAYER GARIS MELENGKUNG MATEMATIKA */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 350 200" preserveAspectRatio="none">
            <path d="M-20 150 Q 80 20, 180 120 T 380 50" stroke="white" fill="none" strokeWidth="0.75" opacity="0.6"/>
            <path d="M-20 180 Q 120 50, 220 150 T 380 90" stroke="white" fill="none" strokeWidth="0.5" opacity="0.4"/>
            <circle cx="300" cy="140" r="30" stroke="white" fill="none" strokeWidth="0.5" opacity="0.5"/>
            <circle cx="300" cy="140" r="60" stroke="white" fill="none" strokeWidth="0.5" opacity="0.3"/>
            <circle cx="300" cy="140" r="90" stroke="white" fill="none" strokeWidth="0.5" opacity="0.1"/>
          </svg>

          {/* 3. LAYER CAHAYA PUTIH */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/10 rounded-full blur-[40px] pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100 z-0" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-[30px] pointer-events-none z-0" />

          {/* HEADER */}
          <div className="flex justify-between items-start relative z-10">
            <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 rounded-full backdrop-blur-md shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              NEW
            </span>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-zinc-500 hover:text-white transition-colors bg-[#0a0a0a]/50 rounded-full p-1.5 backdrop-blur-sm border border-transparent hover:border-zinc-700"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>

          {/* KONTEN TEKS */}
          <div className="relative z-10 mt-2">
            <h3 className="text-base font-semibold text-white tracking-wide drop-shadow-md">
              {currentNotif.title}
            </h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              {currentNotif.message}
            </p>
          </div>

          {/* TOMBOL AKSI */}
          {currentNotif.link_url && (
            <div className="mt-3 relative z-10">
              <button
                onClick={() => {
                  router.push(currentNotif.link_url!);
                  toast.dismiss(t);
                }}
                className="px-5 py-2.5 text-xs font-bold text-zinc-900 bg-zinc-100 hover:bg-white rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0"
              >
                DISCOVER SERVICES
              </button>
            </div>
          )}
        </div>
      ), {
        id: 'carousel-notif',
        duration: 5000, 
        position: 'bottom-right',
      });
    };

    showToast();

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length);
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentIndex, notifications, router, isPageReady]); // tambahkan isPageReady ke dependency list

  return null;
}