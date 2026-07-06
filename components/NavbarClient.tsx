"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function NavbarClient() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAppPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/listings") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/browse");

  async function handleSignOut() {
    await signOut({ callbackUrl: "/" });
  }

  // App pages navbar
  if (isAppPage) {
    return (
      <nav className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur border-b border-product-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-manrope text-xl font-bold text-product-charcoal">
            Near<span className="text-violet">By</span>
          </Link>

          <div className="hidden md:flex items-center gap-5 text-sm font-manrope">
            <Link href="/dashboard" className={`transition-colors duration-150 ${pathname.startsWith("/dashboard") ? "text-violet font-semibold" : "text-product-charcoal/60 hover:text-product-charcoal"}`}>
              Browse
            </Link>
            <Link href="/dashboard?tab=my" className={`transition-colors duration-150 ${pathname.includes("tab=my") ? "text-violet font-semibold" : "text-product-charcoal/60 hover:text-product-charcoal"}`}>
              My Listings
            </Link>
            <Link href="/listings/new" className={`transition-colors duration-150 ${pathname === "/listings/new" ? "text-violet font-semibold" : "text-product-charcoal/60 hover:text-product-charcoal"}`}>
              Sell
            </Link>
            {session?.user ? (
              <>
                <Link href={`/profile/${session.user.id}`} className="text-product-charcoal/60 hover:text-product-charcoal transition-colors">
                  {session.user.name?.split(" ")[0]}
                </Link>
                <button onClick={handleSignOut} className="text-product-charcoal/40 hover:text-coral transition-colors">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-product-charcoal/60 hover:text-product-charcoal transition-colors">
                  Sign in
                </Link>
                <Link href="/signup" className="px-4 py-2 rounded-xl bg-violet text-white text-sm font-semibold hover:bg-violet/90 transition-colors">
                  Join
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-product-charcoal" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-product-charcoal/5 px-4 pb-4">
            <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-manrope text-product-charcoal/70 hover:text-violet transition-colors">
              Browse
            </Link>
            <Link href="/dashboard?tab=my" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-manrope text-product-charcoal/70 hover:text-violet transition-colors">
              My Listings
            </Link>
            <Link href="/listings/new" onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm font-manrope text-product-charcoal/70 hover:text-violet transition-colors">
              Sell
            </Link>
            {session?.user ? (
              <>
                <Link href={`/profile/${session.user.id}`} onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-sm text-product-charcoal/70 hover:text-violet">
                  Profile
                </Link>
                <button onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  className="block py-2.5 text-sm text-product-charcoal/40 hover:text-coral">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-sm text-product-charcoal/70 hover:text-violet">
                  Sign in
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-sm text-violet font-semibold">
                  Join
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    );
  }

  // Landing page navbar
  return (
    <nav className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-charcoal/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="heading-serif text-xl text-charcoal">
          NearBy
        </Link>
        <div className="flex items-center gap-6 text-sm">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="text-charcoal/70 hover:text-charcoal transition-colors">
                Browse
              </Link>
              <Link href="/listings/new" className="text-charcoal/70 hover:text-charcoal transition-colors">
                Sell
              </Link>
              <Link href={`/profile/${session.user.id}`} className="text-charcoal/70 hover:text-charcoal transition-colors">
                {session.user.name?.split(" ")[0]}
              </Link>
              <button onClick={handleSignOut} className="text-charcoal/50 hover:text-charcoal transition-colors">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-charcoal/70 hover:text-charcoal transition-colors">
                Sign in
              </Link>
              <Link href="/signup" className="px-4 py-1.5 bg-gold text-white text-sm font-medium rounded-sm hover:bg-gold/90 transition-colors">
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}