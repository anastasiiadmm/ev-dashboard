import React from 'react';
import { Empty } from 'antd';

import { notFoundImage } from '~/assets/images';

const NotFoundImages = () => {
  return (
    <Empty
      image={<img src={notFoundImage} alt='notFoundImages' />}
      imageStyle={{
        height: 300,
      }}
      description={<h2>Данные отсутствуют</h2>}
    />
  );
};

export default NotFoundImages;
