import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import bem from 'easy-bem';
import { DatePicker, Form, Row, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { FormField, NotFoundImages, TableComponent } from '~/shared/ui';
import {
  calendarIcon,
  car,
  carpoolDriver,
  inactive,
  informationCircleGray,
  licence,
  licenceInactive,
  search,
  status,
} from '~/assets/images';
import { IColumn } from '~/pages/merchants/interfaces';
import { IUser } from '~/pages/users/interfaces';
import './Users.scss';

const { Text } = Typography;

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
  const [selectedRowKeys] = useState<React.Key[]>([]);

  const users: IUser[] = [
    {
      id: 1,
      personal_account: '117878',
      name: 'Musk Jonny',
      gender: 'М',
      birthday: '04.02.1999',
      age: 24,
      registration_date: '17.07.2023 14-00',
      phone_number: '+996771321414',
      email: 'jonnyloocy@gmail.com',
      car: [
        {
          brand: 'Tesla',
          model: 'Model X',
          color: 'Синий',
          year: 2022,
        },
      ],
      balance: '257700',
      active: true,
      licence: true,
    },
    {
      id: 2,
      personal_account: '117878',
      name: 'Musk Jonny',
      gender: 'М',
      birthday: '04.02.1999',
      age: 24,
      registration_date: '17.07.2023 14-00',
      phone_number: '+996771321414',
      email: 'jonnyloocy@gmail.com',
      car: [
        {
          brand: 'Tesla',
          model: 'Model X',
          color: 'Синий',
          year: 2022,
        },
      ],
      balance: '257700',
      active: false,
      licence: true,
    },
    {
      id: 3,
      personal_account: '117878',
      name: 'Musk Jonny',
      gender: 'М',
      birthday: '04.02.1999',
      age: 24,
      registration_date: '17.07.2023 14-00',
      phone_number: '+996771321414',
      email: 'jonnyloocy@gmail.com',
      car: [
        {
          brand: 'Tesla',
          model: 'Model X',
          color: 'Синий',
          year: 2022,
        },
        {
          brand: 'Tesla',
          model: 'Model X',
          color: 'Синий',
          year: 2022,
        },
      ],
      balance: '257700',
      active: true,
      licence: false,
    },
  ];

  const columns: IColumn[] = [
    {
      title: t('users.personal_account'),
      width: 10,
      dataIndex: 'personal_account',
    },
    {
      title: t('users.name'),
      width: 140,
      render: (record: IUser) => {
        return (
          <Link to={`/users/user/${record?.id as number}`} className={b('title')}>
            {record?.name}
          </Link>
        );
      },
      dataIndex: 'name',
    },
    {
      title: t('users.gender'),
      dataIndex: 'gender',
    },
    {
      title: t('users.birthday'),
      dataIndex: 'birthday',
    },
    {
      title: t('users.age'),
      dataIndex: 'age',
    },
    {
      title: t('users.registration_date'),
      dataIndex: 'registration_date',
    },
    {
      title: t('users.phone_number'),
      dataIndex: 'phone_number',
    },
    {
      title: t('users.phone_number'),
      dataIndex: 'registration_date',
    },
    {
      title: t('users.email'),
      dataIndex: 'email',
    },
    {
      title: t('users.car'),
      render: (record: IUser) => {
        return (
          <Tooltip
            color='#fff'
            placement='left'
            title={
              <div>
                {record?.car?.map((car) => {
                  return (
                    <div className={b('car-info-tooltip')} key={car?.model}>
                      <img src={informationCircleGray} alt='infoCircle' />
                      <div className={b('tooltip-text')}>
                        <Text>Марка машины</Text>
                        <Text type='secondary' style={{ marginBottom: 3 }}>
                          {car?.brand}
                        </Text>
                        <Text>Модель</Text>
                        <Text type='secondary' style={{ marginBottom: 3 }}>
                          {car?.model}
                        </Text>
                        <Text>Год</Text>
                        <Text type='secondary' style={{ marginBottom: 3 }}>
                          {car?.year}
                        </Text>
                        <Text>Цвет</Text>
                        <Text type='secondary' style={{ marginBottom: 3 }}>
                          {car?.color}
                        </Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            }
          >
            <img src={car} alt='car' />
          </Tooltip>
        );
      },
      dataIndex: 'car',
    },
    {
      title: t('users.balance'),
      dataIndex: 'balance',
    },
    {
      title: t('merchants.status'),
      dataIndex: 'active',
      render: (text: boolean) => {
        return <img className={b('center-block')} src={text ? status : inactive} alt='status' />;
      },
    },
    {
      title: t('users.licence'),
      dataIndex: 'licence',
      render: (text: boolean) => {
        return (
          <img className={b('center-block')} src={text ? licence : licenceInactive} alt='status' />
        );
      },
    },
  ] as IColumn[];

  const onSelectChange = () => {};

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

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
            <Form
              initialValues={{
                id: 6,
                name: 'Скачать',
              }}
            >
              <FormField
                customStyle={{ width: 192 }}
                className={b('button-select')}
                type='select'
                options={filesExt}
                name='name'
              />
            </Form>
          </div>
        </div>
      </Row>
      <Row className={b('table-block')}>
        {!users?.length ? (
          <NotFoundImages
            customImage={carpoolDriver}
            description={t('users.you_don_t_have_any_users_yet') as string}
          />
        ) : (
          <TableComponent
            rowKey={(record) => record.id.toString()}
            loading={false}
            data={users}
            columns={columns}
            pages={null}
            pagination
            rowSelection={rowSelection}
          />
        )}
      </Row>
    </Row>
  );
};

export default Users;
