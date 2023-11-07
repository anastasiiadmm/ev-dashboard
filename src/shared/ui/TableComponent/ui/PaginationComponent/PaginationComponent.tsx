import React from 'react';
import bem from 'easy-bem';
import { Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { chevronRight, chevronLeft } from '~/assets/images';
import { FormField } from '~/shared/ui';
import { IPagination } from '~/shared/interfaces';
import './PaginationComponent.scss';

interface Props {
  params: IPagination | null | undefined;
  pagePrevHandler?: (() => void | undefined) | undefined;
  pageNextHandler?: (() => void | undefined) | undefined;
}

const options = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
];

const PaginationComponent: React.FC<Props> = ({ params, pagePrevHandler, pageNextHandler }) => {
  const b = bem('PaginationComponent');
  const { t } = useTranslation();

  return (
    <div className={b('')}>
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <p className={b('title')}>{t('table.show')}</p>{' '}
        <FormField
          customStyle={{ width: 65 }}
          data-testid='select_id'
          type='select'
          defaultValue={10}
          options={options}
        />
      </div>
      <div className={b('num-block')}>
        <p className={b('title')}>{t('table.page')}</p>
        <Form initialValues={{ input: 1 }}>
          <FormField inputClassName={b('input-style')} data-testid='input_id' name='input' />
        </Form>

        <p className={b('title')}>
          {t('table.from')} {params?.count ? params?.count : 0}
        </p>
      </div>
      <div>
        <Button
          onClick={pagePrevHandler}
          type='primary'
          icon={<img src={chevronLeft} alt='chevronLeft' />}
          style={{ marginRight: 8 }}
        />
        <Button
          onClick={pageNextHandler}
          type='primary'
          icon={<img src={chevronRight} alt='chevronRight' />}
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
