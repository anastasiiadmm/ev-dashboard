import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tabs } from 'antd';
import bem from 'easy-bem';
import { useTranslation } from 'react-i18next';

import { BannerPage } from '~/pages/banners';

import './HomePageBanner.scss';

const HomePageBanner = observer(() => {
  const { t } = useTranslation();
  const b = bem('HomePageBanner');
  const [activeKey, setActiveKey] = useState<string>('1');

  const onTabChange = (key: string) => {
    setActiveKey(key);
  };

  const items = [
    {
      key: '1',
      label: t('banners.tabs.banners') as string,
      children: <BannerPage variant />,
    },
    {
      key: '2',
      label: t('banners.tabs.fullscreen') as string,
      children: <BannerPage />,
    },
    {
      key: '3',
      label: t('banners.tabs.archive_banner') as string,
      children: <BannerPage variant archive />,
    },
    {
      key: '4',
      label: t('banners.tabs.archive_fullscreens') as string,
      children: <BannerPage archive />,
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
