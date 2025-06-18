"use client";

import { Briefcase, CalendarDays } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const experienceData = [
  {
    role: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    duration: "Jan 2022 - Present",
    description: "Led development of key features for a SaaS platform, mentored junior developers, and improved application performance by 20%. Worked extensively with Next.js, Node.js, and PostgreSQL.",
    tasks: [
      "Designed and implemented scalable microservices.",
      "Collaborated with cross-functional teams to define project requirements.",
      "Conducted code reviews and maintained code quality standards.",
      "Integrated third-party APIs and services.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Web Wizards LLC",
    duration: "Jun 2019 - Dec 2021",
    description: "Developed and maintained client websites and web applications using React, Express, and MongoDB. Contributed to UI/UX design and optimized web performance.",
    tasks: [
      "Built responsive user interfaces with React and Tailwind CSS.",
      "Developed RESTful APIs for various client projects.",
      "Participated in agile development cycles and sprint planning.",
      "Provided technical support and bug fixes for existing applications.",
    ],
  },
  // Add more experiences as needed
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">
          Professional <span className="text-primary">Experience</span>
        </h2>
        <div className="relative space-y-12">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-border/50 transform md:-translate-x-1/2"></div>
          
          {experienceData.map((exp, index) => (
            <div key={index} className="relative flex items-start group">
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 top-1 w-5 h-5 bg-primary rounded-full border-4 border-background shadow-md transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-300"></div>
              
              <Card className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'} bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300`}>
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
