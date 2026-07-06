export default function CTA() {
  return (
    <section className="py-24 px-6 bg-[#030712] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00C8A0]/5 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#EC4899]/3 blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span
          className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#00C8A0] mb-4 block"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Ready to Trade Safely?
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold text-[#F9FAFB] text-balance mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Ready to Find Your Next Treasure
          <br />
          <span className="bg-gradient-to-r from-[#00C8A0] to-[#EC4899] bg-clip-text text-transparent">
            — Safely?
          </span>
        </h2>
        <p
          className="text-base text-[#9CA3AF] max-w-xl mx-auto mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          NearBy is launching in select neighborhoods soon. Join the waitlist to
          get notified the moment your area goes live — and get early access.
        </p>
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00C8A0] to-[#EC4899] text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#00C8A0]/20 hover:-translate-y-0.5"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Join the Waitlist
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}