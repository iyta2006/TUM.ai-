"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Step = 1 | 2 | 3 | 4;

const VAT = 0.19;
const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 9.95;

interface AddressForm {
  firstName: string; lastName: string; street: string; houseNo: string;
  zip: string; city: string; country: string; email: string; phone: string;
}

interface PaymentForm {
  method: "card" | "paypal" | "klarna" | "sepa";
  cardNumber: string; cardExpiry: string; cardCvc: string; cardHolder: string;
  iban: string; bic: string; accountHolder: string;
}

const initialAddress: AddressForm = {
  firstName: "", lastName: "", street: "", houseNo: "",
  zip: "", city: "", country: "Germany", email: "", phone: "",
};

const initialPayment: PaymentForm = {
  method: "card",
  cardNumber: "", cardExpiry: "", cardCvc: "", cardHolder: "",
  iban: "", bic: "", accountHolder: "",
};

function StepIndicator({ current }: { current: Step }) {
  const steps = ["Delivery Address", "Payment", "Review", "Confirmation"];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = num < current;
        const active = num === current;
        return (
          <div key={label} className="flex items-center gap-0 flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                done ? "bg-green-600 border-green-600 text-white" :
                active ? "bg-[#1e3a8a] border-[#1e3a8a] text-white" :
                "bg-white border-[#e2e8f0] text-[#64748b]"
              }`}>
                {done ? <Check className="w-4 h-4" /> : num}
              </div>
              <span className={`text-xs mt-1 text-center whitespace-nowrap ${active ? "text-[#1e3a8a] font-semibold" : "text-[#64748b]"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mt-[-12px] ${done ? "bg-green-600" : "bg-[#e2e8f0]"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function formatCard(val: string) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState<AddressForm>(initialAddress);
  const [payment, setPayment] = useState<PaymentForm>(initialPayment);
  const [agree, setAgree] = useState(false);
  const [orderNumber] = useState(`MOCK-${Math.floor(10000 + Math.random() * 90000)}`);

  const sub = subtotal();
  const shipping = sub >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = sub + shipping;

  const addressValid = address.firstName && address.lastName && address.street &&
    address.zip && address.city && address.email;

  if (items.length === 0 && step < 4) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <ShoppingCart className="w-12 h-12 text-[#e2e8f0] mx-auto mb-4" />
        <p className="text-[#64748b] mb-4">Your cart is empty.</p>
        <Button asChild><Link href="/tires">Go to Catalog</Link></Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Checkout</h1>
      <StepIndicator current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: form steps */}
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 space-y-4">
              <h2 className="font-semibold text-lg">Delivery Address</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#64748b] block mb-1">First Name *</label>
                  <Input value={address.firstName} onChange={(e) => setAddress({ ...address, firstName: e.target.value })} placeholder="John" />
                </div>
                <div>
                  <label className="text-xs text-[#64748b] block mb-1">Last Name *</label>
                  <Input value={address.lastName} onChange={(e) => setAddress({ ...address, lastName: e.target.value })} placeholder="Doe" />
                </div>
                <div>
                  <label className="text-xs text-[#64748b] block mb-1">Street *</label>
                  <Input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="Main Street" />
                </div>
                <div>
                  <label className="text-xs text-[#64748b] block mb-1">House No.</label>
                  <Input value={address.houseNo} onChange={(e) => setAddress({ ...address, houseNo: e.target.value })} placeholder="12a" />
                </div>
                <div>
                  <label className="text-xs text-[#64748b] block mb-1">Postcode *</label>
                  <Input value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} placeholder="60329" maxLength={10} />
                </div>
                <div>
                  <label className="text-xs text-[#64748b] block mb-1">City *</label>
                  <Input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="Frankfurt am Main" />
                </div>
                <div>
                  <label className="text-xs text-[#64748b] block mb-1">Country</label>
                  <select
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    className="w-full h-10 rounded-md border border-[#e2e8f0] px-3 text-sm bg-white"
                  >
                    {["Germany", "Austria", "Switzerland", "Netherlands", "Belgium", "France"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <label className="text-xs text-[#64748b] block mb-1">Email *</label>
                  <Input type="email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-xs text-[#64748b] block mb-1">Phone</label>
                  <Input type="tel" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} placeholder="+49 123 456789" />
                </div>
              </div>
              <Button
                variant="default"
                size="lg"
                className="w-full mt-2"
                onClick={() => setStep(2)}
                disabled={!addressValid}
              >
                Continue to Payment <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 space-y-4">
              <h2 className="font-semibold text-lg">Payment Method</h2>
              <div className="grid grid-cols-2 gap-2">
                {(["card", "paypal", "klarna", "sepa"] as const).map((m) => {
                  const labels: Record<string, string> = { card: "💳 Credit Card", paypal: "🅿️ PayPal", klarna: "🛍️ Klarna", sepa: "🏦 SEPA Direct Debit" };
                  return (
                    <label key={m} className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                      payment.method === m ? "border-[#1e3a8a] bg-blue-50" : "border-[#e2e8f0] hover:border-[#1e3a8a]"
                    }`}>
                      <input type="radio" name="payment" value={m} checked={payment.method === m}
                        onChange={() => setPayment({ ...payment, method: m })} className="accent-[#1e3a8a]" />
                      <span className="text-sm">{labels[m]}</span>
                    </label>
                  );
                })}
              </div>

              {payment.method === "card" && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs text-[#64748b] block mb-1">Card Number</label>
                    <Input
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: formatCard(e.target.value) })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-[#64748b] block mb-1">MM/YY</label>
                      <Input value={payment.cardExpiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                          if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                          setPayment({ ...payment, cardExpiry: v });
                        }}
                        placeholder="12/28" maxLength={5} />
                    </div>
                    <div>
                      <label className="text-xs text-[#64748b] block mb-1">CVC</label>
                      <Input value={payment.cardCvc}
                        onChange={(e) => setPayment({ ...payment, cardCvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                        placeholder="123" maxLength={4} />
                    </div>
                    <div className="col-span-1">
                      <label className="text-xs text-[#64748b] block mb-1">Cardholder</label>
                      <Input value={payment.cardHolder}
                        onChange={(e) => setPayment({ ...payment, cardHolder: e.target.value })}
                        placeholder="J. Doe" />
                    </div>
                  </div>
                </div>
              )}

              {payment.method === "sepa" && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs text-[#64748b] block mb-1">IBAN</label>
                    <Input value={payment.iban} onChange={(e) => setPayment({ ...payment, iban: e.target.value })} placeholder="DE89 3704 0044 0532 0130 00" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#64748b] block mb-1">BIC</label>
                      <Input value={payment.bic} onChange={(e) => setPayment({ ...payment, bic: e.target.value })} placeholder="COBADEFFXXX" />
                    </div>
                    <div>
                      <label className="text-xs text-[#64748b] block mb-1">Account Holder</label>
                      <Input value={payment.accountHolder} onChange={(e) => setPayment({ ...payment, accountHolder: e.target.value })} placeholder="John Doe" />
                    </div>
                  </div>
                </div>
              )}

              {(payment.method === "paypal" || payment.method === "klarna") && (
                <div className="bg-[#f8fafc] rounded-lg p-4 text-sm text-[#64748b] text-center">
                  You will be redirected to {payment.method === "paypal" ? "PayPal" : "Klarna"} after clicking "Review Order".<br />
                  <em>(Demo: no real redirect)</em>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button variant="default" size="lg" onClick={() => setStep(3)} className="flex-1">
                  Review Order <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 space-y-5">
              <h2 className="font-semibold text-lg">Order Review</h2>

              <div className="bg-[#f8fafc] rounded-lg p-4 space-y-1">
                <p className="text-xs text-[#64748b] font-semibold uppercase tracking-wider">Delivery Address</p>
                <p className="text-sm">{address.firstName} {address.lastName}</p>
                <p className="text-sm">{address.street} {address.houseNo}, {address.zip} {address.city}</p>
                <p className="text-sm">{address.country}</p>
                <p className="text-sm text-[#64748b]">{address.email}</p>
              </div>

              <div className="bg-[#f8fafc] rounded-lg p-4">
                <p className="text-xs text-[#64748b] font-semibold uppercase tracking-wider mb-1">Payment</p>
                <p className="text-sm">{{ card: "Credit Card", paypal: "PayPal", klarna: "Klarna", sepa: "SEPA Direct Debit" }[payment.method]}</p>
              </div>

              <div className="space-y-2">
                {items.map(({ tire, quantity }) => (
                  <div key={tire.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f8fafc] rounded relative overflow-hidden shrink-0">
                      <Image src={tire.images[0]} alt={tire.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{tire.name}</p>
                      <p className="text-xs text-[#64748b]">{tire.size.fullSize} · {quantity}×</p>
                    </div>
                    <p className="text-sm font-semibold shrink-0">{formatPrice(tire.price * quantity)}</p>
                  </div>
                ))}
              </div>

              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-[#1e3a8a]" />
                <span>I have read and agree to the <a href="#" className="text-[#1e3a8a] hover:underline">Terms & Conditions</a>.</span>
              </label>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => { clearCart(); setStep(4); }}
                  disabled={!agree}
                  className="flex-1"
                >
                  Place Order (Mock) <Check className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f172a]">Thank you!</h2>
              <p className="text-[#64748b]">Your order <strong>{orderNumber}</strong> has been received.</p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                ⚠️ <strong>This is a demo website.</strong> No real order has been placed and no payment has been processed.
              </div>
              <p className="text-sm text-[#64748b]">A confirmation email has (fictionally) been sent to {address.email}.</p>
              <div className="flex gap-3 justify-center pt-2">
                <Button asChild variant="outline"><Link href="/tires">Continue Shopping</Link></Button>
                <Button asChild><Link href="/">Back to Home</Link></Button>
              </div>
            </div>
          )}
        </div>

        {/* Right: order summary */}
        {step < 4 && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
              <h3 className="font-semibold mb-3">Your Order</h3>
              <div className="space-y-2 mb-3">
                {items.map(({ tire, quantity }) => (
                  <div key={tire.id} className="flex justify-between text-sm">
                    <span className="text-[#64748b] truncate mr-2">{tire.model} ×{quantity}</span>
                    <span className="shrink-0">{formatPrice(tire.price * quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e2e8f0] pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
