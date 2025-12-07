import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import NextTopLoader from "nextjs-toploader"; 
// 👇 Import komponen baru tadi
import SystemLayout from "@/components/layout/SystemLayout"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Robby Fabian | Portfolio",
  description: "Personal Portfolio of Robby Fabian",
  icons: { icon: '/icon.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <NextTopLoader color="#2299DD" showSpinner={false} />
          
          {/* 👇 BUNGKUS CHILDREN DENGAN SYSTEM LAYOUT */}
          <SystemLayout>
             {children}
          </SystemLayout>

        </AppProviders>
      </body>
    </html>
  );
}