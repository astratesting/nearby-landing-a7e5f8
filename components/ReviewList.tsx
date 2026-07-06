import ReviewCard from "./ReviewCard";

interface ReviewItem {
  id: string;
  rating: number;
  comment: string;
  reviewer: { id: string; name: string; trustScore?: number };
  createdAt: Date;
}

interface ReviewListProps {
  reviews: ReviewItem[];
  compact?: boolean;
}

export default function ReviewList({ reviews, compact }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-sm text-product-charcoal/40 font-source-sans text-center py-4">No reviews yet.</p>;
  }

  return (
    <div className="divide-y divide-product-charcoal/5">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} compact={compact} />
      ))}
    </div>
  );
}