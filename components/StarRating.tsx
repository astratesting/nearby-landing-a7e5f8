"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ rating, onChange, size = "md" }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const interactive = !!onChange;

  const sizes = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-6 h-6" };
  const sizeClass = sizes[size];

  return (
    <div className={`flex gap-0.5 ${interactive ? "cursor-pointer" : ""}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} ${interactive ? "transition-transform hover:scale-110" : ""}`}
          viewBox="0 0 24 24"
          fill={(hover || rating) >= star ? "#F59E0B" : "#E2E8F0"}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}