"use client";

import { useState } from "react";
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

const CONDITIONS = ["NEW", "LIKE_NEW", "GOOD", "FAIR"];

export default function CreateListingForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("ELECTRONICS");
  const [condition, setCondition] = useState("GOOD");
  const [neighborhood, setNeighborhood] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-product-charcoal/5 shadow-sm space-y-5">
      {error && (
        <div className="px-4 py-3 bg-coral/10 border border-coral/20 text-coral text-sm rounded-xl font-source-sans">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Title *</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all"
          placeholder="e.g. Vintage denim jacket" />
      </div>

      <div>
        <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Description *</label>
        <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
          className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all resize-none"
          placeholder="Describe your item — condition, brand, size, any notes..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Price ($) *</label>
          <input type="number" required min="1" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all"
            placeholder="0.00" />
        </div>
        <div>
          <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Category *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all">
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Condition</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)}
            className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all">
            {CONDITIONS.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Neighborhood</label>
          <input type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all"
            placeholder="e.g. Williamsburg" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-product-charcoal mb-1.5 font-manrope">Image URL</label>
        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-3 bg-warm-white border border-product-charcoal/10 rounded-xl text-product-charcoal text-sm font-source-sans focus:border-violet focus:ring-2 focus:ring-violet/10 outline-none transition-all"
          placeholder="https://example.com/photo.jpg" />
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-3 bg-violet text-white text-sm font-semibold font-manrope rounded-xl hover:bg-violet/90 transition-colors disabled:opacity-50">
        {loading ? "Creating listing..." : "Create Listing"}
      </button>
    </form>
  );
}