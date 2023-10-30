import React, { useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import bem from 'easy-bem';

import './BreadcrumbComponent.scss';

interface MyBreadcrumbItem {
  label?: React.ReactNode;
  separator?: string | React.ReactNode;
}

interface Props {
  items: {
    title: string | React.ReactNode;
    href?: string;
  }[];
}

const BreadcrumbComponent: React.FC<Props> = ({ items }) => {
  const b = bem('BreadcrumbComponent');
  const location = useLocation();

  const allItems = useMemo(() => {
    return [{ title: 'Главная', href: '/' }, ...items];
  }, [items]);

  const breadcrumbItems = useMemo(() => {
    return allItems.map((item) => {
      const isActive = item.href === location.pathname;

      return {
        label: isActive ? (
          <span>{item.title}</span>
        ) : (
          <Link to={item.href || '#'}>{item.title}</Link>
        ),
        separator: '/',
      };
    });
  }, [allItems, location.pathname]);

  return (
    <Breadcrumb
      className={b('')}
      items={breadcrumbItems}
      itemRender={(route: MyBreadcrumbItem, _, routes: MyBreadcrumbItem[]) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.label}</span> : route.label;
      }}
    />
  );
};

export default BreadcrumbComponent;
