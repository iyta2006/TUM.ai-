"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Tire } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  summer: "Summer",
  winter: "Winter",
  "all-season": "All-Season",
  performance: "Performance",
  "off-road": "Off-Road",
  eco: "Eco/EV",
};

const categoryVariants: Record<string, "summer" | "winter" | "all-season" | "performance" | "off-road" | "eco"> = {
  summer: "summer",
  winter: "winter",
  "all-season": "all-season",
  performance: "performance",
  "off-road": "off-road",
  eco: "eco",
};

function EULabel({ grade, label }: { grade: string; label: string }) {
  const colors: Record<string, string> = {
    A: "bg-green-600",
    B: "bg-lime-500",
    C: "bg-yellow-400 text-black",
    D: "bg-orange-500",
    E: "bg-red-600",
  };
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="text-[#64748b]">{label}</span>
      <span className={`${colors[grade] ?? "bg-gray-400"} text-white px-1.5 py-0.5 rounded text-xs font-bold`}>
        {grade}
      </span>
    </div>
  );
}

interface TireCardProps {
  tire: Tire;
  compact?: boolean;
}

export default function TireCard({ tire, compact = false }: TireCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group bg-white rounded-xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/tires/${tire.id}`} className="block">
        <div className="relative bg-[#f8fafc] rounded-t-xl overflow-hidden aspect-square">
          <Image
            src={tire.images[0]}
            alt={tire.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {tire.tags.includes("sale") && (
              <span className="bg-[#f97316] text-white text-xs font-bold px-2 py-0.5 rounded">SALE</span>
            )}
            {tire.tags.includes("new") && (
              <span className="bg-[#1e3a8a] text-white text-xs font-bold px-2 py-0.5 rounded">NEW</span>
            )}
            {tire.tags.includes("bestseller") && (
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">BESTSELLER</span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-[#64748b] font-medium">{tire.brand}</p>
              <Link href={`/tires/${tire.id}`}>
                <h3 className="font-semibold text-[#0f172a] text-sm leading-tight hover:text-[#1e3a8a] transition-colors">
                  {tire.model}
                </h3>
              </Link>
            </div>
            <Badge variant={categoryVariants[tire.category]} className="shrink-0 text-xs">
              {categoryLabels[tire.category]}
            </Badge>
          </div>
          <p className="text-xs text-[#64748b] mt-1">{tire.size.fullSize} · {tire.speedRating}-rated</p>
        </div>

        {!compact && (
          <div className="flex gap-3">
            <EULabel grade={tire.performance.wetGrip} label="Wet grip" />
            <EULabel grade={tire.performance.fuelEfficiency} label="Efficiency" />
          </div>
        )}

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.round(tire.rating) ? "fill-amber-400 text-amber-400" : "text-[#e2e8f0]"}`}
            />
          ))}
          <span className="text-xs text-[#64748b] ml-1">{tire.rating} ({tire.reviewCount})</span>
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div>
            {tire.originalPrice && (
              <p className="text-xs text-[#64748b] line-through">{formatPrice(tire.originalPrice)}</p>
            )}
            <p className="text-lg font-bold text-[#0f172a]">{formatPrice(tire.price)}</p>
            <p className="text-xs text-[#64748b]">per tire · incl. VAT</p>
          </div>
          <Button
            size="sm"
            variant="accent"
            onClick={() => addItem(tire)}
            className="shrink-0"
            aria-label={`Add ${tire.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>

        {tire.stock < 10 && (
          <p className="text-xs text-amber-600 font-medium">⚠ Only {tire.stock} left in stock</p>
        )}
      </div>
    </div>
  );
}
