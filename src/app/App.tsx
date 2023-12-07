import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/ky.js';
import 'dayjs/locale/en';
import bem from 'easy-bem';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router';
import { Spin } from 'antd';

import { HomePageAsync } from '~/pages/main';
import { AuthAsync, ChangePasswordAsync, ResetPasswordAsync } from '~/pages/auth';
import { CreateEditMerchantAsync, MerchantAsync, MerchantsAsync } from '~/pages/merchants';
import { CreateStation } from '~/pages/merchants/Merchant/ui';
import { TagsAsync } from '~/pages/tags';
import { authStore } from '~/shared/api/store';
import { LanguageProvider } from '~/shared/context';
import { LayoutComponent } from '~/shared/ui';
import { LanguageSelect } from '~/shared/ui/Fields';
import { tokensLocalStorage } from '~/shared/utils/config';
import {
  defaultLocalStorage,
  getUserLocalStorage,
  logoutLocalStorage,
} from '~/shared/utils/storage';
import { CreateBanner, HomePageBanner } from '~/pages/banners';
import { InfrastructureListAsync } from '~/pages/infrastructure';

const App: React.FC = observer(() => {
  const b = bem('Auth');
  const { i18n } = useTranslation();
  dayjs.locale(`${i18n.resolvedLanguage}`);

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
          <Suspense fallback={<Spin className='spin' />}>
            <Routes>
              <Route path='/' element={<HomePageAsync />} />
              <Route path='/banners'>
                <Route index element={<HomePageBanner />} />
                <Route path='/banners/create-banner/:id?' element={<CreateBanner variant={true} />} />
                <Route path='/banners/create-fullscreen/:id?' element={<CreateBanner variant={false} />} />
              </Route>
              <Route path='/merchants'>
                <Route index element={<MerchantsAsync />} />
                <Route path='/merchants/merchant/:id' element={<MerchantAsync />} />
                <Route path='/merchants/merchant/:id/create-station' element={<CreateStation />} />
                <Route
                  path='/merchants/create-edit-merchant/:id?'
                  element={<CreateEditMerchantAsync />}
                />
              </Route>
              <Route path='/tags'>
                <Route index element={<TagsAsync />} />
              </Route>
              <Route path='/infrastructure'>
                <Route index element={<InfrastructureListAsync />} />
              </Route>
            </Routes>
          </Suspense>
        </LayoutComponent>
      </LanguageProvider>
    );
  } else {
    return (
      <>
        <Suspense fallback={<Spin className='spin' />}>
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
