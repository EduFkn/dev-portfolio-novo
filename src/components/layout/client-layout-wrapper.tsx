"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';
import { Footer } from './footer';

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    // Delay content visibility to allow preloader to show
    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 2500); // Should match preloader duration or slightly after

    return () => clearTimeout(contentTimer);
  }, []);

  useEffect(() => {
    if (isContentVisible && mainContentRef.current) {
      mainContentRef.current.classList.remove('opacity-0', 'animate-fade-out');
      mainContentRef.current.classList.add('opacity-100', 'animate-fade-in');
      
      const animationEndHandler = () => {
        mainContentRef.current?.classList.remove('animate-fade-in');
      };
      mainContentRef.current.addEventListener('animationend', animationEndHandler);
      
      return () => {
        mainContentRef.current?.removeEventListener('animationend', animationEndHandler);
      };
    }
  }, [pathname, isContentVisible]);

  return (
    <div className={`flex flex-col min-h-screen bg-background text-foreground transition-opacity duration-500 ease-in-out ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main ref={mainContentRef} className="flex-grow pt-16 md:pt-20 opacity-0"> {/* Initial opacity-0 for fade-in */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
