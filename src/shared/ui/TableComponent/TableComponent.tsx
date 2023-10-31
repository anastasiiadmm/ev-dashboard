import React from 'react';
import { Table } from 'antd';
import { Key } from 'antd/lib/table/interface';

import NotFoundImages from '~/shared/ui/NotFoundImages/NotFoundImages';
import { PaginationComponent } from '~/shared/ui';
import { IColumn, IMerchant } from '~/features/merchants/interfaces/IMerchant';
import { IPagination } from '~/shared/types/interfaces/IPagination';

interface Props {
  data: IMerchant[];
  columns: IColumn[];
  rowKey: (record: IMerchant) => Key;
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
  const rowClassName = (_: IMerchant, index: number) => {
    if (index % 2 === 0) {
      return '';
    }
    return 'gray-row';
  };

  const locale = {
    emptyText: <NotFoundImages />,
  };

  return (
    <>
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
    </>
  );
};

export default TableComponent;
