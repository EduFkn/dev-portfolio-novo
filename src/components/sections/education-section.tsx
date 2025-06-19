
"use client";

import { GraduationCap, CalendarDays, School, Code2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillProgressDisplay } from "@/components/ui/skill-progress-display";
import { useI18n } from "@/hooks/use-i18n";

const getEducationData = (t: Function) => [
  {
    degree: t('education.csDegree.degree'),
    institution: t('education.csDegree.institution'),
    duration: t('education.csDegree.duration'),
    description: t('education.csDegree.description'),
    highlights: [
      t('education.csDegree.highlight1'),
      t('education.csDegree.highlight2'),
    ],
    skillsLearned: [
      { name: "JavaScript", proficiency: 70, iconName: "JavaScript" },
      { name: "Node.js", proficiency: 60, iconName: "Nodejs" },
      { name: "React", proficiency: 50, iconName: "React" },
      { name: "HTML", proficiency: 80, iconName: "HTML" },
    ]
  },
  {
    degree: t('education.webDevCourse.degree'),
    institution: t('education.webDevCourse.institution'),
    duration: t('education.webDevCourse.duration'),
    description: t('education.webDevCourse.description'),
    highlights: [
      t('education.webDevCourse.highlight1'),
    ],
    skillsLearned: [
      { name: "HTML", proficiency: 90, iconName: "HTML" },
      { name: "CSS", proficiency: 85, iconName: "CSS" },
      { name: "PostgreSQL", proficiency: 55, iconName: "PostgreSQL" }, 
    ]
  },
  {
    degree: t('education.nextjsCert.degree'),
    institution: t('education.nextjsCert.institution'),
    duration: t('education.nextjsCert.duration'),
    description: t('education.nextjsCert.description'),
    highlights: [],
    skillsLearned: [
      { name: "React", proficiency: 90, iconName: "React" }, 
      { name: "TypeScript", proficiency: 75, iconName: "TypeScript" },
      { name: "TailwindCSS", proficiency: 70, iconName: "TailwindCSS" },
    ]
  },
];

export function EducationSection() {
  const { t } = useI18n();
  const educationData = getEducationData(t);

  return (
    <section id="education" className="bg-card/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16">
          {t('education.title')} <span className="text-primary">{t('education.titleHighlight')}</span>
        </h2>
        <div className="scroll-snap-container hide-scrollbar space-y-4 md:space-y-6">
          {educationData.map((edu, index) => (
            <Card 
              key={index} 
              className="bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden animate-fade-in-up-subtle scroll-snap-child"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="md:w-2/5 p-2.5 sm:p-3 md:p-4 border-b md:border-b-0 md:border-r border-border">
                <CardHeader className="p-0 mb-2">
                  <div className="flex items-center text-primary mb-1">
                    <GraduationCap className="h-4 w-4 md:h-5 md:w-5 mr-1.5" />
                    <CardTitle className="font-headline text-sm md:text-base text-accent leading-tight">{edu.degree}</CardTitle>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mb-0.5">
                    <School className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1" />
                    {edu.institution}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarDays className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1" />
                    {edu.duration}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="mb-1.5 text-foreground/80 text-xs leading-snug line-clamp-2 md:line-clamp-3">{edu.description}</CardDescription>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-0.5 text-foreground/70 text-xs">
                      {edu.highlights.map((highlight, i) => (
                        <li key={i} className="line-clamp-1">{highlight}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </div>
              <div className="md:w-3/5 p-2.5 sm:p-3 md:p-4">
                <h4 className="font-headline text-xs md:text-sm text-foreground/90 mb-2 flex items-center">
                  <Code2 className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 text-primary" />
                  {t('education.skillsLearnedTitle')}
                </h4>
                <SkillProgressDisplay skills={edu.skillsLearned} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
