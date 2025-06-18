
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, User, MessageSquare } from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n'; // Import useI18n

interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  recipientEmail: string;
}

export function ContactDialog({ isOpen, onOpenChange, recipientEmail }: ContactDialogProps) {
  const { t } = useI18n(); // Initialize useI18n
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: t('contactDialog.successTitle'),
        description: t('contactDialog.successDescription'),
        variant: "default",
      });
      setName('');
      setEmail('');
      setMessage('');
      onOpenChange(false);

    } catch (error) {
      toast({
        title: t('contactDialog.errorTitle'),
        description: t('contactDialog.errorDescription'),
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
            <Mail className="mr-2 h-5 w-5" /> {t('contactDialog.title')}
          </DialogTitle>
          <DialogDescription className="text-foreground/80 text-xs">
            {t('contactDialog.description', { recipientEmail })}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-foreground/90 flex items-center text-xs">
              <User className="mr-1.5 h-3.5 w-3.5 text-primary" />{t('contactDialog.yourNameLabel')}
            </Label>
            <Input 
              id="name" 
              type="text" 
              placeholder={t('contactDialog.yourNamePlaceholder')}
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="bg-input border-border focus:ring-primary text-sm h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-foreground/90 flex items-center text-xs">
              <Mail className="mr-1.5 h-3.5 w-3.5 text-primary" />{t('contactDialog.yourEmailLabel')}
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder={t('contactDialog.yourEmailPlaceholder')}
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="bg-input border-border focus:ring-primary text-sm h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-foreground/90 flex items-center text-xs">
               <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-primary" />{t('contactDialog.yourMessageLabel')}
            </Label>
            <Textarea 
              id="message" 
              placeholder={t('contactDialog.yourMessagePlaceholder')}
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              required 
              rows={4}
              className="bg-input border-border focus:ring-primary min-h-[100px] text-sm"
            />
          </div>
          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} className="text-foreground/80 hover:bg-muted text-xs">
              {t('contactDialog.cancelButton')}
            </Button>
            <Button type="submit" disabled={isSending} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
              {isSending ? t('contactDialog.sendingButton') : t('contactDialog.sendButton')}
              {!isSending && <Send className="ml-1.5 h-3.5 w-3.5" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
