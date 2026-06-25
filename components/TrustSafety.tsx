"use client";

const highlights = [
  {
    title: "Address Verification",
    description:
      "Every member confirms their home address. We verify you live where you say you do — no pseudonyms, no ghost accounts.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Neighbor-Only Access",
    description:
      "Your listings are only visible to verified residents of your neighborhood. Nothing is publicly indexed or searchable by outsiders.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: "Community Accountability",
    description:
      "Because everyone is a verified neighbor, bad behavior has real consequences. This isn't the internet — it's your street.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Safe Meetup Spots",
    description:
      "Suggested pickup locations include familiar neighborhood landmarks — your local café, the community center, the park you both know.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
];

export default function TrustSafety() {
  return (
    <section className="py-24 px-6 bg-ivory">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-4 block">
            Trust & Safety
          </span>
          <h2 className="heading-serif text-section-title text-charcoal text-balance">
            Built for Safety,<br />Not Just Convenience
          </h2>
          <p className="mt-4 text-sm text-charcoal/50 max-w-md mx-auto font-light">
            We designed NearBy around the premise that real-world identity creates
            real-world accountability.
          </p>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item) => (
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
