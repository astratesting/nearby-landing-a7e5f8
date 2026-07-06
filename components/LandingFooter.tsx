export default function LandingFooter() {
  return (
    <footer className="py-16 px-6 bg-product-charcoal">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3
              className="text-2xl font-bold mb-4 text-white"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Near<span className="text-violet">By</span>
            </h3>
            <p
              className="text-sm leading-relaxed text-stone-400"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              A hyperlocal marketplace built on real trust and genuine community.
              Buy and sell with the people who live around you.
            </p>
          </div>
          <div>
            <h4
              className="text-xs uppercase tracking-[0.15em] text-violet mb-4 font-semibold"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Links
            </h4>
            <div className="flex flex-col gap-2 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">Home</a>
              <a href="#waitlist" className="text-stone-400 hover:text-white transition-colors">Join Waitlist</a>
              <a href="/dashboard" className="text-stone-400 hover:text-white transition-colors">Browse</a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          <div>
            <h4
              className="text-xs uppercase tracking-[0.15em] text-coral mb-4 font-semibold"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Trust
            </h4>
            <div
              className="flex flex-col gap-2 text-sm text-stone-400"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <span>Government-ID Verified</span>
              <span>2-Mile Hyperlocal Radius</span>
              <span>Neighborhood Badges</span>
              <span>Secure In-App Messaging</span>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-stone-500"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            &copy; {new Date().getFullYear()} NearBy. All rights reserved.
          </p>
          <p
            className="text-xs text-stone-500"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Built for the block.
          </p>
        </div>
      </div>
    </footer>
  );
}