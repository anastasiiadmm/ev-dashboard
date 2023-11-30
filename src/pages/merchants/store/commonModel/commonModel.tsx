import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import { ICommon } from '~/pages/merchants/interfaces';
import { getAxiosConfig } from '~/shared/utils';

interface CommonState {
  countries: ICommon[] | null;
  countriesLoading: boolean;
  districts: ICommon[] | null;
  districtsLoading: boolean;
  settlements: ICommon[] | null;
  settlementsLoading: boolean;
  loading: boolean;
  error: string | null;
}

interface MessageError {
  message: string;
  details?: string;
}

class CommonStore implements CommonState {
  countries = null;
  countriesLoading = false;
  districts = null;
  districtsLoading = false;
  settlements = null;
  settlementsLoading = false;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchLocations = async (query: string, currentLanguage: string) => {
    const params = new URLSearchParams(query);
    const locationType = params.get('location_type');
    switch (locationType) {
      case 'countries':
        this.countriesLoading = true;
        break;
      case 'districts':
        this.districtsLoading = true;
        break;
      case 'settlements':
        this.settlementsLoading = true;
        break;
      default:
        break;
    }
    this.setLoading(true);

    const config = getAxiosConfig(currentLanguage);

    try {
      const resp = await axiosApi.get(`/common/locations/${query}`, config);

      runInAction(() => {
        switch (locationType) {
          case 'countries':
            this.countries = resp.data;
            this.countriesLoading = false;
            break;
          case 'districts':
            this.districts = resp.data;
            this.districtsLoading = false;
            break;
          case 'settlements':
            this.settlements = resp.data;
            this.settlementsLoading = false;
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
