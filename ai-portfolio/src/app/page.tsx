import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Projects } from "@/sections/projects";
import { Experience } from "@/sections/experience";
import { Contact } from "@/sections/contact";
import { Footer } from "@/sections/footer";
import { StatsSection } from "@/components/stats-section";
import { MorphingShapes } from "@/components/morphing-shapes";
import { getGitHubPortfolioData, type PortfolioProject } from "@/lib/github";

export default async function Home() {
  let github: {
    profileUrl: string;
    projectCount: number;
    contributionsTotal: number | null;
    yearsOnGitHub: number;
    linesDisplayEnd: number;
    linesDisplaySuffix: string;
    projects: PortfolioProject[];
  } = {
    profileUrl: "https://github.com/isoqovjorabek2",
    projectCount: 0,
    contributionsTotal: null,
    yearsOnGitHub: 1,
    linesDisplayEnd: 0,
    linesDisplaySuffix: "",
    projects: [],
  };

  try {
    github = await getGitHubPortfolioData();
  } catch (err) {
    console.error("GitHub portfolio fetch failed:", err);
  }

  return (
    <main className="relative">
      <MorphingShapes />
      <Hero />
      <StatsSection
        projectCount={github.projectCount}
        contributionsTotal={github.contributionsTotal}
        yearsExperience={github.yearsOnGitHub}
        linesDisplayEnd={github.linesDisplayEnd}
        linesDisplaySuffix={github.linesDisplaySuffix}
      />
      <About />
      <Projects projects={github.projects} />
      <Experience />
      <Contact />
      <Footer githubUrl={github.profileUrl} />
    </main>
  );
}
