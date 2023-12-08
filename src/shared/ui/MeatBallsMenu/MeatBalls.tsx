import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Button } from 'antd';

import { meatballIcon } from '~/assets/images';

interface Props {
  items: {
    label?: React.ReactNode | string;
    key: number;
    icon?: React.ReactNode;
  }[];
  change: (e: number) => void;
}

const MeatBalls: React.FC<Props> = ({ change, items }) => {
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    change(+e.key);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps} trigger={['click']} placement='bottomLeft'>
      <Button style={{ padding: '3px', height: '24px' }}>
        <img src={meatballIcon} alt='dropicon' />
      </Button>
    </Dropdown>
  );
};

export default MeatBalls;
