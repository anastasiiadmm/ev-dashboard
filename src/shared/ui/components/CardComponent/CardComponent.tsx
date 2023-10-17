import React from 'react';
import { Card } from 'antd';

type Props = {
  children: React.ReactNode;
  width?: React.ReactNode;
  height?: React.ReactNode;
};

const CardComponent: React.FC<Props> = ({ children, width }) => {
  return <Card style={width}>{children}</Card>;
};

export default CardComponent;
