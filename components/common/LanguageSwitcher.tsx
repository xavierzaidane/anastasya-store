'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'pill' | 'compact' | 'menu';
}

export default function LanguageSwitcher({
  className,
  variant = 'compact',
}: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === 'menu') {
    return (
      <div className={cn('flex items-center justify-between py-2 border-t border-white/10 mt-4', className)}>
        <span className="text-sm font-medium text-white/70 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Language / Bahasa
        </span>
        <div className="flex items-center rounded-full bg-white/10 p-0.5 border border-white/15">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-full transition-all cursor-pointer',
              language === 'en'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-white/70 hover:text-white'
            )}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage('id')}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-full transition-all cursor-pointer',
              language === 'id'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-white/70 hover:text-white'
            )}
          >
            ID
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all select-none cursor-pointer',
        className
      )}
      aria-label={`Switch language. Current: ${language.toUpperCase()}`}
      title={language === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'}
    >
      <Globe className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
      <span className="font-semibold">{language.toUpperCase()}</span>
    </button>
  );
}

