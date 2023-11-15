import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import { ICreateMerchant, IMerchant, IMerchantPagination } from '~/pages/merchants/interfaces';
import { IChangeStatuses, IError } from '~/shared/interfaces';
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
  changeMerchantStatusesSuccess: boolean;
  changeMerchantStatusesLoading: boolean;
  changeMerchantStatusesError: string | null;
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
  changeMerchantStatusesSuccess: boolean = false;
  changeMerchantStatusesLoading: boolean = false;
  changeMerchantStatusesError: string | null = null;

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

  async changeMerchantsStatuses(data: IChangeStatuses) {
    try {
      runInAction(() => {
        this.changeMerchantStatusesSuccess = false;
        this.changeMerchantStatusesLoading = true;
        this.changeMerchantStatusesError = null;
      });

      const resp = await axiosApi.patch(`/merchants/statuses/`, data);
      const updatedTags = resp.data;

      runInAction(() => {
        if (!this.merchants) {
          this.merchants = [];
        }

        updatedTags.forEach((updatedMerchant: IMerchant) => {
          const index = this.merchants!.findIndex((tag) => tag.id === updatedMerchant.id);
          if (index !== -1) {
            this.merchants![index] = updatedMerchant;
          } else {
            this.merchants!.push(updatedMerchant);
          }
        });

        this.changeMerchantStatusesSuccess = true;
        this.changeMerchantStatusesLoading = false;
        this.changeMerchantStatusesError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.changeMerchantStatusesLoading = false;
        this.changeMerchantStatusesSuccess = false;
        this.changeMerchantStatusesError = error?.message || null;
      });
    }
  }

  setChangeStatusesSuccess(value: boolean) {
    this.changeMerchantStatusesSuccess = value;
  }
}

const merchantStore = new MerchantStore();
export default merchantStore;
