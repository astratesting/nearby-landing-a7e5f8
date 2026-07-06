'use client';

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight text-violet" style={{ fontFamily: "'Manrope', sans-serif" }}>
          NearBy
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          <a href="#how-it-works" className="text-stone-500 hover:text-product-charcoal transition-colors">How It Works</a>
          <a href="#trust-safety" className="text-stone-500 hover:text-product-charcoal transition-colors">Trust & Safety</a>
          <a href="#testimonials" className="text-stone-500 hover:text-product-charcoal transition-colors">Testimonials</a>
          <a href="/dashboard" className="text-stone-500 hover:text-product-charcoal transition-colors">Browse</a>
          <a
            href="#waitlist"
            className="px-4 py-2 rounded-full bg-violet text-white font-medium hover:bg-violet/90 transition-all duration-200"
          >
            Join Waitlist
          </a>
        </div>
        <a
          href="#waitlist"
          className="md:hidden px-4 py-2 rounded-full bg-violet text-white text-sm font-medium hover:bg-violet/90 transition-all duration-200"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}