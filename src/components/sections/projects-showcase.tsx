
"use client";

import React, { useState } from 'react';
import { ProjectCard } from './project-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Adjusted projects with filtered tags
const allProjects = [
  {
    id: '1',
    title: 'Plataforma E-commerce',
    description: 'Plataforma de e-commerce com React, Node.js, e MongoDB para gerenciamento de produtos e vendas.',
    imageUrl: 'https://placehold.co/600x360/A06CD5/FFFFFF.png?text=E-commerce',
    imageHint: 'online store shopping cart',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'], // Allowed tags
    category: 'Sistemas'
  },
  {
    id: '2',
    title: 'App de Gerenciamento de Tarefas',
    description: 'Aplicativo colaborativo de gerenciamento de tarefas com atualizações em tempo real.',
    imageUrl: 'https://placehold.co/600x360/D8B4F1/23272F.png?text=Task+App',
    imageHint: 'productivity tool checklist',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Node.js', 'PostgreSQL'], // Allowed tags
    category: 'Sistemas'
  },
  {
    id: '3',
    title: 'Website Portfolio Pessoal',
    description: 'Este próprio site de portfólio, construído com as tecnologias mais recentes para uma experiência visual moderna.',
    imageUrl: 'https://placehold.co/600x360/23272F/A06CD5.png?text=Portfolio',
    imageHint: 'personal website cv',
    liveLink: '#', // Should point to itself if applicable
    repoLink: '#',
    tags: ['React', 'TypeScript', 'TailwindCSS'], // Using React as Next.js is based on it
    category: 'Landing Pages'
  },
  {
    id: '4',
    title: 'Chatbot de Atendimento',
    description: 'Chatbot inteligente para automação de suporte ao cliente, integrado com plataformas de mensageria.',
    imageUrl: 'https://placehold.co/600x360/A06CD5/FFFFFF.png?text=AI+Chatbot',
    imageHint: 'artificial intelligence customer service',
    liveLink: '#',
    repoLink: '#',
    tags: ['Chatbots', 'Node.js', 'JavaScript'], // Allowed tags
    category: 'Automações'
  },
  {
    id: '5',
    title: 'Sistema de Reservas Simplificado',
    description: 'Plataforma para gerenciamento de reservas e clientes, ideal para pequenas pousadas ou serviços.',
    imageUrl: 'https://placehold.co/600x360/8E7DBE/FFFFFF.png?text=Booking+System',
    imageHint: 'booking calendar reservation',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'], // Allowed tags
    category: 'Sistemas'
  },
  {
    id: '6',
    title: 'Landing Page para Startup',
    description: 'Página de destino moderna e otimizada para conversão para uma startup de tecnologia.',
    imageUrl: 'https://placehold.co/600x360/C084FC/2D1B3F.png?text=Startup+LP',
    imageHint: 'startup website tech',
    liveLink: '#',
    repoLink: '#',
    tags: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS'], // Allowed tags
    category: 'Landing Pages'
  },
   {
    id: '7',
    title: 'Automação de Relatórios com N8N',
    description: 'Workflow N8N para automatizar a geração e envio de relatórios periódicos via e-mail.',
    imageUrl: 'https://placehold.co/600x360/A4A4A4/2E2E2E.png?text=N8N+Reports',
    imageHint: 'automation workflow data',
    liveLink: '#',
    repoLink: '#',
    tags: ['N8N', 'JavaScript'], // N8N often uses JS for custom nodes
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
    <section id="projects" className="py-12 md:py-20"> {/* Keep section padding consistent */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-center mb-10">
          Meus <span className="text-primary">Projetos</span>
        </h2>
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {categories.map(category => (
            <Button 
              key={category}
              onClick={() => setFilter(category)} 
              variant={filter === category ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "transition-all duration-300 text-xs px-4 py-2",
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70 text-sm">Nenhum projeto encontrado para esta categoria.</p>
        )}
      </div>
    </section>
  );
}
