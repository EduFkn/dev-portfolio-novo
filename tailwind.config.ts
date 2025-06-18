import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'], // Use class strategy for dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'], // Poppins for headlines
        code: ['Fira Code', 'monospace'], // Added Fira Code
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
         'subtle-parallax': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - 1rem))' }, 
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': {
            textShadow: `
              0 0 4px hsl(var(--primary-foreground)),
              0 0 10px hsl(var(--primary-foreground)),
              0 0 18px hsl(var(--primary-foreground)),
              0 0 38px hsl(var(--primary)),
              0 0 70px hsl(var(--primary))
            `,
            opacity: '1',
          },
          '20%, 24%, 55%': { opacity: '0.8', textShadow: 'none' },
        },
        glitch: {
          '0%': { transform: 'skewX(0deg)' },
          '5%': { transform: 'skewX(2deg)' },
          '10%': { transform: 'skewX(-2deg)' },
          '15%': { transform: 'skewX(0deg)' },
          '100%': { transform: 'skewX(0deg)' },
        },
        fadeInText: {
          to: { opacity: '1' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-out': 'fade-out 0.5s ease-in-out',
        'subtle-parallax': 'subtle-parallax linear alternate infinite',
        'scroll': 'scroll var(--animation-duration, 40s) linear infinite',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'flicker': 'flicker 1.5s infinite alternate',
        'glitch': 'glitch 3s infinite alternate-reverse',
        'fade-in-text': 'fadeInText 1s ease-out 0.5s forwards',
        'typing': 'typing 3s steps(30, end) 0.5s infinite alternate',
      },
      boxShadow: {
        'custom-light': '0 2px 4px -1px rgba(120, 120, 120, 0.1), 0 1px 2px -1px rgba(120, 120, 120, 0.06)', // Slightly reduced
        'custom-dark': '0 3px 8px rgba(0, 0, 0, 0.35), 0 0 15px rgba(160, 108, 213, 0.15)', // Adjusted
        'custom-hover-dark': '0 6px 12px rgba(0, 0, 0, 0.45), 0 0 25px rgba(160, 108, 213, 0.25)', // Adjusted
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
