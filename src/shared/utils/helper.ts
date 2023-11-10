import { AxiosRequestConfig } from 'axios';

export const getParams = <T extends Record<string, unknown>>(params: T) =>
  params
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : '';

export const getAxiosConfig = (currentLanguage: string): AxiosRequestConfig => {
  return {
    headers: {
      'Accept-Language': currentLanguage,
    },
  } as AxiosRequestConfig;
};
