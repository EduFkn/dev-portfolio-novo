
"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Music2, Youtube, ExternalLink } from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';

interface MusicDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function MusicDialog({ isOpen, onOpenChange }: MusicDialogProps) {
  const { t } = useI18n();

  const ninetiesPlaylists = [
    { name: "90s Pop Hits", url: "https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj" },
    { name: "90s Rock Anthems", url: "https://www.youtube.com/playlist?list=PLhd1HyMTk3rhY1OloPqJ5h0L3J0L2Uj-B" },
    { name: "90s Hip Hop Classics", url: "https://www.youtube.com/playlist?list=PL8D1B3C9E78F523C0" },
    { name: "Flashback Anos 90 Internacional", url: "https://www.youtube.com/playlist?list=PLJreHDEmv_CeCnA89NxnDbx03tWDF8DqO" },
    { name: "90s R&B Slow Jams", url: "https://www.youtube.com/playlist?list=PL4_z33AVq909n41USwMI503w7rM9cBGKq"}
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-xl text-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-headline text-primary">
            <Music2 className="mr-2 h-5 w-5" /> {t('musicDialog.title')}
          </DialogTitle>
          <DialogDescription className="text-foreground/80 text-xs pt-1">
            {t('musicDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-3 max-h-[60vh] overflow-y-auto">
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
            {t('musicDialog.openInNewTab')}
          </p>
        </div>
        <DialogFooter className="pt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} className="text-foreground/80 hover:bg-muted text-xs">
            {t('musicDialog.closeButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
