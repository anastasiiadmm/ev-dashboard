import React, { useState, useEffect } from 'react';
import i18n from 'i18next';

import { eng, kg, rus } from '~/assets/images';
import { FormField } from '~/shared/ui';
import { saveLangToLocalStorage } from '~/shared/utils/storage';
import { useLanguage } from '~/shared/context/LanguageContext/LanguageContext';

const LanguageSelect = () => {
  const { setCurrentLanguage, currentLanguage } = useLanguage();
  const [lang, setLang] = useState(currentLanguage);

  useEffect(() => {
    saveLangToLocalStorage(lang);
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    setLang(value);
    setCurrentLanguage(value);
  };

  return (
    <FormField
      type='select'
      defaultValue={lang}
      customStyle={{ width: 100 }}
      handleChange={handleChange}
      options={[
        { value: 'en', label: 'ENG', icon: eng },
        { value: 'ru', label: 'RU', icon: rus },
        { value: 'ky', label: 'KG', icon: kg },
      ]}
    />
  );
};

export default LanguageSelect;
