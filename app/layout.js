import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import NextTopLoader from "nextjs-toploader"; 
import SystemLayout from "@/components/layout/SystemLayout"; 
import ContentWrapper from "@/components/layout/ContentWrapper"; 
import AnalyticsTracker from "@/components/features/AnalyticsTracker";
import ScrollToTop from "@/components/ui/ScrollToTop";

// ❌ SmoothScroll SUDAH DIHAPUS DARI SINI (Pindah ke SystemLayout)

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Robby Fabian | Creative Developer & Designer",
    template: "%s | Robby Fabian"
  },
  description: "Portofolio resmi Robby Fabian showcasing creative development, design, and digital solutions.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white transition-colors duration-300 min-h-screen flex flex-col overflow-x-hidden m-0 p-0 antialiased`}>
        
        {/* Google Analytics Tracker */}
        <AnalyticsTracker /> 

        <AppProviders>
            
            {/* Loading Bar di atas layar */}
            <NextTopLoader color="#06b6d4" showSpinner={false} height={3} />
            
            {/* SystemLayout sekarang yang akan menangandle scroll (Lenis).
               Jadi di sini kita kirim children mentahan saja.
            */}
            <SystemLayout>
                <ContentWrapper>
                   {children}
                </ContentWrapper>
            </SystemLayout>

            {/* Tombol Back to Top */}
            <ScrollToTop />
            
        </AppProviders>
      </body>
    </html>
  );
}