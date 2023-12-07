import React from 'react';
import { useTranslation } from 'react-i18next';
import bem from 'easy-bem';
import { DatePicker, Form, Row } from 'antd';

import { FormField } from '~/shared/ui';
import { calendarIcon, search } from '~/assets/images';
import './Users.scss';

const filesExt = [
  {
    id: 1,
    name: 'xlsx',
  },
  {
    id: 3,
    name: 'csv',
  },
];

const Users = () => {
  const b = bem('Users');
  const { t } = useTranslation();

  return (
    <Row justify='space-between' data-testid='auth-component' className={b()}>
      <Row className={b('search-pagination-block')}>
        <div>
          <Form>
            <FormField
              className={b('search-input')}
              style={{ width: 300 }}
              id='autocomplete_id'
              placeholder={t('tags.search_by')}
              size='large'
              prefix={<img src={search} alt='search' />}
              // onChange={handleSearchChange} добавлю когда буду подключать api
            />
          </Form>
        </div>
        <div className={b('filters-block')}>
          <Form layout='vertical' size='middle' className={b('form-styles')}>
            <div className={b('container-picker')}>
              <div>
                <Form.Item label={t('users.period')}>
                  <DatePicker
                    suffixIcon
                    className={b('datepicker')}
                    id='start_date_id'
                    name='start_date'
                    placeholder='yyyy-mm-dd'
                    data-testid='start_date_id'
                  />
                  <label htmlFor='start_date_id'>
                    <img src={calendarIcon} alt='calendaricon' />
                  </label>
                </Form.Item>
                <Form.Item style={{ marginTop: 30 }}>
                  <DatePicker
                    suffixIcon
                    className={b('datepicker')}
                    id='start_date_id'
                    name='start_date'
                    placeholder='yyyy-mm-dd'
                    data-testid='start_date_id'
                  />
                  <label htmlFor='start_date_id'>
                    <img src={calendarIcon} alt='calendaricon' />
                  </label>
                </Form.Item>
              </div>
            </div>
            <FormField
              style={{ width: 190 }}
              placeholder={t('users.personal_account')}
              label={t('users.personal_account')}
            />
            <FormField
              type='phone'
              style={{ width: 190 }}
              placeholder={t('users.phone')}
              label={t('users.phone')}
            />
          </Form>
          <div>
            <FormField
              customStyle={{ width: 192 }}
              className={b('button-select')}
              type='select'
              defaultValue={'Скачать'}
              options={filesExt}
              name='position'
            />
          </div>
        </div>
      </Row>
    </Row>
  );
};

export default Users;
