
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { InfiniteMarquee } from '@/components/ui/infinite-marquee';
import { Star } from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';

const getTestimonialsData = (t: Function) => [
  {
    id: 1,
    name: t('testimonials.person1.name'),
    role: t('testimonials.person1.role'),
    avatarHint: "woman cartoon avatar purple hair",
    avatarUrl: "https://placehold.co/80x80/6A0DAD/FFFFFF.png?text=AS",
    rating: 5,
    comment: t('testimonials.person1.comment'),
  },
  {
    id: 2,
    name: t('testimonials.person2.name'),
    role: t('testimonials.person2.role'),
    avatarHint: "man cartoon avatar glasses blue shirt",
    avatarUrl: "https://placehold.co/80x80/A020F0/FFFFFF.png?text=CO",
    rating: 5,
    comment: t('testimonials.person2.comment'),
  },
  {
    id: 3,
    name: t('testimonials.person3.name'),
    role: t('testimonials.person3.role'),
    avatarHint: "woman curly hair avatar green top",
    avatarUrl: "https://placehold.co/80x80/8A2BE2/FFFFFF.png?text=JS",
    rating: 4,
    comment: t('testimonials.person3.comment'),
  },
  {
    id: 4,
    name: t('testimonials.person4.name'),
    role: t('testimonials.person4.role'),
    avatarHint: "man beard avatar orange sweater",
    avatarUrl: "https://placehold.co/80x80/4B0082/E6E6FA.png?text=RM",
    rating: 5,
    comment: t('testimonials.person4.comment'),
  },
  {
    id: 5,
    name: t('testimonials.person5.name'),
    role: t('testimonials.person5.role'),
    avatarHint: "woman smiling avatar red glasses",
    avatarUrl: "https://placehold.co/80x80/9932CC/FFFFFF.png?text=BC",
    rating: 5,
    comment: t('testimonials.person5.comment'),
  },
  {
    id: 6,
    name: t('testimonials.person6.name'),
    role: t('testimonials.person6.role'),
    avatarHint: "man serious avatar gray hoodie",
    avatarUrl: "https://placehold.co/80x80/7F00FF/FFFFFF.png?text=FL",
    rating: 4,
    comment: t('testimonials.person6.comment'),
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: ReturnType<typeof getTestimonialsData>[0] }) => (
  <Card className="w-[260px] sm:w-[280px] md:w-[300px] h-full flex flex-col bg-card shadow-lg hover:shadow-custom-hover-dark transition-all duration-300 mx-3 shrink-0"> {/* Reduced width and mx */}
    <CardContent className="p-4 md:p-5 flex flex-col items-center text-center flex-grow"> {/* Reduced padding */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 mb-2.5 rounded-full overflow-hidden border-2 border-primary"> {/* Reduced size and margin */}
        <Image
          src={testimonial.avatarUrl}
          alt={testimonial.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={testimonial.avatarHint}
          sizes="64px"
        />
      </div>
      <h3 className="text-sm md:text-base font-semibold text-accent">{testimonial.name}</h3> {/* Reduced font size */}
      <p className="text-xs text-muted-foreground mb-1.5">{testimonial.role}</p> {/* Reduced margin */}
      <div className="flex mb-2.5"> {/* Reduced margin */}
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-3 w-3 md:h-3.5 md:w-3.5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
        ))}
      </div>
      <blockquote className="text-xs text-foreground/80 italic leading-relaxed flex-grow"> {/* Reduced font size */}
        &ldquo;{testimonial.comment}&rdquo;
      </blockquote>
    </CardContent>
  </Card>
);

export function TestimonialsSection() {
  const { t } = useI18n();
  const testimonials = getTestimonialsData(t);
  const firstHalf = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondHalf = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-background overflow-hidden animate-fade-in-up-subtle">
      <div className="container mx-auto px-0 sm:px-4 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16">
          {t('testimonials.title')} <span className="text-primary">{t('testimonials.titleHighlight')}</span>
        </h2>
        
        <div className="space-y-6"> {/* Reduced space-y */}
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
