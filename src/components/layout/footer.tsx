
"use client";

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react'; 
import React from 'react';
import { ContactDialog } from '@/components/contact-dialog';
import { useI18n } from '@/hooks/use-i18n';

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);

  return (
    <>
    <footer className="bg-card/50 border-t border-border/50 py-8 text-center text-foreground/70"> {/* Increased py */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-5 mb-5">
          <Link href="https://github.com/edualmeida1260" target="_blank" rel="noopener noreferrer" aria-label={t('footer.githubLabel')}>
            <Github className="h-5 w-5 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
          </Link>
          <Link href="https://linkedin.com/in/edualmeida1260" target="_blank" rel="noopener noreferrer" aria-label={t('footer.linkedinLabel')}>
            <Linkedin className="h-5 w-5 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
          </Link>
           <button onClick={() => setIsContactDialogOpen(true)} aria-label={t('footer.emailLabel')}>
            <Mail className="h-5 w-5 hover:text-primary transition-colors duration-300 transform hover:scale-110" />
          </button>
        </div>
        <p className="text-xs">
          &copy; {currentYear} {t('footer.name')}. {t('footer.rights')}
        </p>
        <p className="text-xs mt-1.5">
          {t('footer.madeWith')}
        </p>
      </div>
    </footer>
    <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </>
  );
}
