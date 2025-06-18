
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
  'CSS': <Code className="h-3 w-3" />, // Using generic Code icon
  'JavaScript': <Braces className="h-3 w-3" />,
  'Node.js': <Server className="h-3 w-3" />,
  'TypeScript': <Type className="h-3 w-3" />,
  'MongoDB': <Database className="h-3 w-3" />,
  'TailwindCSS': <Wind className="h-3 w-3" />,
  'PostgreSQL': <Database className="h-3 w-3" />,
  'React': <Code className="h-3 w-3" />, // Using generic Code icon
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
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-105"
            data-ai-hint={project.imageHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-black/10 transition-all duration-300"></div>
           <Badge variant="secondary" className="absolute top-2 right-2 md:top-2.5 md:right-2.5 border-primary/50 text-primary bg-card/80 backdrop-blur-sm text-[0.6rem] md:text-[0.65rem] px-1.5 py-0.5 md:px-2">{project.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-4 flex-grow flex flex-col">
        <CardTitle className="font-headline text-md md:text-lg mb-1 text-accent group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
        <CardDescription className="text-foreground/80 mb-2.5 text-xs md:text-sm line-clamp-3 flex-grow leading-relaxed">{project.description}</CardDescription>
        
        <div className="mt-auto">
          <p className="text-[0.65rem] md:text-[0.7rem] text-muted-foreground mb-1.5">{t('projects.techLabel')}</p>
          <div className="flex flex-wrap gap-1 md:gap-1.5 mb-2.5">
            {project.tags.slice(0, 4).map((tag) => ( // Show 4 tags initially
              <Badge key={tag} variant="secondary" className="text-[0.6rem] md:text-[0.65rem] bg-secondary/80 text-secondary-foreground/90 flex items-center gap-0.5 md:gap-1 px-1 md:px-1.5 py-0.5 hover:bg-primary/20 hover:text-primary transition-colors">
                {techIconMap[tag] || <Code className="h-3 w-3" />} 
                <span className="ml-0.5">{tag}</span>
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline" className="text-[0.6rem] md:text-[0.65rem] px-1 md:px-1.5 py-0.5">+{project.tags.length - 4}</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 md:p-4 border-t border-border/50 bg-card/30">
        <div className="flex justify-start space-x-2 w-full">
          {project.liveLink && (
            <Button asChild variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 transform hover:scale-105 text-xs px-2.5 py-1 h-auto md:px-3 md:py-1.5">
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3 md:h-3.5 md:w-3.5" /> {t('projects.demoButton')}
              </Link>
            </Button>
          )}
          {project.repoLink && (
            <Button asChild variant="ghost" size="sm" className="text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors duration-300 transform hover:scale-105 text-xs px-2.5 py-1 h-auto md:px-3 md:py-1.5">
              <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 h-3 w-3 md:h-3.5 md:w-3.5" /> {t('projects.repoButton')}
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
