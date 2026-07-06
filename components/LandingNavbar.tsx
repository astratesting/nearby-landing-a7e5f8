'use client';

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-md border-b border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#00C8A0] to-[#EC4899] bg-clip-text text-transparent" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          NearBy
        </a>
        <a
          href="#waitlist"
          className="px-4 py-2 rounded-full border border-[#00C8A0]/30 text-[#00C8A0] text-sm font-medium hover:bg-[#00C8A0]/10 transition-all duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}