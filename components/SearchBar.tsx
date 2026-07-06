"use client";

interface SearchBarProps {
  defaultValue?: string;
  onSearch: (value: string) => void;
}

export default function SearchBar({ defaultValue = "", onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-product-charcoal/30"
        width="18"
        height="18"
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
        defaultValue={defaultValue}
        placeholder="Search listings..."
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch((e.target as HTMLInputElement).value);
        }}
        className="w-full pl-10 pr-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-sm text-product-charcoal placeholder:text-product-charcoal/30 focus:outline-none focus:border-violet focus:ring-2 focus:ring-violet/10 transition-all font-source-sans"
      />
    </div>
  );
}