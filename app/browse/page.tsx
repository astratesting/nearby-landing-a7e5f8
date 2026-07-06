import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import ListingCard from "@/components/ListingCard";
import FilterBar from "@/components/FilterBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Category } from "@prisma/client";

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string; neighborhood?: string; sort?: string }>;
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const session = await auth();
  const params = await searchParams;
  const { category, search, neighborhood, sort } = params;

  const where: any = { status: "ACTIVE" };
  if (category && Object.keys(Category).includes(category)) {
    where.category = category as Category;
  }
  if (neighborhood) {
    where.neighborhood = { contains: neighborhood, mode: "insensitive" };
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy: any = sort === "price_asc"
    ? { price: "asc" }
    : sort === "price_desc"
    ? { price: "desc" }
    : { createdAt: "desc" };

  const [listings, neighborhoods] = await Promise.all([
    db.listing.findMany({
      where,
      orderBy,
      include: { seller: { select: { id: true, name: true, trustScore: true, neighborhood: true } } },
    }),
    db.listing.findMany({
      where: { status: "ACTIVE" },
      select: { neighborhood: true },
      distinct: ["neighborhood"],
    }),
  ]);

  const uniqueNeighborhoods = neighborhoods.map((n) => n.neighborhood).filter(Boolean);

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-manrope text-3xl font-bold text-product-charcoal">Browse</h1>
            <p className="font-source-sans text-sm text-product-charcoal/50 mt-1">Find items from your neighbors</p>
          </div>
          {session?.user?.id ? (
            <Link href="/listings/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet text-white text-sm font-semibold font-manrope rounded-xl hover:bg-violet/90 transition-colors">
              + New Listing
            </Link>
          ) : (
            <Link href="/login" className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet text-white text-sm font-semibold font-manrope rounded-xl hover:bg-violet/90 transition-colors">
              Sign in to list
            </Link>
          )}
        </div>

        <FilterBar initialCategory={category} initialSearch={search} initialNeighborhood={neighborhood} initialSort={sort} neighborhoods={uniqueNeighborhoods as string[]} />

        {listings.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-manrope text-lg text-product-charcoal/40 mb-2">No listings found</p>
            <p className="font-source-sans text-sm text-product-charcoal/30">Try adjusting your filters</p>
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