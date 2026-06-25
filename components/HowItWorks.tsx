"use client";

const steps = [
  {
    number: "01",
    title: "ID Check",
    description:
      "Verify your identity with a quick government ID check. We confirm you're a real person — no bots, no fake accounts.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Address Verification",
    description:
      "Confirm your home address and we'll verify you belong to a real neighborhood. This ensures every member is an actual resident.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Neighborhood Badge",
    description:
      "Once verified, you receive your Neighborhood Badge — a visible trust marker that shows neighbors you're the real deal.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-4 block">
            How It Works
          </span>
          <h2 className="heading-serif text-section-title text-charcoal text-balance">
            Three Steps to Trustworthy Commerce
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="relative group">
              {/* Connector line (desktop only) */}
              {step.number !== "03" && (
                <div className="hidden md:block absolute top-14 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-[1px] bg-gold/20" />
              )}

              <div className="text-center px-4">
                {/* Icon circle */}
                <div className="relative inline-flex items-center justify-center w-[72px] h-[72px] rounded-full border border-gold/20 bg-ivory mb-6 group-hover:border-gold/50 transition-colors duration-300">
                  <span className="text-gold">{step.icon}</span>
                  {/* Step number overlay */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-charcoal text-ivory text-[10px] font-medium flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="heading-serif text-subsection text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/60 max-w-[280px] mx-auto font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust verification callout */}
        <div className="mt-16 p-6 md:p-8 rounded-2xl bg-ivory border border-gold/10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A572" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-gold">
              Trust Verification
            </span>
          </div>
          <p className="text-sm leading-relaxed text-charcoal/70 font-light">
            Our three-step verification ensures every NearBy member is a verified
            resident with a real stake in their community. No anonymous strangers
            — just neighbors you can trust.
          </p>
        </div>
      </div>
    </section>
  );
}
