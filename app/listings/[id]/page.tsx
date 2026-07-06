import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import StarRating from "@/components/StarRating";
import TrustBadge from "@/components/TrustBadge";
import ReviewList from "@/components/ReviewList";
import WriteReviewForm from "@/components/WriteReviewForm";
import { formatDistanceToNow } from "date-fns";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();

  const listing = await db.listing.findUnique({
    where: { id },
    include: { seller: true },
  });

  if (!listing) notFound();

  const reviews = await db.review.findMany({
    where: { reviewedId: listing.sellerId },
    include: { reviewer: { select: { id: true, name: true, trustScore: true } } },
    orderBy: { createdAt: "desc" },
  });

  const avgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const similarListings = await db.listing.findMany({
    where: {
      status: "ACTIVE",
      category: listing.category,
      id: { not: listing.id },
    },
    include: { seller: { select: { id: true, name: true, trustScore: true, neighborhood: true } } },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const hasReviewed = session?.user?.id
    ? reviews.some((r) => r.reviewerId === session.user!.id)
    : false;

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-product-charcoal/40 hover:text-violet transition-colors mb-6 font-source-sans">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10 12L6 8l4-4"/></svg>
          Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Image placeholder */}
            <div className="w-full aspect-square bg-gradient-to-br from-violet/5 to-honey/5 rounded-2xl flex items-center justify-center mb-6 border border-product-charcoal/5">
              {listing.imageUrl ? (
                <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1" opacity="0.3">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              )}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-violet/10 text-violet text-xs font-semibold rounded-full font-manrope">
                {listing.category.replace("_", " ")}
              </span>
              <span className="px-3 py-1 bg-product-charcoal/5 text-product-charcoal/60 text-xs rounded-full font-source-sans">
                {listing.condition.replace("_", " ")}
              </span>
              {listing.status !== "ACTIVE" && (
                <span className="px-3 py-1 bg-coral/10 text-coral text-xs font-semibold rounded-full font-manrope">
                  {listing.status}
                </span>
              )}
            </div>

            <h1 className="font-manrope text-3xl font-bold text-product-charcoal mb-4">{listing.title}</h1>
            <p className="text-4xl font-bold text-violet font-manrope mb-6">${Number(listing.price).toFixed(0)}</p>

            <div className="prose prose-sm max-w-none mb-8">
              <p className="text-product-charcoal/70 leading-relaxed font-source-sans whitespace-pre-wrap">{listing.description}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-product-charcoal/40 font-source-sans mb-8">
              <span>{listing.neighborhood}</span>
              <span>·</span>
              <span>Posted {formatDistanceToNow(listing.createdAt, { addSuffix: true })}</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Seller card */}
            <div className="bg-white rounded-2xl p-6 border border-product-charcoal/5 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet to-coral flex items-center justify-center text-white font-bold font-manrope text-lg">
                  {listing.seller.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <Link href={`/profile/${listing.sellerId}`} className="font-manrope font-semibold text-product-charcoal hover:text-violet transition-colors">
                    {listing.seller.name}
                  </Link>
                  <p className="text-xs text-product-charcoal/40 font-source-sans">{listing.seller.neighborhood}</p>
                </div>
              </div>
              <TrustBadge trustScore={listing.seller.trustScore} />
              <Link
                href={`/profile/${listing.sellerId}`}
                className="block w-full text-center py-2.5 mt-4 border border-violet/20 text-violet text-sm font-semibold font-manrope rounded-xl hover:bg-violet/5 transition-colors"
              >
                View Profile
              </Link>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 border border-product-charcoal/5 shadow-sm">
              <h3 className="font-manrope font-semibold text-product-charcoal mb-4">
                Reviews ({reviews.length})
              </h3>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={Math.round(avgRating)} size="sm" />
                  <span className="text-sm font-semibold text-product-charcoal font-manrope">{avgRating.toFixed(1)}</span>
                </div>
              )}
              <ReviewList reviews={reviews} />
              {session?.user?.id && session.user.id !== listing.sellerId && !hasReviewed && (
                <div className="mt-4 pt-4 border-t border-product-charcoal/5">
                  <WriteReviewForm reviewedId={listing.sellerId} listingId={listing.id} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar listings */}
        {similarListings.length > 0 && (
          <div className="mt-16">
            <h2 className="font-manrope text-2xl font-bold text-product-charcoal mb-6">Similar Items</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {similarListings.map((l) => (
                <Link key={l.id} href={`/listings/${l.id}`} className="group bg-white rounded-xl p-4 border border-product-charcoal/5 hover:border-violet/20 hover:shadow-sm transition-all">
                  <div className="w-full aspect-square bg-gradient-to-br from-violet/5 to-honey/5 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-2xl font-bold text-violet/20 font-manrope">{l.title[0]}</span>
                  </div>
                  <h3 className="font-manrope font-semibold text-sm text-product-charcoal group-hover:text-violet transition-colors leading-snug mb-1 line-clamp-2">{l.title}</h3>
                  <p className="font-manrope font-bold text-violet text-lg">${Number(l.price).toFixed(0)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}