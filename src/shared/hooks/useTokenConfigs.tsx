import { authStore } from '~/store/store';

export const useTokenConfigs = () => {
  const { access, refresh } = authStore;
  return access && refresh;
};
