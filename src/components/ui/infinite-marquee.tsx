"use client";

import type React from 'react';
import { cn } from '@/lib/utils';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: 'normal' | 'slow' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}

export function InfiniteMarquee({
  children,
  className,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = false,
}: InfiniteMarqueeProps) {
  const durationMap = {
    slow: '80s',
    normal: '40s',
    fast: '20s',
  };

  return (
    <div
      className={cn('marquee', className, {
        'group/marquee': pauseOnHover,
      })}
      style={{ '--animation-duration': durationMap[speed] } as React.CSSProperties}
    >
      <div
        className={cn('marquee-content', {
          'group-hover/marquee:[animation-play-state:paused]': pauseOnHover,
          'marquee-content-reverse': direction === 'right',
        })}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn('marquee-content', {
          'group-hover/marquee:[animation-play-state:paused]': pauseOnHover,
          'marquee-content-reverse': direction === 'right',
        })}
      >
        {children}
      </div>
    </div>
  );
}
