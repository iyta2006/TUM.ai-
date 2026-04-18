"use client";

import { TireFilters } from "@/lib/types";
import { getAllBrands, getAllSizes } from "@/lib/data/tires";
import { cn } from "@/lib/utils";

const categories = [
  { value: "summer", label: "Summer Tires" },
  { value: "winter", label: "Winter Tires" },
  { value: "all-season", label: "All-Season Tires" },
  { value: "performance", label: "Performance Tires" },
  { value: "off-road", label: "Off-Road / SUV" },
  { value: "eco", label: "Eco / EV" },
];

const vehicleTypes = [
  { value: "passenger", label: "Passenger Car" },
  { value: "suv", label: "SUV" },
  { value: "sports", label: "Sports Car" },
  { value: "van", label: "Van" },
  { value: "truck", label: "Truck" },
];

const grades = ["A", "B", "C", "D", "E"];

interface Props {
  filters: TireFilters;
  onChange: (filters: TireFilters) => void;
  onReset: () => void;
}

function CheckItem({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-[#e2e8f0] accent-[#1e3a8a]"
      />
      <span className={cn(checked ? "text-[#0f172a] font-medium" : "text-[#64748b]")}>{label}</span>
    </label>
  );
}

export default function TireFiltersPanel({ filters, onChange, onReset }: Props) {
  const brands = getAllBrands();
  const sizes = getAllSizes();

  const toggle = <K extends keyof TireFilters>(key: K, value: string) => {
    const arr = filters[key] as string[];
    onChange({
      ...filters,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#0f172a]">Filters</h2>
        <button onClick={onReset} className="text-xs text-[#1e3a8a] hover:underline">
          Reset all
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Category</h3>
        {categories.map((c) => (
          <CheckItem
            key={c.value}
            label={c.label}
            checked={filters.categories.includes(c.value as any)}
            onChange={() => toggle("categories", c.value)}
          />
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Brand</h3>
        {brands.map((b) => (
          <CheckItem
            key={b}
            label={b}
            checked={filters.brands.includes(b)}
            onChange={() => toggle("brands", b)}
          />
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
          Price: €{filters.priceMin} – €{filters.priceMax}
        </h3>
        <input
          type="range"
          min={50}
          max={550}
          step={10}
          value={filters.priceMax}
          onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
          className="w-full accent-[#1e3a8a]"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Vehicle Type</h3>
        {vehicleTypes.map((v) => (
          <CheckItem
            key={v.value}
            label={v.label}
            checked={filters.vehicleTypes.includes(v.value as any)}
            onChange={() => toggle("vehicleTypes", v.value)}
          />
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Width (mm)</h3>
        <select
          value={filters.widths[0] ?? ""}
          onChange={(e) =>
            onChange({ ...filters, widths: e.target.value ? [Number(e.target.value)] : [] })
          }
          className="w-full text-sm border border-[#e2e8f0] rounded-md px-3 py-2 bg-white"
        >
          <option value="">All</option>
          {sizes.widths.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>

        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b] pt-1">Rim Size (inch)</h3>
        <select
          value={filters.rimDiameters[0] ?? ""}
          onChange={(e) =>
            onChange({ ...filters, rimDiameters: e.target.value ? [Number(e.target.value)] : [] })
          }
          className="w-full text-sm border border-[#e2e8f0] rounded-md px-3 py-2 bg-white"
        >
          <option value="">All</option>
          {sizes.rimDiameters.map((r) => (
            <option key={r} value={r}>R{r}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Wet Grip (EU)</h3>
        <div className="flex gap-1">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => toggle("wetGrip", g)}
              className={cn(
                "w-8 h-8 rounded text-xs font-bold border transition-colors",
                filters.wetGrip.includes(g)
                  ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                  : "bg-white text-[#64748b] border-[#e2e8f0] hover:border-[#1e3a8a]"
              )}
            >
              {g}
            </button>
          ))}
        </div>

        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b] pt-1">Fuel Efficiency (EU)</h3>
        <div className="flex gap-1">
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => toggle("fuelEfficiency", g)}
              className={cn(
                "w-8 h-8 rounded text-xs font-bold border transition-colors",
                filters.fuelEfficiency.includes(g)
                  ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                  : "bg-white text-[#64748b] border-[#e2e8f0] hover:border-[#1e3a8a]"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Min. Rating</h3>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, minRating: filters.minRating === r ? 0 : r })}
              className={cn(
                "px-2.5 py-1 rounded text-xs font-medium border transition-colors",
                filters.minRating === r
                  ? "bg-amber-400 text-white border-amber-400"
                  : "bg-white text-[#64748b] border-[#e2e8f0] hover:border-amber-400"
              )}
            >
              {r}★+
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
