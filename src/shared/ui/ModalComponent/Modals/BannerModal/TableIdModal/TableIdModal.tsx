import React from 'react';
import bem from 'easy-bem';
import { Button } from 'antd';

import { FormField, TableComponent } from '~/shared/ui';

import ModalComponent from '../../../ModalComponent';

import './TableIdModal.scss';

interface Props {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel?: () => void;
  data: Row[];
  columns: IColumn[];
  title: string;
  placeholder: string;
  saveHandler: (checked: Row | undefined) => void;
}

interface Row {
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
  columns,
  title,
  placeholder,
}) => {
  const b = bem('TableIdModal');

  const selectIdHandler = () => {};

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
        <FormField className={b('input')} placeholder={placeholder} />
        <TableComponent loading={false} columns={columns} scroll={{ x: 280, y: 400 }} />
        <Button type='primary' onClick={selectIdHandler}>
          Выбрать
        </Button>
      </div>
    </ModalComponent>
  );
};

export default TableIdModal;
