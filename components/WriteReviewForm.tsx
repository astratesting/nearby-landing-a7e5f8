"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface WriteReviewFormProps {
  reviewedId: string;
  listingId?: string;
}

export default function WriteReviewForm({ reviewedId, listingId }: WriteReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    setError("");
    setSubmitting(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviewedId,
        listingId: listingId || null,
        rating,
        comment,
      }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to submit review.");
      return;
    }

    setSubmitted(true);
    router.refresh();
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-honey/10 bg-white p-6 text-center">
        <svg className="mx-auto mb-2 text-honey" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p className="font-manrope font-semibold text-product-charcoal">Review submitted!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-product-charcoal/5 bg-white p-5">
      <h4 className="font-manrope text-lg font-semibold text-product-charcoal mb-4">Write a Review</h4>

      {error && (
        <div className="mb-3 px-3 py-2 bg-coral/10 border border-coral/20 text-coral text-xs rounded-lg font-source-sans">{error}</div>
      )}

      {/* Star rating */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="text-2xl transition-colors"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill={(hoveredRating || rating) >= star ? "#FBBF24" : "none"}
              stroke={(hoveredRating || rating) >= star ? "#FBBF24" : "#D1D5DB"}
              strokeWidth="1.5"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
        {rating > 0 && (
          <span className="text-sm text-product-charcoal/50 ml-2 font-source-sans">{rating} / 5</span>
        )}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows={3}
        className="w-full px-4 py-3 rounded-xl border border-product-charcoal/10 text-sm text-product-charcoal placeholder:text-product-charcoal/30 focus:outline-none focus:border-violet/30 focus:ring-2 focus:ring-violet/10 transition-all resize-none mb-4 font-source-sans"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={rating === 0 || submitting}
        className="px-5 py-2.5 bg-violet text-white text-sm font-semibold font-manrope rounded-xl hover:bg-violet/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}