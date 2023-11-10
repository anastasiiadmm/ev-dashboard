import React, { createContext, useState, useContext, ReactNode } from 'react';

type LanguageContextType = {
  currentLanguage: string;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'ru',
  setCurrentLanguage: () => {},
});

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'ru');

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
