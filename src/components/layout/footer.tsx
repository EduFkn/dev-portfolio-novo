"use client";

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'; // Added Mail and Twitter

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 border-t border-border/50 py-8 text-center text-foreground/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <Github className="h-6 w-6 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
          </Link>
          <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <Linkedin className="h-6 w-6 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
          </Link>
          <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
            <Twitter className="h-6 w-6 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
          </Link>
           <Link href="mailto:youremail@example.com" aria-label="Email">
            <Mail className="h-6 w-6 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {currentYear} Your Name. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">Next.js</Link> and <Link href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">Tailwind CSS</Link>.
        </p>
      </div>
    </footer>
  );
}
