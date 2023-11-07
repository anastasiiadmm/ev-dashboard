import React, { useState, useEffect } from 'react';
import i18n from 'i18next';

import { eng, kg, rus } from '~/assets/images';
import { FormField } from '~/shared/ui';

function LanguageSelect() {
  const savedLanguage = localStorage.getItem('language') || 'ru';
  const [lang, setLang] = useState(savedLanguage);

  useEffect(() => {
    i18n.changeLanguage(savedLanguage);
  }, [savedLanguage]);

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    setLang(value);
    localStorage.setItem('language', value);
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
}

export default LanguageSelect;
