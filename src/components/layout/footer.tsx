
"use client";

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react'; 
import React from 'react';
import { ContactDialog } from '@/components/contact-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/hooks/use-i18n';

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);
  const [quickContactEmail, setQuickContactEmail] = React.useState('');


  const handleQuickContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can pass quickContactEmail to the ContactDialog if needed,
    // or handle it separately if this form were to send an email directly.
    // For now, it just opens the main contact dialog.
    setIsContactDialogOpen(true);
  };

  return (
    <>
      <footer className="bg-card/50 border-t border-border/50 text-foreground/80">
        <div className="container mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="mb-8 lg:mb-0">
              {/* Aperture icon removed from here, brand name from i18n */}
              <span className="font-headline text-2xl font-bold text-primary">{t('nav.brand')}</span>
              <p className="mt-4 text-sm max-w-xs">
                {t('footer.tagline')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:flex-1">
              <div className="col-span-2 lg:col-span-3">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{t('footer.quickContact.title')}</h2>
                  <p className="mt-2 text-sm text-foreground/70">
                    {t('footer.quickContact.description')}
                  </p>
                </div>
                <form onSubmit={handleQuickContactSubmit} className="mt-4 w-full">
                  <label htmlFor="FooterUserEmail" className="sr-only"> {t('footer.quickContact.emailLabel')} </label>
                  <div className="border border-border p-1.5 focus-within:ring-2 focus-within:ring-primary sm:flex sm:items-center sm:gap-2 rounded-md">
                    <Input
                      type="email"
                      id="FooterUserEmail"
                      placeholder={t('footer.quickContact.emailPlaceholder')}
                      className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm bg-input text-foreground placeholder:text-muted-foreground h-9"
                      value={quickContactEmail}
                      onChange={(e) => setQuickContactEmail(e.target.value)}
                    />
                    <Button
                      type="submit"
                      className="mt-1 w-full bg-primary px-5 py-2 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-none hover:bg-primary/90 sm:mt-0 sm:w-auto sm:shrink-0 h-9"
                    >
                      {t('footer.quickContact.button')}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="col-span-1 sm:col-span-1">
                <p className="font-medium text-foreground">{t('footer.sections.services.title')}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><Link href="/#skills" className="transition hover:text-primary">{t('footer.sections.services.skills')}</Link></li>
                  <li><Link href="/#projects" className="transition hover:text-primary">{t('footer.sections.services.projects')}</Link></li>
                  <li><Link href="/#experience" className="transition hover:text-primary">{t('footer.sections.services.experience')}</Link></li>
                </ul>
              </div>

              <div className="col-span-1 sm:col-span-1">
                <p className="font-medium text-foreground">{t('footer.sections.helpfulLinks.title')}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><button onClick={() => setIsContactDialogOpen(true)} className="transition hover:text-primary">{t('footer.sections.helpfulLinks.contact')}</button></li>
                  <li><Link href="/#about" className="transition hover:text-primary">{t('footer.sections.helpfulLinks.about')}</Link></li>
                  {/* Removed FAQs as per new structure */}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border/30 pt-8">
            <div className="sm:flex sm:justify-between">
              <p className="text-xs">
                &copy; {currentYear} {t('footer.name')}. {t('footer.rights')}
              </p>
              <div className="flex justify-center sm:justify-end space-x-5 mt-4 sm:mt-0">
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
            </div>
            <p className="text-xs mt-3 text-center sm:text-left">
              {t('footer.madeWith')}
            </p>
          </div>
        </div>
      </footer>
      <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </>
  );
}
