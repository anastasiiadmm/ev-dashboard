import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import {
  addLocalStorage,
  defaultTokens,
  getUserLocalStorage,
  logoutLocalStorage,
} from '~/shared/utils/storage';
import { IJWTokens, IUser } from '~/pages/auth/interfaces';
import { IError } from '~/shared/interfaces';

interface AuthState {
  tokens: IJWTokens;
  user: IUser | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  commonError: IError | null;
}

interface MessageError {
  message: string;
  details?: string;
}

class AuthStore implements AuthState {
  tokens: IJWTokens = getUserLocalStorage() || defaultTokens;
  user: IUser | null = null;
  loading: boolean = false;
  success: boolean = false;
  error: string | null = null;
  commonError: IError | null = null;

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
    } catch (e) {
      const error = e as MessageError;
      runInAction(() => {
        this.loading = false;
        this.success = false;
        this.error = error?.message || null;
      });
    }
  }

  setTokens(payload: IJWTokens) {
    this.tokens = {
      ...this.tokens,
      ...payload,
    };
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
