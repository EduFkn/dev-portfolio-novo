
"use client";

import { MapPin, UserCircle, Briefcase, Brain, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactDialog } from '@/components/contact-dialog';
import React from 'react';
import { useI18n } from '@/hooks/use-i18n';

export function AboutSection() {
  const { t } = useI18n();
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);

  return (
    <section id="about" className="bg-background/10 animate-fade-in-up-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16">
          {t('about.title')} <span className="text-primary">{t('about.titleHighlight')}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Card 1: Name & Intro */}
          <Card className="md:col-span-2 bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300 animate-fade-in-up-subtle">
            <CardHeader>
              <CardTitle className="font-headline text-xl sm:text-2xl text-accent flex items-center">
                <UserCircle className="h-6 w-6 mr-2.5 text-primary flex-shrink-0" />
                {t('about.name')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed text-sm md:text-base space-y-3 p-4 md:p-5 pt-0">
              <p>{t('about.intro')}</p>
              <Button 
                variant="outline" 
                onClick={() => setIsContactDialogOpen(true)}
                className="border-primary text-primary hover:bg-primary/10 hover:text-primary text-xs px-4 py-2 h-auto mt-3"
              >
                {t('about.contactButton')} <MessageSquare className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
          
          {/* Card 2: Journey & Specialization */}
          <Card className="bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300 animate-fade-in-up-subtle" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="font-headline text-lg sm:text-xl text-accent flex items-center">
                <Briefcase className="h-5 w-5 mr-2.5 text-primary flex-shrink-0" />
                {t('about.journeyTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed text-sm md:text-base space-y-3 p-4 md:p-5 pt-0">
              <p>{t('about.journey')}</p>
              <p>{t('about.specialization')}</p>
            </CardContent>
          </Card>

          {/* Card 3: Interests & Philosophy */}
          <Card className="bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300 animate-fade-in-up-subtle" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="font-headline text-lg sm:text-xl text-accent flex items-center">
                 <Brain className="h-5 w-5 mr-2.5 text-primary flex-shrink-0" />
                {t('about.interestsTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed text-sm md:text-base space-y-3 p-4 md:p-5 pt-0">
              <p>{t('about.interests')}</p>
              <p>{t('about.philosophy')}</p>
            </CardContent>
          </Card>

          {/* Card 4: Map */}
          <Card className="md:col-span-2 bg-card shadow-custom-dark hover:shadow-custom-hover-dark transition-shadow duration-300 animate-fade-in-up-subtle aspect-[16/9] md:aspect-auto min-h-[300px] overflow-hidden" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-0 relative h-full w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118835.84029402056!2d-41.38100060856933!3d-21.75200217276238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96383c1455555555%3A0x56a93b8c52a91560!2sCampos%20dos%20Goytacazes%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1717000000000" 
                width="100%"
                height="100%"
                style={{ border:0, minHeight: '300px' }} 
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('about.mapTitle')}
                className="rounded-lg"
              ></iframe>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[90%] z-10 transition-transform hover:scale-110">
                 <MapPin className="h-10 w-10 text-primary opacity-75" aria-label={t('about.mapPinLabel')} />
              </div>
               <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm p-1.5 rounded-md text-[0.65rem] text-foreground flex items-center shadow-md">
                <MapPin className="h-3 w-3 mr-1 text-primary" />
                {t('about.location')}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </section>
  );
}

    