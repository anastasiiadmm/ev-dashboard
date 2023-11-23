import React from 'react';
import { Card } from 'antd';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  style?: React.CSSProperties;
};

const CardComponent: React.FC<Props> = ({ children, style, className, onClick, hoverable }) => {
  return (
    <Card style={style} onClick={onClick} className={className} hoverable={hoverable}>
      {children}
    </Card>
  );
};

export default CardComponent;
