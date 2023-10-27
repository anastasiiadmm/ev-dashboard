import React from 'react';
import { Form, Switch } from 'antd';

interface Rule {}

interface Props {
  label?: string;
  text?: string;
  rules?: Rule[];
  className?: string;
  inputClassName?: string;
}

const SwitchField: React.FC<Props> = ({ label, rules, className, inputClassName, text }) => {
  return (
    <Form.Item className={className} rules={rules} label={label} valuePropName='checked'>
      <Switch className={inputClassName} /> <p className='switch-text'>{text}</p>
    </Form.Item>
  );
};

export default SwitchField;
