import React, { ChangeEvent, useEffect, useState } from 'react';
import bem from 'easy-bem';
import { Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { FormField, TableComponent } from '~/shared/ui';
import { ICommon } from '~/pages/banners/interfaces';
import { ITag } from '~/pages/tags/interfaces';
import { ICreateSchedule, IMerchant, IStation } from '~/pages/merchants/interfaces';
import { search } from '~/assets/images';
import './TableIdModal.scss';

interface Props {
  data: ICommon[];
  columns: IColumn[];
  title: string;
  placeholder: string;
  saveHandler: (checked: ICommon[] | undefined) => void;
}

interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
}

const TableIdModal: React.FC<Props> = ({ data, columns, title, placeholder, saveHandler }) => {
  const b = bem('TableIdModal');
  const [getData, setGetData] = useState<ICommon[]>();
  const [filteredData, setFilteredData] = useState<ICommon[]>();
  const { t } = useTranslation();

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

  const rowKey = (record: ICreateSchedule | IMerchant | IStation | ITag | ICommon) => {
    if ('id' in record && 'name' in record) {
      return `${record.id}_${record.name}`;
    }
    return 'defaultKey';
  };

  const rowSelection: {
    selectedRowKeys: React.Key[];
    onChange: (selectedRowKeys: React.Key[]) => void;
  } = {
    onChange: (selectedRowKeys: React.Key[]) => {
      function parseInputArray(inputArray: string[]): ICommon[] | null {
        const resultArray: ICommon[] = [];

        for (const key of inputArray) {
          const match = key.match(/^(\d+)_([^]*)$/);
          if (match) {
            const id = parseInt(match[1], 10);
            const name = match[2];
            const result: ICommon = { id, name };
            resultArray.push(result);
          } else {
            console.error('Invalid input format');
            return null;
          }
        }

        return resultArray;
      }

      const resultArray: ICommon[] | null = parseInputArray(selectedRowKeys as string[]);

      if (resultArray) {
        setGetData(resultArray);
      }
    },
    // selectedRowKeys: [],
  };

  const selectIdHandler = () => {
    saveHandler(getData);
  };

  return (
    <Form className={b('modal-container')}>
      <h2>{title}</h2>
      <div className={b('container-field-icon')}>
        <img className={b('search-icon')} src={search} alt='searchicon' />
        <FormField
          id='value'
          name={`value`}
          data-testid='value'
          className={b('input')}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormChange(e.target.value)}
        />
      </div>
      <div className={b('container-table')}>
        <TableComponent
          rowKey={rowKey}
          loading={false}
          columns={columns}
          data={filteredData}
          rowSelection={rowSelection}
          scroll={{ x: 0 }}
        />
      </div>
      <Button type='primary' onClick={selectIdHandler}>
        {t('banners.add_banner.choose')}
      </Button>
    </Form>
  );
};

export default TableIdModal;
