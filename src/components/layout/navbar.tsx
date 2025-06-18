"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { cn } from '@/lib/utils';
import { Aperture, Mail, Menu, X as CloseIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { ContactDialog } from '@/components/contact-dialog';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/#about' }, // Link to section
  { name: 'Projetos', href: '/projects' },
  { name: 'Experiência', href: '/#experience' }, // Link to section
  { name: 'Formação', href: '/#education' }, // Link to section
];

export function Navbar() {
  const pathname = usePathname();
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };


  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-custom-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300">
                <Aperture className="h-7 w-7 md:h-8 md:w-8" />
                <span className="font-headline text-xl md:text-2xl font-bold">EduardoDev</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavLinkClick}
                  className={cn(
                    "px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-300 ease-in-out",
                    "hover:text-primary hover:bg-primary/10",
                    (pathname === item.href || (item.href.includes('#') && pathname === '/'))
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                  aria-current={(pathname === item.href || (item.href.includes('#') && pathname === '/')) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
               <Button 
                  variant="ghost" 
                  onClick={() => setIsContactDialogOpen(true)}
                  className="px-3 py-2 rounded-md text-xs lg:text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 ease-in-out"
                >
                  Contato <Mail className="ml-1.5 h-3.5 w-3.5 lg:h-4 lg:w-4"/>
               </Button>
              <ThemeToggleButton />
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="md:hidden flex items-center">
               <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsContactDialogOpen(true)}
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10 mr-1"
                  aria-label="Contato"
                >
                  <Mail className="h-5 w-5"/>
               </Button>
              <ThemeToggleButton />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-2 text-foreground/80 hover:text-primary hover:bg-primary/10"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg z-40 p-4 animate-fade-in-down">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavLinkClick}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    "hover:text-primary hover:bg-primary/10",
                    (pathname === item.href || (item.href.includes('#') && pathname === '/'))
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                  aria-current={(pathname === item.href || (item.href.includes('#') && pathname === '/')) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </>
  );
}
