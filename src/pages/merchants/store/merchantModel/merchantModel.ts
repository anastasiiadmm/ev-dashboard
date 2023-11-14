import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import { ICreateMerchant, IMerchant, IMerchantPagination } from '~/pages/merchants/interfaces';
import { IError } from '~/shared/interfaces';
import { getAxiosConfig } from '~/shared/utils';

interface MerchantState {
  merchants: IMerchant[] | null;
  merchantPagination: IMerchantPagination | null;
  merchantsLoading: boolean;
  merchantsError: string | null;
  commonError: IError | null;
  createMerchantLoading: boolean;
  createMerchantError: AxiosError | null;
  createMerchantSuccess: boolean;
  patchMerchantSuccess: boolean;
  patchMerchantLoading: boolean;
  patchMerchantError: AxiosError | null;
}

class MerchantStore implements MerchantState {
  merchants: IMerchant[] | null = null;
  merchantPagination: IMerchantPagination | null = {
    page: null,
    pages: null,
    size: null,
    total: null,
  };
  merchantsLoading: boolean = false;
  merchantsError: string | null = null;
  commonError: IError | null = null;
  createMerchantLoading: boolean = false;
  createMerchantError: AxiosError | null = null;
  createMerchantSuccess: boolean = false;
  patchMerchantSuccess: boolean = false;
  patchMerchantLoading: boolean = false;
  patchMerchantError: AxiosError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMerchants(queryString: string, currentLanguage: string) {
    try {
      runInAction(() => {
        this.merchantsLoading = true;
        this.commonError = null;
      });

      const config = getAxiosConfig(currentLanguage);

      const resp = await axiosApi.get(`/merchants/${queryString}`, config);
      const data = resp.data;

      runInAction(() => {
        this.merchants = data?.items;
        if (this.merchantPagination) {
          this.merchantPagination.page = data?.page;
          this.merchantPagination.pages = data?.pages;
          this.merchantPagination.size = data?.size;
          this.merchantPagination.total = data?.total;
        }
        this.merchantsLoading = false;
        this.merchantsError = null;
        this.commonError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.merchantsLoading = false;
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
