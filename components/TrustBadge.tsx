interface TrustBadgeProps {
  trustScore: number;
  reviewCount?: number;
  isVerified?: boolean;
  size?: "sm" | "md";
}

const TRUST_LEVELS = [
  { minScore: 40, minReviews: 8, label: "Top Neighbor", color: "bg-gradient-to-r from-violet to-coral", text: "text-white", icon: "🌟" },
  { minScore: 25, minReviews: 3, label: "Trusted Neighbor", color: "bg-honey/20", text: "text-honey", icon: "⭐" },
  { minScore: 10, minReviews: 0, label: "New Neighbor", color: "bg-violet/10", text: "text-violet", icon: "🏠" },
];

export default function TrustBadge({ trustScore, reviewCount = 0, isVerified = false, size = "md" }: TrustBadgeProps) {
  const level = TRUST_LEVELS.find((l) => trustScore >= l.minScore && reviewCount >= l.minReviews) || TRUST_LEVELS[2];
  const scaledScore = (trustScore / 10).toFixed(1);

  const verifiedBadge = isVerified && (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold font-manrope border border-emerald-200">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Verified
    </span>
  );

  if (size === "sm") {
    return (
      <div className="flex items-center gap-2">
        <div className="relative w-9 h-9 rounded-full border-2 border-product-charcoal/10 flex items-center justify-center bg-white">
          <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#E2E8F0" strokeWidth="2.5" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeDasharray={`${Math.min((trustScore / 50) * 94, 94)} 94`} strokeLinecap="round" />
          </svg>
          <span className="absolute text-[10px] font-bold text-product-charcoal font-manrope">{scaledScore}</span>
        </div>
        <div>
          <span className="text-xs font-semibold text-product-charcoal font-manrope">{level.label}</span>
          {verifiedBadge && <div className="mt-0.5">{verifiedBadge}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-full ${level.color} ${level.text} font-manrope text-sm font-semibold`}>
      <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
        <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.2" />
          <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray={`${Math.min((trustScore / 50) * 94, 94)} 94`} strokeLinecap="round" />
        </svg>
        <span className="absolute text-xs font-bold">{scaledScore}</span>
      </span>
      <span>{level.label}</span>
      {verifiedBadge}
    </div>
  );
}