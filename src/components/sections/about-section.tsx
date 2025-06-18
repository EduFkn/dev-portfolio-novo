
"use client";

import Image from 'next/image';
import { MapPin, Mail, Download, UserCircle, Briefcase, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactDialog } from '@/components/contact-dialog';
import React from 'react';
import { useI18n } from '@/hooks/use-i18n';

export function AboutSection() {
  const { t } = useI18n();
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);

  return (
    <section id="about" className="bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          {t('about.title')} <span className="text-primary">{t('about.titleHighlight')}</span>
        </h2>
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
          
          <div className="md:col-span-3 space-y-4 text-foreground/80 leading-relaxed text-sm md:text-base">
            <h3 className="font-headline text-xl sm:text-2xl text-accent mb-3">{t('about.name')}</h3>
            <p className="flex items-start">
              <UserCircle className="h-5 w-5 mr-2.5 mt-0.5 text-primary flex-shrink-0" />
              <span>{t('about.intro')}</span>
            </p>
            <p className="flex items-start">
              <Briefcase className="h-5 w-5 mr-2.5 mt-0.5 text-primary flex-shrink-0" />
              <span>{t('about.journey')}</span>
            </p>
            <p className="flex items-start">
               <Code className="h-5 w-5 mr-2.5 mt-0.5 text-primary flex-shrink-0" />
              <span>{t('about.specialization')}</span>
            </p>
             <p className="flex items-start">
               <Zap className="h-5 w-5 mr-2.5 mt-0.5 text-primary flex-shrink-0" />
              <span>{t('about.interests')}</span>
            </p>
            <p>
              {t('about.philosophy')}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsContactDialogOpen(true)}
                className="border-primary text-primary hover:bg-primary/10 hover:text-primary text-xs px-4 py-2 h-auto"
              >
                {t('about.contactButton')} <Mail className="ml-1.5 h-3.5 w-3.5" />
              </Button>
              {/* CV Download Button - ensure you have a PDF at this path */}
              {/* 
              <Button 
                variant="outline"
                asChild
                className="border-muted text-muted-foreground hover:bg-muted/50 hover:text-foreground text-xs px-4 py-2 h-auto"
              >
                <a href="/cv-eduardo-almeida.pdf" download="CV-EduardoAlmeida.pdf">
                  {t('about.downloadCvButton')} <Download className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button> 
              */}
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            {/* Image removed from here as per request */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-custom-dark border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118835.84029402056!2d-41.38100060856933!3d-21.75200217276238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96383c1455555555%3A0x56a93b8c52a91560!2sCampos%20dos%20Goytacazes%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1717000000000" // Updated timestamp for potential refresh
                width="100%"
                height="100%"
                style={{ border:0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('about.mapTitle')}
              ></iframe>
               <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm p-2 rounded-md text-xs text-foreground flex items-center shadow-md">
                <MapPin className="h-4 w-4 mr-1.5 text-primary" />
                {t('about.location')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </section>
  );
}
