"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';
import { cn } from '@/lib/utils';
import { Aperture } from 'lucide-react'; // Using Aperture as a placeholder logo

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  // { name: 'Contact', href: '/#contact' }, // Example for in-page link
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-custom-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300">
              <Aperture className="h-8 w-8" />
              <span className="font-headline text-2xl font-bold">Aetherweave</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out",
                  "hover:text-primary hover:bg-primary/10",
                  pathname === item.href
                    ? "text-primary font-semibold_ bg-primary/5"
                    : "text-foreground/80 hover:text-foreground"
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggleButton />
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggleButton />
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </div>
    </nav>
  );
}
