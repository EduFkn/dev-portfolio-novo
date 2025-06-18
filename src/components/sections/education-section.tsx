
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
      t('education.csDegree.highlight3'),
    ],
    skillsLearned: [
      { name: "JavaScript", proficiency: 70, iconName: "JavaScript" },
      { name: "Node.js", proficiency: 60, iconName: "Nodejs" },
      { name: "React", proficiency: 50, iconName: "React" },
      { name: "HTML", proficiency: 80, iconName: "HTML" },
      { name: "CSS", proficiency: 75, iconName: "CSS" },
      { name: "Git", proficiency: 65, iconName: "Git" },
    ]
  },
  {
    degree: t('education.webDevCourse.degree'),
    institution: t('education.webDevCourse.institution'),
    duration: t('education.webDevCourse.duration'),
    description: t('education.webDevCourse.description'),
    highlights: [
      t('education.webDevCourse.highlight1'),
      t('education.webDevCourse.highlight2'),
    ],
    skillsLearned: [
      { name: "HTML", proficiency: 90, iconName: "HTML" },
      { name: "CSS", proficiency: 85, iconName: "CSS" },
      { name: "JavaScript", proficiency: 60, iconName: "JavaScript" },
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
      { name: "React", proficiency: 90, iconName: "React" }, // Next.js is React-based
      { name: "TypeScript", proficiency: 75, iconName: "TypeScript" },
      { name: "TailwindCSS", proficiency: 70, iconName: "TailwindCSS" },
    ]
  },
];

export function EducationSection() {
  const { t } = useI18n();
  const educationData = getEducationData(t);

  return (
    <section id="education" className="py-12 md:py-20 bg-card/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          {t('education.title')} <span className="text-primary">{t('education.titleHighlight')}</span>
        </h2>
        <div className="space-y-8 md:space-y-10">
          {educationData.map((edu, index) => (
            <Card key={index} className="bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden">
              <div className="md:w-2/5 p-5 md:p-6 border-b md:border-b-0 md:border-r border-border">
                <CardHeader className="p-0 mb-3">
                  <div className="flex items-center text-primary mb-2">
                    <GraduationCap className="h-6 w-6 mr-2" />
                    <CardTitle className="font-headline text-lg md:text-xl text-accent">{edu.degree}</CardTitle>
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-muted-foreground mb-1">
                    <School className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5" />
                    {edu.institution}
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5" />
                    {edu.duration}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="mb-3 text-foreground/80 text-xs md:text-sm leading-normal">{edu.description}</CardDescription>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-foreground/70 text-xs md:text-sm">
                      {edu.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </div>
              <div className="md:w-3/5 p-5 md:p-6">
                <h4 className="font-headline text-md md:text-lg text-foreground/90 mb-3 flex items-center">
                  <Code2 className="h-5 w-5 mr-2 text-primary" />
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
