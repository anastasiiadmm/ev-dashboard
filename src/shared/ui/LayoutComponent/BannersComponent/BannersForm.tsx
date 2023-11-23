import React from 'react';
import bem from 'easy-bem';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { UploadFile } from '../..';

import '~/shared/ui/LayoutComponent/BannersComponent/BannersForm.scss';

const BannersForm = () => {
  const b = bem('BannersForm');
  const { t } = useTranslation();

  return (
    <Form className={b('container')}>
      <h2 className={b('title')}>{t('banners.add_banner.creating_a_banner')}</h2>
      <div className={b('container_upload_file')}>
        <UploadFile />
      </div>
    </Form>
  );
};

export default BannersForm;
