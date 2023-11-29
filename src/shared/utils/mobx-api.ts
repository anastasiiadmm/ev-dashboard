import axios from 'axios';

import { authStore } from '~/shared/api/store';
import { apiURL } from '~/shared/utils/config';

const axiosApi = axios.create({
  baseURL: apiURL,
});

axiosApi.interceptors.request.use((config) => {
  const tokens = authStore.tokens;

  if (tokens?.access && config.headers) {
    config.headers['Authorization'] = `Bearer ${tokens.access}`;
  }
  return config;
});

axiosApi.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error?.response?.status;
    const tokens = authStore.tokens;

    if (statusCode === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const resp = await axios.post(`${apiURL}/accounts/refresh/`, {
          refresh: authStore.tokens.refresh,
        });
        if (resp.status === 200) {
          const newTokens = resp.data;
          const usersLocal = {
            access: newTokens.access,
            refresh: tokens.refresh,
          };
          authStore.setTokens({
            access: usersLocal.access,
          });
          axiosApi.defaults.headers.Authorization = `Bearer ${newTokens.access}`;
          return axiosApi(originalRequest);
        }
      } catch {
        authStore.logoutUser();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosApi;
