import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import { ICommon } from '~/features/merchants/interfaces';

interface CommonState {
  countries: ICommon[] | null;
  districts: ICommon[] | null;
  settlements: ICommon[] | null;
  loading: boolean;
  error: string | null;
}

interface MessageError {
  message: string;
  details?: string;
}

class CommonStore implements CommonState {
  countries = null;
  districts = null;
  settlements = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchLocations = async (query: string) => {
    this.setLoading(true);
    try {
      const resp = await axiosApi.get(`/common/locations/${query}`);

      const params = new URLSearchParams(query);
      const locationType = params.get('location_type');

      runInAction(() => {
        switch (locationType) {
          case 'countries':
            this.countries = resp.data;
            break;
          case 'districts':
            this.districts = resp.data;
            break;
          case 'settlements':
            this.settlements = resp.data;
            break;
          default:
            break;
        }
        this.setLoading(false);
        this.setError(null);
      });
    } catch (e) {
      const error = e as MessageError;
      runInAction(() => {
        this.setLoading(false);
        this.setError(error?.message || 'An error occurred');
      });
    }
  };

  setLoading = (status: boolean) => {
    this.loading = status;
  };

  setError = (message: string | null) => {
    this.error = message;
  };
}

const commonStore = new CommonStore();
export default commonStore;
