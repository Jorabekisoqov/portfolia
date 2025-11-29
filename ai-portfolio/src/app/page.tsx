import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Projects } from "@/sections/projects";
import { Experience } from "@/sections/experience";
import { Contact } from "@/sections/contact";
import { Footer } from "@/sections/footer";
import { StatsSection } from "@/components/stats-section";
import { MorphingShapes } from "@/components/morphing-shapes";

export default function Home() {
  return (
    <main className="relative">
      <MorphingShapes />
      <Hero />
      <StatsSection />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
