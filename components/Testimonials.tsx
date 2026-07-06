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
          NearBy is in pre-launch. Real stories from early testers will appear here
          once we go live in the first neighborhoods. Until then, here&apos;s what
          we&apos;re building toward.
        </p>

        {/* Trust indicator cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl border border-stone-100 bg-white p-6">
            <div className="w-10 h-10 rounded-full bg-violet/5 flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-product-charcoal mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Government-ID Verified
            </h3>
            <p className="text-xs text-product-charcoal/40" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Every member confirmed with real identity
            </p>
          </div>

          <div className="rounded-2xl border border-stone-100 bg-white p-6">
            <div className="w-10 h-10 rounded-full bg-coral/5 flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-product-charcoal mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              2-Mile Radius
            </h3>
            <p className="text-xs text-product-charcoal/40" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Hyperlocal — your actual neighborhood
            </p>
          </div>

          <div className="rounded-2xl border border-stone-100 bg-white p-6">
            <div className="w-10 h-10 rounded-full bg-honey/5 flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-product-charcoal mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Community Accountability
            </h3>
            <p className="text-xs text-product-charcoal/40" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Real-world consequences for bad behavior
            </p>
          </div>
        </div>

        <p
          className="text-[11px] text-product-charcoal/25"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Real stories from early testers — coming soon. No fabricated testimonials, no fake metrics.
        </p>
      </div>
    </section>
  );
}