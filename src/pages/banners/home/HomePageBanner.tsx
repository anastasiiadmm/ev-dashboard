import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tabs } from 'antd';
import bem from 'easy-bem';

import { BannerPage, FullscreenPage } from '~/pages/banners';

import './HomePageBanner.scss';

const HomePageBanner = observer(() => {
  const b = bem('HomePageBanner');
  const [activeKey, setActiveKey] = useState<string>('1');

  const onTabChange = (key: string) => {
    setActiveKey(key);
  };

  const items = [
    {
      key: '1',
      label: 'Банера' as string,
      children: <BannerPage />,
    },
    {
      key: '2',
      label: 'Фулскрин' as string,
      children: <FullscreenPage />,
    },
    {
      key: '3',
      label: 'Архив (банера)' as string,
      children: <h1>Архив (банера)</h1>,
    },
    {
      key: '4',
      label: 'Архив (фулскрины)' as string,
      children: <h1>Архив (фулскрины)</h1>,
    },
  ];
  return (
    <div className={b('tabs-style')}>
      <Tabs
        defaultActiveKey={activeKey}
        activeKey={activeKey}
        onChange={onTabChange}
        items={items}
      />
    </div>
  );
});

export default HomePageBanner;
