import { Button, Form, Row, Tooltip } from 'antd';
import React from 'react';
import bem from 'easy-bem';

import { add, plus, active, status, x, search, informationCircle } from '~/assets/images';
import { FormField, TableComponent } from '~/shared/ui/components';
import { IColumn, IMerchant } from '~/features/merchants/interfaces/IMerchant';
import './Merchants.scss';

const Merchants = () => {
  const b = bem('Merchants');

  const columns: IColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Наименование',
      dataIndex: 'name_ru',
      render: (text) => {
        return <p className={b('title crop-text')}>{text}</p>;
      },
    },
    {
      title: '№ договора',
      dataIndex: 'legal_name_ru',
    },
    {
      title: '%',
      dataIndex: 'rate',
    },
    {
      title: 'Контакты',
      dataIndex: 'phone',
    },
    {
      title: 'Локация',
      dataIndex: 'address_ru',
      render: (text) => {
        return <p className={b('text crop-text')}>{text}</p>;
      },
    },
    {
      title: 'Юр лицо',
      dataIndex: 'entity',
      render: (text) => {
        return <p className={b('text crop-text')}>{text}</p>;
      },
    },
    {
      title: 'Статус',
      dataIndex: 'active',
      render: () => {
        return <img className={b('center-block')} src={status} alt='status' />;
      },
    },
    {
      title: 'Кол-во станций',
      dataIndex: 'number_stations',
      width: 30,
    },
    {
      title: <img src={active} alt='active' />,
      dataIndex: 'active_stations',
    },
    {
      title: <img src={x} alt='x' />,
      dataIndex: 'inactive_stations',
    },
    {
      title: 'Действие',
      render: () => {
        return (
          <Tooltip
            placement='left'
            title={
              <p className={b('tooltip-style')}>
                <img src={informationCircle} alt='informationCircle' /> Добавить станцию
              </p>
            }
          >
            <Button className={b('add-button')} icon={<img src={plus} alt='plus' />} />
          </Tooltip>
        );
      },
    },
  ] as IColumn[];

  const data: IMerchant[] = [
    {
      id: 1,
      name_ru: 'Длинное наименование станции',
      legal_name_ru: 'W16/06/2023',
      rate: '15',
      phone: '+996 999 444 444',
      address_ru: 'Кыргызстан, Бишкек, название длинное',
      number_stations: 42,
      active_stations: 32,
      inactive_stations: 0,
      agreement_number: '15',
      entity: 'Длинное название юридического лица',
      active: true,
      country: 0,
      district: 0,
      city: 0,
    },
    {
      id: 2,
      name_ru: 'Длинное наименование станции',
      legal_name_ru: 'W16/06/2023',
      rate: '15',
      phone: '+996 999 444 444',
      address_ru: 'Кыргызстан, Бишкек, название длинное',
      number_stations: 42,
      active_stations: 32,
      inactive_stations: 0,
      agreement_number: '15',
      entity: 'Длинное название юридического лица',
      active: true,
      country: 0,
      district: 0,
      city: 0,
    },
    {
      id: 3,
      name_ru: 'Длинное наименование станции',
      legal_name_ru: 'W16/06/2023',
      rate: '15',
      phone: '+996 999 444 444',
      address_ru: 'Кыргызстан, Бишкек, название длинное',
      number_stations: 42,
      active_stations: 32,
      inactive_stations: 0,
      agreement_number: '15',
      entity: 'Длинное название юридического лица',
      active: true,
      country: 0,
      district: 0,
      city: 0,
    },
  ];

  const pagePrevHandler = () => {};
  const pageNextHandler = () => {};

  return (
    <Row justify='space-between' data-testid='auth-component' className={b()}>
      <Row className={b('search-pagination-block')}>
        <div>
          <Form>
            <FormField
              style={{ width: 300 }}
              id='autocomplete_id'
              placeholder='Искать среди мерчантов'
              size='large'
              prefix={<img src={search} alt='search' />}
            />
          </Form>
        </div>
      </Row>
      <Row className={b('table-block')}>
        <Button className={b('button-style')} type='primary' icon={<img src={add} alt='add' />}>
          Добавить мерчанта
        </Button>

        <TableComponent
          rowKey={(record: IMerchant) => record.id.toString()}
          loading={false}
          data={data}
          columns={columns}
          pagePrevHandler={pagePrevHandler}
          pageNextHandler={pageNextHandler}
        />

        <div className={b('pagination-block')}>
          <Button className={b('deactivate-button')} type='default'>
            Деактивировать (3)
          </Button>
        </div>
      </Row>
    </Row>
  );
};

export default Merchants;
