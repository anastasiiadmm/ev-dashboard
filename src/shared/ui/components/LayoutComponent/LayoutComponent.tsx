import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import bem from 'easy-bem';
import { Link } from 'react-router-dom';

import arrowLeft from '~/assets/images/icons/arrow-left.svg';
import arrowRight from '~/assets/images/icons/arrow-right.svg';
import circle from '~/assets/images/icons/circle.svg';
import heatMap from '~/assets/images/icons/heatmap.svg';
import heatMapActive from '~/assets/images/icons/heatmap-active.svg';
import rates from '~/assets/images/icons/rates.svg';
import ratesActive from '~/assets/images/icons/rates-active.svg';
import main from '~/assets/images/icons/home.svg';
import mainActive from '~/assets/images/icons/home-active.svg';
import speakerPhone from '~/assets/images/icons/speakerphone.svg';
import speakerPhoneActive from '~/assets/images/icons/speakerphone-active.svg';
import tag from '~/assets/images/icons/tag.svg';
import tagActive from '~/assets/images/icons/tag-active.svg';
import template from '~/assets/images/icons/template.svg';
import templateActive from '~/assets/images/icons/template-active.svg';
import identification from '~/assets/images/icons/identification.svg';
import identificationActive from '~/assets/images/icons/identification-active.svg';
import logo from '~/assets/images/logo.svg';
import logoPrimary from '~/assets/images/icons/we_way_logo_primary.svg';
import promoCode from '~/assets/images/icons/promocode.svg';
import promoCodeActive from '~/assets/images/icons/promocode-active.svg';
import users from '~/assets/images/icons/users.svg';
import laptop from '~/assets/images/icons/Laptop.svg';
import laptopActive from '~/assets/images/icons/laptop-active.svg';
import officeBuilding from '~/assets/images/icons/office-building.svg';
import officeBuildingActive from '~/assets/images/icons/office-building-active.svg';
import referrals from '~/assets/images/icons/rreferrals.svg';
import referralsActive from '~/assets/images/icons/rreferrals-active.svg';
import settings from '~/assets/images/icons/settings.svg';
import settingsActive from '~/assets/images/icons/settings-active.svg';
import logout from '~/assets/images/icons/logout.svg';
import logoutActive from '~/assets/images/icons/logout-active.svg';
import usersActive from '~/assets/images/icons/user-group-active.svg';
import '~/shared/ui/components/LayoutComponent/LayoutComponent.scss';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

type Props = {
  children: React.ReactNode;
};

