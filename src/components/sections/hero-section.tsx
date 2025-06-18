"use client";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Github, Linkedin, Mail } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { ContactDialog } from '@/components/contact-dialog'; // Import the dialog

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.backgroundPositionY = `${scrollY * 0.3}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center justify-center text-center overflow-hidden">
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://placehold.co/1920x1080/1A1D21/A06CD5.png?text=.')", // Darker placeholder
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          opacity: 0.08, // Even more subtle
        }}
        data-ai-hint="abstract tech galaxy"
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden shadow-custom-dark border-4 border-primary transform transition-all duration-500 hover:scale-110">
            <Image
              src="https://placehold.co/200x200/D8B4F1/1A1D21.png?text=EA"
              alt="Eduardo Almeida Portrait"
              layout="fill"
              objectFit="cover"
              data-ai-hint="developer portrait man"
            />
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="block">Olá, eu sou </span>
            <span className="text-primary">Eduardo Almeida</span>
          </h1>
          <p className="font-headline text-xl sm:text-2xl text-accent mb-6">
            Desenvolvedor Full Stack Criando Experiências Digitais Inovadoras.
          </p>
          <p className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Sou um apaixonado por tecnologia e desenvolvimento de software, com foco em construir aplicações web modernas, responsivas e centradas no usuário. Transformo ideias complexas em soluções digitais elegantes e eficientes, utilizando as mais recentes tecnologias do mercado para entregar resultados de alta performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 transform hover:scale-105">
              <Link href="/projects">
                Meus Projetos
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setIsContactDialogOpen(true)}
              className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 transform hover:scale-105"
            >
              Entre em Contato <Mail className="ml-2 h-5 w-5" />
            </Button>
            {/* <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 transform hover:scale-105">
              <a href="/resume-eduardo-almeida.pdf" download> 
                Download CV <ArrowDownToLine className="ml-2 h-5 w-5" />
              </a>
            </Button> */}
          </div>
          <div className="mt-12 flex justify-center space-x-6">
            <Link href="https://github.com/edualmeida1260" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <Github className="h-8 w-8 text-foreground/70 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
            </Link>
            <Link href="https://linkedin.com/in/edualmeida1260" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <Linkedin className="h-8 w-8 text-foreground/70 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>
      <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </section>
  );
}
