import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import {
  addLocalStorage,
  defaultTokens,
  getUserLocalStorage,
  logoutLocalStorage,
} from '~/shared/utils/storage';
import { IJWTokens } from '~/types/interfaces/IJWTokens';
import { IUser } from '~/types/interfaces/IUser';
import { IError } from '~/types/interfaces/IError';

interface AuthState {
  tokens: IJWTokens;
  user: IUser | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  commonError: IError | null;
}

class AuthStore implements AuthState {
  tokens = getUserLocalStorage() || defaultTokens;
  user = null;
  loading = false;
  success = false;
  error = null;
  commonError = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loginUser(loginData: IUser) {
    try {
      runInAction(() => {
        this.loading = true;
        this.success = false;
        this.commonError = null;
      });

      const resp = await axiosApi.post(`/accounts/login/`, loginData);
      addLocalStorage({ access: resp.data.access, refresh: resp.data.refresh });

      runInAction(() => {
        this.tokens.access = resp.data.access;
        this.tokens.refresh = resp.data.refresh;
        this.loading = false;
        this.success = true;
        this.error = null;
        this.commonError = null;
      });
    } catch (e: { message: string }) {
      runInAction(() => {
        this.loading = false;
        this.success = false;
        this.error = e?.message;
      });
    }
  }

  async refreshToken() {
    const tokens = getUserLocalStorage();

    if (tokens?.refresh) {
      const resp = await axiosApi.post('/accounts/refresh/', tokens.refresh);
      this.tokens.access = resp.data.access;
      this.tokens.refresh = resp.data.refresh;
    }
  }

  setTokens(data: IJWTokens) {
    this.tokens = data;
    addLocalStorage(data);
    window.dispatchEvent(new Event('storage'));
  }

  clearTokens() {
    this.tokens = defaultTokens;
    logoutLocalStorage();
  }

  logoutUser() {
    this.tokens = defaultTokens;
    this.user = null;
    this.loading = false;
    this.success = false;
    this.error = null;
    this.commonError = null;
  }
}

const authStore = new AuthStore();
export default authStore;
