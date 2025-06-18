
"use client";

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { SkillCodeCard } from './skill-code-card';
import { ChevronLeft, ChevronRight, Code, Database, Wind, Server, Type, Braces, Container, GitFork, Github, Workflow, Bot } from "lucide-react";
import { useI18n } from '@/hooks/use-i18n';


const getSkillsList = (t: Function) => [
  { name: "HTML", details: [t('skills.html.detail1'), t('skills.html.detail2'), t('skills.html.detail3')] , icon: <Code className="h-4 w-4 skill-card-html" />},
  { name: "CSS", details: [t('skills.css.detail1'), t('skills.css.detail2'), t('skills.css.detail3')], icon: <Code className="h-4 w-4 skill-card-css" /> },
  { name: "JavaScript", details: [t('skills.js.detail1'), t('skills.js.detail2'), t('skills.js.detail3')], icon: <Braces className="h-4 w-4 skill-card-js" /> },
  { name: "TypeScript", details: [t('skills.ts.detail1'), t('skills.ts.detail2'), t('skills.ts.detail3')], icon: <Type className="h-4 w-4 skill-card-ts" /> },
  { name: "React", details: [t('skills.react.detail1'), t('skills.react.detail2'), t('skills.react.detail3')], icon: <Code className="h-4 w-4 skill-card-react" /> },
  { name: "TailwindCSS", details: [t('skills.tailwind.detail1'), t('skills.tailwind.detail2'), t('skills.tailwind.detail3')], icon: <Wind className="h-4 w-4 skill-card-tailwind" /> },
  { name: "Node.js", details: [t('skills.node.detail1'), t('skills.node.detail2'), t('skills.node.detail3')], icon: <Server className="h-4 w-4 skill-card-node" /> },
  { name: "MongoDB", details: [t('skills.mongo.detail1'), t('skills.mongo.detail2'), t('skills.mongo.detail3')], icon: <Database className="h-4 w-4 skill-card-mongo" /> },
  { name: "PostgreSQL", details: [t('skills.postgres.detail1'), t('skills.postgres.detail2'), t('skills.postgres.detail3')], icon: <Database className="h-4 w-4 skill-card-postgres" /> },
  { name: "Docker", details: [t('skills.docker.detail1'), t('skills.docker.detail2'), t('skills.docker.detail3')], icon: <Container className="h-4 w-4 skill-card-docker" /> },
  { name: "Git", details: [t('skills.git.detail1'), t('skills.git.detail2'), t('skills.git.detail3')], icon: <GitFork className="h-4 w-4 skill-card-git" /> },
  { name: "GitHub", details: [t('skills.github.detail1'), t('skills.github.detail2'), t('skills.github.detail3')], icon: <Github className="h-4 w-4 skill-card-github" /> },
  { name: "N8N", details: [t('skills.n8n.detail1'), t('skills.n8n.detail2'), t('skills.n8n.detail3')], icon: <Workflow className="h-4 w-4 skill-card-n8n" /> },
  { name: "Chatbots", details: [t('skills.chatbots.detail1'), t('skills.chatbots.detail2'), t('skills.chatbots.detail3')], icon: <Bot className="h-4 w-4 skill-card-chatbots" /> },
];

export function SkillsSection() {
  const { t } = useI18n();
  const skillsList = getSkillsList(t);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300; 
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="bg-card/30 animate-fade-in-up-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          {t('skills.title')} <span className="text-primary">{t('skills.titleHighlight')}</span>
        </h2>
        
        <div className="relative animate-fade-in-up-subtle" style={{ animationDelay: '0.2s' }}>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden sm:block">
            <Button variant="outline" size="icon" onClick={() => scroll('left')} className="rounded-full bg-background/50 hover:bg-primary/20 border-primary text-primary">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 space-x-4 md:space-x-6 hide-scrollbar px-2"
          >
            {skillsList.map((skill, index) => (
              <div key={skill.name} className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] animate-fade-in-up-subtle" style={{ animationDelay: `${0.3 + index * 0.05}s` }}>
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
          <p className="sm:hidden text-center text-xs text-muted-foreground mt-4">{t('skills.scrollHintMobile')}</p>
        </div>
      </div>
    </section>
  );
}
