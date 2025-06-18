"use client";

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { SkillCodeCard } from './skill-code-card';
import { ChevronLeft, ChevronRight, Code, Database, Wind, Server, Type, Braces, Container, GitFork, Github, Workflow, Bot } from "lucide-react"; // Corrected Github icon

const skillsList = [
  { name: "HTML", details: ["Estrutura semântica", "Acessibilidade", "Formulários"] , icon: <Code className="h-4 w-4 skill-card-html" />},
  { name: "CSS", details: ["Flexbox & Grid", "Animações", "Design Responsivo"], icon: <Code className="h-4 w-4 skill-card-css" /> },
  { name: "JavaScript", details: ["ES6+ Moderno", "DOM API", "Async/Await"], icon: <Braces className="h-4 w-4 skill-card-js" /> },
  { name: "TypeScript", details: ["Tipagem Estática", "Interfaces", "Generics"], icon: <Type className="h-4 w-4 skill-card-ts" /> },
  { name: "React", details: ["Componentização", "Hooks", "Context API"], icon: <Code className="h-4 w-4 skill-card-react" /> },
  // Next.js was removed as per user request to only list specified techs; React covers the UI library aspect.
  { name: "TailwindCSS", details: ["Utility-First", "JIT Compilation", "Customização"], icon: <Wind className="h-4 w-4 skill-card-tailwind" /> },
  { name: "Node.js", details: ["APIs RESTful", "Express.js", "Async I/O"], icon: <Server className="h-4 w-4 skill-card-node" /> },
  { name: "MongoDB", details: ["NoSQL", "Documentos BSON", "Mongoose"], icon: <Database className="h-4 w-4 skill-card-mongo" /> }, // Changed to Database icon
  { name: "PostgreSQL", details: ["SQL Relacional", "Transações ACID", "Sequelize"], icon: <Database className="h-4 w-4 skill-card-postgres" /> },
  { name: "Docker", details: ["Conteinerização", "Docker Compose", "Imagens"], icon: <Container className="h-4 w-4 skill-card-docker" /> },
  { name: "Git", details: ["Controle de Versão", "Branching", "Merge"], icon: <GitFork className="h-4 w-4 skill-card-git" /> },
  { name: "GitHub", details: ["Repositórios", "Pull Requests", "Actions (CI/CD)"], icon: <Github className="h-4 w-4 skill-card-github" /> },
  { name: "N8N", details: ["Automação", "Workflows Visuais", "Integrações"], icon: <Workflow className="h-4 w-4 skill-card-n8n" /> },
  { name: "Chatbots", details: ["NLP Básico", "Dialogflow/Rasa", "APIs de Mensagens"], icon: <Bot className="h-4 w-4 skill-card-chatbots" /> },
];

export function SkillsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300; // Adjust scroll amount as needed
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-center mb-10 md:mb-12">
          Minhas <span className="text-primary">Habilidades</span>
        </h2>
        
        <div className="relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden sm:block">
            <Button variant="outline" size="icon" onClick={() => scroll('left')} className="rounded-full bg-background/50 hover:bg-primary/20 border-primary text-primary">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 space-x-4 md:space-x-6 hide-scrollbar px-2" // Added hide-scrollbar
          >
            {skillsList.map((skill) => (
              <div key={skill.name} className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]">
                <SkillCodeCard 
                  skillName={skill.name}
                  details={skill.details}
                  icon={skill.icon}
                />
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden sm:block">
             <Button variant="outline" size="icon" onClick={() => scroll('right')} className="rounded-full bg-background/50 hover:bg-primary/20 border-primary text-primary">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
           {/* Mobile scroll hint */}
          <p className="sm:hidden text-center text-xs text-muted-foreground mt-4">Arraste para ver mais habilidades &rarr;</p>
        </div>
      </div>
    </section>
  );
}
