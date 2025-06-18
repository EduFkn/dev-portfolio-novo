"use client";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Github, Linkedin } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        // Apply a subtle parallax effect. Adjust multiplier for speed.
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
          backgroundImage: "url('https://placehold.co/1920x1080/23272F/A06CD5.png?text=.')", // Placeholder, replace with actual subtle pattern or image
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          opacity: 0.1, // Keep it very subtle
        }}
        data-ai-hint="abstract tech background"
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden shadow-custom-dark border-4 border-primary">
            <Image
              src="https://placehold.co/200x200/D8B4F1/23272F.png?text=Dev"
              alt="Developer Portrait"
              layout="fill"
              objectFit="cover"
              data-ai-hint="developer portrait"
            />
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="block">Hello, I&apos;m </span>
            <span className="text-primary">Your Name</span>
          </h1>
          <p className="font-headline text-xl sm:text-2xl text-accent mb-8">
            A Full Stack Developer Weaving Digital Experiences.
          </p>
          <p className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto">
            I specialize in creating modern, responsive, and user-centric web applications. With a passion for clean code and innovative solutions, I transform complex problems into elegant digital realities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 transform hover:scale-105">
              <Link href="/projects">
                View My Work 
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-custom-dark hover:shadow-custom-hover-dark transition-all duration-300 transform hover:scale-105">
              <a href="#resume-link" download> {/* Replace with actual resume link */}
                Download CV <ArrowDownToLine className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          <div className="mt-12 flex justify-center space-x-6">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <Github className="h-8 w-8 text-foreground/70 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <Linkedin className="h-8 w-8 text-foreground/70 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
