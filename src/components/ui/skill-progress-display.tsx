
"use client";

import React from 'react';
import { Code, Database, Wind, Server, Type, Braces, Container, GitFork, Github, Workflow, Bot } from "lucide-react";

interface SkillProgress {
  name: string;
  proficiency: number; // Percentage 0-100
  iconName?: string; // Optional: maps to a Lucide icon or custom logic
}

interface SkillProgressDisplayProps {
  skills: SkillProgress[];
}

const iconMap: Record<string, React.ElementType> = {
  HTML: Code,
  CSS: Code, // Or a more specific one like Palette if desired
  JavaScript: Braces,
  Nodejs: Server, // Corrected from Node.js for consistency if used as key
  TypeScript: Type,
  MongoDB: Database,
  TailwindCSS: Wind,
  PostgreSQL: Database,
  React: Code, // Or Atom
  Nextjs: Code, // Often represented by React or Vercel logo (not in Lucide)
  Docker: Container,
  Git: GitFork,
  GitHub: Github, // Corrected case
  N8N: Workflow,
  Chatbots: Bot,
  PHP: Code, // Generic for now
  default: Code,
};


export function SkillProgressDisplay({ skills }: SkillProgressDisplayProps) {
  if (!skills || skills.length === 0) {
    return <p className="text-xs text-muted-foreground">Nenhuma habilidade específica detalhada.</p>;
  }

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => {
        const IconComponent = skill.iconName ? (iconMap[skill.iconName] || iconMap.default) : iconMap.default;
        const barId = `skill-bar-${index}`;
        return (
          <div key={index} className="skill-box w-full">
            <div className="flex justify-between items-center mb-0.5">
              <span className="title text-xs font-semibold text-foreground/80 flex items-center">
                <IconComponent className="w-3.5 h-3.5 mr-1.5 text-primary" />
                {skill.name}
              </span>
              {/* Tooltip is part of the skill-per span now */}
            </div>
            <div className="skill-progress-bar bg-muted/30"> {/* Ensure bg-muted/30 is defined or adjust */}
              <span
                className="skill-progress-per"
                style={{ width: `${skill.proficiency}%`, animationDelay: `${index * 0.05}s` }}
                aria-valuenow={skill.proficiency}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-labelledby={barId}
              >
                <span className="skill-progress-tooltip">{skill.proficiency}%</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
