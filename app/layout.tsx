import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "PremiumTire Solutions", template: "%s | PremiumTire Solutions" },
  description: "Your B2B specialist for quality tires from all leading brands. Michelin, Continental, Bridgestone and more.",
  openGraph: {
    siteName: "PremiumTire Solutions",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1 pb-28">
          {children}
        </main>
        <Footer />

        <a
          href="tel:+498941432864"
          className="fixed right-0 top-2/3 z-50 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-l-full shadow-lg transition-colors"
          aria-label="Jetzt anrufen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-sm font-medium">Anrufen</span>
        </a>

        {/* ========================================== */}
        {/* HAPPYROBOT AI WIDGET */}
        {/* ========================================== */}
        <Script
          src="https://hrchat.eu.happyrobot.ai/latest/loader.bundle.js"
          data-use-case-id="019da026-5663-7920-a2d0-42c6b5232f92"
          data-logo="https://media.licdn.com/dms/image/v2/C4E0BAQGTKPbjmQko9A/company-logo_200_200/company-logo_200_200/0/1675288059544/tum_ai_logo?e=2147483647&v=beta&t=9NB6NzuItbO5iPikn2cXOq9-a4f_bVvB_pXNsh-dtwc"
          data-primary-color="#1a1a1a"
          data-welcome-message=""
          data-env="production"
          strategy="afterInteractive"
        />
        {/* ========================================== */}
      </body>
    </html>
  );
}
