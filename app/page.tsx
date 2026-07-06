import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import LandingHowItWorks from "@/components/LandingHowItWorks";
import TrustFeatures from "@/components/TrustFeatures";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import LandingWaitlist from "@/components/LandingWaitlist";
import LandingFAQ from "@/components/LandingFAQ";
import LandingFooter from "@/components/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <LandingNavbar />
      <LandingHero />
      <LandingHowItWorks />
      <TrustFeatures />
      <Benefits />
      <Testimonials />
      <LandingWaitlist />
      <LandingFAQ />
      <LandingFooter />
    </div>
  );
}