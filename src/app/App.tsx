import React, { useCallback, useEffect } from 'react';
import { Route, RouteObject, Routes, useRoutes } from 'react-router';
import { observer } from 'mobx-react-lite';
import bem from 'easy-bem';

import {
  defaultLocalStorage,
  getUserLocalStorage,
  logoutLocalStorage,
} from '~/shared/utils/storage';
import { tokensLocalStorage } from '~/shared/utils/config';
import { authStore } from '~/shared/api/store';
import { Auth, ChangePassword, ResetPassword } from '~/features/auth';
import { Home } from '~/features/main';
import { LayoutComponent } from '~/shared/ui/components';
import { Create, Merchant, Merchants } from '~/features/merchants';
import { LanguageSelect } from '~/shared/ui/components/Fields';

const routers: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/merchants',
    element: <Merchants />,
  },
  {
    path: '/merchants/merchant/:id',
    element: <Merchant />,
  },
  {
    path: '/merchants/create-merchant',
    element: <Create />,
  },
];

const App: React.FC = observer(() => {
  const b = bem('Auth');
  const router = useRoutes(routers);

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
    return <LayoutComponent>{router}</LayoutComponent>;
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
