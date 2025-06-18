"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { cn } from '@/lib/utils';
import { Aperture, Mail } from 'lucide-react'; // Using Aperture as a placeholder logo
import React from 'react';
import { ContactDialog } from '@/components/contact-dialog';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Início', href: '/' },
  { name: 'Projetos', href: '/projects' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-custom-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300">
                <Aperture className="h-8 w-8" />
                <span className="font-headline text-2xl font-bold">EduardoDev</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out",
                    "hover:text-primary hover:bg-primary/10",
                    pathname === item.href
                      ? "text-primary font-semibold_ bg-primary/5"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
               <Button 
                  variant="ghost" 
                  onClick={() => setIsContactDialogOpen(true)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 ease-in-out"
                >
                  Contato <Mail className="ml-2 h-4 w-4"/>
               </Button>
              <ThemeToggleButton />
            </div>
            <div className="md:hidden flex items-center">
               <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsContactDialogOpen(true)}
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10"
                  aria-label="Contato"
                >
                  <Mail className="h-5 w-5"/>
               </Button>
              <ThemeToggleButton />
              {/* Mobile menu button can be added here */}
            </div>
          </div>
        </div>
      </nav>
      <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </>
  );
}
