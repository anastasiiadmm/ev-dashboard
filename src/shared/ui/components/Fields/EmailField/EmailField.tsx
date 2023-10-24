import { Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
}

const EmailField: React.FC<Props> = ({
  label,
  name,
  placeholder,
  className,
  inputClassName,
  onChange,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Form.Item
      key={i18n.language}
      label={label}
      name={name}
      className={className}
      rules={[
        {
          type: 'email',
          message: t('errors.the_input_is_not_valid_email'),
        },
        {
          required: true,
          message: t('errors.enter_your_email_address'),
        },
      ]}
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
