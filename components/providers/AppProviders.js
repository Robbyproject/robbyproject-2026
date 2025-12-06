"use client";
import { ThemeProvider } from "next-themes";
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/data/locales";

// --- 1. SETUP LANGUAGE CONTEXT ---
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export function AppProviders({ children }) {
  // State Bahasa (Default: english 'en')
  const [lang, setLang] = useState("en");
  
  // Ambil teks berdasarkan bahasa yang dipilih
  const t = translations[lang];

  // Fungsi ganti bahasa
  const toggleLang = (code) => {
    setLang(code);
    sessionStorage.setItem("lang", code); // Simpan pilihan user
  };

  // Cek sessionStorage saat pertama load (agar bahasa tidak reset saat refresh)
  useEffect(() => {
    const savedLang = sessionStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  return (
    // --- 2. SETUP THEME PROVIDER ---
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageContext.Provider value={{ lang, toggleLang, t }}>
        {children}
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}