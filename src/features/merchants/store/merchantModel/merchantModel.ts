import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import { ICreateMerchant, IMerchant } from '~/features/merchants/interfaces';
import { IError } from '~/shared/interfaces';

interface MerchantState {
  merchants: IMerchant[] | null;
  merchantsLoading: boolean;
  success: boolean;
  merchantsError: string | null;
  commonError: IError | null;
  createMerchantLoading: boolean;
  createMerchantError: AxiosError | null;
  createMerchantSuccess: boolean;
}

class MerchantStore implements MerchantState {
  merchants: IMerchant[] | null = null;
  merchantsLoading: boolean = false;
  success: boolean = false;
  merchantsError: string | null = null;
  commonError: IError | null = null;
  createMerchantLoading: boolean = false;
  createMerchantError: AxiosError | null = null;
  createMerchantSuccess: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMerchants() {
    try {
      runInAction(() => {
        this.merchantsLoading = true;
        this.success = false;
        this.commonError = null;
      });

      const resp = await axiosApi.get(`/merchants/`);
      const data = resp.data;

      runInAction(() => {
        this.merchants = data;
        this.merchantsLoading = false;
        this.success = true;
        this.merchantsError = null;
        this.commonError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.merchantsLoading = false;
        this.success = false;
        this.merchantsError = error?.message || null;
      });
    }
  }

  async postCreateMerchant(merchantData: ICreateMerchant) {
    try {
      runInAction(() => {
        this.createMerchantLoading = true;
        this.createMerchantSuccess = false;
        this.createMerchantError = null;
      });

      await axiosApi.post(`/merchants/`, merchantData);

      runInAction(() => {
        this.createMerchantLoading = false;
        this.createMerchantSuccess = true;
        this.createMerchantError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.createMerchantLoading = false;
        this.createMerchantSuccess = false;
        this.createMerchantError = error;
      });

      throw error;
    }
  }
}

const merchantStore = new MerchantStore();
export default merchantStore;
