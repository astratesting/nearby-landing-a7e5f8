import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import StarRating from "@/components/StarRating";
import TrustBadge from "@/components/TrustBadge";
import ReviewList from "@/components/ReviewList";
import WriteReviewForm from "@/components/WriteReviewForm";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();
  const isOwn = session?.user?.id === id;

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      neighborhood: true,
      avatarUrl: true,
      bio: true,
      trustScore: true,
      isVerified: true,
      createdAt: true,
    },
  });

  if (!user) notFound();

  const [listings, reviews] = await Promise.all([
    db.listing.findMany({
      where: { sellerId: id, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      take: 12,
    }),
    db.review.findMany({
      where: { reviewedId: id },
      include: { reviewer: { select: { id: true, name: true, trustScore: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const avgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return { star, count, pct: reviews.length > 0 ? (count / reviews.length) * 100 : 0 };
  });

  const hasReviewed = session?.user?.id && session.user.id !== id
    ? reviews.some((r) => r.reviewerId === session.user!.id)
    : true;

  const trustLevel = user.trustScore >= 40 ? "Community Pillar"
    : user.trustScore >= 25 ? "Trusted Neighbor"
    : user.trustScore >= 10 ? "Verified Neighbor"
    : "Newcomer";

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Profile header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-product-charcoal/5 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet to-coral flex items-center justify-center text-white font-bold font-manrope text-2xl flex-shrink-0">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-manrope text-2xl font-bold text-product-charcoal">{user.name}</h1>
                {user.isVerified && (
                  <span className="px-2.5 py-0.5 bg-violet/10 text-violet text-xs font-semibold rounded-full font-manrope">Verified</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-product-charcoal/50 font-source-sans mb-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {user.neighborhood || "Neighborhood not set"}
                <span>·</span>
                <span>Member since {format(user.createdAt, "MMM yyyy")}</span>
              </div>
              {user.bio && (
                <p className="text-sm text-product-charcoal/60 font-source-sans mb-4">{user.bio}</p>
              )}
              <div className="flex flex-wrap items-center gap-4">
                <TrustBadge trustScore={user.trustScore} reviewCount={reviews.length} isVerified={user.isVerified} />
                <span className="text-sm text-product-charcoal/40 font-source-sans">{trustLevel}</span>
              </div>
            </div>
            {isOwn && (
              <Link href="/profile" className="px-4 py-2 border border-violet/20 text-violet text-sm font-semibold font-manrope rounded-xl hover:bg-violet/5 transition-colors whitespace-nowrap">
                Edit Profile
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listings */}
          <div className="lg:col-span-2">
            <h2 className="font-manrope text-xl font-bold text-product-charcoal mb-4">
              {isOwn ? "Your Listings" : "Listings"}
              <span className="text-product-charcoal/30 font-normal ml-2">({listings.length})</span>
            </h2>
            {listings.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-product-charcoal/5">
                <div className="w-12 h-12 rounded-full bg-violet/5 flex items-center justify-center mx-auto mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                </div>
                <p className="text-product-charcoal/40 font-source-sans text-sm">No active listings</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listings.map((l) => (
                  <Link key={l.id} href={`/listings/${l.id}`} className="group bg-white rounded-xl p-4 border border-product-charcoal/5 hover:border-violet/20 hover:shadow-sm transition-all">
                    <div className="w-full aspect-square bg-gradient-to-br from-violet/5 to-honey/5 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-xl font-bold text-violet/20 font-manrope">{l.title[0]}</span>
                    </div>
                    <h3 className="font-manrope font-semibold text-sm text-product-charcoal group-hover:text-violet transition-colors leading-snug mb-1 line-clamp-2">{l.title}</h3>
                    <p className="font-manrope font-bold text-violet">${Number(l.price).toFixed(0)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Reviews sidebar */}
          <div>
            <h2 className="font-manrope text-xl font-bold text-product-charcoal mb-4">
              Reviews <span className="text-product-charcoal/30 font-normal">({reviews.length})</span>
            </h2>
            <div className="bg-white rounded-2xl p-6 border border-product-charcoal/5 shadow-sm">
              {reviews.length > 0 ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-manrope text-3xl font-bold text-product-charcoal">{avgRating.toFixed(1)}</span>
                    <div>
                      <StarRating rating={Math.round(avgRating)} size="sm" />
                      <p className="text-xs text-product-charcoal/40 font-source-sans mt-0.5">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    {ratingBreakdown.map(({ star, pct }) => (
                      <div key={star} className="flex items-center gap-2 text-sm">
                        <span className="w-8 text-product-charcoal/50 font-source-sans text-right">{star}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <div className="flex-1 h-2 bg-product-charcoal/5 rounded-full overflow-hidden">
                          <div className="h-full bg-honey rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-6 text-xs text-product-charcoal/30 font-source-sans">{Math.round(pct)}%</span>
                      </div>
                    ))}
                  </div>
                  <ReviewList reviews={reviews.slice(0, 5)} compact />
                </>
              ) : (
                <p className="text-sm text-product-charcoal/40 font-source-sans text-center py-4">No reviews yet</p>
              )}

              {session?.user?.id && session.user.id !== id && !hasReviewed && (
                <div className="mt-4 pt-4 border-t border-product-charcoal/5">
                  <WriteReviewForm reviewedId={id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}