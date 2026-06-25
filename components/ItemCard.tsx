import Link from 'next/link';
import type { Listing, User } from '@/lib/types';
import { store } from '@/lib/store';

export default function ItemCard({ listing }: { listing: Listing }) {
  const seller = store.findById(listing.sellerId);
  const trust = store.computeTrustScore(listing.sellerId);

  return (
    <Link href={`/items/${listing.id}`} className="group block">
      <div className="bg-cream border border-mist rounded-sm overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
        <div className="aspect-square bg-mist flex items-center justify-center">
          {listing.photoUrl ? (
            <img
              src={listing.photoUrl}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-heading text-stone/40">
              {listing.title[0]}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-heading text-lg text-charcoal leading-snug mb-1 group-hover:text-gold transition-colors duration-150">
            {listing.title}
          </h3>
          <p className="text-gold font-heading text-xl mb-2">
            ${listing.price}
          </p>
          <div className="flex items-center gap-2 text-xs text-stone">
            <span className="px-2 py-0.5 bg-ivory border border-mist rounded-sm capitalize">
              {listing.category}
            </span>
            <span>{listing.neighborhood}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
