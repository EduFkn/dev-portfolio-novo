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
    <section id="experience" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">
          Experiência <span className="text-primary">Profissional</span>
        </h2>
        <div className="relative space-y-12">
          {/* Timeline line - make it sticky within its scroll container if needed */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-border/50 transform md:-translate-x-1/2" style={{ height: 'calc(100% - 2rem)' }}></div>
          
          {experienceData.map((exp, index) => (
            <div key={index} className="relative flex items-start group md:pl-8 md:pr-8"> {/* Added padding for dot visibility */}
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 top-1 w-5 h-5 bg-primary rounded-full border-4 border-background shadow-md transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-300 z-10"></div>
              
              <Card className={`w-full md:w-[calc(50%-2.5rem)] ${index % 2 === 0 ? 'md:ml-[calc(50%+2.5rem)] md:mr-0' : 'md:mr-[calc(50%+2.5rem)] md:ml-0'} bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="font-headline text-xl text-accent">{exp.role}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {exp.duration}
                    </div>
                  </div>
                  <div className="flex items-center text-md text-foreground/90">
                    <Briefcase className="h-5 w-5 mr-2 text-primary" />
                    {exp.company}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-foreground/80">{exp.description}</CardDescription>
                  <ul className="list-disc list-inside space-y-1 text-foreground/70">
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
