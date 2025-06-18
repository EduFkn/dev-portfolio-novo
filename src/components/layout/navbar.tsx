
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { cn } from '@/lib/utils';
import { Aperture, Mail, Menu, X as CloseIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { ContactDialog } from '@/components/contact-dialog';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/hooks/use-i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Simplified SVG Flag Icons
const BrazilFlagIcon = () => (
  <svg width="22" height="16" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#009B3A"/>
    <path d="M10 3.5L16.5 7L10 10.5L3.5 7L10 3.5Z" fill="#FEDF00"/>
    <circle cx="10" cy="7" r="2.5" fill="#002776"/>
  </svg>
);

const USUKFlagIcon = () => ( // Generic English/US flag
  <svg width="22" height="16" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#0A3161"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H20V1.5H0V0ZM0 3H20V4.5H0V3ZM0 6H20V7.5H0V6ZM0 9H20V10.5H0V9ZM0 12H20V13.5H0V12Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M0 0V1.5H20V0H0ZM0 3V4.5H20V3H0ZM0 6V7.5H20V6H0ZM0 9V10.5H20V9H0ZM0 12V13.5H20V12H0Z" stroke="#BF0A30" strokeWidth="0.5"/>
    <rect width="10" height="7" fill="#0A3161"/>
    {/* Simplified stars to avoid too much detail */}
    <path d="M1.5 1.5L3.5 2.5L2.5 0.5L1.5 2.5L0.5 0.5L1.5 1.5Z" fill="white" transform="translate(0.5 0.5) scale(0.8)"/>
    <path d="M5.5 1.5L7.5 2.5L6.5 0.5L5.5 2.5L4.5 0.5L5.5 1.5Z" fill="white" transform="translate(0.5 0.5) scale(0.8)"/>
    <path d="M1.5 4.5L3.5 5.5L2.5 3.5L1.5 5.5L0.5 3.5L1.5 4.5Z" fill="white" transform="translate(0.5 0.5) scale(0.8)"/>
    <path d="M5.5 4.5L7.5 5.5L6.5 3.5L5.5 5.5L4.5 3.5L5.5 4.5Z" fill="white" transform="translate(0.5 0.5) scale(0.8)"/>
  </svg>
);


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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', updateHash, { passive: true });
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
      const elementId = hash.substring(2); 
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Setting hash directly can be jarring, let scrollIntoView handle it.
        // If direct hash update is needed, ensure it doesn't conflict.
        // setTimeout(() => { window.location.hash = elementId; }, 0);
      }
    } else if (hash === '/') {
        // For home, scroll to top and clear hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.location.hash) {
          // Use history.pushState to clear hash without page reload or jump
          history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    }
  };
  
  const isNavItemActive = (itemHref: string) => {
    const currentPathWithHash = pathname + currentHash;
    if (itemHref === '/') return currentPathWithHash === '/' || (pathname === '/' && currentHash === '');
    return currentPathWithHash === itemHref || currentPathWithHash === `/${itemHref.replace(/^#/, '')}`;
  };
  

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-custom-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300" onClick={() => handleNavLinkClick('/')}>
                <Aperture className="h-7 w-7 md:h-8 md:w-8" />
                <span className="font-headline text-xl md:text-2xl font-bold">{t('nav.brand')}</span>
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
                      ? "text-primary bg-primary/10 font-semibold" // Ensure background for active is subtle
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
                  className={cn(
                    "px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-300 ease-in-out",
                    "text-foreground/80 hover:text-primary hover:bg-primary/10"
                  )}
                  aria-label={t('nav.contactLabel')}
                >
                  {t('nav.contact')} <Mail className="ml-1.5 h-3.5 w-3.5 lg:h-4 lg:w-4"/>
               </Button>
              <ThemeToggleButton />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary hover:bg-primary/10" aria-label={t('nav.languageLabel')}>
                    {currentLanguage === 'pt' ? <BrazilFlagIcon /> : <USUKFlagIcon />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border shadow-lg text-sm min-w-[120px]">
                  <DropdownMenuItem onClick={() => changeLanguage('pt')} className={cn("cursor-pointer hover:bg-muted flex items-center gap-2", currentLanguage === 'pt' && "bg-muted font-semibold")}>
                    <BrazilFlagIcon /> {t('nav.langPt')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage('en')} className={cn("cursor-pointer hover:bg-muted flex items-center gap-2", currentLanguage === 'en' && "bg-muted font-semibold")}>
                    <USUKFlagIcon /> {t('nav.langEn')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="md:hidden flex items-center">
               <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsContactDialogOpen(true)}
                  className="text-foreground/80 hover:text-primary hover:bg-primary/10 mr-0.5"
                  aria-label={t('nav.contactLabel')}
                >
                  <Mail className="h-5 w-5"/>
               </Button>
              <ThemeToggleButton />
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary hover:bg-primary/10 ml-0.5" aria-label={t('nav.languageLabel')}>
                     {currentLanguage === 'pt' ? <BrazilFlagIcon /> : <USUKFlagIcon />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border shadow-lg text-sm min-w-[120px]">
                   <DropdownMenuItem onClick={() => changeLanguage('pt')} className={cn("cursor-pointer hover:bg-muted flex items-center gap-2", currentLanguage === 'pt' && "bg-muted font-semibold")}>
                     <BrazilFlagIcon /> {t('nav.langPt')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage('en')} className={cn("cursor-pointer hover:bg-muted flex items-center gap-2", currentLanguage === 'en' && "bg-muted font-semibold")}>
                     <USUKFlagIcon /> {t('nav.langEn')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-1 text-foreground/80 hover:text-primary hover:bg-primary/10"
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
                      ? "text-primary bg-primary/10"
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
    </>
  );
}
