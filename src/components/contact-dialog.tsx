
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, User, MessageSquare } from 'lucide-react';

interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  recipientEmail: string;
}

export function ContactDialog({ isOpen, onOpenChange, recipientEmail }: ContactDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Mensagem Enviada!",
        description: "Obrigado por entrar em contato. Responderei em breve.",
        variant: "default",
      });
      setName('');
      setEmail('');
      setMessage('');
      onOpenChange(false);

    } catch (error) {
      toast({
        title: "Erro ao Enviar",
        description: "Houve um problema ao enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] bg-card border-border shadow-xl text-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-headline text-primary">
            <Mail className="mr-2 h-5 w-5" /> Entre em Contato
          </DialogTitle>
          <DialogDescription className="text-foreground/80 text-xs">
            Envie uma mensagem diretamente para {recipientEmail}. Responderei o mais rápido possível.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-foreground/90 flex items-center text-xs">
              <User className="mr-1.5 h-3.5 w-3.5 text-primary" />Seu Nome
            </Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="John Doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="bg-input border-border focus:ring-primary text-sm h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-foreground/90 flex items-center text-xs">
              <Mail className="mr-1.5 h-3.5 w-3.5 text-primary" />Seu Email
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="john.doe@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="bg-input border-border focus:ring-primary text-sm h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-foreground/90 flex items-center text-xs">
               <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-primary" />Sua Mensagem
            </Label>
            <Textarea 
              id="message" 
              placeholder="Olá, gostaria de falar sobre..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              required 
              rows={4}
              className="bg-input border-border focus:ring-primary min-h-[100px] text-sm"
            />
          </div>
          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} className="text-foreground/80 hover:bg-muted text-xs">
              Cancelar
            </Button>
            <Button type="submit" disabled={isSending} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
              {isSending ? "Enviando..." : "Enviar Mensagem"}
              {!isSending && <Send className="ml-1.5 h-3.5 w-3.5" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
