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

    // Simulate sending email - In a real app, this would be an API call to a serverless function or backend
    // For now, we'll just use a mailto link as a fallback or display a success message.
    // You would typically not handle email sending directly from the client-side for security and reliability.

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Option 1: Show success and clear form (if you had a backend)
      toast({
        title: "Mensagem Enviada!",
        description: "Obrigado por entrar em contato. Responderei em breve.",
        variant: "default",
      });
      setName('');
      setEmail('');
      setMessage('');
      onOpenChange(false);

      // Option 2: Open mailto link as a fallback if no backend
      // const mailtoLink = `mailto:${recipientEmail}?subject=Contato Portfolio: ${name}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
      // window.open(mailtoLink, '_blank');
      // onOpenChange(false);

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
      <DialogContent className="sm:max-w-[480px] bg-card border-border shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-headline text-primary">
            <Mail className="mr-2 h-6 w-6" /> Entre em Contato
          </DialogTitle>
          <DialogDescription className="text-foreground/80">
            Envie uma mensagem diretamente para {recipientEmail}. Responderei o mais rápido possível.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground/90 flex items-center">
              <User className="mr-2 h-4 w-4 text-primary" />Seu Nome
            </Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="John Doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="bg-input border-border focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/90 flex items-center">
              <Mail className="mr-2 h-4 w-4 text-primary" />Seu Email
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="john.doe@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="bg-input border-border focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground/90 flex items-center">
               <MessageSquare className="mr-2 h-4 w-4 text-primary" />Sua Mensagem
            </Label>
            <Textarea 
              id="message" 
              placeholder="Olá, gostaria de falar sobre..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              required 
              rows={5}
              className="bg-input border-border focus:ring-primary min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="text-foreground/80 hover:bg-muted">
              Cancelar
            </Button>
            <Button type="submit" disabled={isSending} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSending ? "Enviando..." : "Enviar Mensagem"}
              {!isSending && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
