import { ProjectsShowcase } from '@/components/sections/projects-showcase';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 md:mt-20"> {/* Added margin top for navbar */}
      <ProjectsShowcase />
    </div>
  );
}
