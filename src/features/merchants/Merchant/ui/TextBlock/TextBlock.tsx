import React from 'react';
import { Flex, Typography } from 'antd';
import bem from 'easy-bem';

import './TextBlock.scss';

const { Text } = Typography;

type Props = {
  title: string;
  text: string;
  styleBlock?:  React.CSSProperties;
  styleTitle?:  React.CSSProperties;
  styleText?:  React.CSSProperties;
};

const TextBlock: React.FC<Props> = ({ title, text, styleBlock, styleTitle, styleText }) => {
  const b = bem('TextBlock');
  return (
    <Flex vertical style={styleBlock} className={b()}>
      <Text style={styleTitle} className={b('title')}>
        {title}
      </Text>
      <Text style={styleText} className={b('text')}>
        {text}
      </Text>
    </Flex>
  );
};

export default TextBlock;
