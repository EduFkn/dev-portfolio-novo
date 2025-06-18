"use client";

import { ProjectCard } from './project-card';

// Dummy project data
const projects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with Next.js, Stripe integration, and admin dashboard.',
    imageUrl: 'https://placehold.co/600x400/A06CD5/FFFFFF.png?text=E-commerce',
    imageHint: 'online store',
    liveLink: '#',
    repoLink: '#',
    tags: ['Next.js', 'React', 'Stripe', 'Tailwind CSS', 'MongoDB'],
    category: 'Web Development'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates using Firebase.',
    imageUrl: 'https://placehold.co/600x400/D8B4F1/23272F.png?text=Task+App',
    imageHint: 'productivity tool',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Firebase', 'Material UI', 'Node.js'],
    category: 'Full Stack'
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'This very portfolio website, built with Next.js and designed for a stunning visual experience.',
    imageUrl: 'https://placehold.co/600x400/23272F/A06CD5.png?text=Portfolio',
    imageHint: 'personal website',
    liveLink: '#',
    repoLink: '#',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'ShadCN UI'],
    category: 'Web Design'
  },
  {
    id: '4',
    title: 'AI Powered Chatbot',
    description: 'An intelligent chatbot leveraging Genkit and Google AI for customer support automation.',
    imageUrl: 'https://placehold.co/600x400/A06CD5/FFFFFF.png?text=AI+Chatbot',
    imageHint: 'artificial intelligence',
    liveLink: '#',
    repoLink: '#',
    tags: ['Genkit', 'Google AI', 'Python', 'Flask'],
    category: 'AI Development'
  },
];

export function ProjectsShowcase() {
  // TODO: Implement filtering logic if needed
  // const [filter, setFilter] = useState('All');
  // const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="projects" className="py-16 md:py-24">
      <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">
        My <span className="text-primary">Projects</span>
      </h2>
      {/* Filter buttons can be added here */}
      {/* <div className="flex justify-center space-x-4 mb-12">
        <Button onClick={() => setFilter('All')} variant={filter === 'All' ? 'default' : 'outline'}>All</Button>
        <Button onClick={() => setFilter('Web Development')} variant={filter === 'Web Development' ? 'default' : 'outline'}>Web Dev</Button>
        <Button onClick={() => setFilter('AI Development')} variant={filter === 'AI Development' ? 'default' : 'outline'}>AI Dev</Button>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
