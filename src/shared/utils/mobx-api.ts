import axios from 'axios';

import { apiURL } from '~/shared/utils/config';
import { authStore } from '~/shared/api/store';

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
    const { access, refresh } = authStore.tokens;

    if (access && refresh && statusCode === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const resp = await axiosApi.post('/accounts/refresh/', { refresh });
        // is OK status
        if (resp.status < 300) {
          const newTokens = resp.data;
          axiosApi.defaults.headers.Authorization = `Bearer ${newTokens.access}`;
          authStore.setTokens({
            access: newTokens.access,
            refresh: newTokens.refresh,
          });
          return axiosApi(originalRequest);
        }
      } catch {
        authStore.clearTokens();
      }
    }

    return Promise.reject(error);
  },
);

export default axiosApi;
