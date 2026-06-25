import Hero from "@/components/Hero";
import WhatWereBuilding from "@/components/WhatWereBuilding";
import Waitlist from "@/components/Waitlist";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWereBuilding />
      <Waitlist />
      <HowItWorks />
      <FAQ />

      {/* Footer */}
      <footer className="py-12 px-6 bg-ivory border-t border-charcoal/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="heading-serif text-xl text-charcoal">
            NearBy
          </div>
          <p className="text-[11px] text-charcoal/40 font-light tracking-wide">
            &copy; {new Date().getFullYear()} NearBy. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
