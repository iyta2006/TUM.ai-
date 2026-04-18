"use client";

import { useState, useMemo } from "react";
import { tires } from "@/lib/data/tires";
import { TireFilters, TireCategory, VehicleType } from "@/lib/types";
import TireCard from "@/components/TireCard";
import TireFiltersPanel from "@/components/TireFilters";
import { SlidersHorizontal, X } from "lucide-react";

const defaultFilters: TireFilters = {
  categories: [],
  brands: [],
  priceMin: 0,
  priceMax: 550,
  widths: [],
  aspectRatios: [],
  rimDiameters: [],
  vehicleTypes: [],
  minRating: 0,
  wetGrip: [],
  fuelEfficiency: [],
};

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Rating" },
];

export default function TiresPage() {
  const [filters, setFilters] = useState<TireFilters>(defaultFilters);
  const [sort, setSort] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = useMemo(() => {
    let result = tires.filter((t) => {
      if (filters.categories.length && !filters.categories.includes(t.category)) return false;
      if (filters.brands.length && !filters.brands.includes(t.brand)) return false;
      if (t.price < filters.priceMin || t.price > filters.priceMax) return false;
      if (filters.widths.length && !filters.widths.includes(t.size.width)) return false;
      if (filters.rimDiameters.length && !filters.rimDiameters.includes(t.size.rimDiameter)) return false;
      if (filters.vehicleTypes.length && !t.vehicleType.some((v) => filters.vehicleTypes.includes(v as VehicleType))) return false;
      if (filters.minRating && t.rating < filters.minRating) return false;
      if (filters.wetGrip.length && !filters.wetGrip.includes(t.performance.wetGrip)) return false;
      if (filters.fuelEfficiency.length && !filters.fuelEfficiency.includes(t.performance.fuelEfficiency)) return false;
      return true;
    });

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    else result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);

    return result;
  }, [filters, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    filters.vehicleTypes.length +
    filters.wetGrip.length +
    filters.fuelEfficiency.length +
    (filters.priceMax < 550 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    filters.widths.length +
    filters.rimDiameters.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0f172a]">Tire Catalog</h1>
        <p className="text-[#64748b] text-sm mt-1">{tires.length} tires from 10 premium brands</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop filters */}
        <div className="hidden lg:block">
          <TireFiltersPanel
            filters={filters}
            onChange={(f) => { setFilters(f); setPage(1); }}
            onReset={() => { setFilters(defaultFilters); setPage(1); }}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden flex items-center gap-1.5 text-sm font-medium border border-[#e2e8f0] px-3 py-2 rounded-lg hover:bg-[#f8fafc]"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {activeFilterCount > 0 && <span className="bg-[#1e3a8a] text-white text-xs rounded-full px-1.5">{activeFilterCount}</span>}
              </button>
              <span className="text-sm text-[#64748b]">{filtered.length} tires</span>
            </div>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="text-sm border border-[#e2e8f0] rounded-lg px-3 py-2 bg-white"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Grid */}
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-4xl mb-4">🔍</span>
              <h3 className="font-semibold text-[#0f172a]">No tires found</h3>
              <p className="text-sm text-[#64748b] mt-1">Try adjusting your filters or reset them.</p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-4 text-sm text-[#1e3a8a] hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginated.map((t) => <TireCard key={t.id} tire={t} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    page === i + 1
                      ? "bg-[#1e3a8a] text-white"
                      : "bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#1e3a8a]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
            </div>
            <TireFiltersPanel
              filters={filters}
              onChange={(f) => { setFilters(f); setPage(1); }}
              onReset={() => { setFilters(defaultFilters); setPage(1); setShowFilters(false); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
