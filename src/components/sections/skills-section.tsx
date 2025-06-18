"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, LayoutPanelLeft, Smartphone, Brain } from "lucide-react"; // Example icons

const skillsData = [
  {
    category: "Frontend",
    icon: <LayoutPanelLeft className="h-8 w-8 text-primary mb-2" />,
    skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "ShadCN UI"],
  },
  {
    category: "Backend",
    icon: <Code className="h-8 w-8 text-primary mb-2" />,
    skills: ["Node.js", "Express.js", "Python", "Django", "Firebase", "REST APIs", "GraphQL"],
  },
  {
    category: "Databases",
    icon: <Database className="h-8 w-8 text-primary mb-2" />,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase Firestore", "SQLAlchemy"],
  },
  {
    category: "DevOps & Tools",
    icon: <Smartphone className="h-8 w-8 text-primary mb-2" />, // Placeholder, consider GitMerge or Terminal
    skills: ["Git", "Docker", "CI/CD (GitHub Actions)", "AWS (Basic)", "Vercel", "Netlify"],
  },
   {
    category: "AI/ML (Familiarity)",
    icon: <Brain className="h-8 w-8 text-primary mb-2" />,
    skills: ["Genkit", "LangChain", "OpenAI API", "TensorFlow (Basic)", "Scikit-learn (Basic)"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="bg-card/50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">
          My <span className="text-primary">Skills</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((categoryItem) => (
            <Card key={categoryItem.category} className="bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                {categoryItem.icon}
                <CardTitle className="font-headline text-xl text-accent">{categoryItem.category}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap justify-center gap-2">
                  {categoryItem.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm bg-primary/10 text-primary border-primary/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
