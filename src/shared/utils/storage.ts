import { languageLocalStorage, tokensLocalStorage } from '~/shared/utils/config';
import { IJWTokens } from '~/pages/auth/interfaces';

export const defaultLocalStorage = { user: null, token: null };

export const defaultTokens: IJWTokens = {
  access: '',
  refresh: '',
};

export const getUserLocalStorage = (): IJWTokens | null => {
  const tokenString = localStorage.getItem(tokensLocalStorage);
  if (tokenString) {
    try {
      const tokenLocal = JSON.parse(tokenString);
      if (tokenLocal && 'access' in tokenLocal && 'refresh' in tokenLocal) {
        return tokenLocal;
      }
    } catch {
      logoutLocalStorage();
    }
  }
  return null;
};

export const logoutLocalStorage = () => {
  localStorage.clear();
};

export const addLocalStorage = (payload: IJWTokens) => {
  localStorage.setItem(tokensLocalStorage, JSON.stringify(payload));
};

export const saveLangToLocalStorage = (value: string) => {
  localStorage.setItem(languageLocalStorage, value);
};
