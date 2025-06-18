
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { cn } from '@/lib/utils';
import { Aperture, Mail, Menu, Music2, X as CloseIcon, Globe } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { ContactDialog } from '@/components/contact-dialog';
import { MusicDialog } from '@/components/music-dialog';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/hooks/use-i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function Navbar() {
  const pathname = usePathname();
  const { t, changeLanguage, currentLanguage } = useI18n();

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.skills'), href: '/#skills' },
    { name: t('nav.projects'), href: '/#projects' },
    { name: t('nav.experience'), href: '/#experience' },
    { name: t('nav.education'), href: '/#education' },
  ];

  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);
  const [isMusicDialogOpen, setIsMusicDialogOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', updateHash);
    updateHash(); 
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
    if (hash && hash.startsWith('/#')) {
      const elementId = hash.substring(2); // Remove '/#'
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Manually update hash for active state, as scrollIntoView might not trigger hashchange immediately
        if (typeof window !== 'undefined') {
          window.location.hash = elementId; 
        }
      }
    } else if (hash === '/') {
        if (typeof window !== 'undefined') {
         window.location.hash = ''; // Clear hash for home
        }
    }
  };
  
  const isNavItemActive = (itemHref: string) => {
    const cleanPathname = pathname === '/' && currentHash === '' ? '/' : `/${currentHash}`;
    if (itemHref === '/') return cleanPathname === '/';
    return itemHref === `/${currentHash}`;
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
                  onClick={() => handleNavLinkClick(item.href)}
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
                  aria-label={t('nav.contactLabel')}
                >
                  {t('nav.contact')} <Mail className="ml-1.5 h-3.5 w-3.5 lg:h-4 lg:w-4"/>
               </Button>
               <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMusicDialogOpen(true)}
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10"
                  aria-label={t('nav.musicSuggestionLabel')}
                >
                  <Music2 className="h-5 w-5 lg:h-5 lg:w-5"/>
               </Button>
              <ThemeToggleButton />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary hover:bg-primary/10" aria-label={t('nav.languageLabel')}>
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border shadow-lg text-sm">
                  <DropdownMenuItem onClick={() => changeLanguage('pt')} className={cn("cursor-pointer hover:bg-muted", currentLanguage === 'pt' && "bg-muted font-semibold")}>
                    Português (BR)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage('en')} className={cn("cursor-pointer hover:bg-muted", currentLanguage === 'en' && "bg-muted font-semibold")}>
                    English (US)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="md:hidden flex items-center">
               <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsContactDialogOpen(true)}
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10 mr-1"
                  aria-label={t('nav.contactLabel')}
                >
                  <Mail className="h-5 w-5"/>
               </Button>
               <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMusicDialogOpen(true)}
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10 mr-1"
                  aria-label={t('nav.musicSuggestionLabel')}
                >
                  <Music2 className="h-5 w-5"/>
               </Button>
              <ThemeToggleButton />
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary hover:bg-primary/10 ml-1" aria-label={t('nav.languageLabel')}>
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border shadow-lg text-sm">
                   <DropdownMenuItem onClick={() => changeLanguage('pt')} className={cn("cursor-pointer hover:bg-muted", currentLanguage === 'pt' && "bg-muted font-semibold")}>
                    Português (BR)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage('en')} className={cn("cursor-pointer hover:bg-muted", currentLanguage === 'en' && "bg-muted font-semibold")}>
                    English (US)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-2 text-foreground/80 hover:text-primary hover:bg-primary/10"
                aria-label={t('nav.toggleMobileMenuLabel')}
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
                  onClick={() => handleNavLinkClick(item.href)}
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
