import { AxiosRequestConfig } from 'axios';

export const getAxiosConfig = (currentLanguage: string): AxiosRequestConfig => {
  return {
    headers: {
      'Accept-Language': currentLanguage,
    },
  } as AxiosRequestConfig;
};
