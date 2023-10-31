import React from 'react';
import { Card } from 'antd';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const CardComponent: React.FC<Props> = ({ children, style, className }) => {
  return (
    <Card style={style} className={className}>
      {children}
    </Card>
  );
};

export default CardComponent;
