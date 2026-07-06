export default function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]">
      {/* Atlas motif — intersecting circles / network nodes */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="atlas-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00C8A0" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#030712" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="300" fill="url(#atlas-glow)" />
          <g fill="none" stroke="#00C8A0" strokeWidth="0.5" opacity="0.3">
            <circle cx="50%" cy="50%" r="80" />
            <circle cx="35%" cy="40%" r="60" />
            <circle cx="65%" cy="60%" r="70" />
            <circle cx="45%" cy="65%" r="50" />
            <circle cx="55%" cy="35%" r="65" />
            <circle cx="30%" cy="55%" r="45" />
            <circle cx="70%" cy="45%" r="55" />
            {/* Connecting lines between nodes */}
            <line x1="35%" y1="40%" x2="50%" y2="50%" />
            <line x1="50%" y1="50%" x2="65%" y2="60%" />
            <line x1="45%" y1="65%" x2="50%" y2="50%" />
            <line x1="50%" y1="50%" x2="55%" y2="35%" />
            <line x1="30%" y1="55%" x2="35%" y2="40%" />
            <line x1="65%" y1="60%" x2="70%" y2="45%" />
            <line x1="55%" y1="35%" x2="70%" y2="45%" />
            <line x1="45%" y1="65%" x2="30%" y2="55%" />
          </g>
          {/* Small dots at intersection points */}
          <g fill="#00C8A0" opacity="0.4">
            <circle cx="50%" cy="50%" r="3" />
            <circle cx="35%" cy="40%" r="2.5" />
            <circle cx="65%" cy="60%" r="2.5" />
            <circle cx="45%" cy="65%" r="2" />
            <circle cx="55%" cy="35%" r="2" />
            <circle cx="30%" cy="55%" r="2" />
            <circle cx="70%" cy="45%" r="2" />
          </g>
        </svg>
      </div>

      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C8A0]/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Coming Soon badge */}
        <div className="inline-flex items-center gap-2 mb-8 animate-fade-in">
          <span
            className="inline-block px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#EC4899] border border-[#EC4899]/30 rounded-full"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Coming Soon
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold text-[#F9FAFB] mb-6 animate-fade-in text-balance leading-[1.05] tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Buy and Sell Safely
          <br />
          <span className="bg-gradient-to-r from-[#00C8A0] to-[#EC4899] bg-clip-text text-transparent">
            in Your Neighborhood
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-[#9CA3AF] mb-10 animate-slide-up"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          The trusted hyperlocal marketplace for used goods in your neighborhood —
          only verified neighbors within 2 miles. No strangers. No scams. Just your community.
        </p>

        {/* Waitlist CTA */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#00C8A0] text-[#030712] text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#00C8A0]/20 hover:-translate-y-0.5"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Join the Waitlist
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span
            className="text-[10px] tracking-[0.15em] uppercase text-[#9CA3AF]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-[#1F2937] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#00C8A0] animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}