import { ReactNode } from "react";

interface ListingGridProps {
  children: ReactNode;
  emptyMessage?: string;
  emptySubmessage?: string;
  emptyAction?: ReactNode;
}

export default function ListingGrid({
  children,
  emptyMessage = "No listings found",
  emptySubmessage = "Try adjusting your filters or be the first to list something.",
  emptyAction,
}: ListingGridProps) {
  const childCount = Array.isArray(children) ? children.length : children ? 1 : 0;

  if (childCount === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-full bg-violet/5 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8l-.84.84a2 2 0 00-.53 1.28L14 12.5a2 2 0 01-.53 1.28L12 15.16" />
            <path d="M8 8l.84.84A2 2 0 019.37 10.12L10 12.5a2 2 0 01.53 1.28L12 15.16" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
          </svg>
        </div>
        <p className="font-manrope text-lg text-product-charcoal/40 mb-2">{emptyMessage}</p>
        <p className="font-source-sans text-sm text-product-charcoal/30 mb-6">{emptySubmessage}</p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {children}
    </div>
  );
}