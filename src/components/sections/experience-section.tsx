"use client";

import { Briefcase, CalendarDays } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const experienceData = [
  {
    role: "Desenvolvedor Full Stack Sênior",
    company: "Tech Solutions Inc.",
    duration: "Jan 2022 - Presente",
    description: "Liderei o desenvolvimento de funcionalidades chave para uma plataforma SaaS, mentorei desenvolvedores juniores e melhorei a performance da aplicação em 20%. Trabalhei extensivamente com Next.js, Node.js e PostgreSQL.",
    tasks: [
      "Projetei e implementei microsserviços escaláveis.",
      "Colaborei com equipes multifuncionais para definir requisitos de projeto.",
      "Conduzi revisões de código e mantive padrões de qualidade de código.",
      "Integrei APIs e serviços de terceiros.",
    ],
  },
  {
    role: "Engenheiro de Software",
    company: "Web Wizards LLC",
    duration: "Jun 2019 - Dez 2021",
    description: "Desenvolvi e mantive websites e aplicações web para clientes utilizando React, Express e MongoDB. Contribuí para o design UI/UX e otimizei a performance web.",
    tasks: [
      "Construí interfaces de usuário responsivas com React e Tailwind CSS.",
      "Desenvolvi APIs RESTful para diversos projetos de clientes.",
      "Participei de ciclos de desenvolvimento ágil e planejamento de sprints.",
      "Forneci suporte técnico e correções de bugs para aplicações existentes.",
    ],
  },
  {
    role: "Desenvolvedor Web Júnior",
    company: "Startup Visionária",
    duration: "Mar 2018 - Mai 2019",
    description: "Auxiliei no desenvolvimento de um MVP para uma startup inovadora, focando em tecnologias front-end e aprendendo rapidamente sobre o ciclo de vida de desenvolvimento de software.",
    tasks: [
      "Desenvolvimento de componentes UI com HTML, CSS e JavaScript.",
      "Colaboração com a equipe de design para implementar interfaces pixel-perfect.",
      "Testes e depuração de funcionalidades.",
      "Aprendizado e aplicação de metodologias ágeis.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-center mb-10">
          Experiência <span className="text-primary">Profissional</span>
        </h2>
        <div className="relative space-y-10">
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/50 transform md:-translate-x-1/2" style={{ minHeight: 'calc(100% - 1.5rem)' }}></div>
          
          {experienceData.map((exp, index) => (
            <div key={index} className="relative flex items-start group pl-8 md:pl-0">
              <div className="absolute left-2 md:left-1/2 top-1 w-3.5 h-3.5 bg-primary rounded-full border-2 border-background shadow-md transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300 z-10"></div>
              
              <Card className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:ml-[calc(50%+2rem)]' : 'md:mr-[calc(50%+2rem)] md:self-end'} bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300`}>
                <CardHeader className="pb-3 pt-5 px-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1.5">
                    <CardTitle className="font-headline text-base sm:text-lg text-accent">{exp.role}</CardTitle>
                    <div className="flex items-center text-xs text-muted-foreground mt-1 sm:mt-0">
                      <CalendarDays className="h-3.5 w-3.5 mr-1" />
                      {exp.duration}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-foreground/90">
                    <Briefcase className="h-4 w-4 mr-1.5 text-primary" />
                    {exp.company}
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <CardDescription className="mb-3 text-foreground/80 text-xs leading-normal">{exp.description}</CardDescription>
                  <ul className="list-disc list-inside space-y-1 text-foreground/70 text-xs">
                    {exp.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
