import { ReactNode, createContext, useContext, useState } from 'react';

// Localizations;
import localizationRu from '@locales/ru.json';
import localizationEn from '@locales/en.json';

type LanguageType = 'en' | 'ru';

interface LocalizationContextType {
  language: LanguageType;
  localization: { [key: string]: any };
  updateLocalization: (locale: LanguageType) => void;
}

interface ComponentProps {
  children: ReactNode;
}

export const LocalizationContext = createContext<LocalizationContextType | null>(null);

export const LocalizationProvider = ({ children }: ComponentProps): ReactNode => {
   const [language, setLanguage] = useState<LanguageType>('en');
   const localizations: Record<LanguageType, { [key: string]: any }> = {
      en: localizationEn,
      ru: localizationRu,
   };

   const updateLocalization = (language: LanguageType) => {
      setLanguage(language);
   };

   return (
      <LocalizationContext.Provider value={{ language, localization: localizations[language], updateLocalization }}>
         {children}
      </LocalizationContext.Provider>
   );
};

/* 
useLocalization hook must be used within LocalizationProvider!
Example of use useLocalization hook:
const { localization, switchLocalization } = useLocalization();
*/
export const useLocalization = (): LocalizationContextType => {
   const context = useContext(LocalizationContext);
   if (!context) {
      throw new Error('useLocalization must be used within a LocalizationProvider');
   }
   return context;
};