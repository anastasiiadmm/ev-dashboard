import { Form, Input } from 'antd';
import React from 'react';
import InputMask from 'react-input-mask';

interface Rule {}

interface Props {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  inputClassName?: string;
  dependencies?: string[] | undefined;
  formatter?: string;
  onChange?: () => void;
  rules?: Rule[];
}

const PhoneField: React.FC<Props> = ({
  name,
  placeholder,
  className,
  label,
  inputClassName,
  onChange,
  rules,
}) => {
  return (
    <Form.Item
      data-testid='phone-field'
      name={name}
      label={label}
      className={`${className} custom-label`}
      rules={rules}
    >
      <InputMask
        name={name}
        onChange={onChange}
        mask='+999 (999) 99-99-99'
        autoComplete='off'
        data-testid='phone-field-input'
      >
        <Input className={inputClassName} placeholder={placeholder} />
      </InputMask>
    </Form.Item>
  );
};

export default PhoneField;
