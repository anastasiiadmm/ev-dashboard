import i18n from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { initReactI18next } from 'react-i18next';

import translationEN from '~/shared/locales/translationEN.json';
import translationRU from '~/shared/locales/translationRU.json';
import translationKY from '~/shared/locales/translationKY.json';
import App from '~/app/App.tsx';
import '~/app/styles/index.scss';
import '~/app/styles/_mixins.scss';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    ru: { translation: translationRU },
    ky: { translation: translationKY },
  },
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#22A699',
        colorTextLabel: '#323232',
      },
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>,
);
