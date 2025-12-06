import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import NextTopLoader from "nextjs-toploader"; // 1. Import ini

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Robby Fabian | Portfolio",
  description: "Personal Portfolio of Robby Fabian",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          {/* 2. Pasang Component ini DI SINI */}
          <NextTopLoader 
            color="#2299DD" // Warna Biru/Cyan sesuai tema
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false} // Matikan spinner bulat (kita pakai skeleton aja)
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}