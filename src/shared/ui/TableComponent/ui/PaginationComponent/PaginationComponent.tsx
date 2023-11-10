import React from 'react';
import bem from 'easy-bem';
import { Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { chevronRight, chevronLeft } from '~/assets/images';
import { FormField } from '~/shared/ui';
import { IPagination } from '~/shared/interfaces';
import { IMerchantPagination } from '~/features/merchants/interfaces';
import './PaginationComponent.scss';

interface Props {
  params: IPagination | null | undefined;
  changeShowByHandler: ((value: string) => void | undefined) | undefined;
  onChangePageCheckHandler: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  pagePrevHandler?: (() => void | undefined) | undefined;
  pageNextHandler?: (() => void | undefined) | undefined;
  defaultSizeValue: number | undefined;
  pages: IMerchantPagination | undefined | null;
}

const options = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
];

const PaginationComponent: React.FC<Props> = ({
  pages,
  pagePrevHandler,
  pageNextHandler,
  changeShowByHandler,
  defaultSizeValue,
  onChangePageCheckHandler,
}) => {
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
          handleChange={changeShowByHandler}
        />
      </div>
      <div className={b('num-block')}>
        <p className={b('title')}>{t('table.page')}</p>
        <Form initialValues={{ size: defaultSizeValue }}>
          <FormField
            onChange={onChangePageCheckHandler}
            inputClassName={b('input-style')}
            data-testid='size_id'
            name='size'
          />
        </Form>

        <p className={b('title')}>
          {t('table.from')} {pages?.pages ? pages?.pages : 0}
        </p>
      </div>
      <div>
        <Button
          disabled={(pages?.page ?? 1) <= 1}
          onClick={pagePrevHandler}
          type='primary'
          icon={<img src={chevronLeft} alt='chevronLeft' />}
          style={{ marginRight: 8 }}
        />
        <Button
          disabled={(pages?.page ?? 1) >= (pages?.pages ?? 1)}
          onClick={pageNextHandler}
          type='primary'
          icon={<img src={chevronRight} alt='chevronRight' />}
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
