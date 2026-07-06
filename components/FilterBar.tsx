"use client";

import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "FURNITURE", label: "Furniture" },
  { value: "CLOTHING", label: "Clothing" },
  { value: "BABY_GEAR", label: "Baby Gear" },
  { value: "SPORTS", label: "Sports" },
  { value: "BOOKS", label: "Books" },
  { value: "HOME_GARDEN", label: "Home & Garden" },
  { value: "TOYS", label: "Toys" },
  { value: "VEHICLES", label: "Vehicles" },
  { value: "OTHER", label: "Other" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "nearest", label: "Nearest" },
];

interface FilterBarProps {
  initialCategory?: string;
  initialSearch?: string;
  initialNeighborhood?: string;
  initialSort?: string;
  neighborhoods?: string[];
}

export default function FilterBar({
  initialCategory = "",
  initialSearch = "",
  initialNeighborhood = "",
  initialSort = "newest",
  neighborhoods = [],
}: FilterBarProps) {
  const router = useRouter();

  function updateFilters(updates: Record<string, string>) {
    const params = new URLSearchParams();
    const current = {
      category: initialCategory,
      search: initialSearch,
      neighborhood: initialNeighborhood,
      sort: initialSort,
      ...updates,
    };
    if (current.category) params.set("category", current.category);
    if (current.search) params.set("search", current.search);
    if (current.neighborhood) params.set("neighborhood", current.neighborhood);
    if (current.sort && current.sort !== "newest") params.set("sort", current.sort);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="mb-6 space-y-3">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1F2937]/30"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          defaultValue={initialSearch}
          placeholder="Search listings..."
          onChange={(e) => {
            const timer = setTimeout(() => {}, 300);
            clearTimeout(timer as unknown as number);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateFilters({ search: (e.target as HTMLInputElement).value });
            }
          }}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#FBBF24]/10 bg-white text-sm text-[#1F2937] placeholder:text-[#1F2937]/30 focus:outline-none focus:border-violet/30 focus:ring-2 focus:ring-violet/10 transition-all"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => updateFilters({ category: initialCategory === cat.value ? "" : cat.value })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              (cat.value === "" && !initialCategory) || initialCategory === cat.value
                ? "bg-violet text-white"
                : "bg-white border border-[#FBBF24]/10 text-[#1F2937]/60 hover:border-violet/30 hover:text-violet"
            }`}
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort + neighborhood filter row */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={initialSort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="px-3 py-2 rounded-xl border border-[#FBBF24]/10 bg-white text-sm text-[#1F2937] focus:outline-none focus:border-violet/30 transition-all"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {neighborhoods.length > 0 && (
          <select
            value={initialNeighborhood}
            onChange={(e) => updateFilters({ neighborhood: e.target.value })}
            className="px-3 py-2 rounded-xl border border-[#FBBF24]/10 bg-white text-sm text-[#1F2937] focus:outline-none focus:border-violet/30 transition-all"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <option value="">All neighborhoods</option>
            {neighborhoods.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}