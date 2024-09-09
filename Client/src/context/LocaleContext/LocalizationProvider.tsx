import React, { ReactNode, createContext, useContext, useState } from 'react';

// Localizations;
import localizationRu from '../../locales/ru.json';
import localizationEn from '../../locales/en.json';

interface LocalizationContextType {
  localization: { [key: string]: any };
  updateLocalization: (locale: string) => void;
}
interface ComponentProps {
	children: ReactNode;
}

export const LocalizationContext = createContext<LocalizationContextType | null>(null)

export const LocalizationProvider = ({ children }: ComponentProps): JSX.Element => {
	const [language, setLanguage] = useState('en')
	const localizations = { en: localizationEn, ru: localizationRu }

	const updateLocalization = (locale: string) => {
    setLanguage(locale)
  };

	return (
		<LocalizationContext.Provider value={{ localization: localizations[language], updateLocalization }}>
			{children}
		</LocalizationContext.Provider>
	)
}

/* 
useAuth hook must be used within LocalizationProvider!
Example of use useLocalization hook:
const { localization, switchLocalization } = useLocalization();
*/
export const useLocalization = (): LocalizationContextType => {
  const context =  useContext(LocalizationContext);
	if (!context) {
    throw new Error('useLocalization must be used within an LocalizationProvider');
  }
  return context;
};