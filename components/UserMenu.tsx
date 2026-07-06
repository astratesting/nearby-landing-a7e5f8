"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface UserMenuProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.[0]?.toUpperCase() || "?";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-gradient-to-br from-violet to-coral flex items-center justify-center text-white font-bold font-manrope text-sm hover:shadow-lg hover:shadow-violet/20 transition-all"
      >
        {initials}
      </button>
      {open && (
        <div className="absolute right-0 top-11 w-56 bg-white rounded-xl border border-product-charcoal/5 shadow-lg py-1 z-50">
          <div className="px-4 py-2.5 border-b border-product-charcoal/5">
            <p className="text-sm font-semibold text-product-charcoal font-manrope truncate">{user.name}</p>
            <p className="text-xs text-product-charcoal/40 font-source-sans truncate">{user.email}</p>
          </div>
          <Link
            href={`/profile/${user.id}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-product-charcoal/70 hover:bg-violet/5 hover:text-violet transition-colors font-source-sans"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Profile
          </Link>
          <button
            onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-product-charcoal/70 hover:bg-coral/5 hover:text-coral transition-colors font-source-sans"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}