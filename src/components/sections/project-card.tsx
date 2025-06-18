"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Code, Webhook, Server, Type, FileJson, SigmaSquare, DatabaseZap, Database, Wind, Flame, CreditCard, Component as ComponentIcon, Sparkles, FileCode2, Paintbrush, Package, Router, Network, Cloud, Container, GitFork, Zap, TrendingUp, FileText } from 'lucide-react';
import type React from 'react';

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
  'React': <Code className="h-4 w-4" />,
  'Next.js': <Webhook className="h-4 w-4" />,
  'Node.js': <Server className="h-4 w-4" />,
  'TypeScript': <Type className="h-4 w-4" />,
  'JavaScript': <FileJson className="h-4 w-4" />,
  'Python': <SigmaSquare className="h-4 w-4" />,
  'MongoDB': <DatabaseZap className="h-4 w-4" />,
  'PostgreSQL': <Database className="h-4 w-4" />,
  'Tailwind CSS': <Wind className="h-4 w-4" />,
  'Firebase': <Flame className="h-4 w-4" />,
  'Stripe': <CreditCard className="h-4 w-4" />,
  'ShadCN UI': <ComponentIcon className="h-4 w-4" />,
  'Genkit': <Sparkles className="h-4 w-4" />, // Changed from BrainCircuit
  'Google AI': <Sparkles className="h-4 w-4" />,
  'HTML5': <FileCode2 className="h-4 w-4" />,
  'CSS3': <Paintbrush className="h-4 w-4" />,
  'Django': <Package className="h-4 w-4" />,
  'Express.js': <Router className="h-4 w-4" />,
  'GraphQL': <Network className="h-4 w-4" />,
  'AWS': <Cloud className="h-4 w-4" />,
  'Docker': <Container className="h-4 w-4" />,
  'Git': <GitFork className="h-4 w-4" />,
  'Material UI': <ComponentIcon className="h-4 w-4" />,
  'Flask': <Server className="h-4 w-4" />,
  'GSAP': <TrendingUp className="h-4 w-4" />,
  'Pandas': <FileText className="h-4 w-4" />,
  'SMTP': <Zap className="h-4 w-4" />,
};


export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col overflow-hidden group border-2 border-transparent hover:border-primary">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/10] overflow-hidden"> {/* Adjusted aspect ratio */}
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-105"
            data-ai-hint={project.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 group-hover:via-black/20 transition-all duration-300"></div>
           <Badge variant="secondary" className="absolute top-3 right-3 border-primary/50 text-primary bg-card/80 backdrop-blur-sm text-xs px-3 py-1">{project.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="font-headline text-xl mb-2 text-accent group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
        <CardDescription className="text-foreground/80 mb-4 text-sm line-clamp-3 flex-grow">{project.description}</CardDescription>
        
        <div className="mt-auto">
          <p className="text-xs text-muted-foreground mb-2">Tecnologias:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-secondary/80 text-secondary-foreground/90 flex items-center gap-1 px-2 py-1 hover:bg-primary/20 hover:text-primary transition-colors">
                {techIconMap[tag] || <Code className="h-3 w-3" />} 
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t border-border/50 bg-card/30">
        <div className="flex justify-start space-x-3 w-full">
          {project.liveLink && (
            <Button asChild variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 transform hover:scale-105">
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Demo
              </Link>
            </Button>
          )}
          {project.repoLink && (
            <Button asChild variant="ghost" size="sm" className="text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors duration-300 transform hover:scale-105">
              <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Repositório
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
