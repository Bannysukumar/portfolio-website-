import { Hero } from "../components/Hero";
import { StackTicker } from "../components/StackTicker";
import { Work } from "../components/Work";
import { ProjectDirectory } from "../components/ProjectDirectory";
import { ServicesSection } from "../components/ServicesSection";
import { Skills } from "../components/Skills";
import { About } from "../components/About";
import { Journey } from "../components/Journey";
import { PricingSection } from "../components/PricingSection";
import { FaqSection } from "../components/FaqSection";
import { Contact } from "../components/Contact";

/**
 * Homepage. Preserves the original section order and design, with the new
 * Services, Pricing and FAQ sections inserted at natural points so the
 * freelance offering is visible without disrupting the curated showcase.
 */
export function Home() {
  return (
    <>
      <Hero />
      <StackTicker />
      <Work />
      <ProjectDirectory />
      <ServicesSection />
      <Skills />
      <About />
      <Journey />
      <PricingSection />
      <FaqSection />
      <Contact />
    </>
  );
}
