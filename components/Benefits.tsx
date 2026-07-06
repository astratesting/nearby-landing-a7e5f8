const benefits = [
  {
    title: "No More Scams",
    description:
      "Government-ID verification means every user is a real person. No bots, no fake profiles, no anonymous scammers.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Real Neighbors Only",
    description:
      "Every listing comes from someone in your neighborhood. Transactions happen face-to-face with people you can actually hold accountable.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Built for Your Community",
    description:
      "NearBy is designed around actual neighborhoods — not zip codes, not cities. Your community has its own marketplace.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Safe Meetups",
    description:
      "Agree to meet at local landmarks you both know — the café, the park, the library. No dark parking lots with strangers.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 00-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 00-8-8z" />
      </svg>
    ),
  },
];

export default function Benefits() {
  return (
    <section className="py-24 px-6 bg-[#111827]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#EC4899] mb-4 block"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Why NearBy
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-balance"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            A Marketplace You Can Actually Trust
          </h2>
          <div className="w-12 h-[2px] bg-[#EC4899]/40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group rounded-2xl border border-[#1F2937] bg-[#030712] p-7 hover:border-[#00C8A0]/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1F2937] border border-[#00C8A0]/10 flex items-center justify-center text-[#00C8A0] group-hover:border-[#00C8A0]/30 transition-colors">
                  {b.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-[#F9FAFB] mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {b.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#9CA3AF]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {b.description}
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