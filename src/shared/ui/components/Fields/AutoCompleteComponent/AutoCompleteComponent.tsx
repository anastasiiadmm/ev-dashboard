import React, { CSSProperties } from 'react';
import { AutoComplete, Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface Props {
  style?: CSSProperties | undefined;
  options?: [];
  size?: SizeType;
  placeholder?: string;
}

const AutoCompleteComponent: React.FC<Props> = ({ style, options, size, placeholder }) => {
  return (
    <AutoComplete style={style} options={options}>
      <Input.Search size={size} placeholder={placeholder} />
    </AutoComplete>
  );
};

export default AutoCompleteComponent;
