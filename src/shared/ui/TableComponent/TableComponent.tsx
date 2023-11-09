import React from 'react';
import { Table } from 'antd';
import { Key } from 'antd/lib/table/interface';
import bem from 'easy-bem';

import NotFoundImages from '~/shared/ui/NotFoundImages/NotFoundImages';
import { PaginationComponent } from '~/shared/ui';
import { IColumn, IMerchant, IStation } from '~/features/merchants/interfaces/IMerchant';
import { IPagination } from '~/shared/interfaces/IPagination';
import { ITag } from '~/features/tags/interfaces';
import './TableComponent.scss';

interface Props {
  data: (IMerchant | IStation | ITag)[];
  columns: IColumn[];
  rowKey: (record: IMerchant | IStation | ITag) => Key;
  rowSelection: {
    selectedRowKeys: React.Key[];
    onChange: (selectedRowKeys: React.Key[]) => void;
  };
  loading: boolean;
  params?: IPagination | null;
  pagePrevHandler?: (() => void | undefined) | undefined;
  pageNextHandler?: (() => void | undefined) | undefined;
  onChangePageCheckHandler?: (() => void | undefined) | undefined;
  changeShowByHandler?: ((value: string) => void | undefined) | undefined;
  disabledButton?: boolean;
  defaultSizeValue?: number | undefined;
  pages?: number | undefined;
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
  changeShowByHandler,
  defaultSizeValue,
  pages,
  onChangePageCheckHandler,
}) => {
  const b = bem('TableComponent');
  const rowClassName = (_: IMerchant | IStation | ITag, index: number) => {
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
        changeShowByHandler={changeShowByHandler}
        params={params}
        pagePrevHandler={pagePrevHandler}
        pageNextHandler={pageNextHandler}
        defaultSizeValue={defaultSizeValue}
        onChangePageCheckHandler={onChangePageCheckHandler}
        pages={pages}
      />
    </div>
  );
};

export default TableComponent;
