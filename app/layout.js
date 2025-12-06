import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
// Ganti import ClientLayout lama dengan AppProviders baru
import { AppProviders } from "@/components/providers/AppProviders";
import ClientLayout from "@/components/layout/ClientLayout"; // Tetap pakai ini untuk logika Loading Screen

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Robby Fabian | Portfolio",
  description: "Fullstack Developer & Designer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader color="#22d3ee" height={3} showSpinner={false} />
        
        {/* Urutan Pembungkus: Providers (Theme/Lang) -> ClientLayout (Loading Screen) -> Children */}
        <AppProviders>
            <ClientLayout>
                {children}
            </ClientLayout>
        </AppProviders>
        
      </body>
    </html>
  );
}