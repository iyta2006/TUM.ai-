import type { Metadata } from "next";
import { Shield, Users, Globe, Award, TrendingUp, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "PremiumTire Solutions — Over 40 years of B2B tire distribution. Your partner for quality tires from all leading brands.",
};

const stats = [
  { value: "40+", label: "Years of experience" },
  { value: "50,000+", label: "Satisfied customers" },
  { value: "10", label: "Premium brands" },
  { value: "1–3 days", label: "Delivery time" },
];

const team = [
  { name: "Dr. Martin Reiter", role: "Managing Director", desc: "30 years in the tire industry. Founder of PremiumTire Solutions in 1985." },
  { name: "Sandra Müller", role: "Head of B2B Sales", desc: "Responsible for fleet customers and workshop partnerships." },
  { name: "Jan Weber", role: "AI & Digitalisation", desc: "Drives the HappyRobot integration and our digital strategy." },
];

const milestones = [
  { year: "1985", text: "Founded as a tire wholesaler in Frankfurt" },
  { year: "1999", text: "First online shop for B2B customers" },
  { year: "2008", text: "Opening of the second warehouse location in Munich" },
  { year: "2018", text: "Introduction of a dedicated CRM for fleet customers" },
  { year: "2024", text: "Integration of the HappyRobot AI advisor" },
  { year: "2026", text: "Over 50,000 regular customers, 10 brand partners" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-blue-300 text-sm font-medium mb-2">About Us</p>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 max-w-xl">
            Your reliable partner for quality tires since 1985
          </h1>
          <p className="text-blue-100 max-w-2xl leading-relaxed">
            PremiumTire Solutions is Europe's leading B2B tire service provider. We supply workshops, fleet operators and wholesalers with tires from all leading brands — fast, reliable and at competitive prices.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-[#1e3a8a]">{s.value}</p>
                <p className="text-sm text-[#64748b] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Our Mission</h2>
            <p className="text-[#64748b] leading-relaxed mb-4">
              We believe every driver should have access to the best tires — whether a private individual, workshop, or fleet operator with hundreds of vehicles.
            </p>
            <p className="text-[#64748b] leading-relaxed mb-6">
              With our AI-powered tire advisor (powered by HappyRobot) we can now give personalised recommendations around the clock — based on vehicle type, driving profile, budget and weather conditions.
            </p>
            <ul className="space-y-2">
              {["Authorised dealer for all 10 premium brands", "ISO 9001 certified logistics process", "GDPR-compliant customer data management", "Member of the European Tire Trade Association"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-[#0f172a] mb-5">Our History</h3>
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-[#1e3a8a] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {i < milestones.length - 1 ? "" : "★"}
                    </div>
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-[#e2e8f0] my-1" />}
                  </div>
                  <div className="pb-5">
                    <p className="text-xs font-bold text-[#1e3a8a]">{m.year}</p>
                    <p className="text-sm text-[#0f172a]">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#f8fafc] border-y border-[#e2e8f0] py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((t) => (
              <div key={t.name} className="bg-white rounded-xl border border-[#e2e8f0] p-6">
                <div className="w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                  {t.name[0]}
                </div>
                <h3 className="font-semibold text-[#0f172a]">{t.name}</h3>
                <p className="text-xs text-[#f97316] font-medium mb-2">{t.role}</p>
                <p className="text-sm text-[#64748b] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HappyRobot section */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-blue-300 text-sm font-medium mb-2">AI-Powered Advice</p>
            <h2 className="text-2xl font-bold mb-3">Our HappyRobot Assistant</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              Since 2024 we have used HappyRobot to advise customers around the clock. The AI agent knows our entire product range — including EU labels, tire sizes, use cases and price categories — and provides personalised recommendations in real time.
            </p>
            <ul className="space-y-1.5 text-sm text-blue-100">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Available 24/7</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Knows all 43 tires in the range</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Can add tires to the cart</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Filters by budget, vehicle and season</li>
            </ul>
          </div>
          <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
            <span className="text-5xl">🤖</span>
          </div>
        </div>
      </section>
    </div>
  );
}
