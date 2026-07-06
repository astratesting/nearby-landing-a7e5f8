"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C2C2C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Decorative top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="inline-block px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold border border-gold/30 rounded-full">
            Coming Soon
          </span>
        </div>

        {/* Company name */}
        <h1 className="heading-serif text-hero text-charcoal mb-6 animate-fade-in">
          NearBy
        </h1>

        {/* Tagline */}
        <p className="heading-serif text-section-title text-charcoalLight mb-8 animate-slide-up text-balance">
          Buy and Sell with Neighbors
          <br />
          <span className="text-gold italic">You Can Trust</span>
        </p>

        {/* Value proposition */}
        <p className="max-w-xl mx-auto text-base leading-relaxed text-charcoal/70 mb-12 animate-slide-up font-light">
          NearBy is a neighborhood marketplace built on real verification and
          genuine community trust. List your items, find what you need, and
          transact with people who actually live around you — no strangers, no
          guesswork, no anxiety.
        </p>

        {/* Single CTA — waitlist */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-ivory text-sm font-medium tracking-wide rounded-full transition-all duration-300 hover:bg-charcoalLight hover:shadow-lg hover:shadow-charcoal/10 hover:-translate-y-0.5"
        >
          Join the Waitlist
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] tracking-[0.15em] uppercase text-charcoal">Scroll</span>
          <div className="w-[1px] h-8 bg-charcoal/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gold animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
