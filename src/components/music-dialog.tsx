
"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Music2, Youtube, ExternalLink } from 'lucide-react'; // Using Music2 as a general music icon

interface MusicDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function MusicDialog({ isOpen, onOpenChange }: MusicDialogProps) {
  const ninetiesPlaylists = [
    { name: "90s Pop Hits", url: "https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj" },
    { name: "90s Rock Anthems", url: "https://www.youtube.com/playlist?list=PLhd1HyMTk3rhY1OloPqJ5h0L3J0L2Uj-B" },
    { name: "90s Hip Hop Classics", url: "https://www.youtube.com/playlist?list=PL8D1B3C9E78F523C0" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-xl text-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-headline text-primary">
            <Music2 className="mr-2 h-5 w-5" /> Trilha Sonora Anos 90
          </DialogTitle>
          <DialogDescription className="text-foreground/80 text-xs pt-1">
            Que tal curtir um som nostálgico enquanto navega? Aqui algumas sugestões de playlists dos anos 90 no YouTube!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-3">
          {ninetiesPlaylists.map((playlist) => (
            <a 
              key={playlist.name}
              href={playlist.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="flex items-center">
                <Youtube className="mr-2.5 h-5 w-5 text-red-500" />
                <span className="text-foreground/90 text-xs">{playlist.name}</span>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
           <p className="text-center text-xs text-muted-foreground pt-2">
            Clique em uma playlist para abrir no YouTube em uma nova aba.
          </p>
        </div>
        <DialogFooter className="pt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} className="text-foreground/80 hover:bg-muted text-xs">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
