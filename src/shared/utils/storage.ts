import { languageLocalStorage, tokensLocalStorage } from '~/shared/utils/config';
import { IJWTokens } from '~/features/auth/interfaces/IJWTokens';

export const defaultLocalStorage = { user: null, token: null };

export const defaultTokens: IJWTokens = {
  access: '',
  refresh: '',
};

export const getUserLocalStorage = (): IJWTokens | null => {
  try {
    const tokenLocal = JSON.parse(localStorage.getItem(tokensLocalStorage) || '');
    if (tokenLocal && 'access' in tokenLocal && 'refresh' in tokenLocal) {
      return tokenLocal;
    }
    return null;
  } catch {
    logoutLocalStorage();
    return null;
  }
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
