import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import TrustFeatures from "@/components/TrustFeatures";
import LandingHowItWorks from "@/components/LandingHowItWorks";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import LandingWaitlist from "@/components/LandingWaitlist";
import LandingFAQ from "@/components/LandingFAQ";
import LandingFooter from "@/components/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <LandingNavbar />
      <LandingHero />
      <TrustFeatures />
      <LandingHowItWorks />
      <Benefits />
      <Testimonials />
      <CTA />
      <LandingWaitlist />
      <LandingFAQ />
      <LandingFooter />
    </div>
  );
}