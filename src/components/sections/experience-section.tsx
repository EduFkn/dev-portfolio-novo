
"use client";

import { Briefcase, CalendarDays } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";

const getExperienceData = (t: Function) => [
  {
    role: t('experience.job1.role'),
    company: t('experience.job1.company'),
    duration: t('experience.job1.duration'),
    description: t('experience.job1.description'),
    tasks: [
      t('experience.job1.task1'),
      t('experience.job1.task2'),
      t('experience.job1.task3'),
      t('experience.job1.task4'),
    ],
  },
  {
    role: t('experience.job2.role'),
    company: t('experience.job2.company'),
    duration: t('experience.job2.duration'),
    description: t('experience.job2.description'),
    tasks: [
      t('experience.job2.task1'),
      t('experience.job2.task2'),
      t('experience.job2.task3'),
      t('experience.job2.task4'),
    ],
  },
  {
    role: t('experience.job3.role'),
    company: t('experience.job3.company'),
    duration: t('experience.job3.duration'),
    description: t('experience.job3.description'),
    tasks: [
      t('experience.job3.task1'),
      t('experience.job3.task2'),
      t('experience.job3.task3'),
      t('experience.job3.task4'),
    ],
  },
];

export function ExperienceSection() {
  const { t } = useI18n();
  const experienceData = getExperienceData(t);

  return (
    <section id="experience" className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          {t('experience.title')} <span className="text-primary">{t('experience.titleHighlight')}</span>
        </h2>
        <div className="relative space-y-10 md:space-y-12">
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/50 transform md:-translate-x-1/2" style={{ minHeight: 'calc(100% - 1.5rem)' }}></div>
          
          {experienceData.map((exp, index) => (
            <div key={index} className="relative flex items-start group pl-8 md:pl-0">
              <div className="absolute left-2 md:left-1/2 top-1 w-3.5 h-3.5 bg-primary rounded-full border-2 border-background shadow-md transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300 z-10"></div>
              
              <Card className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:ml-[calc(50%+2rem)]' : 'md:mr-[calc(50%+2rem)] md:text-right md:self-end'} bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300`}>
                <CardHeader className={`pb-3 pt-5 px-5 ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`flex flex-col sm:flex-row sm:items-center ${index % 2 !== 0 ? 'sm:justify-end' : 'sm:justify-between'} mb-1.5`}>
                    <CardTitle className="font-headline text-base sm:text-lg text-accent">{exp.role}</CardTitle>
                    <div className={`flex items-center text-xs text-muted-foreground mt-1 sm:mt-0 ${index % 2 !== 0 ? 'sm:ml-3' : 'sm:ml-0'}`}>
                      <CalendarDays className="h-3.5 w-3.5 mr-1" />
                      {exp.duration}
                    </div>
                  </div>
                  <div className={`flex items-center text-sm text-foreground/90 ${index % 2 !== 0 ? 'md:justify-end' : ''}`}>
                    <Briefcase className="h-4 w-4 mr-1.5 text-primary" />
                    {exp.company}
                  </div>
                </CardHeader>
                <CardContent className={`px-5 pb-5 ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <CardDescription className="mb-3 text-foreground/80 text-xs leading-normal">{exp.description}</CardDescription>
                  <ul className={`list-disc space-y-1 text-foreground/70 text-xs ${index % 2 !== 0 ? 'list-inside md:text-right' : 'list-inside'}`}>
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
