import { Button } from 'antd';
import bem from 'easy-bem';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { redxcircle } from '~/assets/images';
import './ModalDelete.scss'

interface Props {
  handleCloseModal: () => void;
  deleteHandler: () => void;
}

const ModalDelete: React.FC<Props> = ({ handleCloseModal, deleteHandler }) => {
  const b = bem('ModalDelete');
  const { t } = useTranslation();

  return (
    <div className={b('image-title-modaldelete')}>
      <img src={redxcircle} alt='cancelicon' />
      <div className={b('container-description-modal')}>
        <h2>{t('banners.modal_delete.title')}</h2>
        <p>{t('banners.modal_delete.description')}</p>
        <div className={b('container-button')}>
          <Button onClick={handleCloseModal}>{t('banners.modal_delete.cancel')}</Button>
          <Button type='primary' onClick={deleteHandler}>
            {t('banners.modal_delete.delete')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
