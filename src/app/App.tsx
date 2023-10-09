import React, { useCallback, useEffect } from 'react';
import { Route, RouteObject, Routes, useRoutes } from 'react-router';
import { observer } from 'mobx-react-lite';

import { useTokenConfigs } from '~/shared/hooks/useTokenConfigs';
import Home from '~/features/Home/Home';
import {
  defaultLocalStorage,
  getUserLocalStorage,
  logoutLocalStorage,
} from '~/shared/utils/storage';
import { authStore } from '~/store/store';
import { tokensLocalStorage } from '~/shared/utils/config';
import Auth from '~/features/auth/Auth';

const routers: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];

const App: React.FC = observer(() => {
  const router = useRoutes(routers);
  const tokenConfigs = useTokenConfigs();

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

  return tokenConfigs ? (
    <div>{router}</div>
  ) : (
    <Routes>{tokenConfigs ? null : <Route path='*' element={<Auth />} />}</Routes>
  );
});

export default App;
