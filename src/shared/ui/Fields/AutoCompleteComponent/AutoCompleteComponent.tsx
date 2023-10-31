import React, { CSSProperties } from 'react';
import { AutoComplete, Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface Props {
  style?: CSSProperties | undefined;
  options?: [];
  size?: SizeType;
  className?: string;
  placeholder?: string;
}

const AutoCompleteComponent: React.FC<Props> = ({
  className,
  style,
  options,
  size,
  placeholder,
}) => {
  return (
    <AutoComplete style={style} className={`${className} custom-label`} options={options}>
      <Input.Search size={size} placeholder={placeholder} />
    </AutoComplete>
  );
};

export default AutoCompleteComponent;
