import { Form, Input } from 'antd';
import React from 'react';

interface Rule {}

interface Props {
  id?: string;
  className?: string;
  label?: string;
  name?: string;
  rules?: Rule[];
  placeholder?: string;
  inputClassName?: string;
  onChange?: () => void;
}

const DefaultField: React.FC<Props> = ({
  label,
  name,
  rules = [],
  placeholder,
  className,
  inputClassName,
  onChange,
}) => {
  return (
    <Form.Item label={label} name={name} rules={[...rules]} className={className}>
      <Input name={name} placeholder={placeholder} className={inputClassName} onChange={onChange} />
    </Form.Item>
  );
};

export default DefaultField;
