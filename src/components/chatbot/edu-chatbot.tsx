
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, RotateCcw, StopCircle, Loader2, X } from 'lucide-react'; // Paperclip removed
import { eduBotFlow, type EduBotFlowInput, type EduBotFlowOutput } from '@/ai/flows/edu-bot-flow';
import { cn } from '@/lib/utils';
// Image component is no longer needed here for user uploads
import { useI18n } from '@/hooks/use-i18n';

interface Message {
  id: string;
  text: string;
  role: 'user' | 'bot' | 'system-info';
  // imageUrl removed as image uploads are disabled
}

export function EduChatbot() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  // currentFile, filePreview, and fileInputRef removed
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleToggle = () => setIsOpen(!isOpen);

  // handleFileChange and toBase64 removed

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text) return; // Only check for text now

    setIsLoading(true);
    const newAbortController = new AbortController(); 
    setAbortController(newAbortController);

    const userMessageId = Date.now().toString();
    
    // Logic for imageDataUriForFlow and localImagePreviewForMessage removed
    
    setMessages(prev => [...prev, { id: userMessageId, text: text, role: 'user' }]); // imageUrl removed
    setInputValue('');
    // Logic for resetting file input removed

    
    const flowHistory = messages.filter(m => m.role === 'user' || m.role === 'bot').map(msg => {
      const parts: any[] = [];
      if (msg.text && msg.text.trim() !== '') {
        parts.push({ text: msg.text.trim() });
      }
      return {
        role: msg.role as 'user' | 'model',
        parts: parts,
      };
    }).filter(msg => msg.parts.length > 0);

    
    const thinkingMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: thinkingMessageId, text: t('chatbot.thinking'), role: 'bot' }]);

    try {
      const flowInput: EduBotFlowInput = {
        message: text, 
        history: flowHistory,
        // imageDataUri removed
      };
      
      const flowPromise = eduBotFlow(flowInput);
      const result = await Promise.race([
        flowPromise,
        new Promise<null>((_, reject) => {
          newAbortController.signal.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        })
      ]);

      if (result === null) { 
        return;
      }
      
      const botResponse = (result as EduBotFlowOutput).answer;
      setMessages(prev => prev.map(m => m.id === thinkingMessageId ? { ...m, text: botResponse } : m));

    } catch (error: any) {
      console.error("Chatbot error:", error);
      let errorMessage = t('chatbot.errorDefault');
      if (error.name === 'AbortError') {
        errorMessage = t('chatbot.stopped');
      }
       setMessages(prev => prev.map(m => m.id === thinkingMessageId ? { ...m, text: errorMessage, role: 'system-info' } : m));
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };
  
  const handleStop = () => {
    if (abortController) {
      abortController.abort(); 
      setIsLoading(false); 
    }
  };

  const handleClear = () => {
    setMessages([]);
  };


  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <button 
        onClick={handleToggle}
        className="p-3 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-all shadow-lg hover:scale-110 text-3xl bat-icon-filter"
        aria-label={isOpen ? t('chatbot.closeAriaLabel') : t('chatbot.openAriaLabel')}
      >
        🦇
      </button>

      {isOpen && (
        <div 
          className={cn(
            "absolute bottom-[85px] right-0", 
            "w-[320px] sm:w-[350px] max-h-[500px] flex flex-col overflow-hidden",
            "bg-card border border-border rounded-lg shadow-xl",
            "animate-fade-in-up-subtle" 
          )}
        >
          <div className="flex items-center justify-between p-3 bg-primary text-primary-foreground">
            <h3 className="font-headline text-base font-semibold flex items-center">
              <span className="mr-2 text-lg">🦇</span>
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
                  'mr-auto bg-destructive/20 text-destructive-foreground text-center w-full', 
                  "whitespace-pre-wrap break-words"
                )}
              >
                {msg.text}
                {/* Image display for user messages removed */}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* File preview section removed */}

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
              {/* File input button removed */}
              <div className="flex-grow flex gap-2">
                <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()} className="w-full bg-primary hover:bg-primary/90 text-xs h-9">
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
