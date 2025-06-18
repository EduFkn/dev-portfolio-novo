"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, LayoutPanelLeft, Smartphone, Brain, Wind, Server, Type, FileJson, Sigma, Flame, CreditCard, Component as ComponentIcon, Sparkles, FileCode2, Paintbrush, Package, Router, Network, Cloud, Container, GitFork, Webhook, DatabaseZap, GithubIcon, Bot, Workflow, Braces } from "lucide-react";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import React from 'react';
import { SkillCodeCard } from './skill-code-card';


const skillsData = [
  {
    category: "Frontend",
    icon: <LayoutPanelLeft className="h-6 w-6 text-primary mb-1.5" />,
    skills: [
      { name: "HTML", details: ["Estrutura semântica", "Acessibilidade (ARIA)", "Formulários avançados"] , icon: <FileCode2 className="h-4 w-4 skill-card-html" />},
      { name: "CSS", details: ["Layouts (Flexbox, Grid)", "Animações e Transições", "Design Responsivo"], icon: <Paintbrush className="h-4 w-4 skill-card-css" /> },
      { name: "JavaScript", details: ["ES6+ Moderno", "Manipulação do DOM", "Assincronicidade (Promises, Async/Await)"], icon: <Braces className="h-4 w-4 skill-card-js" /> },
      { name: "TypeScript", details: ["Tipagem Estática Forte", "Interfaces e Tipos Genéricos", "Melhora na Qualidade do Código"], icon: <Type className="h-4 w-4 skill-card-ts" /> },
      { name: "React", details: ["Componentização", "Hooks (useState, useEffect, etc)", "Gerenciamento de Estado (Context API)"], icon: <Code className="h-4 w-4 skill-card-react" /> },
      { name: "Next.js", details: ["App Router & Server Components", "SSR e SSG", "Otimização de Performance"], icon: <Webhook className="h-4 w-4 skill-card-nextjs" /> },
      { name: "Tailwind CSS", details: ["Utility-First CSS", "Design Responsivo Rápido", "Customização de Temas"], icon: <Wind className="h-4 w-4 skill-card-tailwind" /> },
    ],
  },
  {
    category: "Backend",
    icon: <Server className="h-6 w-6 text-primary mb-1.5" />,
    skills: [
      { name: "Node.js", details: ["Ambiente de Execução JavaScript", "APIs RESTful com Express.js", "Non-blocking I/O"], icon: <Server className="h-4 w-4 skill-card-node" /> },
      { name: "MongoDB", details: ["Banco de Dados NoSQL", "Documentos JSON-like (BSON)", "Mongoose ODM"], icon: <DatabaseZap className="h-4 w-4 skill-card-mongo" /> },
      { name: "PostgreSQL", details: ["Banco de Dados SQL Relacional", "Transações ACID", "Consultas Complexas"], icon: <Database className="h-4 w-4 skill-card-postgres" /> },
    ],
  },
  {
    category: "Ferramentas & DevOps",
    icon: <Smartphone className="h-6 w-6 text-primary mb-1.5" />,
    skills: [
      { name: "Git", details: ["Sistema de Controle de Versão", "Branches e Merges", "Workflows Colaborativos"], icon: <GitFork className="h-4 w-4 skill-card-git" /> },
      { name: "GitHub", details: ["Hospedagem de Repositórios Git", "Pull Requests e Code Review", "GitHub Actions (CI/CD básico)"], icon: <GithubIcon className="h-4 w-4 skill-card-github" /> },
      { name: "Docker", details: ["Conteinerização de Aplicações", "Ambientes de Desenvolvimento Isolados", "Dockerfile e Docker Compose"], icon: <Container className="h-4 w-4 skill-card-docker" /> },
      { name: "N8N", details: ["Automação de Workflows", "Integração de APIs", "Low-code / No-code"], icon: <Workflow className="h-4 w-4 skill-card-n8n" /> },
      { name: "Chatbots", details: ["Desenvolvimento de Bots (Dialogflow, etc)", "Processamento de Linguagem Natural (NLP básico)", "Integração com Plataformas de Mensagens"], icon: <Bot className="h-4 w-4 skill-card-chatbot" /> },
    ],
  },
];

const techIcons = [
  { name: "HTML5", icon: <FileCode2 />, color: "skill-card-html" },
  { name: "CSS3", icon: <Paintbrush />, color: "skill-card-css" },
  { name: "JavaScript", icon: <Braces />, color: "skill-card-js" },
  { name: "TypeScript", icon: <Type />, color: "skill-card-ts" },
  { name: "React", icon: <Code />, color: "skill-card-react" },
  { name: "Next.js", icon: <Webhook />, color: "skill-card-nextjs" },
  { name: "Node.js", icon: <Server />, color: "skill-card-node" },
  { name: "Tailwind CSS", icon: <Wind />, color: "skill-card-tailwind" },
  { name: "MongoDB", icon: <DatabaseZap />, color: "skill-card-mongo" },
  { name: "PostgreSQL", icon: <Database />, color: "skill-card-postgres" },
  { name: "Docker", icon: <Container />, color: "skill-card-docker" },
  { name: "Git", icon: <GitFork />, color: "skill-card-git" },
  { name: "GitHub", icon: <GithubIcon />, color: "skill-card-github" },
  { name: "N8N", icon: <Workflow />, color: "skill-card-n8n" },
  { name: "ChatBot Dev", icon: <Bot />, color: "skill-card-chatbot" },
  { name: "Firebase", icon: <Flame />, color: "text-yellow-500" },
  { name: "ShadCN UI", icon: <ComponentIcon />, color: "text-neutral-500" },
  { name: "Genkit", icon: <Sparkles />, color: "text-purple-500" },
];

export function SkillsSection() {
  return (
    <section id="skills" className="bg-card/30 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-center mb-10">
          Minhas <span className="text-primary">Habilidades</span>
        </h2>
        
        <div className="space-y-10 mb-12">
          {skillsData.map((categoryItem) => (
            <div key={categoryItem.category}>
              <div className="flex items-center justify-center mb-6">
                {categoryItem.icon}
                <h3 className="font-headline text-xl text-accent ml-2">{categoryItem.category}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {categoryItem.skills.map((skill) => (
                  <SkillCodeCard 
                    key={skill.name}
                    skillName={skill.name}
                    details={skill.details}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 relative">
           <h3 className="font-headline text-xl font-semibold text-center mb-6">Stack Tecnológico</h3>
          <InfiniteMarquee speed="normal" pauseOnHover>
            {techIcons.map((tech, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-3 bg-card/50 rounded-lg shadow-md hover:shadow-lg transition-shadow w-24 h-24 text-center mx-2">
                <div className={`h-8 w-8 ${tech.color} mb-1 flex items-center justify-center`}>
                  {React.cloneElement(tech.icon, { className: "h-7 w-7" })}
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
