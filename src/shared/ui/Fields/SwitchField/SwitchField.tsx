import React from 'react';
import { Form, Switch } from 'antd';

import { IRule } from '~/shared/interfaces';

interface Props {
  name?: string;
  label?: string;
  text?: string;
  rules?: IRule[];
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
  name,
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
      name={name}
    >
      <div>
        <Switch
          key={`switch-${defaultChecked}`}
          onChange={handleChange}
          defaultChecked={defaultChecked}
          className={inputClassName}
        />{' '}
        <p className='switch-text'>{text}</p>
      </div>
    </Form.Item>
  );
};

export default SwitchField;
