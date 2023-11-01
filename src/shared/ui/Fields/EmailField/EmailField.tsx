import { Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { IRule } from '~/shared/interfaces';

interface Props {
  id?: string;
  className?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  inputClassName?: string;
  bordered?: boolean;
  readOnly?: boolean;
  onChange?: () => void;
  rules?: IRule[];
  error?: boolean;
}

const EmailField: React.FC<Props> = ({
  label,
  name,
  placeholder,
  className,
  inputClassName,
  onChange,
  rules,
  error = false,
}) => {
  const { i18n } = useTranslation();

  return (
    <Form.Item
      key={i18n.language}
      label={label}
      name={name}
      className={`${className} custom-label`}
      rules={rules}
      validateStatus={error ? 'error' : undefined}
      help={error ? '' : undefined}
    >
      <Input
        className={`input-styles ${inputClassName}`}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
    </Form.Item>
  );
};

export default EmailField;
