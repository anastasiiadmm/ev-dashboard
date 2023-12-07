import { Button, Divider } from 'antd';
import bem from 'easy-bem';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IInfrastructure } from '~/pages/infrastructure/interfaces';
import { IColumn } from '~/pages/merchants/interfaces';
import { infrastructureStore } from '~/shared/api/store';
import { useTableFilter } from '~/shared/hooks';
import { TableComponent } from '~/shared/ui';
import { apiImageURL } from '~/shared/utils/config.ts';

import './InfrastructureModal.scss';

interface Props {
  language: string;
}

const InfrastructureModal: React.FC<Props> = observer(({ language }) => {
  const b = bem('InfrastructureModal');
  const { t } = useTranslation();
  const { infrastructure, infrastructurePagination, infrastructureLoading } =
    toJS(infrastructureStore);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const {
    filters,
    pagePrevHandler,
    pageNextHandler,
    changeShowByHandler,
    onChangePageCheckHandler,
  } = useTableFilter(infrastructureStore.fetchInfrastructure.bind(infrastructureStore));
  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const renderName = (infrastructure: IInfrastructure) => {
    switch (language) {
      case 'ky':
        return infrastructure?.title_ky;
      case 'en':
        return infrastructure?.title_en;
      default:
        return infrastructure?.title_ru;
    }
  };

  const columns: IColumn[] = [
    {
      title: t('merchants.infrastructure'),
      render: (record: IInfrastructure) => {
        return (
          <div className={b('infrastructure-block')}>
            <div className={b('infrastructure')}>
              <img
                src={apiImageURL + record?.icon_path.replace('/app', '')}
                className={b('icon-infrastructure')}
                alt='icon'
              />
              {renderName(record)}
            </div>
            <div className={b('text-language')}>
              {record?.title_ky && 'KG'} <Divider type='vertical' />
              {record?.title_ru && 'RU'} <Divider type='vertical' />
              {record?.title_en && 'ENG'}
            </div>
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
    <div className={b()}>
      <div className={b('table-container')}>
        <TableComponent
          rowKey={(record) => record.id.toString()}
          rowSelection={rowSelection}
          loading={infrastructureLoading}
          data={infrastructure || []}
          columns={columns}
          scroll={{ x: 0 }}
          pagePrevHandler={pagePrevHandler}
          pageNextHandler={pageNextHandler}
          changeShowByHandler={changeShowByHandler}
          onChangePageCheckHandler={onChangePageCheckHandler}
          defaultSizeValue={filters?.page}
          pages={infrastructurePagination}
          notGrayRow
        />
      </div>
      <Button
        className={b('save-infrastructure')}
        type='primary'
        onClick={() => console.log('[ВЫБРАТЬ]')}
        disabled={!selectedRowKeys.length}
      >
        {t('merchants.choose')}
      </Button>
    </div>
  );
});

export default InfrastructureModal;
