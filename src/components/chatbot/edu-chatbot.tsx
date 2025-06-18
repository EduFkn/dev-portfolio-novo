
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Send, RotateCcw, StopCircle, Loader2, X } from 'lucide-react';
import { eduBotFlow, type EduBotFlowInput, type EduBotFlowOutput } from '@/ai/flows/edu-bot-flow';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useI18n } from '@/hooks/use-i18n';

interface Message {
  id: string;
  text: string;
  role: 'user' | 'bot' | 'system-info';
  imageUrl?: string; // For displaying user-uploaded images
}

// Helper to convert file to Base64 Data URI
const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function EduChatbot() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // Example: 4MB limit
        alert(t('chatbot.fileTooLarge'));
        setCurrentFile(null);
        setFilePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      setCurrentFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCurrentFile(null);
      setFilePreview(null);
    }
  };

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text && !currentFile) return;

    setIsLoading(true);
    const newAbortController = new AbortController(); // Genkit itself doesn't directly use this for cancellation in this simple setup.
    setAbortController(newAbortController);

    const userMessageId = Date.now().toString();
    
    let imageDataUriForFlow: string | undefined = undefined;
    let localImagePreviewForMessage: string | undefined = undefined;

    if (currentFile) {
      try {
        imageDataUriForFlow = await toBase64(currentFile);
        localImagePreviewForMessage = imageDataUriForFlow; 
      } catch (error) {
        console.error("Error converting file to Base64:", error);
        setMessages(prev => [...prev, { id: Date.now().toString(), text: t('chatbot.fileConversionError'), role: 'system-info' }]);
        setIsLoading(false);
        return;
      }
    }
    
    setMessages(prev => [...prev, { id: userMessageId, text: text || t('chatbot.imageSent'), role: 'user', imageUrl: localImagePreviewForMessage }]);
    setInputValue('');
    setCurrentFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    // Prepare history for Genkit flow
    const flowHistory = messages.filter(m => m.role === 'user' || m.role === 'bot').map(msg => {
      const parts: any[] = [{ text: msg.text }];
      // Note: The flow's input schema expects imageDataUri for the *current* user message, not for history.
      // If historical images were needed by the flow, its input/history schema would need adjustment.
      return {
        role: msg.role as 'user' | 'model', // Ensure role is 'user' or 'model'
        parts: parts,
      };
    });


    // Add a thinking message for the bot
    const thinkingMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: thinkingMessageId, text: t('chatbot.thinking'), role: 'bot' }]);

    try {
      const flowInput: EduBotFlowInput = {
        message: text,
        history: flowHistory,
        imageDataUri: imageDataUriForFlow,
      };
      
      // Simulate the abort functionality for Genkit (actual cancellation depends on flow design)
      // This promise wrapper allows us to race against the abort signal
      const flowPromise = eduBotFlow(flowInput);
      const result = await Promise.race([
        flowPromise,
        new Promise<null>((_, reject) => {
          // This AbortController is for client-side cancellation attempt.
          // True server-side cancellation for Genkit flows requires more setup.
          newAbortController.signal.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        })
      ]);

      if (result === null) { // Aborted by client-side AbortController
        return;
      }
      
      const botResponse = (result as EduBotFlowOutput).answer;
      setMessages(prev => prev.map(m => m.id === thinkingMessageId ? { ...m, text: botResponse } : m));

    } catch (error: any) {
      console.error("Chatbot error:", error);
      let errorMessage = t('chatbot.errorDefault');
      if (error.name === 'AbortError') {
        errorMessage = t('chatbot.stopped');
      } else if (error.message) {
        // Avoid showing verbose internal Genkit errors directly to user
        errorMessage = t('chatbot.errorDefault'); 
      }
       setMessages(prev => prev.map(m => m.id === thinkingMessageId ? { ...m, text: errorMessage, role: 'system-info' } : m));
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };
  
  const handleStop = () => {
    if (abortController) {
      abortController.abort(); // This triggers the AbortError in the Promise.race
      // UI update for "Stopped" is handled in the catch block of handleSendMessage
      setIsLoading(false); 
    }
  };

  const handleClear = () => {
    setMessages([]);
    // chatHistory for the flow will be rebuilt on next send
  };


  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <button 
        onClick={handleToggle}
        className="p-3 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-all shadow-lg hover:scale-110"
        aria-label={isOpen ? t('chatbot.closeAriaLabel') : t('chatbot.openAriaLabel')}
      >
        <span role="img" aria-label={t('chatbot.iconAlt')} className="text-3xl bat-icon-filter">🦇</span>
      </button>

      {isOpen && (
        <div 
          className={cn(
            "absolute bottom-[85px] right-0", // Adjusted bottom to accommodate larger toggle button
            "w-[320px] sm:w-[350px] max-h-[500px] flex flex-col overflow-hidden",
            "bg-card border border-border rounded-lg shadow-xl",
            "animate-fade-in-up-subtle" 
          )}
        >
          <div className="flex items-center justify-between p-3 bg-primary text-primary-foreground">
            <h3 className="font-headline text-base font-semibold flex items-center">
              <span role="img" aria-label={t('chatbot.iconAlt')} className="mr-2 text-lg">🦇</span>
              {t('chatbot.headerTitle')}
            </h3>
            <Button variant="ghost" size="icon" onClick={handleToggle} className="h-7 w-7 text-primary-foreground hover:bg-primary/80">
              <X size={18} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={cn(
                  "p-2 rounded-md max-w-[85%]",
                  msg.role === 'user' ? 'ml-auto bg-primary text-primary-foreground text-right' : 
                  msg.role === 'bot' ? 'mr-auto bg-muted text-foreground' : 
                  'mr-auto bg-destructive/20 text-destructive-foreground text-center w-full', // Adjusted destructive text color
                  "whitespace-pre-wrap break-words"
                )}
              >
                {msg.text}
                {msg.imageUrl && msg.role === 'user' && (
                  <Image src={msg.imageUrl} alt={t('chatbot.uploadedImageAlt')} width={150} height={150} className="rounded-md mt-1.5 inline-block" />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {filePreview && (
            <div className="p-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">{t('chatbot.imagePreview')}</p>
              <Image src={filePreview} alt={t('chatbot.imagePreviewAlt')} width={80} height={80} className="rounded-md" />
            </div>
          )}

          <div className="p-3 border-t border-border space-y-2">
            <Textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chatbot.inputPlaceholder')}
              rows={2}
              className="bg-input border-border focus:ring-primary text-sm disabled:opacity-70"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!isLoading) handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
            <div className="flex items-center justify-between gap-2">
              <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()} disabled={isLoading} className="h-9 w-9 border-primary text-primary hover:bg-primary/10">
                <Paperclip size={18} />
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" // Accepts all image types
                disabled={isLoading}
              />
              <div className="flex-grow flex gap-2">
                <Button onClick={handleSendMessage} disabled={isLoading || (!inputValue.trim() && !currentFile)} className="w-full bg-primary hover:bg-primary/90 text-xs h-9">
                  {isLoading ? <Loader2 size={18} className="animate-spin mr-1.5" /> : <Send size={16} className="mr-1.5" />}
                  {isLoading ? t('chatbot.sendingButton') : t('chatbot.sendButton')}
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-1.5 mt-1">
               <Button variant="ghost" size="sm" onClick={handleStop} disabled={!isLoading} className="text-xs h-7 px-2 text-muted-foreground hover:text-destructive">
                <StopCircle size={14} className="mr-1"/> {t('chatbot.stopButton')}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClear} disabled={isLoading} className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground/80">
                <RotateCcw size={14} className="mr-1"/> {t('chatbot.clearButton')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
