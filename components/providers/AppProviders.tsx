"use client";
import { ThemeProvider } from "next-themes";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type TranslationKeys } from "@/data/locales";

// --- 1. SETUP LANGUAGE CONTEXT ---
interface LanguageContextValue {
  lang: string;
  toggleLang: (code: string) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within AppProviders");
  return context;
};

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  // State Bahasa (Default: english 'en')
  const [lang, setLang] = useState<string>("en");

  // Ambil teks berdasarkan bahasa yang dipilih
  const t = translations[lang];

  // Fungsi ganti bahasa
  const toggleLang = (code: string) => {
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