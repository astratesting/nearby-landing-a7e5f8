interface LocationBadgeProps {
  neighborhood: string;
}

export default function LocationBadge({ neighborhood }: LocationBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet/5 border border-violet/10">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span className="text-sm text-violet font-medium font-source-sans">{neighborhood}</span>
    </div>
  );
}