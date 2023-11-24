import React from 'react';
import { Form, Switch } from 'antd';

interface Rule {}

interface Props {
  name?: string;
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
  name,
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
      name={name}
    >
      <div>
        <Switch onChange={handleChange} className={inputClassName} />
        <p className='switch-text'>{text}</p>
      </div>
    </Form.Item>
  );
};

export default SwitchField;
