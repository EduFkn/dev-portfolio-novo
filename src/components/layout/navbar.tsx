"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { cn } from '@/lib/utils';
import { Aperture, Mail, Menu, Music2, X as CloseIcon } from 'lucide-react'; // Added Music2
import React, { useState, useEffect } from 'react';
import { ContactDialog } from '@/components/contact-dialog';
import { MusicDialog } from '@/components/music-dialog'; // Import MusicDialog
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/#about' },
  { name: 'Habilidades', href: '/#skills' },
  { name: 'Projetos', href: '/#projects' }, // Changed to anchor link
  { name: 'Experiência', href: '/#experience' },
  { name: 'Formação', href: '/#education' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);
  const [isMusicDialogOpen, setIsMusicDialogOpen] = React.useState(false); // State for MusicDialog
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', updateHash);
    updateHash(); // Initial check
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = (hash?: string) => {
    setIsMobileMenuOpen(false);
    if (hash) {
      // Smooth scroll for anchor links
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isNavItemActive = (itemHref: string) => {
    if (itemHref === '/') {
      return pathname === '/' && currentHash === '';
    }
    if (itemHref.startsWith('/#')) {
      return pathname === '/' && currentHash === itemHref.substring(1);
    }
    return pathname === itemHref;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-custom-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300" onClick={() => handleNavLinkClick('/')}>
                <Aperture className="h-7 w-7 md:h-8 md:w-8" />
                <span className="font-headline text-xl md:text-2xl font-bold">EduardoDev</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavLinkClick(item.href.startsWith('/#') ? item.href : undefined)}
                  className={cn(
                    "px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-300 ease-in-out",
                    "hover:text-primary hover:bg-primary/10",
                    isNavItemActive(item.href)
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                  aria-current={isNavItemActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
               <Button 
                  variant="ghost" 
                  onClick={() => setIsContactDialogOpen(true)}
                  className="px-3 py-2 rounded-md text-xs lg:text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 ease-in-out"
                  aria-label="Abrir formulário de contato"
                >
                  Contato <Mail className="ml-1.5 h-3.5 w-3.5 lg:h-4 lg:w-4"/>
               </Button>
               <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMusicDialogOpen(true)}
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10"
                  aria-label="Sugestão de Música"
                >
                  <Music2 className="h-5 w-5 lg:h-5 lg:w-5"/>
               </Button>
              <ThemeToggleButton />
            </div>

            <div className="md:hidden flex items-center">
               <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsContactDialogOpen(true)}
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10 mr-1"
                  aria-label="Abrir formulário de contato"
                >
                  <Mail className="h-5 w-5"/>
               </Button>
               <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMusicDialogOpen(true)}
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10 mr-1"
                  aria-label="Sugestão de Música"
                >
                  <Music2 className="h-5 w-5"/>
               </Button>
              <ThemeToggleButton />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-2 text-foreground/80 hover:text-primary hover:bg-primary/10"
                aria-label="Alternar menu móvel"
              >
                {isMobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg z-40 p-4 animate-fade-in-down">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavLinkClick(item.href.startsWith('/#') ? item.href : undefined)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    "hover:text-primary hover:bg-primary/10",
                    isNavItemActive(item.href)
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                  aria-current={isNavItemActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
      <MusicDialog isOpen={isMusicDialogOpen} onOpenChange={setIsMusicDialogOpen} />
    </>
  );
}
