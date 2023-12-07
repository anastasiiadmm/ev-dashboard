import React from 'react';
import bem from 'easy-bem';
import { useTranslation } from 'react-i18next';

import './Cards.scss';
import { FormField, MeatBalls } from '~/shared/ui';

interface Props {
  id: number;
  name: string;
  is_active: boolean;
  starts_at: string;
  ends_at: string;
  image?: string;
  modalHandler: (key: number, id: number) => void;
  switchHandler: (e: boolean, id: number) => void;
  itemsMeatBalls: {
    label?: React.ReactNode | string;
    key: string;
    icon?: React.ReactNode;
    children: {
      icon?: React.ReactNode;
      label: string;
      key: number;
    }[];
  }[];
}

const Cards: React.FC<Props> = ({
  itemsMeatBalls,
  id,
  name,
  is_active,
  starts_at,
  ends_at,
  image,
  modalHandler,
  switchHandler,
}) => {
  const b = bem('Cards');
  const { t } = useTranslation();

  const openCloseModal = (key: number, id: number) => {
    modalHandler(key, id);
  };

  const handleSwitchChange = (e: boolean, id: number) => {
    switchHandler(e, id);
  };

  return (
    <div className={b('container-item')}>
      <div className={b(image ? 'banner-style' : 'fullscreen-style')}>
        {image && <img src={image} alt={name} />}
        <div className={is_active ? 'active-true' : 'active-false'}>
          <p />
          <span>{is_active ? t('merchants.active') : t('merchants.inactive')}</span>
        </div>
      </div>
      <div className={b('container-name-meatballs')}>
        <h3>{name}</h3>
        <div style={{ marginTop: !image ? '-4.5rem' : '', width: '9%' }}>
          <MeatBalls items={itemsMeatBalls} change={(key: number) => openCloseModal(key, id)} />
        </div>
      </div>
      <div className={b('container-description')}>
        <div className={b('container-time')}>
          <div>
            <label>{t('banners.add_banner.date_start')}</label>
            <p>
              {t('banners.time.from')} {starts_at}
            </p>
          </div>
          <span />
          <div>
            <label>{t('banners.add_banner.date_finish')}</label>
            <p>
              {t('banners.time.to')} {ends_at}
            </p>
          </div>
        </div>
        <div
          style={{ borderTop: !image ? '1px solid #F8F8F8' : '' }}
          className={b('container-switch')}
        >
          <label>{is_active ? t('merchants.active') : t('merchants.inactive')}</label>
          <FormField
            type='switch'
            defaultChecked={is_active}
            onChange={(e: boolean) => handleSwitchChange(e, id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
