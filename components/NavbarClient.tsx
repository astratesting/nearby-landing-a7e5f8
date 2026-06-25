'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function NavbarClient({ session }: { session: any }) {
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/');

  return (
    <nav className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-charcoal/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="heading-serif text-xl text-charcoal">
          NearBy
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/browse"
            className={`transition-colors duration-150 ${isActive('/browse') ? 'text-gold font-medium' : 'text-charcoal/70 hover:text-charcoal'}`}
          >
            Browse
          </Link>
          <Link
            href="/sell"
            className={`transition-colors duration-150 ${isActive('/sell') ? 'text-gold font-medium' : 'text-charcoal/70 hover:text-charcoal'}`}
          >
            Sell
          </Link>
          {session ? (
            <>
              <Link
                href="/messages"
                className={`transition-colors duration-150 ${isActive('/messages') ? 'text-gold font-medium' : 'text-charcoal/70 hover:text-charcoal'}`}
              >
                Messages
              </Link>
              <Link
                href={`/profile/${session.user.id}`}
                className={`transition-colors duration-150 ${isActive('/profile') ? 'text-gold font-medium' : 'text-charcoal/70 hover:text-charcoal'}`}
              >
                {session.user.name?.split(' ')[0]}
              </Link>
              {session.user.role === 'admin' && (
                <Link
                  href="/admin"
                  className={`transition-colors duration-150 ${isActive('/admin') ? 'text-gold font-medium' : 'text-charcoal/70 hover:text-charcoal'}`}
                >
                  Admin
                </Link>
              )}
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="text-charcoal/50 hover:text-charcoal transition-colors duration-150">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-charcoal/70 hover:text-charcoal transition-colors duration-150">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 bg-gold text-white text-sm font-medium rounded-sm transition-colors duration-150 hover:bg-gold/90"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
