'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (storedLang === 'en' || storedLang === 'id') {
      setLanguageState(storedLang);
      document.documentElement.lang = storedLang;
    }
  }, []);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      document.cookie = `${LANGUAGE_STORAGE_KEY}=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLang;
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

