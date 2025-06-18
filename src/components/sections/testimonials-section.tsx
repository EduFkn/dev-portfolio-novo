"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { InfiniteMarquee } from '@/components/ui/infinite-marquee';
import { Star, UserCircle2 } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Gerente de Projetos, Innovatech",
    avatarHint: "woman cartoon avatar",
    avatarUrl: "https://placehold.co/100x100/A06CD5/FFFFFF.png?text=AS",
    rating: 5,
    comment: "Trabalhar com Eduardo foi uma experiência fantástica. Sua proatividade e conhecimento técnico foram cruciais para o sucesso do nosso projeto. Entregou tudo no prazo e com qualidade excepcional!",
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    role: "CEO, StartUp Vision",
    avatarHint: "man cartoon avatar glasses",
    avatarUrl: "https://placehold.co/100x100/D8B4F1/23272F.png?text=CO",
    rating: 5,
    comment: "Eduardo não apenas desenvolveu nossa plataforma, mas também trouxe insights valiosos que melhoraram o produto final. Recomendo fortemente seus serviços.",
  },
  {
    id: 3,
    name: "Juliana Santos",
    role: "Designer UX/UI",
    avatarHint: "woman curly hair avatar",
    avatarUrl: "https://placehold.co/100x100/8E7DBE/FFFFFF.png?text=JS",
    rating: 4,
    comment: "A colaboração com Eduardo foi muito produtiva. Ele tem uma ótima capacidade de transformar designs complexos em interfaces funcionais e agradáveis.",
  },
  {
    id: 4,
    name: "Ricardo Mendes",
    role: "Empreendedor Digital",
    avatarHint: "man beard avatar",
    avatarUrl: "https://placehold.co/100x100/C084FC/2D1B3F.png?text=RM",
    rating: 5,
    comment: "Precisa de um desenvolvedor que entende do negócio e entrega soluções robustas? Fale com o Eduardo. Transformou minha ideia em realidade!",
  },
  {
    id: 5,
    name: "Beatriz Costa",
    role: "Analista de Marketing",
    avatarHint: "woman smiling avatar",
    avatarUrl: "https://placehold.co/100x100/A4A4A4/2E2E2E.png?text=BC",
    rating: 5,
    comment: "A automação que Eduardo desenvolveu para nossa equipe economizou horas de trabalho manual. Eficiente e muito profissional.",
  },
  {
    id: 6,
    name: "Fernando Lima",
    role: "CTO, TechForward",
    avatarHint: "man serious avatar",
    avatarUrl: "https://placehold.co/100x100/23272F/A06CD5.png?text=FL",
    rating: 4,
    comment: "Eduardo é um desenvolvedor dedicado e com grande potencial. Sempre disposto a aprender e enfrentar novos desafios.",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => (
  <Card className="w-[300px] sm:w-[350px] h-full flex flex-col bg-card shadow-lg hover:shadow-custom-hover-dark transition-all duration-300 mx-4 shrink-0">
    <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
      <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-primary">
        <Image
          src={testimonial.avatarUrl}
          alt={testimonial.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={testimonial.avatarHint}
        />
      </div>
      <h3 className="text-lg font-semibold text-accent">{testimonial.name}</h3>
      <p className="text-xs text-muted-foreground mb-1">{testimonial.role}</p>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
        ))}
      </div>
      <blockquote className="text-sm text-foreground/80 italic leading-relaxed flex-grow">
        &ldquo;{testimonial.comment}&rdquo;
      </blockquote>
    </CardContent>
  </Card>
);

export function TestimonialsSection() {
  const firstHalf = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondHalf = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-0 sm:px-4 lg:px-8">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-center mb-12">
          O Que Dizem <span className="text-primary">Sobre Mim</span>
        </h2>
        
        <div className="space-y-8">
          <InfiniteMarquee speed="slow" pauseOnHover>
            {firstHalf.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </InfiniteMarquee>
          
          <InfiniteMarquee speed="slow" direction="right" pauseOnHover>
            {secondHalf.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </InfiniteMarquee>
        </div>
      </div>
    </section>
  );
}
