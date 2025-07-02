export interface Language {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}

export const languages: Language[] = [
  { code: 'en', name: 'English', direction: 'ltr' },
  { code: 'ar', name: 'العربية', direction: 'rtl' }
];

export interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}