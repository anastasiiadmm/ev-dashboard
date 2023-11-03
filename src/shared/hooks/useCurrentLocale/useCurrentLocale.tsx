import { useTranslation } from 'react-i18next';

const useCurrentLocale = () => {
  const { i18n } = useTranslation();

  return i18n.language;
};

export default useCurrentLocale;
