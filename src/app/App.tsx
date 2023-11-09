import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import bem from 'easy-bem';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router';

import { Auth, ChangePassword, ResetPassword } from '~/features/auth';
import { Home } from '~/features/main';
import { Create, Merchant, Merchants } from '~/features/merchants';
import { authStore } from '~/shared/api/store';
import { LayoutComponent } from '~/shared/ui';
import { LanguageSelect } from '~/shared/ui/Fields';
import { Tags } from '~/features/tags';
import { tokensLocalStorage } from '~/shared/utils/config';
import {
  defaultLocalStorage,
  getUserLocalStorage,
  logoutLocalStorage,
} from '~/shared/utils/storage';
import { LanguageProvider } from '~/shared/context/LanguageContext/LanguageContext';

const App: React.FC = observer(() => {
  const b = bem('Auth');
  dayjs.locale('ru');

  const initializeApp = useCallback(() => {
    const tokensLocal = getUserLocalStorage();
    if (tokensLocal?.access && tokensLocal?.refresh) {
      authStore.setTokens(tokensLocal);
    } else {
      logoutLocalStorage();
      authStore.clearTokens();
    }
  }, []);

  const handleStorageEvent = useCallback(({ key, newValue }: StorageEvent) => {
    if (key === tokensLocalStorage && newValue === JSON.stringify(defaultLocalStorage)) {
      authStore.logoutUser();
      logoutLocalStorage();
    } else {
      authStore.setTokens(JSON.parse(newValue || ''));
    }
  }, []);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  useEffect(() => {
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [handleStorageEvent]);

  if (authStore.tokens.access && authStore.tokens.refresh) {
    return (
      <LanguageProvider>
        <LayoutComponent>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/merchants'>
              <Route index element={<Merchants />} />
              <Route path='/merchants/merchant/:id' element={<Merchant />} />
              <Route path='/merchants/create-merchant' element={<Create />} />
            </Route>
            <Route path='/tags'>
              <Route index element={<Tags />} />
            </Route>
          </Routes>
        </LayoutComponent>
      </LanguageProvider>
    );
  } else {
    return (
      <>
        <div className={b('localization-block')}>
          <LanguageSelect />
        </div>
        <Routes>
          <Route path='*' element={<Auth />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/change-password' element={<ChangePassword />} />
        </Routes>
      </>
    );
  }
});

export default App;
