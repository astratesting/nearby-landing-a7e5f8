import StarRating from "./StarRating";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    comment: string;
    reviewer: { id: string; name: string; trustScore?: number };
    createdAt: Date;
  };
  compact?: boolean;
}

export default function ReviewCard({ review, compact }: ReviewCardProps) {
  return (
    <div className={`${compact ? "py-2" : "py-3"} border-b border-product-charcoal/5 last:border-b-0`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet/30 to-coral/30 flex items-center justify-center text-product-charcoal font-bold font-manrope text-xs flex-shrink-0">
          {review.reviewer.name?.[0]?.toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/profile/${review.reviewer.id}`} className="font-manrope font-semibold text-sm text-product-charcoal hover:text-violet transition-colors">
              {review.reviewer.name}
            </Link>
            <StarRating rating={review.rating} size="sm" />
          </div>
          {!compact && <p className="text-sm text-product-charcoal/60 font-source-sans leading-relaxed">{review.comment}</p>}
          <p className="text-[11px] text-product-charcoal/30 font-source-sans mt-1">
            {formatDistanceToNow(review.createdAt, { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
}