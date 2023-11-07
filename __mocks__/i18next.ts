import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '~/shared/locales/translationEN.json';
import translationRU from '~/shared/locales/translationRU.json';
import translationKY from '~/shared/locales/translationKY.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ru: { translation: translationRU },
      ky: { translation: translationKY },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
