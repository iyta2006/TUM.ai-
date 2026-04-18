"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, PackageCheck } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 9.95;
const VAT_RATE = 0.19;

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const sub = subtotal();
  const shipping = sub >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const vat = sub * VAT_RATE;
  const total = sub + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingCart className="w-16 h-16 text-[#e2e8f0] mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#0f172a] mb-2">Your cart is empty</h1>
        <p className="text-[#64748b] mb-6">Browse our catalog and find the perfect tire.</p>
        <Button asChild><Link href="/tires">Go to Tire Catalog</Link></Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(({ tire, quantity }) => (
            <div key={tire.id} className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex gap-4">
              <div className="w-20 h-20 bg-[#f8fafc] rounded-lg shrink-0 relative overflow-hidden">
                <Image src={tire.images[0]} alt={tire.name} fill className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#64748b]">{tire.brand}</p>
                <Link href={`/tires/${tire.id}`} className="font-semibold text-[#0f172a] text-sm hover:text-[#1e3a8a] leading-tight block">
                  {tire.name}
                </Link>
                <p className="text-xs text-[#64748b] mt-0.5">{tire.size.fullSize}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 border border-[#e2e8f0] rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(tire.id, quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] text-[#64748b]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(tire.id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#f8fafc] text-[#64748b]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#0f172a]">{formatPrice(tire.price * quantity)}</span>
                    <button
                      onClick={() => removeItem(tire.id)}
                      className="text-[#64748b] hover:text-red-600 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 space-y-3">
            <h2 className="font-semibold text-[#0f172a]">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Subtotal</span>
                <span>{formatPrice(sub)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">VAT (19%)</span>
                <span>{formatPrice(vat)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Shipping</span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">Free</span>
                ) : (
                  <span>{formatPrice(shipping)}</span>
                )}
              </div>
              {sub < SHIPPING_THRESHOLD && (
                <p className="text-xs text-[#64748b] bg-blue-50 rounded p-2">
                  {formatPrice(SHIPPING_THRESHOLD - sub)} more for free shipping
                </p>
              )}
              <div className="border-t border-[#e2e8f0] pt-2 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button asChild variant="accent" size="lg" className="w-full">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Link href="/tires" className="block text-center text-sm text-[#1e3a8a] hover:underline">
              ← Continue Shopping
            </Link>
          </div>

          <div className="bg-[#f8fafc] rounded-xl border border-[#e2e8f0] p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <PackageCheck className="w-4 h-4 text-green-600" />
              <span>Delivery 1–3 business days</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <PackageCheck className="w-4 h-4 text-green-600" />
              <span>14-day free returns</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <PackageCheck className="w-4 h-4 text-green-600" />
              <span>Manufacturer warranty included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
