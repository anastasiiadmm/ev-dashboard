import React, { useCallback, useEffect } from 'react';
import { Route, RouteObject, Routes, useRoutes } from 'react-router';
import { observer } from 'mobx-react-lite';

import {
  defaultLocalStorage,
  getUserLocalStorage,
  logoutLocalStorage,
} from '~/shared/utils/storage';
import { tokensLocalStorage } from '~/shared/utils/config';
import { authStore } from '~/shared/api/store';
import { Auth, ChangePassword, ResetPassword } from '~/features/auth';
import { Home } from '~/features/main';

const routers: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];

const App: React.FC = observer(() => {
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
    return router;
  } else {
    return (
      <Routes>
        <Route path='*' element={<Auth />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />
      </Routes>
    );
  }
});

export default App;
