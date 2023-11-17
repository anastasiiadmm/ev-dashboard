import { AxiosRequestConfig } from 'axios';

import { IQueryType } from '~/shared/interfaces';
import { ISchedule } from '~/pages/merchants/interfaces';
import { dayMapping } from '~/shared/utils/constants';

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

export const getDaysFromSchedule = (schedule: ISchedule[]) => {
  return schedule.flatMap((item) => item.days.map((dayNum) => dayMapping[dayNum] || ''));
};
