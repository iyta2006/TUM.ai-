import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { tires, getTireById, getRelatedTires } from "@/lib/data/tires";
import { getReviewsForTire } from "@/lib/data/reviews";
import { formatPrice, formatMileage } from "@/lib/utils";
import TireCard from "@/components/TireCard";
import AddToCartButton from "./AddToCartButton";
import { CheckCircle, Star, Shield, Truck, RotateCcw } from "lucide-react";

export async function generateStaticParams() {
  return tires.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const tire = getTireById(id);
  if (!tire) return { title: "Tire not found" };
  return {
    title: `${tire.name} ${tire.size.fullSize}`,
    description: tire.description,
  };
}

const gradeColor: Record<string, string> = {
  A: "bg-green-600 text-white",
  B: "bg-lime-500 text-white",
  C: "bg-yellow-400 text-black",
  D: "bg-orange-500 text-white",
  E: "bg-red-600 text-white",
};

const categoryLabels: Record<string, string> = {
  summer: "Summer Tire",
  winter: "Winter Tire",
  "all-season": "All-Season Tire",
  performance: "Performance Tire",
  "off-road": "Off-Road",
  eco: "Eco / EV",
};

export default async function TireDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tire = getTireById(id);
  if (!tire) notFound();

  const related = getRelatedTires(tire);
  const reviews = getReviewsForTire(tire.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#64748b] mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[#1e3a8a]">Home</Link>
        <span>/</span>
        <Link href="/tires" className="hover:text-[#1e3a8a]">Tire Catalog</Link>
        <span>/</span>
        <span className="text-[#0f172a]">{tire.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Image */}
        <div>
          <div className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] aspect-square relative overflow-hidden">
            <Image
              src={tire.images[0]}
              alt={tire.name}
              fill
              className="object-contain p-8"
              priority
            />
            {tire.tags.includes("sale") && (
              <span className="absolute top-4 left-4 bg-[#f97316] text-white text-xs font-bold px-3 py-1 rounded-full">SALE</span>
            )}
            {tire.tags.includes("bestseller") && (
              <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">BESTSELLER</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-semibold text-[#1e3a8a]">{tire.brand}</p>
            <h1 className="text-2xl font-bold text-[#0f172a] mt-0.5">{tire.name}</h1>
            <p className="text-[#64748b] text-sm mt-1">{tire.size.fullSize} · Load Index {tire.loadIndex} · {tire.speedRating}-rated · {categoryLabels[tire.category]}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(tire.rating) ? "fill-amber-400 text-amber-400" : "text-[#e2e8f0]"}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{tire.rating}</span>
            <span className="text-sm text-[#64748b]">({tire.reviewCount} reviews)</span>
          </div>

          {/* EU Label */}
          <div className="flex gap-4 p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
            <div className="text-center">
              <p className="text-xs text-[#64748b] mb-1">Wet Grip</p>
              <span className={`text-lg font-bold px-3 py-1 rounded ${gradeColor[tire.performance.wetGrip]}`}>
                {tire.performance.wetGrip}
              </span>
            </div>
            <div className="w-px bg-[#e2e8f0]" />
            <div className="text-center">
              <p className="text-xs text-[#64748b] mb-1">Fuel Efficiency</p>
              <span className={`text-lg font-bold px-3 py-1 rounded ${gradeColor[tire.performance.fuelEfficiency]}`}>
                {tire.performance.fuelEfficiency}
              </span>
            </div>
            <div className="w-px bg-[#e2e8f0]" />
            <div className="text-center">
              <p className="text-xs text-[#64748b] mb-1">Noise Level</p>
              <span className="text-lg font-bold text-[#0f172a]">{tire.performance.noiseLevel} dB</span>
            </div>
          </div>

          <p className="text-sm text-[#64748b] leading-relaxed">{tire.description}</p>

          <ul className="space-y-1.5">
            {tire.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {tire.features.map((f) => (
              <span key={f} className="text-xs border border-[#e2e8f0] rounded-full px-3 py-1 text-[#64748b]">{f}</span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-4">
            <div className="flex items-baseline gap-2 mb-3">
              {tire.originalPrice && (
                <span className="text-sm text-[#64748b] line-through">{formatPrice(tire.originalPrice)}</span>
              )}
              <span className="text-3xl font-bold text-[#0f172a]">{formatPrice(tire.price)}</span>
              <span className="text-sm text-[#64748b]">/ tire · incl. 19% VAT</span>
            </div>
            {tire.stock < 10 && (
              <p className="text-xs text-amber-600 font-medium mb-2">⚠ Only {tire.stock} left in stock</p>
            )}
            <AddToCartButton tire={tire} />
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#1e3a8a]" />
                <span className="text-xs text-[#64748b]">Free shipping from €200</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-[#1e3a8a]" />
                <span className="text-xs text-[#64748b]">{tire.warranty.years}-year warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#1e3a8a]" />
                <span className="text-xs text-[#64748b]">14-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Specs */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 mb-10">
        <h2 className="font-bold text-lg mb-4">Technical Specifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { label: "Size", value: tire.size.fullSize },
            { label: "Width", value: `${tire.size.width} mm` },
            { label: "Aspect Ratio", value: `${tire.size.aspectRatio}%` },
            { label: "Rim Diameter", value: `R${tire.size.rimDiameter}"` },
            { label: "Load Index", value: tire.loadIndex },
            { label: "Speed Rating", value: tire.speedRating },
            { label: "Wet Grip", value: tire.performance.wetGrip },
            { label: "Fuel Efficiency", value: tire.performance.fuelEfficiency },
            { label: "Noise Class", value: `Class ${tire.performance.noiseClass}` },
            { label: "Noise Level", value: `${tire.performance.noiseLevel} dB` },
            { label: "Season", value: tire.seasonOptimal },
            { label: "Warranty", value: `${tire.warranty.years} years / ${formatMileage(tire.warranty.mileage)}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#f8fafc] rounded-lg p-3">
              <p className="text-xs text-[#64748b] mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-[#0f172a]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-10">
        <h2 className="font-bold text-lg mb-4">Customer Reviews ({reviews.length})</h2>
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border border-[#e2e8f0] p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-[#e2e8f0]"}`} />
                    ))}
                  </div>
                  <p className="font-semibold text-sm">{r.title}</p>
                </div>
                <div className="text-right text-xs text-[#64748b] shrink-0">
                  <p>{r.author}</p>
                  <p>{r.date}</p>
                  {r.verified && <span className="text-green-600">✓ Verified</span>}
                </div>
              </div>
              <p className="text-sm text-[#64748b] leading-relaxed">{r.body}</p>
              <p className="text-xs text-[#64748b] mt-2">Vehicle: {r.vehicleModel}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="font-bold text-lg mb-4">Related Tires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((t) => <TireCard key={t.id} tire={t} />)}
          </div>
        </div>
      )}
    </div>
  );
}
