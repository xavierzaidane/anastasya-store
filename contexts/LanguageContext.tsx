'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import { translations, type Language, type TranslationKeys } from '@/lib/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationKeys;
  isID: boolean;
  isEN: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'anastasya_language';

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', callback);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', callback);
    }
  };
}

function getSnapshot(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    return storedLang === 'en' || storedLang === 'id' ? storedLang : 'en';
  } catch {
    return 'en';
  }
}

function getServerSnapshot(): Language {
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLang: Language) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      } catch {
        // ignore
      }
      document.cookie = `${LANGUAGE_STORAGE_KEY}=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLang;
      listeners.forEach((listener) => listener());
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'id' : 'en';
    setLanguage(nextLang);
  };

  const currentTranslations = translations[language] || translations.en;

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: currentTranslations,
    isID: language === 'id',
    isEN: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
