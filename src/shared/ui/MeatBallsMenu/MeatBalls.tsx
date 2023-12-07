import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import bem from 'easy-bem';

import './MeatBalls.scss';

interface Props {
  items: {
    label?: React.ReactNode | string;
    key: string;
    icon?: React.ReactNode;
    children: {
      icon?: React.ReactNode 
      label: string;
      key: number;
    }[];
  }[];
  change: (e: number) => void;
}

const MeatBalls: React.FC<Props> = ({ items, change }) => {
  const b = bem('MeatBalls')

  const onClick: MenuProps['onClick'] = (e) => {
    change(+e.key);
  };

  return (
    <div className={b('container')}>
      <Menu className={b('meatballs-menu')} onClick={onClick} selectedKeys={[]} mode='horizontal' items={items} />
    </div>
  );
};

export default MeatBalls;
