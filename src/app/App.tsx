import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import bem from 'easy-bem';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Spin } from 'antd';

import { HomePageAsync } from '~/pages/main';
import { AuthAsync, ChangePasswordAsync, ResetPasswordAsync } from '~/pages/auth';
import { CreateMerchantAsync, MerchantAsync, MerchantsAsync } from '~/pages/merchants';
import { TagsAsync } from '~/pages/tags';
import { authStore } from '~/shared/api/store';
import { LayoutComponent } from '~/shared/ui';
import { LanguageSelect } from '~/shared/ui/Fields';
import { tokensLocalStorage } from '~/shared/utils/config';
import {
  defaultLocalStorage,
  getUserLocalStorage,
  logoutLocalStorage,
} from '~/shared/utils/storage';
import { LanguageProvider } from '~/shared/context';

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
    if (key === tokensLocalStorage) {
      try {
        const parsedValue = JSON.parse(newValue || '');
        if (parsedValue === defaultLocalStorage) {
          authStore.logoutUser();
          logoutLocalStorage();
        } else {
          authStore.setTokens(parsedValue);
        }
      } catch (e) {
        console.error('Error parsing storage event newValue', e);
      }
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
          <Suspense fallback={<Spin />}>
            <Routes>
              <Route path='/' element={<HomePageAsync />} />
              <Route path='/merchants'>
                <Route index element={<MerchantsAsync />} />
                <Route path='/merchants/merchant/:id' element={<MerchantAsync />} />
                <Route path='/merchants/create-merchant' element={<CreateMerchantAsync />} />
              </Route>
              <Route path='/tags'>
                <Route index element={<TagsAsync />} />
              </Route>
            </Routes>
          </Suspense>
        </LayoutComponent>
      </LanguageProvider>
    );
  } else {
    return (
      <>
        <Suspense fallback={<Spin />}>
          <div className={b('localization-block')}>
            <LanguageSelect />
          </div>
          <Routes>
            <Route path='*' element={<AuthAsync />} />
            <Route path='/reset-password' element={<ResetPasswordAsync />} />
            <Route path='/change-password' element={<ChangePasswordAsync />} />
          </Routes>
        </Suspense>
      </>
    );
  }
});

export default App;
