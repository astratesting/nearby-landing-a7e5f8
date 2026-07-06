import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import FilterBar from "@/components/FilterBar";
import { redirect } from "next/navigation";

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

  const [listings, neighborhoods, user] = await Promise.all([
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
  ]);

  const uniqueNeighborhoods = Array.from(new Set(neighborhoods.map((n) => n.neighborhood))).filter(Boolean);

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-manrope text-3xl font-bold text-product-charcoal">
              Browse Listings
            </h1>
            <p className="font-source-sans text-sm text-product-charcoal/50 mt-1">
              {user ? `Welcome back, ${user.name?.split(" ")[0]}${user.neighborhood ? ` — ${user.neighborhood}` : ""}` : "Welcome"}
            </p>
          </div>
          <Link
            href="/listings/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet text-white text-sm font-semibold font-manrope rounded-xl hover:bg-violet/90 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="8" y1="1" x2="8" y2="15" /><line x1="1" y1="8" x2="15" y2="8" />
            </svg>
            New Listing
          </Link>
        </div>

        {/* Filters */}
        <FilterBar
          initialCategory={category}
          initialSearch={search}
          initialNeighborhood={neighborhood}
          initialSort={sort}
          neighborhoods={uniqueNeighborhoods as string[]}
        />

        {/* Location indicator */}
        {user?.neighborhood && (
          <div className="flex items-center gap-2 mb-6 px-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-sm text-product-charcoal/50 font-source-sans">
              Showing listings in and near <span className="text-violet font-medium">{user.neighborhood}</span>
            </span>
          </div>
        )}

        {/* Listings grid */}
        {listings.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-violet/10 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <p className="font-manrope text-lg text-product-charcoal/40 mb-2">No listings found</p>
            <p className="font-source-sans text-sm text-product-charcoal/30 mb-6">Try adjusting your filters or be the first to list something.</p>
            <Link href="/listings/new" className="text-violet font-medium text-sm hover:text-violet/80 transition-colors">
              Create a listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}