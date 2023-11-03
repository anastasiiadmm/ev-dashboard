export const getParams = <T extends Record<string, unknown>>(params: T) =>
  params
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : '';
