"use client";

import { useState } from "react";

interface WriteReviewFormProps {
  reviewedId: string;
  listingId?: string;
}

export default function WriteReviewForm({ reviewedId, listingId }: WriteReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitting(true);
    // In a real app, POST to /api/reviews
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-[#F59E0B]/10 bg-white p-6 text-center">
        <p className="font-manrope font-semibold text-violet">Review submitted!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-[#F59E0B]/10 bg-white p-5">
      <h4 className="font-manrope text-lg font-semibold text-product-charcoal mb-4">Write a Review</h4>

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
              fill={(hoveredRating || rating) >= star ? "#F59E0B" : "none"}
              stroke={(hoveredRating || rating) >= star ? "#F59E0B" : "#D1D5DB"}
              strokeWidth="1.5"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
        {rating > 0 && (
          <span className="text-sm text-product-charcoal/50 ml-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {rating} / 5
          </span>
        )}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows={3}
        className="w-full px-4 py-3 rounded-xl border border-[#F59E0B]/10 text-sm text-product-charcoal placeholder:text-product-charcoal/30 focus:outline-none focus:border-violet/30 focus:ring-2 focus:ring-violet/10 transition-all resize-none mb-4"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
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