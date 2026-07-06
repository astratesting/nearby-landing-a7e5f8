const problems = [
  {
    platform: "Facebook Marketplace",
    problem: "1 in 3 listings may be fraudulent or posted by scammers. No identity verification means anyone can create an account and post anything.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    platform: "Craigslist",
    problem: "Zero identity verification and no accountability. Transactions are completely anonymous, leaving buyers and sellers vulnerable to fraud and safety risks.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    platform: "OfferUp",
    problem: 'Users frequently report account deactivation issues and limited support. Trust mechanisms are inconsistent and often rely on self-reported reviews.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 6.64a9 9 0 11-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    platform: "Nextdoor",
    problem: "Classifieds are buried in social noise — community drama, lost pet posts, and political arguments. Buying and selling isn't the core experience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#030712]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F2A900] mb-4 block"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            The Problem
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-balance mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            The Problem NearBy Solves
          </h2>
          <p
            className="text-base text-[#9CA3AF] max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Existing platforms leave you guessing. NearBy changes that — with
            verified identity, real accountability, and no strangers.
          </p>
          <div className="w-12 h-[2px] bg-[#F2A900]/40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p) => (
            <div
              key={p.platform}
              className="rounded-2xl border border-[#1F2937] bg-[#111827] p-7 group hover:border-[#EC4899]/15 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1F2937] border border-[#EC4899]/10 flex items-center justify-center text-[#EC4899] group-hover:border-[#EC4899]/25 transition-colors">
                  {p.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-[#F9FAFB] mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {p.platform}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#9CA3AF]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {p.problem}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-10 text-[11px] text-[#9CA3AF]/40"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Honest context: NearBy has not launched yet. No customer testimonials or fabricated metrics. This is the problem we're building to solve.
        </p>
      </div>
    </section>
  );
}