import { AxiosError } from 'axios';

export const getParams = <T extends Record<string, unknown>>(params: T) =>
  params
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : '';

export const isErrorResponse = (e: AxiosError) => {
  return (
    e &&
    typeof e === 'object' &&
    e.response &&
    typeof e.response === 'object' &&
    e.response.data &&
    typeof e.response.data === 'object' &&
    Array.isArray(e.response.data.phone) &&
    e.response.data.phone.every((item) => typeof item === 'string')
  );
};
