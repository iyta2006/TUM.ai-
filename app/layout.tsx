import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

        {/* ========================================== */}
        {/* HAPPYROBOT AI WIDGET */}
        {/* ========================================== */}
        <script
          src="https://hrchat.eu.happyrobot.ai/latest/loader.bundle.js"
          data-use-case-id="019da026-5663-7920-a2d0-42c6b5232f92"
          data-logo="https://media.licdn.com/dms/image/v2/C4E0BAQGTKPbjmQko9A/company-logo_200_200/company-logo_200_200/0/1675288059544/tum_ai_logo?e=2147483647&v=beta&t=9NB6NzuItbO5iPikn2cXOq9-a4f_bVvB_pXNsh-dtwc"
          data-primary-color="#1a1a1a"
          data-welcome-message=""
          data-env="development"
          async
        ></script>
        {/* ========================================== */}
      </body>
    </html>
  );
}
