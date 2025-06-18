
"use client";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, ArrowDown } from "lucide-react"; // Added ArrowDown
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { ContactDialog } from '@/components/contact-dialog';
import { useI18n } from '@/hooks/use-i18n';

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.backgroundPositionY = `${scrollY * 0.2}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center justify-center text-center overflow-hidden py-10 md:py-0">
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://placehold.co/1920x1080/100f1c/6a0dad.png?text=')", // Placeholder reflecting new dark blue/purple theme
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          opacity: 0.07, // Slightly more visible for effect
        }}
        data-ai-hint="abstract dark coding particles purple blue"
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl md:max-w-3xl mx-auto">
          <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-5 rounded-full overflow-hidden shadow-custom-dark border-4 border-primary transform transition-all duration-500 hover:scale-110">
            <Image
              src="https://placehold.co/200x200/e0e0e0/1c1c2e.png?text=EA" // Adjusted for new theme
              alt={t('hero.portraitAlt')}
              layout="fill"
              objectFit="cover"
              data-ai-hint="man avatar white character dark straight hair"
            />
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-2.5">
            <span className="block">{t('hero.greeting')}</span>
            <span className="text-primary">{t('hero.name')}</span>
          </h1>
          <p className="font-headline text-lg sm:text-xl md:text-2xl text-accent mb-4">
            {t('hero.role')}
          </p>
          <p className="text-sm sm:text-base text-foreground/80 mb-7 max-w-xl mx-auto leading-relaxed">
            {t('hero.bio')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 transform hover:scale-105 text-sm px-6 py-2.5 h-auto">
              <Link href="/#projects">
                {t('hero.projectsButton')} <ArrowDown className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setIsContactDialogOpen(true)}
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 transform hover:scale-105 text-sm px-6 py-2.5 h-auto"
            >
              {t('hero.contactButton')} <Mail className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
          <div className="mt-8 flex justify-center space-x-5">
            <Link href="https://github.com/edualmeida1260" target="_blank" rel="noopener noreferrer" aria-label={t('footer.githubLabel')}>
              <Github className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
            </Link>
            <Link href="https://linkedin.com/in/edualmeida1260" target="_blank" rel="noopener noreferrer" aria-label={t('footer.linkedinLabel')}>
              <Linkedin className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>
      <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </section>
  );
}
