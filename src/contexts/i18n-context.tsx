
"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';
import ptTranslations from '@/lib/locales/pt.json';
import enTranslations from '@/lib/locales/en.json';

type Locale = 'pt' | 'en';

interface I18nContextType {
  language: Locale;
  t: (key: string, replacements?: Record<string, string>) => string;
  changeLanguage: (lang: Locale) => void;
  currentLanguage: Locale;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Locale, any> = {
  pt: ptTranslations,
  en: enTranslations,
};

const I18N_STORAGE_KEY = "aetherweave-portfolio-i18n-lang";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Locale>('pt'); // Default to Portuguese
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem(I18N_STORAGE_KEY) as Locale | null;
    if (storedLang && (storedLang === "pt" || storedLang === "en")) {
      setLanguage(storedLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(I18N_STORAGE_KEY, language);
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const t = useCallback((key: string, replacements?: Record<string, string>) => {
    const keys = key.split('.');
    let text = translations[language];
    try {
      for (const k of keys) {
        text = text[k];
        if (text === undefined) throw new Error(`Translation key "${key}" not found for language "${language}"`);
      }
    } catch (error) {
      console.warn(error);
      // Fallback to English if key not found in current language, then to key itself
      let fallbackText = translations['en'];
      try {
        for (const k of keys) {
          fallbackText = fallbackText[k];
          if (fallbackText === undefined) throw new Error();
        }
        text = fallbackText;
      } catch {
        return key; // Return the key itself if not found in PT or EN
      }
    }


    if (typeof text === 'string' && replacements) {
      Object.keys(replacements).forEach(rKey => {
        text = (text as string).replace(new RegExp(`{{${rKey}}}`, 'g'), replacements[rKey]);
      });
    }
    return typeof text === 'string' ? text : key;
  }, [language]);

  const changeLanguage = (lang: Locale) => {
    if (mounted) {
      setLanguage(lang);
    }
  };

  if (!mounted) {
    return null; // Avoid rendering until language is determined to prevent flash
  }

  return (
    <I18nContext.Provider value={{ language, t, changeLanguage, currentLanguage: language }}>
      {children}
    </I18nContext.Provider>
  );
}
