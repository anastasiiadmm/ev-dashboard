import { apiUrls } from '~/shared/utils/constants';

export const tokensLocalStorage = 'infoLocalStorage';
export const languageLocalStorage = 'language';

const apiUrl = import.meta.env.VITE_API_URL;

const appEnvironment = apiUrl || 'local';

export const apiURL = apiUrls[appEnvironment];
