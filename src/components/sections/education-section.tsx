"use client";

import { GraduationCap, CalendarDays, School } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const educationData = [
  {
    degree: "Bacharelado em Ciência da Computação",
    institution: "Universidade Estácio de Sá",
    duration: "2018 - 2022",
    description: "Foco em desenvolvimento de software, algoritmos, estruturas de dados e inteligência artificial. Participei de projetos de pesquisa e desenvolvi um sistema de gerenciamento acadêmico como projeto final.",
    highlights: [
      "Projeto de Conclusão de Curso: Sistema de Gerenciamento Acadêmico com nota A.",
      "Participação em maratonas de programação.",
      "Monitoria na disciplina de Programação Orientada a Objetos.",
    ],
  },
  {
    degree: "Curso Técnico em Informática para Internet",
    institution: "Instituto Federal Fluminense (IFF)",
    duration: "2015 - 2017",
    description: "Formação técnica abrangente em desenvolvimento web front-end e back-end, design de interfaces, banco de dados e redes de computadores.",
    highlights: [
      "Desenvolvimento de um portal de notícias local como projeto prático.",
      "Prêmio de melhor projeto da turma de 2017.",
    ],
  },
  {
    degree: "Certificação Next.js Developer",
    institution: "Online Platform X",
    duration: "2023",
    description: "Curso intensivo focado nas melhores práticas de desenvolvimento com Next.js, incluindo App Router, Server Components, e otimizações de performance.",
    highlights: [],
  },
];

export function EducationSection() {
  return (
    <section id="education" className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-center mb-10">
          Formação <span className="text-primary">Acadêmica</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {educationData.map((edu, index) => (
            <Card key={index} className="bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-center text-primary mb-2">
                  <GraduationCap className="h-6 w-6 mr-2" />
                  <CardTitle className="font-headline text-lg text-accent">{edu.degree}</CardTitle>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                  <School className="h-3.5 w-3.5 mr-1.5" />
                  {edu.institution}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                  {edu.duration}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="mb-3 text-foreground/80 text-xs leading-normal">{edu.description}</CardDescription>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-foreground/70 text-xs">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
