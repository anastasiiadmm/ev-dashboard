import React, { useState } from 'react';
import i18n from 'i18next';

import eng from '~/assets/images/svg/icons/default/ENG.svg';
import rus from '~/assets/images/svg/icons/default/RU.svg';
import kg from '~/assets/images/svg/icons/default/KG.svg';
import { FormField } from '~/shared/ui';

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
