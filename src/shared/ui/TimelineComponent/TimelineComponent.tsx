import React from 'react';
import { Timeline } from 'antd';

type Props = {
  items: { children: JSX.Element; dot: JSX.Element }[];
};

const TimelineComponent: React.FC<Props> = ({ items }) => {
  return <Timeline items={items} />;
};

export default TimelineComponent;
