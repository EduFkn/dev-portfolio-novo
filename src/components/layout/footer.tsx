"use client";

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react'; 
import React from 'react';
import { ContactDialog } from '@/components/contact-dialog';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);

  return (
    <>
    <footer className="bg-card/50 border-t border-border/50 py-6 text-center text-foreground/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-5 mb-5">
          <Link href="https://github.com/edualmeida1260" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <Github className="h-5 w-5 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
          </Link>
          <Link href="https://linkedin.com/in/edualmeida1260" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <Linkedin className="h-5 w-5 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
          </Link>
           <button onClick={() => setIsContactDialogOpen(true)} aria-label="Email">
            <Mail className="h-5 w-5 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
          </button>
        </div>
        <p className="text-xs">
          &copy; {currentYear} Eduardo Almeida. Todos os direitos reservados.
        </p>
        <p className="text-xs mt-1.5">
          Feito com <span role="img" aria-label="coração">❤️</span> usando <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">Next.js</Link> e <Link href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">Tailwind CSS</Link>.
        </p>
      </div>
    </footer>
    <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </>
  );
}
