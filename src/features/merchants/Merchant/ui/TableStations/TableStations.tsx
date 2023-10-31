import React from 'react';
import bem from 'easy-bem';
import { IColumn, IMerchant } from '~/features/merchants/interfaces';
import { Link } from 'react-router-dom';
import { active, add, infoCircle, plus, status, x } from '~/assets/images';
import { Button, Row, Tooltip } from 'antd';
import { TableComponent } from '~/shared/ui/components';

const TableStations = () => {
  const b = bem('TableStations');

  const columns: IColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Наименование',
      render: (record) => {
        return <Link to={`/merchants/merchant/${record?.id}`} className={b('title crop-text')}>{record?.name_ru}</Link>;
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
      render: (record) => {
        return <p className={b('text crop-text')}>{record?.address_ru}</p>;
      },
    },
    {
      title: 'Юр лицо',
      render: (record) => {
        return <p className={b('text crop-text')}>{record?.entity}</p>;
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
            color='#707A94'
            placement='left'
            title={
              <div className={b('info')}>
                <img src={infoCircle} alt='infoCircle' />
                <p>Добавить станцию</p>
              </div>
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
    <Row className={b('table-block')}>
      <Link to='/merchants/create-merchant' className={b('add-block')}>
        <Button className={b('button-style')} type='primary' icon={<img src={add} alt='add' />}>
          Добавить мерчанта
        </Button>
      </Link>

      <TableComponent
        rowKey={(record: IMerchant) => record.id.toString()}
        loading={false}
        data={data}
        columns={columns}
        pagePrevHandler={pagePrevHandler}
        pageNextHandler={pageNextHandler}
      />
    </Row>
  );
};

export default TableStations;
