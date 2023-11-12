import { Button, Form, Row, Tooltip } from 'antd';
import React, { useState } from 'react';
import bem from 'easy-bem';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { add, plus, active, status, x, search, infoCircle, inactive } from '~/assets/images';
import { ActiveInactiveModal, FormField, ModalComponent, TableComponent } from '~/shared/ui';
import { IColumn, IMerchant } from '~/features/merchants/interfaces';
import { merchantStore } from '~/shared/api/store';
import { useTableFilter } from '~/shared/hooks';
import './Merchants.scss';

const Merchants = observer(() => {
  const b = bem('Merchants');
  const { t } = useTranslation();
  const { merchants, merchantPagination, merchantsLoading } = toJS(merchantStore);
  const {
    filters,
    handleSearchChange,
    pagePrevHandler,
    pageNextHandler,
    changeShowByHandler,
    onChangePageCheckHandler,
  } = useTableFilter(merchantStore.fetchMerchants.bind(merchantStore));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDeactivateButton, setIsDeactivateButton] = useState(true);
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const columns: IColumn[] = [
    {
      title: 'ID',
      width: 10,
      dataIndex: 'id',
    },
    {
      title: t('merchants.name'),
      render: (record: IMerchant) => {
        return (
          <Link to={`/merchants/merchant/${record?.id}`} className={b('title crop-text')}>
            {record?.name}
          </Link>
        );
      },
    },
    {
      title: t('merchants.agreement_number'),
      dataIndex: 'agreement_number',
    },
    {
      title: '%',
      dataIndex: 'rate',
    },
    {
      title: t('merchants.contacts'),
      dataIndex: 'phone',
    },
    {
      title: t('merchants.location'),
      render: (record: IMerchant) => {
        return <p className={b('text crop-text')}>{record?.location}</p>;
      },
    },
    {
      title: t('merchants.legal_name'),
      render: (record: IMerchant) => {
        return <p className={b('text crop-text')}>{record?.legal_name}</p>;
      },
    },
    {
      title: t('merchants.status'),
      dataIndex: 'active',
      render: (text: boolean) => {
        return <img className={b('center-block')} src={text ? status : inactive} alt='status' />;
      },
    },
    {
      title: t('merchants.number_of_stations'),
      dataIndex: 'number_stations',
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedStatuses = newSelectedRowKeys.map((key) => {
      const selectedMerchant = merchants?.find((item) => item.id === parseInt(key.toString()));
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
              placeholder={t('merchants.search_among_merchants')}
              size='large'
              prefix={<img src={search} alt='search' />}
              onChange={handleSearchChange}
            />
          </Form>
        </div>
      </Row>
      <Row className={b('table-block')}>
        <Link to='/merchants/create-merchant' className={b('add-block')}>
          <Button className={b('button-style')} type='primary' icon={<img src={add} alt='add' />}>
            {t('merchants.add_merchant')}
          </Button>
        </Link>

        <TableComponent
          rowKey={(record) => record.id.toString()}
          rowSelection={rowSelection}
          loading={merchantsLoading}
          data={merchants || []}
          columns={columns}
          pagePrevHandler={pagePrevHandler}
          pageNextHandler={pageNextHandler}
          changeShowByHandler={changeShowByHandler}
          onChangePageCheckHandler={onChangePageCheckHandler}
          defaultSizeValue={filters?.page}
          pages={merchantPagination}
        />

        {!!selectedRowKeys.length && (
          <div className={b('pagination-block')}>
            <Button
              className={isDeactivateButton ? b('deactivate-button') : b('activate-button')}
              type='default'
              onClick={showModal}
              disabled={isDisabledButton}
            >
              {isDeactivateButton ? t('merchants.deactivate') : t('merchants.activate')} (
              {selectedRowKeys.length})
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
          textTitle={
            isDeactivateButton
              ? (t('merchants.deactivate') as string)
              : (t('merchants.activate') as string)
          }
          infoText={
            isDeactivateButton
              ? (t('merchants.the_merchants_you_select_will_not_be_active') as string)
              : (t('merchants.the_merchants_you_select_will_be_active') as string)
          }
          handleOkCancel={handleOkCancel}
        />
      </ModalComponent>
    </Row>
  );
});

export default Merchants;
