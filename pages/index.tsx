import AboutSection from "@/components/landing/AboutSection";
import BlogSection from "@/components/landing/BlogSection";
import DonationSection from "@/components/landing/DonationSection";
import Hero from "@/components/landing/HeroSection";
import HolisticApproach from "@/components/landing/HollisticApproach";
import ImpactSection from "@/components/landing/impact/ImpactSection";
import ProjectsSection from "@/components/landing/projects/ProjectsSection";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <DonationSection />
      <ImpactSection />
      <ProjectsSection />
      <HolisticApproach />
      <BlogSection />
    </main>
  );
}
