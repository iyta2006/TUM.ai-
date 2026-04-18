import Link from "next/link";
import { ArrowRight, Shield, Truck, Star, Headphones, Award, CheckCircle } from "lucide-react";
import { getFeaturedTires } from "@/lib/data/tires";
import TireCard from "@/components/TireCard";
import NewsletterForm from "@/components/NewsletterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home — Premium Tires for B2B",
  description: "PremiumTire Solutions — Your partner for quality tires. Michelin, Continental, Bridgestone and more.",
};

const categories = [
  { slug: "summer", label: "Summer Tires", desc: "Optimal performance May–September", color: "bg-orange-50 border-orange-200", accent: "text-orange-700", icon: "☀️" },
  { slug: "winter", label: "Winter Tires", desc: "3PMSF-certified for safe driving", color: "bg-blue-50 border-blue-200", accent: "text-blue-700", icon: "❄️" },
  { slug: "all-season", label: "All-Season Tires", desc: "Flexible and safe all year long", color: "bg-green-50 border-green-200", accent: "text-green-700", icon: "🔄" },
  { slug: "performance", label: "Performance Tires", desc: "Maximum performance on the road", color: "bg-red-50 border-red-200", accent: "text-red-700", icon: "🏎️" },
  { slug: "eco", label: "Eco / EV", desc: "Optimized for electric vehicles", color: "bg-emerald-50 border-emerald-200", accent: "text-emerald-700", icon: "⚡" },
  { slug: "off-road", label: "Off-Road / SUV", desc: "Equipped for all terrain types", color: "bg-amber-50 border-amber-200", accent: "text-amber-700", icon: "🏔️" },
];

const usps = [
  { icon: Shield, title: "Verified Quality", desc: "All tires come from authorized dealers with full manufacturer warranty." },
  { icon: Truck, title: "Fast Delivery", desc: "Free shipping from €200 — delivery in 1–3 business days." },
  { icon: Headphones, title: "AI-Powered Advice", desc: "Our HappyRobot assistant finds the perfect tire for your requirements." },
  { icon: Award, title: "40 Years of Experience", desc: "Since 1985 we supply workshops, fleet operators and private customers." },
];

const testimonials = [
  { name: "Markus Herrmann", role: "Fleet Manager, Herrmann Logistics GmbH", text: "PremiumTire has been our sole tire partner since 2019. Reliable quality, fair prices, and the AI advisor is worth its weight in gold — no more long phone calls.", rating: 5 },
  { name: "Dr. Sarah Koch", role: "Owner, Auto Koch Workshop", text: "As a workshop we order from PremiumTire every month. The range is huge and delivery times are excellent. The chatbot gives my customers perfect advice even when I'm away.", rating: 5 },
  { name: "Oliver Braun", role: "Private driver, BMW M3 enthusiast", text: "I exclusively run performance tires and know my stuff — but the AI assistant still showed me options I hadn't considered. Impressive.", rating: 4 },
];

const brands = ["Michelin", "Continental", "Bridgestone", "Pirelli", "Goodyear", "Dunlop", "Hankook", "Nokian", "Vredestein", "Falken"];

export default function HomePage() {
  const featured = getFeaturedTires();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1d4ed8] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              AI Tire Advisor now available
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Find the <span className="text-[#f97316]">perfect tire</span> for your vehicle
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Over 40 tire models from 10 premium brands. Our AI assistant finds the optimal recommendation in seconds — based on your vehicle, route, and budget.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tires"
                className="inline-flex items-center gap-2 bg-[#f97316] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f97316]/90 transition-colors"
              >
                Browse catalog <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Start AI advisor
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-200">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Free shipping from €200</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> 5-year manufacturer warranty</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> 14-day returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand logos */}
      <section className="bg-white border-b border-[#e2e8f0] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-[#64748b] shrink-0 mr-2">Our brands:</span>
            {brands.map((b) => (
              <span key={b} className="shrink-0 text-xs font-semibold text-[#64748b] bg-[#f8fafc] border border-[#e2e8f0] px-3 py-1.5 rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((u) => (
            <div key={u.title} className="flex gap-4">
              <div className="w-10 h-10 bg-[#1e3a8a]/10 rounded-lg flex items-center justify-center shrink-0">
                <u.icon className="w-5 h-5 text-[#1e3a8a]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0f172a] text-sm">{u.title}</h3>
                <p className="text-xs text-[#64748b] mt-1 leading-relaxed">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tires */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a]">Bestsellers</h2>
            <p className="text-[#64748b] text-sm mt-1">Most purchased tires by our customers</p>
          </div>
          <Link href="/tires" className="text-sm font-medium text-[#1e3a8a] hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((t) => <TireCard key={t.id} tire={t} />)}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#f8fafc] border-y border-[#e2e8f0] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Browse by category</h2>
          <p className="text-[#64748b] text-sm mb-8">Choose the right category for your needs</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/tires?category=${c.slug}`}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${c.color} hover:shadow-md transition-shadow text-center`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span className={`text-sm font-semibold ${c.accent}`}>{c.label}</span>
                <span className="text-xs text-[#64748b] leading-tight">{c.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-[#0f172a] mb-2">What our customers say</h2>
        <p className="text-[#64748b] text-sm mb-8">Over 50,000 satisfied customers trust PremiumTire Solutions</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-[#e2e8f0]"}`} />
                ))}
              </div>
              <p className="text-sm text-[#0f172a] leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <p className="text-sm font-semibold text-[#0f172a]">{t.name}</p>
                <p className="text-xs text-[#64748b]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#1e3a8a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold">Stay informed</h2>
            <p className="text-blue-200 text-sm mt-1">New tires, special offers and B2B news delivered straight to your inbox.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
