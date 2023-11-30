import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import {
  ICreateMerchant,
  IMerchant,
  IMerchantDetail,
  IMerchantStation,
} from '~/pages/merchants/interfaces';
import { IChangeStatuses, IError, IPagination } from '~/shared/interfaces';
import { getAxiosConfig } from '~/shared/utils';

interface IMerchantState {
  merchants: IMerchant[] | null;
  merchantPagination: IPagination | null;
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
  merchantDetail: IMerchantDetail | null;
  merchantDetailLoading: boolean;
  merchantDetailError: AxiosError | null;
  merchantDetailStation: IMerchantStation[] | null;
  merchantDetailStationPagination: IPagination | null;
  merchantDetailStationLoading: boolean;
  merchantDetailStationError: AxiosError | null;
  merchantDetailForUpdate: ICreateMerchant | null | undefined;
  merchantDetailForUpdateLoading: boolean;
  merchantDetailForUpdateError: AxiosError | null;
}

class MerchantStore implements IMerchantState {
  merchants: IMerchant[] | null = null;
  merchantPagination: IPagination | null = {
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
  merchantDetail: IMerchantDetail | null = null;
  merchantDetailLoading: boolean = false;
  merchantDetailError: AxiosError | null = null;
  merchantDetailStation: IMerchantStation[] | null = null;
  merchantDetailStationPagination: IPagination | null = {
    page: null,
    pages: null,
    size: null,
    total: null,
  };
  merchantDetailStationLoading: boolean = false;
  merchantDetailStationError: AxiosError | null = null;
  merchantDetailForUpdate: ICreateMerchant | null | undefined = null;
  merchantDetailForUpdateLoading: boolean = false;
  merchantDetailForUpdateError: AxiosError | null = null;

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

  setCreateMerchantStatusesSuccess(value: boolean) {
    this.createMerchantSuccess = value;
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

  async getMerchantDetail(currentLanguage: string, id: number | undefined) {
    try {
      runInAction(() => {
        this.merchantDetailLoading = true;
        this.merchantDetailError = null;
      });

      const config = getAxiosConfig(currentLanguage);

      const resp = await axiosApi.get(`/merchants/${id}/`, config);
      const data = resp.data;

      runInAction(() => {
        this.merchantDetail = data;
        this.merchantDetailLoading = false;
        this.merchantDetailError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.merchantDetailLoading = false;
        this.merchantDetailError = error;
      });
      throw error;
    }
  }

  async getMerchantStationsDetail(queryString: string, currentLanguage: string) {
    try {
      runInAction(() => {
        this.merchantDetailStationLoading = true;
        this.merchantDetailStationError = null;
      });

      const config = getAxiosConfig(currentLanguage);

      const resp = await axiosApi.get(`/stations/${queryString}`, config);
      const data = resp.data;

      runInAction(() => {
        this.merchantDetailStation = data?.items;
        if (this.merchantDetailStationPagination) {
          this.merchantDetailStationPagination.page = data?.page;
          this.merchantDetailStationPagination.pages = data?.pages;
          this.merchantDetailStationPagination.size = data?.size;
          this.merchantDetailStationPagination.total = data?.total;
        }
        this.merchantDetailStationLoading = false;
        this.merchantDetailStationError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.merchantDetailStationLoading = false;
        this.merchantDetailStationError = error;
      });
      throw error;
    }
  }

  async getMerchantDetailForUpdate(id: string | undefined) {
    try {
      runInAction(() => {
        this.merchantDetailForUpdateLoading = true;
        this.merchantDetailForUpdateError = null;
      });

      const { data } = await axiosApi.get(`/merchants/for-update/${id}/`);

      runInAction(() => {
        this.merchantDetailForUpdate = data;
        this.merchantDetailForUpdateLoading = false;
        this.merchantDetailForUpdateError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.merchantDetailForUpdateLoading = false;
        this.merchantDetailForUpdateError = error;
      });
      throw error;
    }
  }

  async patchMerchant(id: string, merchantData: ICreateMerchant | null | undefined) {
    try {
      runInAction(() => {
        this.patchMerchantLoading = true;
        this.patchMerchantSuccess = false;
        this.patchMerchantError = null;
      });

      await axiosApi.patch(`/merchants/${id}/`, merchantData);

      runInAction(() => {
        this.patchMerchantLoading = false;
        this.patchMerchantSuccess = true;
        this.patchMerchantError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.patchMerchantLoading = false;
        this.patchMerchantSuccess = false;
        this.patchMerchantError = error;
      });
      throw error;
    }
  }

  setPatchMerchantStatusesSuccess(value: boolean) {
    this.patchMerchantSuccess = value;
  }

  setMerchantForUpdateNull() {
    this.merchantDetailForUpdate = null;
  }
}

const merchantStore = new MerchantStore();
export default merchantStore;
