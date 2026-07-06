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
  searchParams: Promise<{ category?: string; search?: string; neighborhood?: string; sort?: string; tab?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?return=/dashboard");

  const params = await searchParams;
  const { category, search, neighborhood, sort, tab } = params;

  const activeTab = tab || "browse";

  const [allListings, myListings, soldListings, user, favorites] = await Promise.all([
    db.listing.findMany({
      where: { status: "ACTIVE" },
      include: { seller: { select: { id: true, name: true, trustScore: true, neighborhood: true } } },
      orderBy: { createdAt: "desc" },
      take: activeTab === "browse" ? 12 : 0,
    }),
    db.listing.findMany({
      where: { sellerId: session.user.id, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    }),
    db.listing.count({ where: { sellerId: session.user.id, status: "SOLD" } }),
    db.user.findUnique({ where: { id: session.user.id } }),
    db.favorite.findMany({
      where: { userId: session.user.id },
      select: { listingId: true },
    }),
  ]);

  const favoritedIds = new Set(favorites.map((f) => f.listingId));

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-manrope text-3xl font-bold text-product-charcoal">Dashboard</h1>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "My Listings", value: myListings.length, icon: "📦", color: "bg-violet/10 text-violet" },
            { label: "Total Sales", value: soldListings, icon: "💸", color: "bg-coral/10 text-coral" },
            { label: "Trust Score", value: `${(user?.trustScore ?? 0) / 10}`, icon: "⭐", color: "bg-honey/10 text-honey" },
            { label: "Favorites", value: favorites.length, icon: "❤️", color: "bg-coral/10 text-coral" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-product-charcoal/5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">{stat.icon}</span>
              </div>
              <p className="font-manrope text-2xl font-bold text-product-charcoal">{stat.value}</p>
              <p className="font-source-sans text-xs text-product-charcoal/50">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs: My Listings | Browse All */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 border border-product-charcoal/5 shadow-sm w-fit">
          {[
            { value: "my", label: "My Listings" },
            { value: "browse", label: "Browse All" },
          ].map((t) => (
            <Link
              key={t.value}
              href={t.value === "browse" ? "/dashboard?tab=browse" : "/dashboard"}
              className={`px-4 py-2 rounded-lg text-sm font-medium font-manrope transition-colors ${
                activeTab === t.value
                  ? "bg-violet text-white"
                  : "text-product-charcoal/50 hover:text-product-charcoal"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {activeTab === "my" ? (
          <>
            {/* My Listings */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-manrope text-xl font-bold text-product-charcoal">
                  My Listings
                  <span className="text-product-charcoal/30 font-normal ml-2">({myListings.length})</span>
                </h2>
                <Link href="/listings/new" className="text-sm text-violet font-medium font-manrope hover:text-violet/80 transition-colors">
                  + New Listing
                </Link>
              </div>
              {myListings.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-product-charcoal/5 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-violet/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                  </div>
                  <p className="font-manrope text-lg text-product-charcoal/40 mb-2">No active listings</p>
                  <p className="font-source-sans text-sm text-product-charcoal/30 mb-6">You haven't posted anything yet. Start selling to your neighbors!</p>
                  <Link href="/listings/new" className="inline-flex px-5 py-2.5 bg-violet text-white text-sm font-semibold font-manrope rounded-xl hover:bg-violet/90 transition-colors">
                    Create your first listing
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myListings.map((l) => (
                    <Link key={l.id} href={`/listings/${l.id}`} className="group bg-white rounded-xl p-4 border border-product-charcoal/5 hover:border-violet/20 hover:shadow-sm transition-all">
                      <div className="w-full aspect-square bg-gradient-to-br from-violet/5 to-honey/5 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-2xl font-bold text-violet/20 font-manrope">{l.title[0]}</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-manrope font-semibold text-sm text-product-charcoal group-hover:text-violet transition-colors leading-snug line-clamp-2">{l.title}</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-manrope font-bold text-coral">${Number(l.price).toFixed(0)}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-manrope font-medium">
                          {l.status === "ACTIVE" ? "Active" : l.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* My Purchases placeholder */}
            <div>
              <h2 className="font-manrope text-xl font-bold text-product-charcoal mb-4">My Purchases</h2>
              <div className="bg-white rounded-2xl p-10 text-center border border-product-charcoal/5 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-honey/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                  </svg>
                </div>
                <p className="font-manrope text-lg text-product-charcoal/40 mb-2">No purchases yet</p>
                <p className="font-source-sans text-sm text-product-charcoal/30">Items you buy from neighbors will appear here.</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Browse All */}
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
              neighborhoods={[]}
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
              {allListings.map((listing) => (
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
          </>
        )}
      </div>
    </div>
  );
}