const LayoutComponent: React.FC<Props> = ({ children }) => {
  const b = bem('LayoutComponent');
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [siderWidth, setSiderWidth] = useState(250);
  const [activeKey, setActiveKey] = useState<string | null>('/');

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon: React.ReactNode,
    activeIcon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    const isItemActive = activeKey === key;

    const isParentActive = activeIcon
      ? children?.some((child) => child && child.key === activeKey)
      : false;

    return {
      key,
      icon: (isItemActive || isParentActive) && activeIcon ? activeIcon : icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      'Главная',
      '/',
      <img src={main} alt='main' />,
      <img src={mainActive} alt='mainActive' />,
    ),
    getItem(
      'Мерчанты',
      'sub1',
      <img src={identification} alt='identification' />,
      <img src={identificationActive} alt='identificationActive' />,
      [
        getItem('Мерчанты', '3', <img src={circle} alt='circle' />),
        getItem('Отчет по Мерчантам', '4', <img src={circle} alt='circle' />),
      ],
    ),
    getItem(
      'Пользователи',
      'sub2',
      <img src={users} alt='users' />,
      <img src={usersActive} alt='usersActive' />,
      [
        getItem('Пользователи', '5', <img src={circle} alt='circle' />),
        getItem('Список зарядов пользователей', '6', <img src={circle} alt='circle' />),
        getItem('Выписка с баланса пользователей', '16', <img src={circle} alt='circle' />),
      ],
    ),
    getItem(
      'Партнеры по Аренде ПО',
      '2',
      <img src={laptop} alt='laptop' />,
      <img src={laptopActive} alt='laptopActive' />,
    ),
    getItem(
      'Тарифы',
      '7',
      <img src={rates} alt='rates' />,
      <img src={ratesActive} alt='ratesActive' />,
    ),
    getItem(
      'Тепловая Карта',
      '8',
      <img src={heatMap} alt='heatMap' />,
      <img src={heatMapActive} alt='heatMapActive' />,
    ),
    getItem(
      'Акции',
      'sub3',
      <img src={speakerPhone} alt='speakerPhone' />,
      <img src={speakerPhoneActive} alt='speakerPhoneActive' />,
      [
        getItem('Список Акций', '9', <img src={circle} alt='circle' />),
        getItem('Отчет по акциям', '10', <img src={circle} alt='circle' />),
      ],
    ),
    getItem(
      'Рекламные баннера',
      '11',
      <img src={template} alt='template' />,
      <img src={templateActive} alt='templateActive' />,
    ),
    getItem(
      'Инфраструктура вокруг станций',
      '12',
      <img src={officeBuilding} alt='officeBuilding' />,
      <img src={officeBuildingActive} alt='officeBuildingActive' />,
    ),
    getItem(
      'Список тегов',
      '13',
      <img src={tag} alt='tag' />,
      <img src={tagActive} alt='tagActive' />,
    ),
    getItem(
      'Список промокодов',
      '14',
      <img src={promoCode} alt='promoCode' />,
      <img src={promoCodeActive} alt='promoCodeActive' />,
    ),
    getItem(
      'Список рефералов',
      '15',
      <img src={referrals} alt='referrals' />,
      <img src={referralsActive} alt='referralsActive' />,
    ),
  ];

  const logoutItems: MenuItem[] = [
    getItem(
      'Настройки',
      '1',
      <img src={settings} alt='settings' />,
      <img src={settingsActive} alt='settingsActive' />,
    ),
    getItem(
      'Выйти',
      '22',
      <img src={logout} alt='logout' />,
      <img src={logoutActive} alt='logoutActive' />,
    ),
  ];

  useEffect(() => {
    if (collapsed) {
      setSiderWidth(80);
    } else {
      setSiderWidth(250);
    }
  }, [collapsed]);

  return (
    <Layout style={{ minHeight: '100vh' }} className={b('')}>
      <Sider width={siderWidth} theme='light' collapsed={collapsed}>
        <div className={b('logo-button-block', { smallScreen: collapsed })}>
          <Link to='/'>
            {collapsed ? (
              <img src={logoPrimary} alt='logoPrimary' />
            ) : (
              <img src={logo} alt='logo' />
            )}
          </Link>
          <Button
            className={b('button-style')}
            type='link'
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <img src={arrowRight} alt='arrowRight' />
            ) : (
              <img src={arrowLeft} alt='arrowLeft' />
            )}
          </Button>
        </div>
        <div className='demo-logo-vertical' />
        <div className={b('menu-block')}>
          <Menu
            defaultOpenKeys={['/']}
            defaultSelectedKeys={['/']}
            mode='inline'
            items={items}
            selectedKeys={items
              .filter((item) => item && item.key === activeKey)
              .map((item) => item.key as string)}
            onClick={({ key }) => {
              const matchingItem = items.find((item) => item && item.key === key);
              if (!matchingItem) {
                setActiveKey(null);
              }
              setActiveKey(key as string);
            }}
          />

          <Menu
            mode='inline'
            items={logoutItems}
            selectedKeys={logoutItems
              .filter((item) => item && item.key === activeKey)
              .map((item) => item.key as string)}
            onClick={({ key }) => {
              const matchingItem = items.find((item) => item && item.key === key);
              if (!matchingItem) {
                setActiveKey(null);
              }
              setActiveKey(key as string);
            }}
          />
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
