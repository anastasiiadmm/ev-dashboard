import React from 'react';
import { Table } from 'antd';
import { Key } from 'antd/lib/table/interface';
import bem from 'easy-bem';

import NotFoundImages from '~/shared/ui/NotFoundImages/NotFoundImages';
import { PaginationComponent } from '~/shared/ui';
import { IColumn, IMerchant, IStation } from '~/features/merchants/interfaces/IMerchant';
import { IPagination } from '~/shared/interfaces/IPagination';

import './TableComponent.scss';

interface Props {
  data: (IMerchant | IStation)[];
  columns: IColumn[];
  rowKey: (record: IMerchant | IStation) => Key;
  rowSelection: {
    selectedRowKeys: React.Key[];
    onChange: (selectedRowKeys: React.Key[]) => void;
  };
  loading: boolean;
  params?: IPagination | null;
  pagePrevHandler?: (() => void | undefined) | undefined;
  pageNextHandler?: (() => void | undefined) | undefined;
  disabledButton?: boolean;
  scroll?: { x?: string | number; y?: string | number } & {
    scrollToFirstRowOnChange?: boolean;
  };
}

const TableComponent: React.FC<Props> = ({
  rowKey,
  scroll = { x: 950 },
  loading,
  columns,
  data,
  params,
  pagePrevHandler,
  pageNextHandler,
  rowSelection,
}) => {
  const b = bem('TableComponent');
  const rowClassName = (_: IMerchant | IStation, index: number) => {
    if (index % 2 === 0) {
      return '';
    }
    return 'gray-row';
  };

  const locale = {
    emptyText: <NotFoundImages />,
  };

  return (
    <div className={b()}>
      <Table
        rowKey={rowKey}
        scroll={scroll}
        locale={locale}
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={rowClassName}
      />
      <PaginationComponent
        params={params}
        pagePrevHandler={pagePrevHandler}
        pageNextHandler={pageNextHandler}
      />
    </div>
  );
};

export default TableComponent;
