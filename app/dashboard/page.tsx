import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import FilterBar from "@/components/FilterBar";
import ListingGrid from "@/components/ListingGrid";
import LocationBadge from "@/components/LocationBadge";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const VALID_CATEGORIES = ["ELECTRONICS", "FURNITURE", "CLOTHING", "BABY_GEAR", "SPORTS", "BOOKS", "HOME_GARDEN", "TOYS", "VEHICLES", "OTHER"];

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string; neighborhood?: string; sort?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?return=/dashboard");

  const params = await searchParams;
  const { category, search, neighborhood, sort } = params;

  const where: any = { status: "ACTIVE" };
  if (category && VALID_CATEGORIES.includes(category)) {
    where.category = category;
  }
  if (neighborhood) {
    where.neighborhood = { contains: neighborhood };
  }
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const orderBy: any = sort === "price_asc"
    ? { price: "asc" }
    : sort === "price_desc"
    ? { price: "desc" }
    : { createdAt: "desc" };

  const [listings, neighborhoods, user, favorites] = await Promise.all([
    db.listing.findMany({
      where,
      orderBy,
      include: { seller: { select: { id: true, name: true, trustScore: true, neighborhood: true } } },
    }),
    db.listing.findMany({
      where: { status: "ACTIVE" },
      select: { neighborhood: true },
      take: 100,
    }),
    db.user.findUnique({ where: { id: session.user.id } }),
    db.favorite.findMany({
      where: { userId: session.user.id },
      select: { listingId: true },
    }),
  ]);

  const uniqueNeighborhoods = Array.from(new Set(neighborhoods.map((n) => n.neighborhood))).filter(Boolean);
  const favoritedIds = new Set(favorites.map((f) => f.listingId));

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-manrope text-3xl font-bold text-product-charcoal">
              Browse Listings
            </h1>
            <p className="font-source-sans text-sm text-product-charcoal/50 mt-1">
              {user ? `Welcome back, ${user.name?.split(" ")[0]}` : "Welcome"}
            </p>
          </div>
          <Link
            href="/listings/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet text-white text-sm font-semibold font-manrope rounded-xl hover:bg-violet/90 transition-colors self-start"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="8" y1="1" x2="8" y2="15" /><line x1="1" y1="8" x2="15" y2="8" />
            </svg>
            New Listing
          </Link>
        </div>

        {user?.neighborhood && (
          <div className="mb-4">
            <LocationBadge neighborhood={user.neighborhood} />
          </div>
        )}

        <FilterBar
          initialCategory={category}
          initialSearch={search}
          initialNeighborhood={neighborhood}
          initialSort={sort}
          neighborhoods={uniqueNeighborhoods as string[]}
        />

        <ListingGrid
          emptyMessage="No listings found"
          emptySubmessage="Try adjusting your filters or be the first to list something."
          emptyAction={
            <Link href="/listings/new" className="text-violet font-medium text-sm hover:text-violet/80 transition-colors">
              Create a listing
            </Link>
          }
        >
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isFavorited={favoritedIds.has(listing.id)}
              onToggleFavorite={(listingId) => {
                fetch("/api/favorites", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ listingId }),
                });
              }}
            />
          ))}
        </ListingGrid>
      </div>
    </div>
  );
}