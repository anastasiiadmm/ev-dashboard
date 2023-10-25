import React, { useState } from 'react';
import { Table } from 'antd';
import { Key } from 'antd/lib/table/interface';

import NotFoundImages from '~/shared/ui/components/NotFoundImages/NotFoundImages';
import { PaginationComponent } from '~/shared/ui/components';
import { IColumn, IMerchant } from '~/features/merchants/interfaces/IMerchant';
import { Pagination } from '~/shared/types/interfaces/Pagination';

interface Props {
  data: IMerchant[];
  columns: IColumn[];
  rowKey: (record: IMerchant) => Key;
  loading: boolean;
  params?: Pagination | null;
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
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowClassName = (_: IMerchant, index: number) => {
    if (index % 2 === 0) {
      return '';
    }
    return 'gray-row';
  };

  const locale = {
    emptyText: <NotFoundImages />,
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
