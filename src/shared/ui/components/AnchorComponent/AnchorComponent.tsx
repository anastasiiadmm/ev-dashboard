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
    if (item?.isSeparator) {
      return null;
    }
    const isSpecial = item.key === 'this-week' || item.key === 'last-week';
    const badge = <Badge status='success' />;
    return {
      key: item.key,
      href: item.href,
      title: (
        <span>
          {isSpecial && badge}
          {item.title}
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
