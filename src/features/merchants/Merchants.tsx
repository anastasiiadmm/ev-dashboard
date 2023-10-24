import { AutoComplete, Row, Input } from 'antd';
import React from 'react';
import bem from 'easy-bem';
import { UserOutlined } from '@ant-design/icons';

import './Merchants.scss';

const renderTitle = (title: string) => (
  <span>
    {title}
    <a
      style={{ float: 'right' }}
      href='https://www.google.com/search?q=antd'
      target='_blank'
      rel='noopener noreferrer'
    >
      more
    </a>
  </span>
);

const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});

const options = [
  {
    label: renderTitle('Libraries'),
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
  },
  {
    label: renderTitle('Solutions'),
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
  },
  {
    label: renderTitle('Articles'),
    options: [renderItem('AntDesign design language', 100000)],
  },
];

const Merchants = () => {
  const b = bem('Merchants');

  return (
    <Row justify='space-between' data-testid='auth-component' className={b()}>
      <Row>
        <div>
          <AutoComplete style={{ width: 300 }} options={options} size='large'>
            <Input.Search size='large' placeholder='Искать среди мерчантов' />
          </AutoComplete>
        </div>
        <div></div>
      </Row>
    </Row>
  );
};

export default Merchants;
