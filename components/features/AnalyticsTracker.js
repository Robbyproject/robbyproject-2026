"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackView = async () => {
      // Cek apakah di Mobile atau Desktop
      const isMobile = window.innerWidth < 768;
      
      // Jangan catat kalau kita sedang di localhost (development)
      if (window.location.hostname === "localhost") return;

      // Kirim data ke Supabase
      await supabase.from("traffic_logs").insert([
        { 
          page_path: pathname,
          device_type: isMobile ? "Mobile" : "Desktop"
        }
      ]);
    };

    trackView();
  }, [pathname]); // Jalan setiap pathname berubah

  return null; // Komponen ini tidak menampilkan apa-apa (invisible)
}