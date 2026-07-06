"use client";

import Link from "next/link";
import { useState } from "react";

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    imageUrl: string | null;
    imageUrls: string;
    neighborhood: string;
    status: string;
    createdAt: Date | string;
    seller: {
      id: string;
      name: string;
      trustScore: number;
      neighborhood: string;
    };
  };
  isFavorited?: boolean;
  onToggleFavorite?: (listingId: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  ELECTRONICS: "Electronics",
  FURNITURE: "Furniture",
  CLOTHING: "Clothing",
  BABY_GEAR: "Baby Gear",
  SPORTS: "Sports",
  BOOKS: "Books",
  HOME_GARDEN: "Home & Garden",
  TOYS: "Toys",
  VEHICLES: "Vehicles",
  OTHER: "Other",
};

const CONDITION_BADGES: Record<string, { label: string; color: string }> = {
  NEW: { label: "New", color: "bg-emerald-100 text-emerald-700" },
  LIKE_NEW: { label: "Like New", color: "bg-blue-100 text-blue-700" },
  GOOD: { label: "Good", color: "bg-amber-100 text-amber-700" },
  FAIR: { label: "Fair", color: "bg-orange-100 text-orange-700" },
};

export default function ListingCard({ listing, isFavorited = false, onToggleFavorite }: ListingCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative">
      <Link
        href={`/listings/${listing.id}`}
        className="block rounded-2xl border border-product-charcoal/5 bg-white overflow-hidden hover:shadow-lg hover:border-violet/20 transition-all duration-200"
      >
        {/* Image */}
        <div className="aspect-[4/3] bg-gradient-to-br from-coral/10 via-coral/5 to-honey/5 flex items-center justify-center overflow-hidden relative">
          {listing.imageUrl && !imgError ? (
            <img
              src={listing.imageUrl}
              alt={listing.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-coral/25">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-xs font-medium font-manrope">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-manrope font-semibold text-product-charcoal text-sm leading-snug line-clamp-2">
              {listing.title}
            </h3>
            <span className="flex-shrink-0 font-manrope font-bold text-coral text-base">
              ${listing.price.toFixed(0)}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-honey/10 text-honey font-manrope font-medium">
              {CATEGORY_LABELS[listing.category] || listing.category}
            </span>
            {CONDITION_BADGES[listing.condition] && (
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-manrope font-medium ${CONDITION_BADGES[listing.condition].color}`}>
                {CONDITION_BADGES[listing.condition].label}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-product-charcoal/50">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-source-sans">{listing.neighborhood}</span>
            </div>
            {listing.seller.trustScore > 0 && (
              <div className="flex items-center gap-1 text-xs text-honey font-semibold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-honey">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-manrope">{listing.seller.trustScore}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Favorite heart button */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(listing.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFavorited ? "#F472B6" : "none"}
            stroke={isFavorited ? "#F472B6" : "#1F2937"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      )}
    </div>
  );
}