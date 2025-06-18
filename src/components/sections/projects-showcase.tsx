"use client";

import React, { useState } from 'react';
import { ProjectCard } from './project-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Dummy project data
const allProjects = [
  {
    id: '1',
    title: 'Plataforma E-commerce Completa',
    description: 'Uma plataforma de e-commerce completa com Next.js, integração Stripe e painel de administração.',
    imageUrl: 'https://placehold.co/600x400/A06CD5/FFFFFF.png?text=E-commerce',
    imageHint: 'online store',
    liveLink: '#',
    repoLink: '#',
    tags: ['Next.js', 'React', 'Stripe', 'Tailwind CSS', 'MongoDB', 'Node.js'],
    category: 'Sistemas'
  },
  {
    id: '2',
    title: 'App de Gerenciamento de Tarefas',
    description: 'Um aplicativo colaborativo de gerenciamento de tarefas com atualizações em tempo real usando Firebase.',
    imageUrl: 'https://placehold.co/600x400/D8B4F1/23272F.png?text=Task+App',
    imageHint: 'productivity tool',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Firebase', 'Material UI', 'Node.js'],
    category: 'Sistemas'
  },
  {
    id: '3',
    title: 'Website Portfolio Pessoal',
    description: 'Este próprio site de portfólio, construído com Next.js e projetado para uma experiência visual impressionante.',
    imageUrl: 'https://placehold.co/600x400/23272F/A06CD5.png?text=Portfolio',
    imageHint: 'personal website',
    liveLink: '#',
    repoLink: '#',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'ShadCN UI'],
    category: 'Landing Pages'
  },
  {
    id: '4',
    title: 'Chatbot com IA',
    description: 'Um chatbot inteligente que utiliza Genkit e Google AI para automação de suporte ao cliente.',
    imageUrl: 'https://placehold.co/600x400/A06CD5/FFFFFF.png?text=AI+Chatbot',
    imageHint: 'artificial intelligence',
    liveLink: '#',
    repoLink: '#',
    tags: ['Genkit', 'Google AI', 'Python', 'Flask'],
    category: 'Automações'
  },
  {
    id: '5',
    title: 'Sistema de Reservas Hoteleiras',
    description: 'Plataforma robusta para gerenciamento de reservas, quartos e clientes para hotéis e pousadas.',
    imageUrl: 'https://placehold.co/600x400/8E7DBE/FFFFFF.png?text=Hotel+Booking',
    imageHint: 'hotel booking system',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Docker'],
    category: 'Sistemas'
  },
  {
    id: '6',
    title: 'Landing Page para Startup Tech',
    description: 'Página de destino moderna e otimizada para conversão para uma startup de tecnologia inovadora.',
    imageUrl: 'https://placehold.co/600x400/C084FC/2D1B3F.png?text=Tech+Startup+LP',
    imageHint: 'startup website',
    liveLink: '#',
    repoLink: '#',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'GSAP'],
    category: 'Landing Pages'
  },
   {
    id: '7',
    title: 'Automação de Relatórios Financeiros',
    description: 'Script Python para automatizar a geração e envio de relatórios financeiros periódicos.',
    imageUrl: 'https://placehold.co/600x400/A4A4A4/2E2E2E.png?text=Finance+Automation',
    imageHint: 'financial report automation',
    liveLink: '#',
    repoLink: '#',
    tags: ['Python', 'Pandas', 'SMTP'],
    category: 'Automações'
  },
];

const categories = ['Todos', 'Sistemas', 'Automações', 'Landing Pages'];

export function ProjectsShowcase() {
  const [filter, setFilter] = useState('Todos');
  
  const filteredProjects = filter === 'Todos' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-16 md:py-24">
      <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">
        Meus <span className="text-primary">Projetos</span>
      </h2>
      <div className="flex justify-center space-x-2 sm:space-x-4 mb-12 flex-wrap gap-2">
        {categories.map(category => (
          <Button 
            key={category}
            onClick={() => setFilter(category)} 
            variant={filter === category ? 'default' : 'outline'}
            className={cn(
              "transition-all duration-300",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-foreground/70 text-lg">Nenhum projeto encontrado para esta categoria.</p>
      )}
    </section>
  );
}
