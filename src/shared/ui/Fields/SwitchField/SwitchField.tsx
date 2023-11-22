import React from 'react';
import { Form, Switch } from 'antd';

interface Rule {}

interface Props {
  label?: string;
  text?: string;
  rules?: Rule[];
  className?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  inputClassName?: string;
}

const SwitchField: React.FC<Props> = ({
  onChange,
  label,
  rules,
  className,
  inputClassName,
  text,
  defaultChecked,
}) => {
  const handleChange = (checked: boolean) => {
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <Form.Item
      className={`${className} custom-label`}
      rules={rules}
      label={label}
      valuePropName='checked'
    >
      <Switch
        key={`switch-${defaultChecked}`}
        onChange={handleChange}
        defaultChecked={defaultChecked}
        className={inputClassName}
      />{' '}
      <p className='switch-text'>{text}</p>
    </Form.Item>
  );
};

export default SwitchField;
