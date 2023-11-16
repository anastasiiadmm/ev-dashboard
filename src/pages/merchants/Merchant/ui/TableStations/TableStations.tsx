import { Button, Row, Tooltip } from 'antd';
import bem from 'easy-bem';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx';
import { useParams } from 'react-router';
import { observer } from 'mobx-react-lite';

import { add, inactive, infoCircle, plus, status } from '~/assets/images';
import { IColumn, IStation } from '~/pages/merchants/interfaces';
import { TableCell } from '~/pages/merchants/Merchant/ui';
import { ActiveInactiveModal, ModalComponent, TableComponent } from '~/shared/ui';
import { merchantStore } from '~/shared/api/store';
import { useNotification, useRowSelection, useTableFilter } from '~/shared/hooks';
import './TableStations.scss';

const TableStations = observer(() => {
  const b = bem('TableStations');
  const { t } = useTranslation();
  const { id } = useParams();
  const openNotification = useNotification();
  const { merchantDetailStation, merchantDetailStationPagination, merchantDetailStationLoading } =
    toJS(merchantStore);
  const {
    filters,
    pagePrevHandler,
    pageNextHandler,
    changeShowByHandler,
    onChangePageCheckHandler,
  } = useTableFilter(merchantStore.getMerchantStationsDetail.bind(merchantStore), {
    includeSearch: false,
    additionalParams: { merchant: id },
  });
  const {
    selectedRowKeys,
    onSelectChange,
    isDeactivateButton,
    isDisabledButton,
    applyChangeStatus,
  } = useRowSelection(
    merchantDetailStation || [],
    merchantStore.changeMerchantsStatuses.bind(merchantStore),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAgreeHandler = async () => {
    try {
      await applyChangeStatus();
    } catch (e) {
      if (e instanceof Error) {
        openNotification('error', '', e.message);
      } else {
        console.error('Unexpected error type:', e);
      }
    }
  };

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
      width: 130,
      render: (record: IStation) => {
        return <p className={b('text crop-text')}>{record?.location}</p>;
      },
    },
    {
      title: t('merchants.schedule'),
      width: 120,
      render: (record: IStation) => {
        const days = record.schedule;
        return (
          <p className={b('text crop-text')}>
            {days?.[0]?.open}
            <br />
            {t('merchants.day_off')}
          </p>
        );
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOkCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Row justify='space-between' data-testid='auth-component' className={b()}>
      <Row className={b('table-block')}>
        <Link to={`/merchants/merchant/${id}/create-station`} className={b('add-block')}>
          <Button className={b('button-style')} type='primary' icon={<img src={add} alt='add' />}>
            {t('merchants.add_station')}
          </Button>
        </Link>

        <TableComponent
          rowKey={(record) => record.id.toString()}
          rowSelection={rowSelection}
          loading={merchantDetailStationLoading}
          data={merchantDetailStation || []}
          columns={columns}
          pagePrevHandler={pagePrevHandler}
          pageNextHandler={pageNextHandler}
          changeShowByHandler={changeShowByHandler}
          onChangePageCheckHandler={onChangePageCheckHandler}
          defaultSizeValue={filters?.page}
          pages={merchantDetailStationPagination}
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
            loadingStatus={false}
            handleAgreeHandler={handleAgreeHandler}
          />
        </ModalComponent>
      </Row>
    </Row>
  );
});

export default TableStations;
