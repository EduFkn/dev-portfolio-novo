"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';
import { Footer } from './footer';

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainContentRef.current) {
      // Start with opacity 0 for fade-in effect
      mainContentRef.current.classList.add('opacity-0', 'animate-fade-in');
      mainContentRef.current.classList.remove('animate-fade-out');


      // Remove animation classes after completion to prevent re-triggering on other state changes
      const animationEndHandler = () => {
        mainContentRef.current?.classList.remove('animate-fade-in');
      };
      mainContentRef.current.addEventListener('animationend', animationEndHandler);

      // Force reflow / restart animation by removing and adding class
      // This can be tricky, ensure it works as expected or simplify
      // For simplicity, a direct class add might be enough if initial state is opacity-0
      // via CSS for elements that need to fade in.
      // Let's ensure the initial state opacity-0 is applied before animation.
      requestAnimationFrame(() => {
        if (mainContentRef.current) {
           mainContentRef.current.classList.remove('opacity-0'); // remove this if animation handles it
           mainContentRef.current.classList.add('opacity-100');
        }
      });
      
      return () => {
        mainContentRef.current?.removeEventListener('animationend', animationEndHandler);
      };
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main ref={mainContentRef} className="flex-grow pt-16 md:pt-20"> {/* Adjust pt based on Navbar height */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
