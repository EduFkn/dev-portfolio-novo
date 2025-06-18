
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, LayoutPanelLeft, Smartphone, Brain, Wind, Server, Type, FileJson, Sigma, Flame, CreditCard, Component, Sparkles, FileCode2, Paintbrush, Package, Router, Network, Cloud, Container, GitFork, Webhook, DatabaseZap } from "lucide-react";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import React from 'react';

const skillsData = [
  {
    category: "Frontend",
    icon: <LayoutPanelLeft className="h-8 w-8 text-primary mb-2" />,
    skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "ShadCN UI"],
  },
  {
    category: "Backend",
    icon: <Code className="h-8 w-8 text-primary mb-2" />,
    skills: ["Node.js", "Express.js", "Python", "Django", "Firebase", "REST APIs", "GraphQL"],
  },
  {
    category: "Databases",
    icon: <Database className="h-8 w-8 text-primary mb-2" />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase Firestore"],
  },
  {
    category: "DevOps & Tools",
    icon: <Smartphone className="h-8 w-8 text-primary mb-2" />,
    skills: ["Git", "Docker", "CI/CD (GitHub Actions)", "AWS (Basic)", "Vercel"],
  },
   {
    category: "AI/ML (Familiarity)",
    icon: <Brain className="h-8 w-8 text-primary mb-2" />,
    skills: ["Genkit", "LangChain", "OpenAI API", "TensorFlow (Basic)", "Scikit-learn (Basic)"],
  },
];

const techIcons = [
  { name: "React", icon: <Code />, color: "text-sky-400" },
  { name: "Next.js", icon: <Webhook />, color: "text-neutral-400" },
  { name: "Node.js", icon: <Server />, color: "text-green-500" },
  { name: "TypeScript", icon: <Type />, color: "text-blue-500" },
  { name: "JavaScript", icon: <FileJson />, color: "text-yellow-400" },
  { name: "Python", icon: <Sigma />, color: "text-blue-400" },
  { name: "HTML5", icon: <FileCode2 />, color: "text-orange-500" },
  { name: "CSS3", icon: <Paintbrush />, color: "text-blue-600" },
  { name: "Tailwind CSS", icon: <Wind />, color: "text-cyan-400" },
  { name: "Firebase", icon: <Flame />, color: "text-yellow-500" },
  { name: "MongoDB", icon: <DatabaseZap />, color: "text-green-400" },
  { name: "PostgreSQL", icon: <Database />, color: "text-indigo-500" },
  { name: "Docker", icon: <Container />, color: "text-blue-500" },
  { name: "Git", icon: <GitFork />, color: "text-orange-600" },
  { name: "AWS", icon: <Cloud />, color: "text-orange-400" },
  { name: "ShadCN UI", icon: <Component />, color: "text-neutral-500" },
  { name: "Genkit", icon: <Sparkles />, color: "text-purple-500" },
];

export function SkillsSection() {
  return (
    <section id="skills" className="bg-card/50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">
          Minhas <span className="text-primary">Habilidades</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillsData.map((categoryItem) => (
            <Card key={categoryItem.category} className="bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                {categoryItem.icon}
                <CardTitle className="font-headline text-xl text-accent">{categoryItem.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap justify-center gap-2">
                  {categoryItem.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm bg-primary/10 text-primary border-primary/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 relative">
           <h3 className="font-headline text-2xl font-semibold text-center mb-8">Tecnologias que Utilizo</h3>
          <InfiniteMarquee speed="normal" pauseOnHover>
            {techIcons.map((tech, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-4 bg-card/50 rounded-lg shadow-md hover:shadow-lg transition-shadow w-28 h-28 text-center">
                <div className={`h-10 w-10 ${tech.color} mb-1 flex items-center justify-center`}>
                  {React.cloneElement(tech.icon, { className: "h-8 w-8" })}
                </div>
                <span className="text-xs text-foreground/80">{tech.name}</span>
              </div>
            ))}
          </InfiniteMarquee>
        </div>
      </div>
    </section>
  );
}
