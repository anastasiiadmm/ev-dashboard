import { Row, Tabs } from 'antd';
import dayjs from 'dayjs';
import bem from 'easy-bem';
import React from 'react';

import { CardMerchantHeader, CardMerchantInfo, TableStations } from '~/pages/merchants/Merchant/ui';
import { IMerchantInfo, ITabs } from '~/pages/merchants/interfaces';

import './Merchant.scss';

const merchantItems: IMerchantInfo = {
  id: 64,
  number_stations: 33,
  active_stations: 20,
  inactive_stations: 13,
  name: 'We way',
  legal_name: 'ИП Ким ЛВ',
  email: 'weway@mail.com',
  rate: '64',
  agreement_number: 'W16/09/2023',
  address: 'Манаса 5',
  phone: '+996477011',
  active: true,
  country: 'Кыргызстан',
  district: 'Первомайский',
  city: 'Бишкек',
  created_by: 'joe@mail.com',
  created_at: dayjs().format(),
};

const Merchant = () => {
  const b = bem('Merchant');

  const items: ITabs[] = [
    {
      key: '1',
      label: 'О мерчанте',
      children: (
        <CardMerchantInfo
          merchant={merchantItems}
          classNameButton={b('button-style')}
          classNameTitle={b('title-info')}
        />
      ),
    },
    {
      key: '2',
      label: 'Станции',
      children: <TableStations />,
    },
  ];

  return (
    <Row justify='space-between' data-testid='auth-component' className={b()}>
      <CardMerchantHeader className={b('card-text-block')} merchant={merchantItems} />
      <Tabs defaultActiveKey='1' items={items} />
    </Row>
  );
};

export default Merchant;
