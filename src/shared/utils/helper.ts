import { AxiosRequestConfig } from 'axios';

import { IQueryType } from '~/shared/interfaces';

export const getParams = <T extends Record<string, unknown> | IQueryType>(params: T) =>
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
