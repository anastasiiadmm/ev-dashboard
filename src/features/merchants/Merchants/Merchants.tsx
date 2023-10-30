import { Button, Form, Row } from 'antd';
import React, { useState } from 'react';
import bem from 'easy-bem';

import { add, plus, active, status, x, search, inactive } from '~/assets/images';
import { FormField, ModalComponent, TableComponent } from '~/shared/ui';
import { IColumn, IMerchant } from '~/features/merchants/interfaces/IMerchant';
import './Merchants.scss';
import { ActiveInactiveModal } from '~/features/merchants';

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
      render: (text) => {
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
        return <Button className={b('add-button')} icon={<img src={plus} alt='plus' />} />;
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
        <Button className={b('button-style')} type='primary' icon={<img src={add} alt='add' />}>
          Добавить мерчанта
        </Button>

        <TableComponent
          rowKey={(record: IMerchant) => record.id.toString()}
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
