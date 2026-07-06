interface TrustBadgeProps {
  trustScore: number;
  size?: "sm" | "md";
}

const TRUST_LEVELS = [
  { min: 40, label: "Community Pillar", color: "bg-gradient-to-r from-violet to-violet/80", text: "text-white" },
  { min: 25, label: "Trusted Neighbor", color: "bg-honey/20", text: "text-honey" },
  { min: 10, label: "Verified Neighbor", color: "bg-violet/10", text: "text-violet" },
  { min: 0, label: "Newcomer", color: "bg-product-charcoal/5", text: "text-product-charcoal/50" },
];

export default function TrustBadge({ trustScore, size = "md" }: TrustBadgeProps) {
  const level = TRUST_LEVELS.find((l) => trustScore >= l.min)!;
  const scaledScore = (trustScore / 10).toFixed(1);

  if (size === "sm") {
    return (
      <div className="flex items-center gap-1.5">
        <div className="relative w-8 h-8 rounded-full border-2 border-product-charcoal/10 flex items-center justify-center">
          <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="none" stroke="#E2E8F0" strokeWidth="2" />
            <circle cx="16" cy="16" r="14" fill="none" stroke="#7C3AED" strokeWidth="2" strokeDasharray={`${(trustScore / 50) * 88} 88`} strokeLinecap="round" />
          </svg>
          <span className="absolute text-[10px] font-bold text-product-charcoal font-manrope">{scaledScore}</span>
        </div>
        <span className={`text-xs font-medium font-manrope ${level.text} ${level.color.includes("gradient") ? "bg-clip-text text-transparent bg-gradient-to-r from-violet to-violet/80" : ""}`}>
          {level.label}
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${level.color} ${level.text} font-manrope text-sm font-semibold`}>
      <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray={`${(trustScore / 50) * 88} 88`} strokeLinecap="round" />
        </svg>
        <span className="absolute text-xs font-bold">{scaledScore}</span>
      </span>
      {level.label}
    </div>
  );
}