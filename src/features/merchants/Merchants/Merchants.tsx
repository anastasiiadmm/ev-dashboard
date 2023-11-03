import { Button, Form, Row, Tooltip } from 'antd';
import React, { useState } from 'react';
import bem from 'easy-bem';
import { Link } from 'react-router-dom';

import { add, plus, active, status, x, search, infoCircle, inactive } from '~/assets/images';
import { FormField, ModalComponent, TableComponent } from '~/shared/ui';
import { IColumn, IMerchant } from '~/features/merchants/interfaces';
import { ActiveInactiveModal } from '~/features/merchants';
import './Merchants.scss';

const Merchants = () => {
  const b = bem('Merchants');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDeactivateButton, setIsDeactivateButton] = useState(true);
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const columns: IColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Наименование',
      render: (record: IMerchant) => {
        return (
          <Link to={`/merchants/merchant/${record?.id}`} className={b('title crop-text')}>
            {record?.name_ru}
          </Link>
        );
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
      render: (record: IMerchant) => {
        return <p className={b('text crop-text')}>{record?.address_ru}</p>;
      },
    },
    {
      title: 'Юр лицо',
      render: (record: IMerchant) => {
        return <p className={b('text crop-text')}>{record?.entity}</p>;
      },
    },
    {
      title: 'Статус',
      dataIndex: 'active',
      render: (text: boolean) => {
        return <img className={b('center-block')} src={text ? status : inactive} alt='status' />;
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
      active: false,
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOkCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedStatuses = newSelectedRowKeys.map((key) => {
      const selectedMerchant = data.find((item) => item.id === parseInt(key.toString()));
      return selectedMerchant ? selectedMerchant.active : false;
    });
    const hasActiveTrue = selectedStatuses.includes(true);
    const hasActiveFalse = selectedStatuses.includes(false);
    const hasMixedStatus = hasActiveTrue && hasActiveFalse;
    setIsDeactivateButton(hasActiveTrue && !hasActiveFalse);
    setIsDisabledButton(hasMixedStatus);
  };

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
        <Link to='/merchants/create-merchant' className={b('add-block')}>
          <Button className={b('button-style')} type='primary' icon={<img src={add} alt='add' />}>
            Добавить мерчанта
          </Button>
        </Link>

        <TableComponent
          rowKey={(record) => record.id.toString()}
          rowSelection={rowSelection}
          loading={false}
          data={data}
          columns={columns}
          pagePrevHandler={pagePrevHandler}
          pageNextHandler={pageNextHandler}
        />

        {!!selectedRowKeys.length && (
          <div className={b('pagination-block')}>
            <Button
              className={isDeactivateButton ? b('deactivate-button') : b('activate-button')}
              type='default'
              onClick={showModal}
              disabled={isDisabledButton}
            >
              {isDeactivateButton ? 'Деактивировать' : 'Активировать'} ({selectedRowKeys.length})
            </Button>
          </div>
        )}
      </Row>

      <ModalComponent
        width={311}
        isModalOpen={isModalOpen}
        handleOk={handleOkCancel}
        handleCancel={handleOkCancel}
      >
        <ActiveInactiveModal
          textTitle={isDeactivateButton ? 'Деактивировать' : 'Активировать'}
          infoText={
            isDeactivateButton
              ? 'Выбранные Вами мерчанты будут не активны.'
              : 'Выбранные Вами мерчанты будут активны.'
          }
          handleOkCancel={handleOkCancel}
        />
      </ModalComponent>
    </Row>
  );
};

export default Merchants;
