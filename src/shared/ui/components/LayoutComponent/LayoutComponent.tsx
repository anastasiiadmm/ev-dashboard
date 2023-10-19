import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu, theme, Typography } from 'antd';
import bem from 'easy-bem';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

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
import LanguageSelect from '~/shared/ui/components/Fields/LanguageSelect/LanguageSelect';
import '~/shared/ui/components/LayoutComponent/LayoutComponent.scss';

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
  const push = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [siderWidth, setSiderWidth] = useState(240);
  const [activeKey, setActiveKey] = useState<string | null>('/');
  const [selectedLabel, setSelectedLabel] = useState('Главная');

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon: React.ReactNode,
    activeIcon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    const isItemActive = activeKey === key;
    const isParentActive =
      activeIcon && children?.some((child) => child && child.key === activeKey);
    const shouldUseActiveIcon = isItemActive || isParentActive;

    const itemStyle = isItemActive ? { backgroundColor: '#ECFFFD', color: '#22A599' } : {};

    return {
      key,
      icon: shouldUseActiveIcon && activeIcon ? activeIcon : icon,
      children,
      label,
      style: itemStyle,
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
        getItem(
          'Мерчанты',
          '3',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
        getItem(
          'Отчет по Мерчантам',
          '4',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
      ],
    ),
    getItem(
      'Пользователи',
      'sub2',
      <img src={users} alt='users' />,
      <img src={usersActive} alt='usersActive' />,
      [
        getItem(
          'Пользователи',
          '5',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
        getItem(
          'Список зарядов пользователей',
          '6',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
        getItem(
          'Выписка с баланса пользователей',
          '16',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
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
        getItem(
          'Список Акций',
          '9',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
        getItem(
          'Отчет по акциям',
          '10',
          <img src={circle} alt='circle' />,
          <img src={circleActive} alt='circleActive' />,
        ),
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
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const childItem = findMenuItemByKey(key, item.children);
        if (childItem) return childItem;
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
        <Content style={{ margin: '20px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
