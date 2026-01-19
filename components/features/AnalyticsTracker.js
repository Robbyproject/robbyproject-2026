"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  // Ref ini penting untuk mencegah pencatatan ganda (double log) karena React Strict Mode
  const lastLoggedPath = useRef("");

  useEffect(() => {
    const trackView = async () => {
      // 1. Cek Logic: Jika path ini baru saja dicatat, jangan catat lagi
      if (lastLoggedPath.current === pathname) return;

      // 2. Cek Device (Mobile/Desktop)
      // Menggunakan userAgent lebih akurat daripada width untuk analitik
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobile = /android|iPad|iPhone|iPod/i.test(userAgent) || window.innerWidth < 768;

      // 3. Localhost Block (SAYA NONAKTIFKAN SEMENTARA)
      // Agar Anda bisa melihat data masuk saat testing di komputer sendiri.
      // Nanti kalau sudah deploy ke Vercel, baris di bawah ini boleh dinyalakan lagi.

      // if (window.location.hostname === "localhost") return; 

      try {
        // 4. FIX UTAMA: Ganti 'traffic_logs' menjadi 'app_visits'
        const { error } = await supabase.from("app_visits").insert([
          {
            page_path: pathname,
            device_type: isMobile ? "Mobile" : "Desktop"
          }
        ]);

        if (error) {
          console.error("Gagal mencatat traffic:", error.message);
        } else {
          console.log(`[Analytics] Berhasil mencatat: ${pathname}`);
          // Update ref agar tidak mencatat ulang di detik yang sama
          lastLoggedPath.current = pathname;
        }

      } catch (err) {
        console.error("Error tracker:", err);
      }
    };

    // Beri sedikit delay agar tidak bentrok saat hard refresh
    const timeoutId = setTimeout(() => {
      trackView();
    }, 500);

    return () => clearTimeout(timeoutId);

  }, [pathname]);

  return null;
}