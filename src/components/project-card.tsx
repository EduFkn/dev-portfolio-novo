
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Code, Server, Type, Braces, Database, Wind, Container, GitFork, Workflow, Bot } from 'lucide-react';
import type React from 'react';
import { useI18n } from '@/hooks/use-i18n';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  liveLink?: string;
  repoLink?: string;
  tags: string[];
  category: string;
}

interface ProjectCardProps {
  project: Project;
}

const techIconMap: Record<string, React.ReactElement | null> = {
  'HTML': <Code className="h-3 w-3" />,
  'CSS': <Code className="h-3 w-3" />,
  'JavaScript': <Braces className="h-3 w-3" />,
  'Node.js': <Server className="h-3 w-3" />,
  'TypeScript': <Type className="h-3 w-3" />,
  'MongoDB': <Database className="h-3 w-3" />,
  'TailwindCSS': <Wind className="h-3 w-3" />,
  'PostgreSQL': <Database className="h-3 w-3" />,
  'React': <Code className="h-3 w-3" />,
  'Docker': <Container className="h-3 w-3" />,
  'Git': <GitFork className="h-3 w-3" />,
  'GitHub': <Github className="h-3 w-3" />,
  'N8N': <Workflow className="h-3 w-3" />,
  'Chatbots': <Bot className="h-3 w-3" />,
};


export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useI18n();
  return (
    <Card className="bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col overflow-hidden group border-2 border-transparent hover:border-primary/70">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 ease-in-out group-hover:scale-105"
            data-ai-hint={project.imageHint}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-black/10 transition-all duration-300"></div>
           <Badge variant="secondary" className="absolute top-2 right-2 text-[0.6rem] px-1.5 py-0.5 md:top-2.5 md:right-2.5 border-primary/50 text-primary bg-card/80 backdrop-blur-sm md:text-[0.65rem] md:px-2">{project.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-3.5 flex-grow flex flex-col"> 
        <CardTitle className="font-headline text-base md:text-md mb-1 text-accent group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle> 
        <CardDescription className="text-foreground/80 mb-2 text-xs md:text-xs line-clamp-2 flex-grow leading-normal">{project.description}</CardDescription> 
        
        <div className="mt-auto">
          <p className="text-[0.6rem] md:text-[0.65rem] text-muted-foreground mb-1">{t('projects.techLabel')}</p> 
          <div className="flex flex-wrap gap-1 md:gap-1 mb-2"> 
            {project.tags.slice(0, 3).map((tag) => ( 
              <Badge key={tag} variant="secondary" className="text-[0.55rem] md:text-[0.6rem] bg-secondary/80 text-secondary-foreground/90 flex items-center gap-0.5 px-1 py-0.5 hover:bg-primary/20 hover:text-primary transition-colors"> 
                {techIconMap[tag] || <Code className="h-2.5 w-2.5" />} 
                <span className="ml-0.5">{tag}</span>
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-[0.55rem] md:text-[0.6rem] px-1 py-0.5">+{project.tags.length - 3}</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 md:p-3.5 border-t border-border/50 bg-card/30"> 
        <div className="flex justify-start space-x-1.5 w-full"> 
          {project.liveLink && (
            <Button asChild variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 transform hover:scale-105 text-[0.65rem] px-2 py-1 h-auto md:px-2.5"> 
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-2.5 w-2.5 md:h-3 md:w-3" /> {t('projects.demoButton')}
              </Link>
            </Button>
          )}
          {project.repoLink && (
            <Button asChild variant="ghost" size="sm" className="text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors duration-300 transform hover:scale-105 text-[0.65rem] px-2 py-1 h-auto md:px-2.5"> 
              <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 h-2.5 w-2.5 md:h-3 md:w-3" /> {t('projects.repoButton')}
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
