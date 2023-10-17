import React from 'react';
import { Anchor, Badge } from 'antd';
import bem from 'easy-bem';

import './AnchorComponent.scss';

type Props = {
  children?: React.ReactNode;
  items: {
    title?: React.ReactNode;
    href?: string;
    key: string;
    isSeparator?: boolean;
  }[];
  handleAnchorClick: (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string },
  ) => void;
  currentAnchor: string;
};

type AnchorItem = {
  title?: React.ReactNode;
  href?: string;
  key: string;
  isSeparator?: boolean;
};

const AnchorComponent: React.FC<Props> = ({ items, handleAnchorClick, currentAnchor }) => {
  const b = bem('AnchorComponent');

  const renderItem = (item: AnchorItem) => {
    const isSpecial = item.key === 'this-week' || item.key === 'last-week';
    const badge = isSpecial ? <Badge status='success' style={{ margin: '0 5px 0 20px' }} /> : null;

    return {
      key: item.key,
      href: item.href,
      title: (
        <span className={item.key === 'this-week' ? b('border-style') : ''}>
          {badge}
          <span>{item.title}</span>
        </span>
      ),
    };
  };

  return (
    <div className={b('')}>
      <Anchor
        direction='horizontal'
        current={currentAnchor}
        onClick={handleAnchorClick}
        getCurrentAnchor={() => currentAnchor}
        items={items.map(renderItem).filter(Boolean)}
      />
    </div>
  );
};

export default AnchorComponent;
