import React from 'react';
import { Form, Switch } from 'antd';

interface Rule {}

interface Props {
  label?: string;
  text?: string;
  rules?: Rule[];
  className?: string;
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
}) => {
  const handleChange = (checked) => {
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
      <Switch onChange={handleChange} className={inputClassName} />{' '}
      <p className='switch-text'>{text}</p>
    </Form.Item>
  );
};

export default SwitchField;
