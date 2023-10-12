import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import bem from 'easy-bem';
import { Link } from 'react-router-dom';

import arrowLeft from '~/assets/images/icons/arrow-left.svg';
import arrowRight from '~/assets/images/icons/arrow-right.svg';
import circle from '~/assets/images/icons/circle.svg';
import heatMap from '~/assets/images/icons/heatmap.svg';
import rates from '~/assets/images/icons/rates.svg';
import main from '~/assets/images/icons/home.svg';
import speakerPhone from '~/assets/images/icons/speakerphone.svg';
import tag from '~/assets/images/icons/tag.svg';
import template from '~/assets/images/icons/template.svg';
import identification from '~/assets/images/icons/identification.svg';
import logo from '~/assets/images/logo.svg';
import logoPrimary from '~/assets/images/icons/we_way_logo_primary.svg';
import promoCode from '~/assets/images/icons/promocode.svg';
import users from '~/assets/images/icons/users.svg';
import laptop from '~/assets/images/icons/Laptop.svg';
import officeBuilding from '~/assets/images/icons/office-building.svg';
import referrals from '~/assets/images/icons/rreferrals.svg';
import settings from '~/assets/images/icons/settings.svg';
import logout from '~/assets/images/icons/logout.svg';
import '~/features/main/Home/Home.scss';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Главная', '/', <img src={main} alt='main' />),
  getItem('Мерчанты', 'sub1', <img src={identification} alt='identification' />, [
    getItem('Мерчанты', '3', <img src={circle} alt='circle' />),
    getItem('Отчет по Мерчантам', '4', <img src={circle} alt='circle' />),
  ]),
  getItem('Пользователи', 'sub2', <img src={users} alt='users' />, [
    getItem('Пользователи', '5', <img src={circle} alt='circle' />),
    getItem('Список зарядов пользователей', '6', <img src={circle} alt='circle' />),
    getItem('Выписка с баланса пользователей', '16', <img src={circle} alt='circle' />),
  ]),
  getItem('Партнеры по Аренде ПО', '2', <img src={laptop} alt='laptop' />),
  getItem('Тарифы', '7', <img src={rates} alt='rates' />),
  getItem('Тепловая Карта', '8', <img src={heatMap} alt='heatMap' />),
  getItem('Акции', 'sub3', <img src={speakerPhone} alt='speakerPhone' />, [
    getItem('Список Акций', '9', <img src={circle} alt='circle' />),
    getItem('Отчет по акциям', '10', <img src={circle} alt='circle' />),
  ]),
  getItem('Рекламные баннера', '11', <img src={template} alt='template' />),
  getItem('Инфраструктура вокруг станций', '12', <img src={officeBuilding} alt='officeBuilding' />),
  getItem('Список тегов', '13', <img src={tag} alt='tag' />),
  getItem('Список промокодов', '14', <img src={promoCode} alt='promoCode' />),
  getItem('Список рефералов', '15', <img src={referrals} alt='referrals' />),
];

const logoutItems: MenuItem[] = [
  getItem('Настройки', '1', <img src={settings} alt='settings' />),
  getItem('Выйти', '2', <img src={logout} alt='logout' />),
];

const Home = () => {
  const b = bem('Home');
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [siderWidth, setSiderWidth] = useState(250);

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
        <Menu defaultSelectedKeys={['/']} mode='inline' items={items} />
        <Menu mode='inline' items={logoutItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
