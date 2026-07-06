export default function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-warm-white">
      {/* Compass motif */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="compass-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFF7ED" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="280" fill="url(#compass-glow)" />
          <g fill="none" stroke="#7C3AED" strokeWidth="0.5" opacity="0.35">
            {/* Outer compass ring */}
            <circle cx="50%" cy="50%" r="180" />
            <circle cx="50%" cy="50%" r="160" />
            {/* Cardinal directions */}
            <line x1="50%" y1="50%" x2="50%" y2="10%" />
            <line x1="50%" y1="50%" x2="50%" y2="90%" />
            <line x1="50%" y1="50%" x2="10%" y2="50%" />
            <line x1="50%" y1="50%" x2="90%" y2="50%" />
            {/* Diagonal lines */}
            <line x1="50%" y1="50%" x2="78%" y2="22%" />
            <line x1="50%" y1="50%" x2="78%" y2="78%" />
            <line x1="50%" y1="50%" x2="22%" y2="78%" />
            <line x1="50%" y1="50%" x2="22%" y2="22%" />
            {/* Neighborhood circles */}
            <circle cx="35%" cy="40%" r="45" />
            <circle cx="65%" cy="60%" r="45" />
            <circle cx="30%" cy="65%" r="35" />
            <circle cx="70%" cy="35%" r="35" />
            {/* Connecting lines between neighborhoods */}
            <line x1="35%" y1="40%" x2="65%" y2="60%" />
            <line x1="30%" y1="65%" x2="70%" y2="35%" />
            <line x1="35%" y1="40%" x2="30%" y2="65%" />
            <line x1="65%" y1="60%" x2="70%" y2="35%" />
          </g>
          {/* Compass rose */}
          <g fill="#7C3AED" opacity="0.3">
            <polygon points="50,18 47,50 50,50" />
            <polygon points="50,18 53,50 50,50" />
            <polygon points="50,82 47,50 50,50" />
            <polygon points="50,82 53,50 50,50" />
            <polygon points="18,50 50,47 50,50" />
            <polygon points="18,50 50,53 50,50" />
            <polygon points="82,50 50,47 50,50" />
            <polygon points="82,50 50,53 50,50" />
          </g>
        </svg>
      </div>

      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet/30 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Coming Soon badge */}
        <div className="inline-flex items-center gap-2 mb-8 animate-fade-in">
          <span
            className="inline-block px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-coral border border-coral/30 rounded-full"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Coming Soon
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold text-product-charcoal mb-6 animate-fade-in text-balance leading-[1.05] tracking-tight"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          A Trusted Hyperlocal
          <br />
          <span className="text-violet">
            Marketplace
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-product-charcoal/60 mb-10 animate-slide-up"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Buy and sell used goods with verified neighbors within 2 miles.
          Government-ID checked, hyperlocal, and built for real community trust.
          No strangers. No scams. Just your neighborhood.
        </p>

        {/* Waitlist CTA */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-violet text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-violet/20 hover:-translate-y-0.5"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Join the Waitlist
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span
            className="text-[10px] tracking-[0.15em] uppercase text-product-charcoal/40"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-stone-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-violet animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}