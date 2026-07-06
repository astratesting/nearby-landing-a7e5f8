const features = [
  {
    title: "Government ID Proofing",
    description:
      "Every member verifies their identity with a government-issued ID plus proof of address. Your personal information is never shared — we only confirm you're a real resident.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <circle cx="8" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "2-Mile Hyperlocal Radius",
    description:
      "Listings are only visible within a 2-mile radius of your verified address. Buy and sell with people you might actually run into at the grocery store.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Neighborhood Verified Badges",
    description:
      "Once verified, you earn a Neighborhood Badge — a visible trust marker. Badges build your reputation and show neighbors you're the real deal.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Secure In-App Messaging",
    description:
      "Chat with buyers and sellers directly in NearBy. No need to share your phone number or personal contact info until you're ready to meet in person.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M6 8h12M6 12h8M6 16h6" />
      </svg>
    ),
  },
];

export default function TrustFeatures() {
  return (
    <section className="py-24 px-6 bg-[#030712]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#EC4899] mb-4 block"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Trust & Safety
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-balance"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Built on Real Trust, Not Anonymity
          </h2>
          <div className="w-12 h-[2px] bg-[#EC4899]/40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-[#1F2937] bg-[#111827] p-7 hover:border-[#00C8A0]/20 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1F2937] border border-[#00C8A0]/10 flex items-center justify-center text-[#00C8A0] group-hover:border-[#00C8A0]/30 transition-colors duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-[#F9FAFB] mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#9CA3AF]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {feature.description}
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