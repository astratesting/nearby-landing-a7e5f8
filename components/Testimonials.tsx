export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-warm-white">
      <div className="max-w-3xl mx-auto text-center">
        <span
          className="text-[11px] font-semibold tracking-[0.2em] uppercase text-honey mb-4 block"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Testimonials
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold text-product-charcoal text-balance mb-6"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          What Neighbors Are Saying
        </h2>
        <p
          className="text-base text-product-charcoal/50 max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          NearBy is in pre-launch. Real stories from early adopters will appear here
          once we go live. Until then, here&apos;s what we&apos;re building toward.
        </p>

        {/* "Your story here" cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl border border-stone-100 bg-white p-8">
            <div className="w-12 h-12 rounded-full bg-violet/5 flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <p className="text-product-charcoal/30 text-sm italic mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              &ldquo;Your story here&rdquo;
            </p>
            <div className="w-16 h-[2px] bg-violet/15 mx-auto" />
          </div>

          <div className="rounded-2xl border border-stone-100 bg-white p-8">
            <div className="w-12 h-12 rounded-full bg-coral/5 flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <p className="text-product-charcoal/30 text-sm italic mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              &ldquo;Your story here&rdquo;
            </p>
            <div className="w-16 h-[2px] bg-coral/15 mx-auto" />
          </div>

          <div className="rounded-2xl border border-stone-100 bg-white p-8">
            <div className="w-12 h-12 rounded-full bg-honey/5 flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <p className="text-product-charcoal/30 text-sm italic mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              &ldquo;Your story here&rdquo;
            </p>
            <div className="w-16 h-[2px] bg-honey/15 mx-auto" />
          </div>
        </div>

        <p
          className="text-[11px] text-product-charcoal/25"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Real stories from early adopters — coming soon. No fabricated testimonials, no fake metrics.
        </p>

        {/* Trust badge callout */}
        <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full border border-violet/15 bg-violet/5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          <span className="text-sm font-semibold text-violet" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Government-ID Verified Marketplace
          </span>
        </div>
      </div>
    </section>
  );
}