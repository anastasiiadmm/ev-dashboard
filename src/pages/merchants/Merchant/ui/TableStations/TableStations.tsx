import { Button, Row, Tooltip } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import bem from 'easy-bem';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { add, inactive, infoCircle, plus, status } from '~/assets/images';
import { IColumn, IStation } from '~/pages/merchants/interfaces';
import { TableCell } from '~/pages/merchants/Merchant/ui';
import { ActiveInactiveModal, ModalComponent, TableComponent } from '~/shared/ui';
import './TableStations.scss';

const TableStations = () => {
  const b = bem('TableStations');
  const { t } = useTranslation();
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
      title: t('merchants.name'),
      render: (record: IStation) => {
        return (
          <Link to={`/merchants/merchant/${record?.id}`} className={b('title crop-text')}>
            {record?.name}
          </Link>
        );
      },
    },
    {
      title: t('merchants.location'),
      render: (record: IStation) => {
        return <p className={b('text crop-text')}>{record?.location}</p>;
      },
    },
    {
      title: t('merchants.schedule'),
      width: 120,
      render: (record: IStation) => {
        let schedule: string = t('merchants.not_a_standard_work_schedule') as string;
        const days = record.schedule;
        const areNumbersNotInOrder = (arr: number[]) => {
          return arr.every((value, index, array) => index === 0 || value === array[index - 1] + 1);
        };
        if (days.length && days.length === 1 && areNumbersNotInOrder(days[0].days)) {
          const week: number[] = [0, 1, 2, 3, 4, 5, 6];
          const date = week.slice(1);
          date.splice(week.length, 0, 0);
          const weekend: number[] = date.filter(
            (element: number) => !days[0].days.includes(element),
          );
          const formattedDays: string[] = weekend.map((day: number) =>
            dayjs().day(day).format('dd'),
          );
          schedule = `${days[0].open} выходной: ${formattedDays.join(' - ')}`;
        }
        return <p className={b('text crop-text')}>{schedule}</p>;
      },
    },
    {
      title: t('merchants.status'),
      dataIndex: 'status',
      render: (text: number) => {
        return <img className={b('center-block')} src={!text ? status : inactive} alt='status' />;
      },
    },
    {
      title: t('merchants.connectors'),
      render: (record: IStation) => {
        const connectors = record.connectors.join(', ');
        return <p className={b('text crop-text')}>{connectors}</p>;
      },
    },
    {
      title: t('merchants.tags'),
      width: 170,
      render: (record: IStation) => <TableCell data={record.tags} />,
    },
    {
      title: t('merchants.infrastructure'),
      width: 180,
      render: (record: IStation) => <TableCell data={record.surroundings} />,
    },
    {
      title: t('merchants.action'),
      render: () => {
        return (
          <Tooltip
            color='#707A94'
            placement='left'
            title={
              <div className={b('info')}>
                <img src={infoCircle} alt='infoCircle' />
                <p>{t('merchants.add_station')}</p>
              </div>
            }
          >
            <Button className={b('add-button')} icon={<img src={plus} alt='plus' />} />
          </Tooltip>
        );
      },
    },
  ] as IColumn[];

  const data: IStation[] = [
    {
      id: 1,
      name: 'Наименование длинное станции Ким',
      location: 'Кыргызстан, Бишкек, название длинное',
      schedule: [
        {
          days: [1, 2, 3, 4, 5],
          open: '09:00 - 23:00',
          breaks: ['12:00 - 13:00'],
        },
      ],
      status: 0,
      connectors: ['Tesla', 'CCS'],
      tags: [
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
      ],
      surroundings: [
        'Кафе',
        'школа',
        'Кафе',
        'школа',
        'Кафе',
        'школа',
        'Кафе',
        'школа',
        'Кафе',
        'школа',
      ],
    },
    {
      id: 2,
      name: 'Наименование длинное станции Ким',
      location: 'Кыргызстан, Бишкек, название длинное',
      schedule: [
        {
          days: [1, 2, 3],
          open: '09:00 - 23:00',
          breaks: ['12:00 - 13:00'],
        },
        {
          days: [4, 5, 6],
          open: '11:00 - 23:00',
          breaks: ['12:00 - 13:00'],
        },
        {
          days: [0],
          open: '13:00 - 20:00',
          breaks: ['15:00 - 16:00'],
        },
      ],
      status: 1,
      connectors: ['Tesla', 'CCS'],
      tags: [
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
      ],
      surroundings: [
        'Кафе',
        'школа',
        'Кафе',
        'школа',
        'Кафе',
        'школа',
        'Кафе',
        'школа',
        'Кафе',
        'школа',
      ],
    },
    {
      id: 3,
      name: 'Наименование длинное станции Ким',
      location: 'Кыргызстан, Бишкек, название длинное',
      schedule: [
        {
          days: [1, 2, 3, 4, 5, 6],
          open: '06:00 - 23:00',
          breaks: ['12:00 - 13:00'],
        },
      ],
      status: 0,
      connectors: ['Tesla', 'CCS'],
      tags: [
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
        '#Быстрая',
      ],
      surroundings: [
        'Кафе',
        'школа',
        'Кафе',
        'школа',
        'Кафе',
        'школа',
        'Кафе',
        'школа',
        'Кафе',
        'школа',
      ],
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
      return selectedMerchant ? selectedMerchant?.status : 1;
    });
    const hasActiveTrue = selectedStatuses.includes(0);
    const hasActiveFalse = selectedStatuses.includes(1);
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
      <Row className={b('table-block')}>
        <Link to='/merchants' className={b('add-block')}>
          <Button className={b('button-style')} type='primary' icon={<img src={add} alt='add' />}>
            {t('merchants.add_station')}
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
              {isDeactivateButton
                ? (t('merchants.deactivate') as string)
                : (t('merchants.activate') as string)}{' '}
              ({selectedRowKeys.length})
            </Button>
          </div>
        )}

        <ModalComponent
          width={311}
          isModalOpen={isModalOpen}
          handleOk={handleOkCancel}
          handleCancel={handleOkCancel}
        >
          <ActiveInactiveModal
            textTitle={
              isDeactivateButton
                ? (t('merchants.deactivate') as string)
                : (t('merchants.activate') as string)
            }
            infoText={
              isDeactivateButton
                ? (t('merchants.the_stations_you_selected_will_not_be_active') as string)
                : (t('merchants.the_stations_you_selected_will_not_active') as string)
            }
            handleOkCancel={handleOkCancel}
          />
        </ModalComponent>
      </Row>
    </Row>
  );
};

export default TableStations;
