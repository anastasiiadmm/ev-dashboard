import React, { ChangeEvent, useEffect, useState } from 'react';
import bem from 'easy-bem';
import { Button } from 'antd';

import { FormField, ModalComponent, TableComponent } from '~/shared/ui';
import './TableIdModal.scss';

interface Props {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel?: () => void;
  data: IData[];
  columns: IColumn[];
  title: string;
  placeholder: string;
  saveHandler: (checked: IData[] | undefined) => void;
}

interface IData {
  id: number;
  name: string;
}

interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
}

const TableIdModal: React.FC<Props> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  data,
  columns,
  title,
  placeholder,
  saveHandler,
}) => {
  const b = bem('TableIdModal');
  const [getData, setGetData] = useState<IData[]>();
  const [filteredData, setFilteredData] = useState<IData[]>(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleFormChange = (value: string) => {
    const lowerCaseValue = value.toLowerCase();
    const filtered = data.filter(
      (row) =>
        row.id.toString().includes(lowerCaseValue) ||
        row.name.toLowerCase().includes(lowerCaseValue),
    );
    setFilteredData(filtered);
  };

  const rowKey = (record: IData[]) => record

  const rowSelection = {
    onChange: (selectedRowKeys: IData[]) => {
      setGetData(selectedRowKeys);
    },
  };

  const selectIdHandler = () => {
    saveHandler(getData);
  };

  return (
    <ModalComponent
      width={352}
      handleOk={handleOk}
      isModalOpen={isModalOpen}
      handleCancel={handleCancel}
      closeIcon
    >
      <div className={b('modal-container')}>
        <h2>{title}</h2>
        <FormField
          id='value'
          name={`value`}
          data-testid='value'
          className={b('input')}
          placeholder={placeholder}
          rules={[
            {
              required: true,
              message: '',
            },
          ]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange(e.target.value)}
        />
        <TableComponent
          rowKey={rowKey}
          loading={false}
          columns={columns}
          data={filteredData}
          rowSelection={rowSelection}
          scroll={{ x: 0, y: 400 }}
        />
        <Button type='primary' onClick={selectIdHandler}>
          Выбрать
        </Button>
      </div>
    </ModalComponent>
  );
};

export default TableIdModal;
