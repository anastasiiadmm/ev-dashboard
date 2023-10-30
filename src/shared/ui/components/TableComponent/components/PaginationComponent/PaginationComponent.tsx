import React from 'react';
import bem from 'easy-bem';
import { Button, Form } from 'antd';

import { chevronRight, chevronLeft } from '~/assets/images/index';
import { FormField } from '~/shared/ui/components';
import { IPagination } from '~/shared/types/interfaces/IPagination';
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

  return (
    <div className={b('')}>
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <p className={b('title')}>Показывать по</p>{' '}
        <FormField
          customStyle={{ width: 65 }}
          data-testid='select_id'
          type='select'
          defaultValue={10}
          options={options}
        />
      </div>
      <div className={b('num-block')}>
        <p className={b('title')}>Стр.</p>
        <Form initialValues={{ input: 1 }}>
          <FormField inputClassName={b('input-style')} data-testid='input_id' name='input' />
        </Form>

        <p className={b('title')}>из {params?.count ? params?.count : 0}</p>
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
