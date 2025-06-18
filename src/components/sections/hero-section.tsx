"use client";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { ContactDialog } from '@/components/contact-dialog';

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.backgroundPositionY = `${scrollY * 0.2}px`; // Reduced parallax effect
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
          backgroundImage: "url('https://placehold.co/1920x1080/0F1014/A06CD5.png?text=.')", // Darker placeholder
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          opacity: 0.06, // Even more subtle
        }}
        data-ai-hint="abstract space coding"
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-6 rounded-full overflow-hidden shadow-custom-dark border-4 border-primary transform transition-all duration-500 hover:scale-110">
            <Image
              src="https://placehold.co/200x200/D8B4F1/0F1014.png?text=EA"
              alt="Eduardo Almeida Portrait"
              layout="fill"
              objectFit="cover"
              data-ai-hint="man avatar white character dark straight hair"
            />
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="block">Olá, eu sou </span>
            <span className="text-primary">Eduardo Almeida</span>
          </h1>
          <p className="font-headline text-lg sm:text-xl text-accent mb-5">
            Desenvolvedor Full Stack | Transformando Ideias em Soluções Digitais.
          </p>
          <p className="text-sm sm:text-base text-foreground/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Especialista em criar aplicações web modernas, responsivas e de alta performance. Com paixão por tecnologia e um olhar atento aos detalhes, desenvolvo desde interfaces intuitivas até sistemas backend robustos, sempre focado na melhor experiência do usuário e na entrega de valor.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 transform hover:scale-105 text-sm px-6 py-2.5">
              <Link href="/projects">
                Meus Projetos
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setIsContactDialogOpen(true)}
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 transform hover:scale-105 text-sm px-6 py-2.5"
            >
              Entre em Contato <Mail className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
          <div className="mt-10 flex justify-center space-x-5">
            <Link href="https://github.com/edualmeida1260" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <Github className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
            </Link>
            <Link href="https://linkedin.com/in/edualmeida1260" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <Linkedin className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>
      <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </section>
  );
}
