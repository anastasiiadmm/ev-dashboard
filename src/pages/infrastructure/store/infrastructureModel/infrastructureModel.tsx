import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import { IPagination } from '~/shared/interfaces';
import { IInfrastructure } from '~/pages/infrastructure/interfaces';

interface IInfrastructureState {
  infrastructure: IInfrastructure[] | null;
  infrastructurePagination: IPagination | null;
  infrastructureLoading: boolean;
  infrastructureError: string | null;
  infrastructureCreateLoading: boolean;
  infrastructureCreateError: string | null;
  deleteInfrastructureSuccess: boolean;
  deleteInfrastructureLoading: boolean;
  deleteInfrastructureError: string | null;
  infrastructureUpdateLoading: boolean;
  infrastructureUpdateError: string | null;
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
  infrastructureCreateLoading: boolean = false;
  infrastructureCreateError: string | null = null;
  deleteInfrastructureSuccess: boolean = false;
  deleteInfrastructureLoading: boolean = false;
  deleteInfrastructureError: string | null = null;
  infrastructureUpdateLoading: boolean = false;
  infrastructureUpdateError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchInfrastructure(queryString: string) {
    try {
      runInAction(() => {
        this.infrastructureLoading = true;
        this.infrastructureError = null;
      });

      const resp = await axiosApi.get(`/common/surroundings/${queryString}`);
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

  async infrastructureCreate(data: FormData, queryString: string) {
    try {
      runInAction(() => {
        this.infrastructureCreateLoading = true;
        this.infrastructureCreateError = null;
      });

      await axiosApi.post(`/common/surroundings/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      runInAction(() => {
        this.fetchInfrastructure(queryString);
        this.infrastructureCreateLoading = false;
        this.infrastructureCreateError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.infrastructureCreateLoading = false;
        this.infrastructureCreateError = error?.message || null;
      });
    }
  }

  async infrastructureUpdate(id: number, data: FormData, queryString: string) {
    try {
      runInAction(() => {
        this.infrastructureUpdateLoading = true;
        this.infrastructureUpdateError = null;
      });

      await axiosApi.patch(`/common/surroundings/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      runInAction(() => {
        this.fetchInfrastructure(queryString);
        this.infrastructureUpdateLoading = false;
        this.infrastructureUpdateError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.infrastructureUpdateLoading = false;
        this.infrastructureUpdateError = error?.message || null;
      });
    }
  }

  async deleteInfrastructure(id: number | null, queryString: string) {
    try {
      runInAction(() => {
        this.deleteInfrastructureSuccess = false;
        this.deleteInfrastructureLoading = true;
        this.deleteInfrastructureError = null;
      });

      await axiosApi.delete(`/common/surroundings/${id}/`);

      runInAction(() => {
        this.fetchInfrastructure(queryString);
        this.deleteInfrastructureSuccess = true;
        this.deleteInfrastructureLoading = false;
        this.deleteInfrastructureError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.deleteInfrastructureLoading = false;
        this.deleteInfrastructureSuccess = false;
        this.deleteInfrastructureError = error?.message || null;
      });
    }
  }
}

const infrastructureStore = new InfrastructureStore();
export default infrastructureStore;
