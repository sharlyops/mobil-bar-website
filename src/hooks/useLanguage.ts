import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, languages } from '../types/language';

interface LanguageContextType {
  currentLanguage: Language;
  switchLanguage: (langCode: string) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) {
        setCurrentLanguage(lang);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.direction;
    localStorage.setItem('language', currentLanguage.code);
  }, [currentLanguage]);

  const switchLanguage = (langCode: string) => {
    const lang = languages.find(l => l.code === langCode);
    if (lang) {
      setCurrentLanguage(lang);
    }
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { currentLanguage, switchLanguage, isRTL: currentLanguage.direction === 'rtl' } },
    children
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};