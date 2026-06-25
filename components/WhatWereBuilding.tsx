"use client";

const benefits = [
  {
    title: "Verified Neighbors",
    description:
      "Every member confirms their real identity and home address. No anonymous accounts, no catfishing — just people who actually live in your neighborhood.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
  },
  {
    title: "Hyperlocal Radius",
    description:
      "Your listings are only visible within your neighborhood boundaries. Browse and sell to people within walking distance — no long drives, no shipping hassles.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Safe Meetups",
    description:
      "Meet at familiar neighborhood spots — the local café, the park, the community center. Suggested pickup locations are landmarks you both know and trust.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    title: "Community Accountability",
    description:
      "Because everyone is a verified neighbor, bad behavior has real-world consequences. This isn't the anonymous internet — it's your street.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

export default function WhatWereBuilding() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-4 block">
            What We&apos;re Building
          </span>
          <h2 className="heading-serif text-section-title text-charcoal text-balance">
            A Marketplace Built on Trust
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="card-surface card-surface-hover rounded-2xl p-7 transition-all duration-300 group"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-ivory border border-gold/15 flex items-center justify-center text-gold group-hover:bg-gold/5 transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="heading-serif text-lg text-charcoal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/55 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
