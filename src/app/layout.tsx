import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ClientLayoutWrapper } from '@/components/layout/client-layout-wrapper';
import { Preloader } from '@/components/preloader'; // Import Preloader

export const metadata: Metadata = {
  title: 'Aetherweave Portfolio | Eduardo Almeida',
  description: 'Desenvolvedor Full Stack Criando Experiências Digitais Inovadoras',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet" />

      </head>
      <body className="font-body antialiased bg-background text-foreground text-sm md:text-base">
        <ThemeProvider defaultTheme="dark">
          <Preloader />
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
