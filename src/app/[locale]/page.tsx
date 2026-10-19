import { ClientTicker } from "@/components/home/client-ticker";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { ServicesOverview } from "@/components/home/services-overview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientTicker />
      <ServicesOverview />
      <FeaturedWork />
      <CtaSection />
    </>
  );
}
