import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import bem from 'easy-bem';
import { toJS } from 'mobx';
import { Button, Form, Row, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';

import { useModal, useNotification, useTableFilter } from '~/shared/hooks';
import { IColumn } from '~/pages/merchants/interfaces';
import { add, deleteIcon, editColor, inactive, infoCircle, search, status } from '~/assets/images';
import { IInfrastructure } from '~/pages/infrastructure/interfaces';
import { infrastructureStore } from '~/shared/api/store';
import { ActiveInactiveModal, FormField, ModalComponent, TableComponent } from '~/shared/ui';
import { apiImageURL } from '~/shared/utils/config';
import { CreateEditInfrastructureModal } from '~/pages/infrastructure';
import { getParams } from '~/shared/utils';
import './InfrastructureList.scss';

const InfrastructureList = observer(() => {
  const b = bem('InfrastructureList');
  const { t } = useTranslation();
  const openNotification = useNotification();
  const {
    infrastructure,
    infrastructurePagination,
    infrastructureLoading,
    deleteInfrastructureLoading,
    infrastructureCreateLoading,
  } = toJS(infrastructureStore);
  const {
    filters,
    handleSearchChange,
    pagePrevHandler,
    pageNextHandler,
    changeShowByHandler,
    onChangePageCheckHandler,
  } = useTableFilter(infrastructureStore.fetchInfrastructure.bind(infrastructureStore));
  const [selectedRowKey, setSelectedRowKey] = useState<number | null>(null);
  const [selectedInfrastructure, setSelectedInfrastructure] = useState<IInfrastructure | null>(
    null,
  );
  const [creating, setCreating] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const {
    isModalOpen: isModalDeleteOpen,
    showModal: showDeleteModal,
    handleOkCancel: handleDeleteOkCancel,
  } = useModal(false);
  const {
    isModalOpen: isInfrastructureModalOpen,
    showModal: showInfrastructureModal,
    handleOkCancel: handleInfrastructureOkCancel,
  } = useModal(false);

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleAgreeDeleteInfrastructureHandler = async () => {
    try {
      await infrastructureStore.deleteInfrastructure(selectedRowKey, getParams({ page: 1 }));
      handleDeleteOkCancel();
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
      title: '№',
      width: 10,
      dataIndex: 'id',
    },
    {
      title: t('infrastructure.naming') + ' KG',
      render: (record: IInfrastructure) => {
        return (
          <div className={b('infrastructure')}>
            <img
              src={apiImageURL + record?.icon_path.replace('/app', '')}
              className={b('icon-infrastructure')}
              alt='icon'
            />
            {record?.title_ky}
          </div>
        );
      },
    },
    {
      title: t('infrastructure.naming') + ' RU',
      render: (record: IInfrastructure) => {
        return (
          <div className={b('infrastructure')}>
            <img
              src={apiImageURL + record?.icon_path.replace('/app', '')}
              className={b('icon-infrastructure')}
              alt='icon'
            />
            {record?.title_ru}
          </div>
        );
      },
    },
    {
      title: t('infrastructure.naming') + ' ENG',
      render: (record: IInfrastructure) => {
        return (
          <div className={b('infrastructure')}>
            <img
              src={apiImageURL + record?.icon_path}
              className={b('icon-infrastructure')}
              alt='icon'
            />
            {record?.title_en}
          </div>
        );
      },
    },
    {
      title: t('merchants.status'),
      dataIndex: 'active',
      render: (text: boolean) => {
        return <img style={{ marginLeft: 10 }} src={text ? status : inactive} alt='status' />;
      },
    },
    {
      title: t('merchants.action'),
      render: (record: IInfrastructure) => {
        return (
          <div className={b('tags-block')}>
            <Tooltip
              color='#707A94'
              placement='left'
              title={
                <div className={b('info')}>
                  <img src={infoCircle} alt='infoCircle' />
                  <p>{t('tags.edit_tag')}</p>
                </div>
              }
            >
              <Button
                onClick={() => {
                  showInfrastructureModal();
                  setSelectedInfrastructure(record);
                }}
                className={b('add-button')}
                icon={<img src={editColor} alt='plus' />}
              />
            </Tooltip>
            <Tooltip
              color='#707A94'
              placement='left'
              title={
                <div className={b('info')}>
                  <img src={infoCircle} alt='infoCircle' />
                  <p>{t('tags.delete_tag')}</p>
                </div>
              }
            >
              <Button
                onClick={() => {
                  showDeleteModal();
                  setSelectedRowKey(record.id);
                }}
                className={b('delete-button')}
                icon={<img src={deleteIcon} alt='plus' />}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ] as IColumn[];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Row justify='space-between' data-testid='infrastructure-component' className={b()}>
      <Row className={b('search-pagination-block')}>
        <div>
          <Form>
            <FormField
              style={{ width: 300 }}
              id='autocomplete_id'
              placeholder={t('infrastructure.search')}
              size='large'
              prefix={<img src={search} alt='search' />}
              onChange={handleSearchChange}
            />
          </Form>
        </div>
      </Row>

      <Row className={b('table-block')}>
        <Button
          className={b('button-style')}
          type='primary'
          icon={<img src={add} alt='add' />}
          onClick={() => {
            showInfrastructureModal();
            setCreating(true);
          }}
        >
          {t('infrastructure.add_infrastructure')}
        </Button>

        <TableComponent
          rowKey={(record) => record.id.toString()}
          rowSelection={rowSelection}
          loading={infrastructureLoading}
          data={infrastructure || []}
          columns={columns}
          pagePrevHandler={pagePrevHandler}
          pageNextHandler={pageNextHandler}
          changeShowByHandler={changeShowByHandler}
          onChangePageCheckHandler={onChangePageCheckHandler}
          defaultSizeValue={filters?.page}
          pages={infrastructurePagination}
          pagination
        />
      </Row>

      <ModalComponent
        closeIcon
        width={420}
        isModalOpen={isInfrastructureModalOpen}
        handleOk={handleInfrastructureOkCancel}
        handleCancel={() => {
          handleInfrastructureOkCancel();
          setCreating(false);
        }}
      >
        <CreateEditInfrastructureModal
          textTitle={
            creating
              ? (t('infrastructure.creating_infrastructure') as string)
              : (t('infrastructure.editing_an_infrastructure') as string)
          }
          setCreating={setCreating}
          handleTagOkCancel={handleInfrastructureOkCancel}
          creating={creating}
          selectedInfrastructure={selectedInfrastructure}
          loading={infrastructureCreateLoading}
        />
      </ModalComponent>

      <ModalComponent
        width={311}
        isModalOpen={isModalDeleteOpen}
        handleOk={handleDeleteOkCancel}
        handleCancel={handleDeleteOkCancel}
      >
        <ActiveInactiveModal
          textTitle={t('infrastructure.are_you_sure_you_want_to_delete') as string}
          infoText={t('infrastructure.if_you_delete_it_you_won_t_be_able_to_restore') as string}
          handleOkCancel={handleDeleteOkCancel}
          loadingStatus={deleteInfrastructureLoading}
          handleAgreeHandler={handleAgreeDeleteInfrastructureHandler}
        />
      </ModalComponent>
    </Row>
  );
});

export default InfrastructureList;
