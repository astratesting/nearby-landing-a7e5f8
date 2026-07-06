"use client";

import { useState, useRef, DragEvent } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
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

const CONDITIONS = [
  { value: "NEW", label: "New", desc: "Unopened, unused" },
  { value: "LIKE_NEW", label: "Like New", desc: "Used once or twice" },
  { value: "GOOD", label: "Good", desc: "Some wear, fully functional" },
  { value: "FAIR", label: "Fair", desc: "Visible wear, works fine" },
];

export default function CreateListingForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("ELECTRONICS");
  const [condition, setCondition] = useState("GOOD");
  const [neighborhood, setNeighborhood] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }
  function handleDragLeave() {
    setDragOver(false);
  }
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const url = e.dataTransfer.getData("text/uri-list") || e.dataTransfer.getData("text/plain");
    if (url && url.startsWith("http")) setImageUrl(url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        price: Number(price),
        category,
        condition,
        neighborhood,
        imageUrl: imageUrl || null,
        imageUrls: imageUrl ? [imageUrl] : [],
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create listing.");
      return;
    }

    const listing = await res.json();
    router.push(`/listings/${listing.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-product-charcoal/5 shadow-sm space-y-6">
      {error && (
        <div className="px-4 py-3 bg-coral/10 border border-coral/20 text-coral text-sm rounded-xl font-source-sans">{error}</div>
      )}

      {/* Image dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
          dragOver ? "border-violet bg-violet/5" : "border-product-charcoal/10 bg-warm-white"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        {imageUrl ? (
          <div className="space-y-2">
            <img src={imageUrl} alt="Preview" className="max-h-32 mx-auto rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <p className="text-xs text-product-charcoal/40 font-source-sans">{imageUrl}</p>
            <button type="button" onClick={(e) => { e.stopPropagation(); setImageUrl(""); }} className="text-xs text-coral hover:text-coral/80 font-medium">Remove</button>
          </div>
        ) : (
          <div className="space-y-2">
            <svg className="mx-auto text-product-charcoal/20" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p className="text-sm text-product-charcoal/40 font-source-sans">Drag & drop an image URL or paste below</p>
            <p className="text-xs text-product-charcoal/25 font-source-sans">Supports image URLs (jpg, png, webp)</p>
          </div>
        )}
        <input ref={fileInputRef} type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="hidden" />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Title *</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all"
          placeholder="e.g. Vintage denim jacket" />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">
          Description * <span className="text-product-charcoal/25 font-normal">({description.length}/500)</span>
        </label>
        <textarea required value={description} onChange={(e) => { if (e.target.value.length <= 500) setDescription(e.target.value); }} rows={4}
          className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all resize-none"
          placeholder="Describe your item — condition, brand, size, any notes... Max 500 characters." />
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Price *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-product-charcoal/40 font-source-sans text-sm">$</span>
            <input type="number" required min="1" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-7 pr-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all"
              placeholder="0.00" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Category *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all">
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
      </div>

      {/* Condition radio cards */}
      <div>
        <label className="block text-sm font-medium text-product-charcoal mb-3 font-manrope">Condition</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CONDITIONS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCondition(c.value)}
              className={`text-left p-3 rounded-xl border transition-all ${
                condition === c.value
                  ? "border-violet bg-violet/5 text-violet"
                  : "border-product-charcoal/10 bg-warm-white text-product-charcoal/60 hover:border-violet/30"
              }`}
            >
              <p className="text-sm font-semibold font-manrope">{c.label}</p>
              <p className="text-[11px] mt-0.5 font-source-sans opacity-70">{c.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Neighborhood */}
      <div>
        <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Neighborhood</label>
        <input type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}
          className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all"
          placeholder="e.g. Williamsburg" />
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading}
        className="w-full py-3 bg-violet text-white text-sm font-semibold font-manrope rounded-xl hover:bg-violet/90 transition-colors disabled:opacity-50">
        {loading ? "Creating listing..." : "Create Listing"}
      </button>
    </form>
  );
}