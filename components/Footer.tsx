import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#1e3a8a] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">PT</span>
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">PremiumTire Solutions</div>
                <div className="text-xs text-slate-400 leading-tight">B2B Car Parts Supplier</div>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Your specialist for quality tires from all leading brands. Over 40 years of experience in B2B tire distribution.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-300">Products</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/tires?category=summer" className="hover:text-white transition-colors">Summer Tires</Link></li>
              <li><Link href="/tires?category=winter" className="hover:text-white transition-colors">Winter Tires</Link></li>
              <li><Link href="/tires?category=all-season" className="hover:text-white transition-colors">All-Season Tires</Link></li>
              <li><Link href="/tires?category=performance" className="hover:text-white transition-colors">Performance Tires</Link></li>
              <li><Link href="/tires?category=eco" className="hover:text-white transition-colors">Eco / EV Tires</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-300">Company</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Dealer Partners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-300">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> +49 800 123 456 78</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> info@premiumtire.com</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" /> Tire Street 12, 60329 Frankfurt am Main</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© 2026 PremiumTire Solutions GmbH. All rights reserved.</p>
          <p>Demo website · No real transactions</p>
        </div>
      </div>
    </footer>
  );
}
