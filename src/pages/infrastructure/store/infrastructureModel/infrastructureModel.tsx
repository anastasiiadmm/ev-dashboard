import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import { getAxiosConfig } from '~/shared/utils';
import { IPagination } from '~/shared/interfaces';
import { IInfrastructure } from '~/pages/infrastructure/interfaces';

interface IInfrastructureState {
  infrastructure: IInfrastructure[] | null;
  infrastructurePagination: IPagination | null;
  infrastructureLoading: boolean;
  infrastructureError: string | null;
}

class InfrastructureStore implements IInfrastructureState {
  infrastructure: IInfrastructure[] | null = null;
  infrastructurePagination: IPagination | null = {
    page: null,
    pages: null,
    size: null,
    total: null,
  };
  infrastructureLoading: boolean = false;
  infrastructureError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchInfrastructure(queryString: string, currentLanguage: string) {
    try {
      runInAction(() => {
        this.infrastructureLoading = true;
        this.infrastructureError = null;
      });

      const config = getAxiosConfig(currentLanguage);

      const resp = await axiosApi.get(`/common/tags/${queryString}`, config);
      const data = resp.data;

      runInAction(() => {
        this.infrastructure = data?.items;
        if (this.infrastructurePagination) {
          this.infrastructurePagination.page = data?.page;
          this.infrastructurePagination.pages = data?.pages;
          this.infrastructurePagination.size = data?.size;
          this.infrastructurePagination.total = data?.total;
        }
        this.infrastructureLoading = false;
        this.infrastructureError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.infrastructureLoading = false;
        this.infrastructureError = error?.message || null;
      });
    }
  }
}

const infrastructureStore = new InfrastructureStore();
export default infrastructureStore;
