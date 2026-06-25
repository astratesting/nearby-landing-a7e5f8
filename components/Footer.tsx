import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/70 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="heading-serif text-2xl text-ivory mb-4">NearBy</h3>
            <p className="text-sm leading-relaxed">
              A hyperlocal marketplace built on real trust and genuine community. Buy and sell with the people who live around you.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4">Explore</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/browse" className="hover:text-ivory transition-colors">Browse items</Link>
              <Link href="/sell" className="hover:text-ivory transition-colors">Sell something</Link>
              <Link href="/browse?category=furniture" className="hover:text-ivory transition-colors">Furniture</Link>
              <Link href="/browse?category=electronics" className="hover:text-ivory transition-colors">Electronics</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4">Account</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/login" className="hover:text-ivory transition-colors">Sign in</Link>
              <Link href="/signup" className="hover:text-ivory transition-colors">Create account</Link>
              <Link href="/dashboard" className="hover:text-ivory transition-colors">Dashboard</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/40">
            &copy; {new Date().getFullYear()} NearBy. Built for the block.
          </p>
          <p className="heading-serif text-sm text-ivory/30 italic">
            NearBy &middot; Built for the block.
          </p>
        </div>
      </div>
    </footer>
  );
}
