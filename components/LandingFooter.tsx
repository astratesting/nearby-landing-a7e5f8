export default function LandingFooter() {
  return (
    <footer className="py-16 px-6 bg-[#030712] border-t border-[#1F2937]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00C8A0] to-[#EC4899] bg-clip-text text-transparent"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              NearBy
            </h3>
            <p
              className="text-sm leading-relaxed text-[#9CA3AF]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              A hyperlocal marketplace built on real trust and genuine community.
              Buy and sell with the people who live around you.
            </p>
          </div>
          <div>
            <h4
              className="text-xs uppercase tracking-[0.15em] text-[#00C8A0] mb-4 font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Links
            </h4>
            <div className="flex flex-col gap-2 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <a href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">
                Home
              </a>
              <a href="#waitlist" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">
                Join Waitlist
              </a>
              <a href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
          <div>
            <h4
              className="text-xs uppercase tracking-[0.15em] text-[#EC4899] mb-4 font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Trust
            </h4>
            <div
              className="flex flex-col gap-2 text-sm text-[#9CA3AF]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span>Government-ID Verified</span>
              <span>2-Mile Hyperlocal Radius</span>
              <span>Neighborhood Badges</span>
              <span>Secure In-App Messaging</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1F2937] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#9CA3AF]/50"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            &copy; {new Date().getFullYear()} NearBy. All rights reserved.
          </p>
          <p
            className="text-xs text-[#9CA3AF]/50"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Built for the block.
          </p>
        </div>
      </div>
    </footer>
  );
}