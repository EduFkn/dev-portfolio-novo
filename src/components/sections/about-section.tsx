"use client";

import Image from 'next/image';
import { MapPin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactDialog } from '@/components/contact-dialog';
import React from 'react';

export function AboutSection() {
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);

  return (
    <section id="about" className="bg-card/30 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-center mb-10">
          Sobre <span className="text-primary">Mim</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 text-foreground/80 leading-relaxed text-sm md:text-base">
            <p>
              Olá! Sou Eduardo Almeida, um desenvolvedor Full Stack apaixonado por criar soluções digitais que não apenas funcionam bem, mas também proporcionam experiências de usuário memoráveis. Com uma base sólida em tecnologias front-end e back-end, busco constantemente aprender e aplicar as melhores práticas para construir aplicações web robustas, escaláveis e eficientes.
            </p>
            <p>
              Minha jornada no desenvolvimento de software é impulsionada pela curiosidade e pelo desejo de resolver problemas complexos de forma criativa. Acredito que a tecnologia tem o poder de transformar ideias em realidade e estou sempre animado para enfrentar novos desafios e colaborar em projetos inovadores.
            </p>
            <p>
              Fora do código, gosto de explorar novas tecnologias, contribuir para projetos open-source e me manter atualizado com as últimas tendências do setor.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsContactDialogOpen(true)}
                className="border-primary text-primary hover:bg-primary/10 hover:text-primary text-xs px-4 py-2"
              >
                Fale Comigo <Mail className="ml-1.5 h-3.5 w-3.5" />
              </Button>
              {/* <Button 
                variant="outline"
                asChild
                className="border-muted text-muted-foreground hover:bg-muted/50 hover:text-foreground text-xs px-4 py-2"
              >
                <a href="/resume-placeholder.pdf" download>
                  Download CV <Download className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button> */}
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-custom-dark border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118835.84029402056!2d-41.38100060856933!3d-21.75200217276238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96383c1455555555%3A0x56a93b8c52a91560!2sCampos%20dos%20Goytacazes%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1620000000000"
                width="100%"
                height="100%"
                style={{ border:0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização no Mapa"
              ></iframe>
               <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm p-2 rounded-md text-xs text-foreground flex items-center shadow-md">
                <MapPin className="h-4 w-4 mr-1.5 text-primary" />
                Campos dos Goytacazes, RJ, Brasil
              </div>
            </div>
           
          </div>
        </div>
      </div>
      <ContactDialog isOpen={isContactDialogOpen} onOpenChange={setIsContactDialogOpen} recipientEmail="edualmeida1260@gmail.com" />
    </section>
  );
}
