import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu, theme, Typography } from 'antd';
import bem from 'easy-bem';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
  arrowLeft,
  arrowRight,
  circle,
  circleActive,
  heatMap,
  heatMapActive,
  identification,
  identificationActive,
  laptop,
  laptopActive,
  logo,
  logoPrimary,
  logout,
  logoutActive,
  main,
  mainActive,
  officeBuilding,
  officeBuildingActive,
  promoCode,
  promoCodeActive,
  rates,
  ratesActive,
  referrals,
  referralsActive,
  settings,
  settingsActive,
  speakerPhone,
  speakerPhoneActive,
  tag,
  tagActive,
  template,
  templateActive,
  users,
  usersActive,
} from '~/assets/images';
import { authStore } from '~/shared/api/store';
import { logoutLocalStorage } from '~/shared/utils/storage';
import { LanguageSelect } from '~/shared/ui/Fields';
import './LayoutComponent.scss';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

type MenuItem = {
  key: React.Key;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
  style?: React.CSSProperties;
};

type Props = {
  children: React.ReactNode;
};

const LayoutComponent: React.FC<Props> = ({ children }) => {
  const b = bem('LayoutComponent');
  const { t } = useTranslation();
  const push = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [siderWidth, setSiderWidth] = useState(240);
  const [activeKey, setActiveKey] = useState<string | null>('/');
  const [selectedLabel, setSelectedLabel] = useState('Главная');

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon: React.ReactNode,
    activeIcon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem => {
    const isRootPath = key.toString() === '/';
    const isActive = isRootPath
      ? location.pathname === key.toString()
      : location.pathname.startsWith(key.toString());

    const isParentActive =
      activeIcon &&
      children?.some((child) => child && location.pathname.startsWith(child.key.toString()));

    const shouldUseActiveIcon = isActive || isParentActive;

    const itemStyle = isActive ? { backgroundColor: '#ECFFFD', color: '#22A599' } : {};

    return {
      key,
      icon: shouldUseActiveIcon && activeIcon ? activeIcon : icon,
      children,
      label,
      style: itemStyle,
    } as MenuItem;
  };

  const items: MenuItem[] = [
    getItem(
      t('menu.menu'),
      '/',
      <img src={main} alt='main' />,
      <img src={mainActive} alt='mainActive' />,
    ),
    getItem(
      t('menu.merchants'),
      'sub1',
      <img src={identification} alt='identification' />,
      <img src={identificationActive} alt='identificationActive' />,
      [
        getItem(
          t('menu.merchants'),
          '/merchants',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
        getItem(
          t('menu.merchant_report'),
          '4',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
      ],
    ),
    getItem(
      t('menu.users'),
      'sub2',
      <img src={users} alt='users' />,
      <img src={usersActive} alt='usersActive' />,
      [
        getItem(
          t('menu.users'),
          '5',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
        getItem(
          t('menu.list_of_user_charges'),
          '6',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
        getItem(
          t('menu.extract_from_user_balance'),
          '16',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
      ],
    ),
    getItem(
      t('menu.software_rental_partners'),
      '2',
      <img src={laptop} alt='laptop' />,
      <img src={laptopActive} alt='laptopActive' />,
    ),
    getItem(
      t('menu.rates'),
      '7',
      <img src={rates} alt='rates' />,
      <img src={ratesActive} alt='ratesActive' />,
    ),
    getItem(
      t('menu.heat_map'),
      '8',
      <img src={heatMap} alt='heatMap' />,
      <img src={heatMapActive} alt='heatMapActive' />,
    ),
    getItem(
      t('menu.promotions'),
      'sub3',
      <img src={speakerPhone} alt='speakerPhone' />,
      <img src={speakerPhoneActive} alt='speakerPhoneActive' />,
      [
        getItem(
          t('menu.list_of_promotions'),
          '9',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
        getItem(
          t('menu.report_of_promotions'),
          '10',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
      ],
    ),
    getItem(
      t('menu.advertising_banners'),
      'create-banner',
      <img src={template} alt='template' />,
      <img src={templateActive} alt='templateActive' />,
    ),
    getItem(
      t('menu.infrastructure_around_stations'),
      '12',
      <img src={officeBuilding} alt='officeBuilding' />,
      <img src={officeBuildingActive} alt='officeBuildingActive' />,
    ),
    getItem(
      t('menu.list_of_tags'),
      '/tags',
      <img src={tag} alt='tag' />,
      <img src={tagActive} alt='tagActive' />,
    ),
    getItem(
      t('menu.list_of_promotional_codes'),
      '14',
      <img src={promoCode} alt='promoCode' />,
      <img src={promoCodeActive} alt='promoCodeActive' />,
    ),
    getItem(
      t('menu.list_of_referrals'),
      '15',
      <img src={referrals} alt='referrals' />,
      <img src={referralsActive} alt='referralsActive' />,
    ),
  ];

  useEffect(() => {
    const matchingItem = findMenuItemByKey(location.pathname, items);
    if (matchingItem) {
      setSelectedLabel(matchingItem.label as string);
      setActiveKey(matchingItem.key as string);
    } else {
      setActiveKey(null);
      setSelectedLabel('');
    }
  }, [location.pathname, items]);

  const logoutItems: MenuItem[] = [
    getItem(
      t('menu.settings'),
      '1',
      <img src={settings} alt='settings' />,
      <img src={settingsActive} alt='settingsActive' />,
    ),
    getItem(
      t('menu.log_out'),
      '/logout',
      <img src={logout} alt='logout' />,
      <img src={logoutActive} alt='logoutActive' />,
    ),
  ];

  useEffect(() => {
    if (collapsed) {
      setSiderWidth(68);
    } else {
      setSiderWidth(240);
    }
  }, [collapsed]);

  const logoutHandler = () => {
    push('/');
    logoutLocalStorage();
    authStore.logoutUser();
    window.location.reload();
  };

  const findMenuItemByKey = (key: React.Key, items: MenuItem[]): MenuItem | null => {
    for (const item of items) {
      if (item.key.toString() === key.toString()) {
        return item;
      }
      if (item.children) {
        const childItem = findMenuItemByKey(key, item.children);
        if (childItem) return childItem;
      }
      if (item.key !== '/' && key.toString().startsWith(item.key.toString())) {
        return item;
      }
    }
    return null;
  };

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
              .filter((item) => item?.key === activeKey)
              .map((item) => item?.key as string)}
            onClick={({ key }) => {
              const matchingItem = findMenuItemByKey(key, items);
              if (matchingItem) {
                setSelectedLabel(matchingItem.label as string);
                setActiveKey(key as string);
              } else {
                setActiveKey(null);
                setSelectedLabel('');
              }
              push(key);
            }}
          />

          <Menu
            mode='inline'
            items={logoutItems}
            selectedKeys={logoutItems
              .filter((item) => item?.key === activeKey)
              .map((item) => item?.key as string)}
            onClick={({ key }) => {
              if (key === '/logout') {
                logoutHandler();
                return;
              }
              const matchingItem = findMenuItemByKey(key, items);
              if (matchingItem) {
                setSelectedLabel(matchingItem.label as string);
                setActiveKey(key as string);
              } else {
                setActiveKey(null);
                setSelectedLabel('');
              }
            }}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{ padding: '0 22px', background: colorBgContainer }}
          className={b('header-block')}
        >
          <Title level={3} style={{ margin: 0 }}>
            {selectedLabel}
          </Title>
          <div className={b('select-block')}>
            <LanguageSelect />
            <Title level={5} style={{ margin: ' 0 10px' }}>
              Tesla company
            </Title>
          </div>
        </Header>
        <Content style={{ overflow: 'auto' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
