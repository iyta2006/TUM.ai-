"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Tire } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  addItem: (tire: Tire, quantity?: number) => void;
  removeItem: (tireId: string) => void;
  updateQuantity: (tireId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (tire, quantity = 4) => {
        const existing = get().items.find((i) => i.tire.id === tire.id);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.tire.id === tire.id ? { ...i, quantity: i.quantity + quantity } : i
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, { tire, quantity }] }));
        }
      },

      removeItem: (tireId) =>
        set((s) => ({ items: s.items.filter((i) => i.tire.id !== tireId) })),

      updateQuantity: (tireId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(tireId);
          return;
        }
        set((s) => ({
          items: s.items.map((i) =>
            i.tire.id === tireId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.tire.price * i.quantity, 0),
    }),
    { name: "premiumtire-cart" }
  )
);
