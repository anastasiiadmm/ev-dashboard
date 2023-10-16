import React from 'react';

import eng from '~/assets/images/svg/icons/default/ENG.svg';
import rus from '~/assets/images/svg/icons/default/RU.svg';
import kg from '~/assets/images/svg/icons/default/KG.svg';
import { FormField } from '~/shared/ui/components';

function LanguageSelect() {
  const handleChange = () => {};

  return (
    <FormField
      type='select'
      defaultValue='en'
      customStyle={{ width: 100 }}
      onChange={handleChange}
      options={[
        { value: 'en', label: 'ENG', icon: eng },
        { value: 'ru', label: 'RU', icon: rus },
        { value: 'kg', label: 'KG', icon: kg },
      ]}
    />
  );
}

export default LanguageSelect;
