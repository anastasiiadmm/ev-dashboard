import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';

interface IData {
  id: number;
  name: string;
}

interface IFormData {
  name_ru: string;
  name_en: string;
  name_ky: string;
  source: string;
  image: string;
  category: number;
  button_label: string;
  button_color: string;
  start_time: string;
  start_date: string;
  finish_time: string;
  finish_date: string;
  is_active: boolean;
  link: string;
  merchant: number;
  stations: number[];
}

interface IBannerState {
  merchantsError: string | null;
  merchantsLoading: boolean;
  merchantId: IData[];
  stationId: IData[];
}

class BannerStore implements IBannerState {
  merchantsError: string | null = null;
  merchantsLoading: boolean = false;
  merchantId: IData[] = [];
  stationId: IData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async merchantsForPromotions() {
    try {
      const resp = await axiosApi.get(`merchants/for-promotion/`);
      const data = resp.data;
      runInAction(() => {
        this.merchantId = data?.results;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.merchantsLoading = false;
        this.merchantsError = error?.message || null;
      });
    }
  }
  async stationForPromotions(id: number | undefined) {
    try {
      const resp = await axiosApi.get(`stations/for-promotion/`, {
        params: {
          merchant: id,
        },
      });
      const data = resp.data;
      runInAction(() => {
        this.stationId = data?.results;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.merchantsLoading = false;
        this.merchantsError = error?.message || null;
      });
    }
  }
  async postBanner(data: IFormData) {
    try {
      await axiosApi.post(``, data);
      runInAction(() => {});
    } catch (e) {
      runInAction(() => {});
    }
  }
}

const bannerStore = new BannerStore();

export default bannerStore;
