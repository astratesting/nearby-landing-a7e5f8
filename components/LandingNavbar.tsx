'use client';

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-md border-b border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#00C8A0] to-[#EC4899] bg-clip-text text-transparent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          NearBy
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <a href="#how-it-works" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">How It Works</a>
          <a href="#trust-safety" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Trust & Safety</a>
          <a href="#testimonials" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Testimonials</a>
          <a
            href="#waitlist"
            className="px-4 py-2 rounded-full border border-[#00C8A0]/30 text-[#00C8A0] font-medium hover:bg-[#00C8A0]/10 transition-all duration-200"
          >
            Join Waitlist
          </a>
        </div>
        <a
          href="#waitlist"
          className="md:hidden px-4 py-2 rounded-full border border-[#00C8A0]/30 text-[#00C8A0] text-sm font-medium hover:bg-[#00C8A0]/10 transition-all duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}