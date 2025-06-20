
"use client";

import React from 'react';
import { Terminal } from 'lucide-react'; // Using Terminal as a generic code icon
import { cn } from '@/lib/utils';

interface SkillCodeCardProps {
  skillName: string;
  details: string[];
  icon: React.ReactElement;
}

export function SkillCodeCard({ skillName, details, icon }: SkillCodeCardProps) {
  const languageColorClass = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'html': return 'skill-card-html';
      case 'css': return 'skill-card-css';
      case 'javascript': return 'skill-card-js';
      case 'typescript': return 'skill-card-ts';
      case 'react': return 'skill-card-react';
      case 'next.js': return 'skill-card-nextjs'; // Kept for consistency if needed
      case 'node.js': return 'skill-card-node';
      case 'tailwindcss': return 'skill-card-tailwind'; // Corrected from Tailwind CSS
      case 'mongodb': return 'skill-card-mongo';
      case 'postgresql': return 'skill-card-postgres';
      case 'docker': return 'skill-card-docker';
      case 'git': return 'skill-card-git';
      case 'github': return 'skill-card-github';
      case 'n8n': return 'skill-card-n8n';
      case 'chatbots': return 'skill-card-chatbots'; // Corrected case
      default: return 'text-foreground/80';
    }
  };
  
  return (
    <div className={cn(
        "relative rounded-lg bg-slate-900/70 dark:bg-slate-900 p-3 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:scale-[1.02]",
        "h-full flex flex-col w-full" // Ensures full height within its flex container
      )}>
      <div className="relative flex items-center mb-3">
        <div className="flex pl-2 pt-1">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 mr-1.5"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 mr-1.5"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80"></span>
        </div>
        <div className="absolute inset-x-0 top-0.5 text-center text-xs text-slate-400 flex items-center justify-center">
          {React.cloneElement(icon, { className: `h-3.5 w-3.5 mr-1.5 ${languageColorClass(skillName)}` })}
          {skillName}.config.js
        </div>
      </div>
      <div className="space-y-1 px-2 pb-3 font-mono text-[0.7rem] leading-relaxed flex-grow">
        <p><span className="skill-card-bracket">&lt;</span><span className={`skill-card-tag ${languageColorClass(skillName)}`}>{skillName.replace(/\s+/g, '').replace('.','')}</span><span className="skill-card-bracket">&gt;</span></p>
        {details.slice(0, 2).map((detail, index) => ( // Show only first 2 details
          <p key={index} className="ml-3">
            <span className="skill-card-prop">feature</span><span className="skill-card-bracket">=</span><span className="skill-card-value">&quot;{detail}&quot;</span>
          </p>
        ))}
        <p><span className="skill-card-bracket">&lt;/</span><span className={`skill-card-tag ${languageColorClass(skillName)}`}>{skillName.replace(/\s+/g, '').replace('.','')}</span><span className="skill-card-bracket">&gt;</span></p>
      </div>
    </div>
  );
}
