
"use client";

import React, { useState } from 'react';
import { ProjectCard } from './project-card'; // Adjusted path if ProjectCard is moved/renamed
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/use-i18n';

// Adjusted projects with filtered tags and i18n
const getProjectsData = (t: Function) => [
  {
    id: '1',
    title: t('projects.ecommerce.title'),
    description: t('projects.ecommerce.description'),
    imageUrl: 'https://placehold.co/600x360/6A0DAD/FFFFFF.png?text=E-commerce', 
    imageHint: 'online store shopping cart',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
    category: t('projects.categories.systems')
  },
  {
    id: '2',
    title: t('projects.taskApp.title'),
    description: t('projects.taskApp.description'),
    imageUrl: 'https://placehold.co/600x360/A020F0/FFFFFF.png?text=Task+App', 
    imageHint: 'productivity tool checklist',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    category: t('projects.categories.systems')
  },
  {
    id: '3',
    title: t('projects.portfolio.title'),
    description: t('projects.portfolio.description'),
    imageUrl: 'https://placehold.co/600x360/301934/E6E6FA.png?text=Portfolio', 
    imageHint: 'personal website cv',
    liveLink: '#', 
    repoLink: '#',
    tags: ['React', 'TypeScript', 'TailwindCSS'], 
    category: t('projects.categories.landingPages')
  },
  {
    id: '4',
    title: t('projects.chatbot.title'),
    description: t('projects.chatbot.description'),
    imageUrl: 'https://placehold.co/600x360/8A2BE2/FFFFFF.png?text=AI+Chatbot', 
    imageHint: 'artificial intelligence customer service',
    liveLink: '#',
    repoLink: '#',
    tags: ['Chatbots', 'Node.js', 'JavaScript'], 
    category: t('projects.categories.automations')
  },
  {
    id: '5',
    title: t('projects.bookingSystem.title'),
    description: t('projects.bookingSystem.description'),
    imageUrl: 'https://placehold.co/600x360/4B0082/E6E6FA.png?text=Booking+System', 
    imageHint: 'booking calendar reservation',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'], 
    category: t('projects.categories.systems')
  },
  {
    id: '6',
    title: t('projects.startupLp.title'),
    description: t('projects.startupLp.description'),
    imageUrl: 'https://placehold.co/600x360/9932CC/FFFFFF.png?text=Startup+LP', 
    imageHint: 'startup website tech',
    liveLink: '#',
    repoLink: '#',
    tags: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS'], 
    category: t('projects.categories.landingPages')
  },
   {
    id: '7',
    title: t('projects.n8nReports.title'),
    description: t('projects.n8nReports.description'),
    imageUrl: 'https://placehold.co/600x360/7F00FF/FFFFFF.png?text=N8N+Automation', 
    imageHint: 'automation workflow data',
    liveLink: '#',
    repoLink: '#',
    tags: ['N8N', 'JavaScript'],
    category: t('projects.categories.automations')
  },
];


export function ProjectsShowcase() {
  const { t } = useI18n();
  const allProjects = getProjectsData(t);
  
  const categories = [
    t('projects.categories.all'), 
    t('projects.categories.systems'), 
    t('projects.categories.automations'), 
    t('projects.categories.landingPages')
  ];
  
  const [filter, setFilter] = useState(categories[0]);
  
  const filteredProjects = filter === t('projects.categories.all')
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-12 md:py-20 animate-fade-in-up-subtle"> 
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          {t('projects.title')} <span className="text-primary">{t('projects.titleHighlight')}</span>
        </h2>
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-10 md:mb-12 animate-fade-in-up-subtle" style={{ animationDelay: '0.2s' }}>
          {categories.map(category => (
            <Button 
              key={category}
              onClick={() => setFilter(category)} 
              variant={filter === category ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "transition-all duration-300 text-xs px-3 py-1.5 h-auto md:px-4 md:py-2",
                filter === category 
                  ? "bg-primary text-primary-foreground scale-105 shadow-lg" 
                  : "border-primary text-primary hover:bg-primary/10 hover:text-primary"
              )}
            >
              {category}
            </Button>
          ))}
        </div>
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="animate-fade-in-up-subtle" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70 text-sm md:text-base">{t('projects.noProjectsFound')}</p>
        )}
      </div>
    </section>
  );
}
