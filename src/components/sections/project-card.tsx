
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Code, Webhook, Server, Type, Braces, Sigma, DatabaseZap, Database, Wind, Flame, CreditCard, Component as ComponentIcon, Sparkles, FileCode2, Paintbrush, Package, RouterIcon, Network, Cloud, Container, GitFork, Zap, TrendingUp, FileText, Workflow, Bot } from 'lucide-react'; // Added Braces, RouterIcon
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
  'React': <Code className="h-3.5 w-3.5" />,
  'Next.js': <Webhook className="h-3.5 w-3.5" />,
  'Node.js': <Server className="h-3.5 w-3.5" />,
  'TypeScript': <Type className="h-3.5 w-3.5" />,
  'JavaScript': <Braces className="h-3.5 w-3.5" />, // Changed from FileJson to Braces
  'Python': <Sigma className="h-3.5 w-3.5" />,
  'MongoDB': <DatabaseZap className="h-3.5 w-3.5" />,
  'PostgreSQL': <Database className="h-3.5 w-3.5" />,
  'Tailwind CSS': <Wind className="h-3.5 w-3.5" />,
  'Firebase': <Flame className="h-3.5 w-3.5" />,
  'Stripe': <CreditCard className="h-3.5 w-3.5" />,
  'ShadCN UI': <ComponentIcon className="h-3.5 w-3.5" />,
  'Genkit': <Sparkles className="h-3.5 w-3.5" />,
  'Google AI': <Sparkles className="h-3.5 w-3.5" />,
  'HTML5': <FileCode2 className="h-3.5 w-3.5" />,
  'CSS3': <Paintbrush className="h-3.5 w-3.5" />,
  'Django': <Package className="h-3.5 w-3.5" />,
  'Express.js': <RouterIcon className="h-3.5 w-3.5" />, // Changed from Router to RouterIcon for clarity
  'GraphQL': <Network className="h-3.5 w-3.5" />,
  'AWS': <Cloud className="h-3.5 w-3.5" />,
  'Docker': <Container className="h-3.5 w-3.5" />,
  'Git': <GitFork className="h-3.5 w-3.5" />,
  'Material UI': <ComponentIcon className="h-3.5 w-3.5" />,
  'Flask': <Server className="h-3.5 w-3.5" />, // Keep Server, Flask specific icon is rare
  'GSAP': <TrendingUp className="h-3.5 w-3.5" />,
  'Pandas': <FileText className="h-3.5 w-3.5" />,
  'SMTP': <Zap className="h-3.5 w-3.5" />,
  'N8N': <Workflow className="h-3.5 w-3.5" />,
  'Chatbots': <Bot className="h-3.5 w-3.5" />,
};


export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col overflow-hidden group border-2 border-transparent hover:border-primary/70">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] overflow-hidden"> {/* Common aspect ratio for web content */}
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
           <Badge variant="secondary" className="absolute top-2.5 right-2.5 border-primary/50 text-primary bg-card/80 backdrop-blur-sm text-[0.65rem] px-2 py-0.5">{project.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-5 flex-grow flex flex-col">
        <CardTitle className="font-headline text-md md:text-lg mb-1.5 text-accent group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
        <CardDescription className="text-foreground/80 mb-3 text-xs md:text-sm line-clamp-3 flex-grow leading-relaxed">{project.description}</CardDescription>
        
        <div className="mt-auto">
          <p className="text-[0.7rem] text-muted-foreground mb-1.5">Tecnologias:</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 5).map((tag) => ( // Show max 5 tags initially
              <Badge key={tag} variant="secondary" className="text-[0.65rem] bg-secondary/80 text-secondary-foreground/90 flex items-center gap-1 px-1.5 py-0.5 hover:bg-primary/20 hover:text-primary transition-colors">
                {techIconMap[tag] || <Code className="h-3 w-3" />} 
                {tag}
              </Badge>
            ))}
            {project.tags.length > 5 && (
              <Badge variant="outline" className="text-[0.65rem] px-1.5 py-0.5">+{project.tags.length - 5}</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 md:p-5 border-t border-border/50 bg-card/30">
        <div className="flex justify-start space-x-2 w-full">
          {project.liveLink && (
            <Button asChild variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 transform hover:scale-105 text-xs px-3 py-1.5 h-auto">
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3.5 w-3.5" /> Demo
              </Link>
            </Button>
          )}
          {project.repoLink && (
            <Button asChild variant="ghost" size="sm" className="text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors duration-300 transform hover:scale-105 text-xs px-3 py-1.5 h-auto">
              <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 h-3.5 w-3.5" /> Repositório
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

