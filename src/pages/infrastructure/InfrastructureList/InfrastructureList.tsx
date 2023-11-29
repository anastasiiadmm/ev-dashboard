import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import bem from 'easy-bem';
import { toJS } from 'mobx';
import { Button, Form, Row, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useTableFilter } from '~/shared/hooks';
import { IColumn } from '~/pages/merchants/interfaces';
import { add, deleteIcon, editColor, inactive, infoCircle, search, status } from '~/assets/images';
import { IInfrastructure } from '~/pages/infrastructure/interfaces';
import { infrastructureStore } from '~/shared/api/store';
import { FormField, TableComponent } from '~/shared/ui';
import { apiImageURL } from '~/shared/utils/config';
import './InfrastructureList.scss';

const InfrastructureList = observer(() => {
  const b = bem('InfrastructureList');
  const { t } = useTranslation();
  const { infrastructure, infrastructurePagination, infrastructureLoading } =
    toJS(infrastructureStore);
  const {
    filters,
    handleSearchChange,
    pagePrevHandler,
    pageNextHandler,
    changeShowByHandler,
    onChangePageCheckHandler,
  } = useTableFilter(infrastructureStore.fetchInfrastructure.bind(infrastructureStore));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
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
              src={apiImageURL + record?.icon_path.replace('/app', '')}
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
        return <img className={b('center-block')} src={text ? status : inactive} alt='status' />;
      },
    },
    {
      title: t('merchants.action'),
      render: () => {
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
              <Button className={b('add-button')} icon={<img src={editColor} alt='plus' />} />
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
              <Button className={b('delete-button')} icon={<img src={deleteIcon} alt='plus' />} />
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
        <Link to='/infrastructure/create-infrastructure' className={b('add-block')}>
          <Button className={b('button-style')} type='primary' icon={<img src={add} alt='add' />}>
            {t('infrastructure.add_infrastructure')}
          </Button>
        </Link>

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
        />
      </Row>
    </Row>
  );
});

export default InfrastructureList;
