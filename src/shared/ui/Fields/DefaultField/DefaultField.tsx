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
  inputType?: string;
  rules?: Rule[];
  placeholder?: string;
  inputClassName?: string;
  onChange?: () => void;
  error?: boolean;
  prefix?: React.ReactNode;
  disabled?: boolean;
  addonAfter?: string;
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
  error = false,
  inputType,
  onChange,
  prefix,
  disabled,
  addonAfter,
}) => {
  return (
    <Form.Item
      style={style}
      label={label}
      name={name}
      rules={[...rules]}
      className={`${className} custom-label`}
      validateStatus={error ? 'error' : undefined}
      help={error ? '' : undefined}
    >
      <Input
        type={inputType}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputClassName}
        onChange={onChange}
        prefix={prefix}
        addonAfter={addonAfter}
      />
    </Form.Item>
  );
};

export default DefaultField;
