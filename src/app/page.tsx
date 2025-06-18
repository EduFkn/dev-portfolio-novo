
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { EducationSection } from '@/components/sections/education-section';
import { ProjectsShowcase } from '@/components/sections/projects-showcase';
import { TestimonialsSection } from '@/components/sections/testimonials-section';


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsShowcase /> {/* This already acts as the projects section */}
      <ExperienceSection />
      <EducationSection />
      <TestimonialsSection />
    </>
  );
}
