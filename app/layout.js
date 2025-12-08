import { Inter } from "next/font/google";
import "./globals.css";
// Pastikan menggunakan kurung kurawal { } untuk Named Export
import { AppProviders } from "@/components/providers/AppProviders";
import NextTopLoader from "nextjs-toploader"; 
import SystemLayout from "@/components/layout/SystemLayout"; 
import AnalyticsTracker from "@/components/features/AnalyticsTracker";
import ScrollToTop from "@/components/ui/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

// --- METADATA (SEO) ---
export const metadata = {
  title: {
    default: "Robby Fabian | Creative Developer & Designer",
    template: "%s | Robby Fabian"
  },
  description: "Portofolio resmi Robby Fabian. Graphic Designer dan Front-End Developer yang berfokus pada UI/UX modern, Next.js, dan desain kreatif.",
  authors: [{ name: "Robby Fabian" }],
  keywords: ["Robby Fabian", "Portfolio", "Web Developer", "Graphic Designer", "Next.js", "React", "Indonesia"],
  creator: "Robby Fabian",
  
  // Konfigurasi Open Graph
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://robbyproject.netlify.app", 
    title: "Robby Fabian | Creative Developer",
    description: "Membangun pengalaman digital yang estetis dan fungsional.",
    siteName: "Robby Fabian Portfolio",
    images: [
      {
        url: "https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp", 
        width: 1200,
        height: 630,
        alt: "Robby Fabian Portfolio",
      },
    ],
  },
  
  // Konfigurasi Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Robby Fabian | Creative Developer",
    description: "Graphic Designer & Front-End Dev. Cek karya saya disini.",
    images: ["https://cnjncaybcpnzwookgsgq.supabase.co/storage/v1/object/public/portfolio-assets/Chisa1.webp"], 
  },
};

// --- ROOT LAYOUT ---
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300`}>
        
        {/* 1. Tracker Trafik */}
        <AnalyticsTracker /> 

        {/* 2. Provider Global */}
        <AppProviders>
          
          {/* Loader Bar (Warna Cyan) */}
          <NextTopLoader color="#06b6d4" showSpinner={false} />
          
          {/* 3. System Layout (Intro & Transisi) */}
          <SystemLayout>
             {/* 👇 PERBAIKAN: Wrapper Utama untuk Kestabilan Layout */}
             <div className="flex w-full min-h-screen relative">
                {children}
             </div>
          </SystemLayout>

          {/* Tombol Scroll ke Atas */}
          <ScrollToTop />

        </AppProviders>
      </body>
    </html>
  );
}