"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Phone, ChevronDown, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tires", label: "Tire Catalog" },
  { href: "/about", label: "About Us" },
];

export default function Navigation() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e2e8f0] shadow-sm">
      {/* Top bar */}
      <div className="bg-[#1e3a8a] text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span>Free shipping on orders over €200 · Fitting partners across Europe</span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3" /> 0800 123 456 78
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#1e3a8a] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">PT</span>
            </div>
            <div>
              <div className="font-bold text-[#1e3a8a] text-sm leading-tight">PremiumTire</div>
              <div className="text-xs text-[#64748b] leading-tight">Solutions</div>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === l.href
                    ? "text-[#1e3a8a]"
                    : "text-[#64748b] hover:text-[#0f172a]"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 text-sm font-medium text-[#0f172a] hover:text-[#1e3a8a] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 sm:static sm:ml-0 flex items-center justify-center w-5 h-5 bg-[#f97316] text-white text-xs rounded-full font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#e2e8f0] bg-white">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-[#0f172a] hover:bg-[#f1f5f9]"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
