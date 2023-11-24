import React from 'react';
import { Empty } from 'antd';
import { useTranslation } from 'react-i18next';

import { notFoundImage } from '~/assets/images';

const NotFoundImages = () => {
  const { t } = useTranslation();

  return (
    <Empty
      image={<img src={notFoundImage} alt='notFoundImages' style={{ width: 161, height: 161 }} />}
      imageStyle={{
        height: 170,
      }}
      description={<h2>{t('errors.no_data_available')}</h2>}
    />
  );
};

export default NotFoundImages;
