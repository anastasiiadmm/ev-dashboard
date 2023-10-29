import { Form, Input } from 'antd';
import React, { CSSProperties } from 'react';

interface Rule {}

interface Props {
  id?: string;
  style?: CSSProperties;
  className?: string;
  label?: string;
  defaultValue?: string;
  name?: string;
  rules?: Rule[];
  placeholder?: string;
  inputClassName?: string;
  onChange?: () => void;
  prefix?: React.ReactNode;
}

const DefaultField: React.FC<Props> = ({
  style,
  label,
  name,
  rules = [],
  defaultValue,
  placeholder,
  className,
  inputClassName,
  onChange,
  prefix,
}) => {
  return (
    <Form.Item style={style} label={label} name={name} rules={[...rules]} className={`${className} custom-label`}>
      <Input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputClassName}
        onChange={onChange}
        prefix={prefix}
      />
    </Form.Item>
  );
};

export default DefaultField;
