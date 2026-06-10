import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import NextTopLoader from "nextjs-toploader";
import SystemLayout from "@/components/layout/SystemLayout";
import ContentWrapper from "@/components/layout/ContentWrapper";
import AnalyticsTracker from "@/components/features/AnalyticsTracker";

// Optimasi Font: Gunakan variable untuk integrasi Tailwind yang lebih baik
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${jakarta.variable} font-sans
          bg-zinc-50 dark:bg-[#0a0a0a]
          text-zinc-900 dark:text-white
          min-h-screen flex flex-col antialiased selection:bg-cyan-500/30 selection:text-cyan-500
        `}
      >
        <AnalyticsTracker />

        <AppProviders>
          {/* Progress Bar Top */}
          <NextTopLoader color="#06b6d4" showSpinner={false} height={3} shadow="0 0 10px #06b6d4,0 0 5px #06b6d4" />

          {/* Layout Utama (Sidebar + Scroll Area) */}
          <SystemLayout>
            {/* ContentWrapper opsional, pastikan dia tidak membatasi width jika SystemLayout sudah full */}
            <ContentWrapper>
              {children}
            </ContentWrapper>
          </SystemLayout>

        </AppProviders>
      </body>
    </html>
  );
}