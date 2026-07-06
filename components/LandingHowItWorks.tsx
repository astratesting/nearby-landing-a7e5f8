const steps = [
  {
    number: "01",
    title: "Verify Your Identity",
    description:
      "Upload your government-issued ID and proof of address. We verify who you are, confirm your neighborhood, and issue your trust badge.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <circle cx="8" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Browse Items from Neighbors",
    description:
      "Scroll through items your neighbors are selling — baby gear, furniture, electronics — all within a 2-mile radius of your verified address.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="13" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <path d="M2 17l5-5 3 3 4-4 5 5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Meet Safely & Transact",
    description:
      "Chat in-app, agree on a meeting spot (the café, the park), and exchange items. No phone numbers shared — just trusted, local transactions.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

export default function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#111827]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#00C8A0] mb-4 block"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            How It Works
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#F9FAFB] text-balance"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Three Steps to Safer Local Commerce
          </h2>
          <div className="w-12 h-[2px] bg-[#00C8A0]/40 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center px-4">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+32px)] right-[calc(-50%+32px)] h-[1px] bg-[#00C8A0]/15" />
              )}

              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#00C8A0]/20 bg-[#030712] mb-6">
                <span
                  className="text-lg font-bold text-[#00C8A0]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {step.number}
                </span>
              </div>

              <div className="text-[#00C8A0]/70 mb-4 flex justify-center">
                {step.icon}
              </div>

              <h3
                className="text-xl font-semibold text-[#F9FAFB] mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed text-[#9CA3AF] max-w-xs mx-auto"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}