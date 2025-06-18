import { HeroSection } from '@/components/sections/hero-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProjectsShowcase } from '@/components/sections/projects-showcase'; // Import ProjectShowcase to show projects on home
import { TestimonialsSection } from '@/components/sections/testimonials-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ProjectsShowcase /> {/* Add ProjectsShowcase here */}
      <ExperienceSection />
      <TestimonialsSection />
    </>
  );
}
