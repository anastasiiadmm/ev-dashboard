import React from 'react';
import bem from 'easy-bem';
import { Empty as EmptyAntd, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { emptyImage } from '~/assets/images';
import './Empty.scss';

interface Props {
  variant: 'banner' | 'fullscreen' | 'stock' | 'rates';
  onClick: () => void;
}

// варианты: banner, fullscreen, stock, rates

const Empty: React.FC<Props> = ({ variant = 'banner', onClick }) => {
  const b = bem('Empty');
  const { t } = useTranslation();
  const text = `empty.${variant}`;

  return (
    <EmptyAntd
      image={
        <div className={b('container-empty')}>
          <h1 className={b('image-title')}>{t(`${text}.image_title`)}</h1>
          <img className={b('image-empty')} src={emptyImage} alt='emptyimage' />
        </div>
      }
      imageStyle={{
        height: 400,
      }}
      description={
        <div className={b('container-description')}>
          <div className={b('container-title-description')}>
            <h2 className={b('title')}>{t(`${text}.title`)}</h2>
            <p className={b('description')}>{t(`${text}.description`)}</p>
          </div>
          <Button type='primary' className={b('add-button')} onClick={onClick}>
            <span className={b('plus-icon')}>+</span> {t(`${text}.button`)}
          </Button>
        </div>
      }
    />
  );
};

export default Empty;
