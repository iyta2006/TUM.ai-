"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Tire } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ tire }: { tire: Tire }) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(4);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(tire, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm text-[#64748b] shrink-0">Quantity:</label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm bg-white"
        >
          {[1, 2, 4, 8, 16, 20].map((n) => (
            <option key={n} value={n}>{n} tire{n > 1 ? "s (set)" : ""}</option>
          ))}
        </select>
        <span className="text-sm text-[#64748b]">= {(tire.price * quantity).toLocaleString("en-GB", { style: "currency", currency: "EUR" })}</span>
      </div>
      <Button
        variant={added ? "secondary" : "accent"}
        size="lg"
        onClick={handleAdd}
        className="w-full"
      >
        {added ? (
          <><Check className="w-5 h-5" /> Added!</>
        ) : (
          <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
        )}
      </Button>
    </div>
  );
}
