import React, { useState } from 'react';
import i18n from 'i18next';

import { eng, kg, rus } from '~/assets/images';
import { FormField } from '~/shared/ui/components';

function LanguageSelect() {
  const [lang, setLang] = useState('ru');

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    setLang(value);
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
