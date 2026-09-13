import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useApp } from '@/contexts/AppContext';
import { translate, type Lang, type TranslationKey } from '@/data/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  tStatus: (status: string) => string;
  tDifficulty: (difficulty: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { state, dispatch } = useApp();
  const lang: Lang = state.settings.language;

  const setLang = (value: Lang) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { language: value } });
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>) =>
    translate(lang, key, params);

  const tStatus = (status: string) =>
    translate(lang, `status.${status}` as TranslationKey);

  const tDifficulty = (difficulty: string) =>
    translate(lang, `difficulty.${difficulty}` as TranslationKey);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tStatus, tDifficulty }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}