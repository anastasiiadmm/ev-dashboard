import { Form, Input } from 'antd';
import bem from 'easy-bem';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  inputClassName?: string;
  dependencies?: string[] | undefined;
  onChange?: () => void;
}

const PasswordField: React.FC<Props> = ({
  id = '',
  label,
  name,
  placeholder,
  className,
  dependencies,
  inputClassName,
  onChange,
  required = true,
}) => {
  const b = bem('PasswordField');
  const { t, i18n } = useTranslation();
  const error = t('errors.two_passwords_do_not_match');

  return name === 'confirm_password' ? (
    <Form.Item
      key={i18n.language}
      className={`${className} custom-label`}
      label={label}
      name={name}
      dependencies={dependencies}
      rules={[
        {
          required: true,
          message: t('errors.wrong_password'),
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            const password = getFieldValue(['user', 'password']) || getFieldValue('password');
            if (!value || password === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error(error as string));
          },
        }),
      ]}
    >
      <Input.Password
        placeholder={placeholder}
        className={inputClassName}
        autoComplete='off'
        onChange={onChange}
        name={name}
      />
    </Form.Item>
  ) : !required ? (
    <Form.Item key={i18n.language} id={id} className={className || b()} label={label} name={name}>
      <Input.Password
        placeholder={placeholder}
        className={inputClassName}
        autoComplete='off'
        onChange={onChange}
        name={name}
      />
    </Form.Item>
  ) : (
    <Form.Item
      key={i18n.language}
      id={id}
      className={className || b()}
      label={label}
      name={name}
      rules={[
        {
          required: true,
          message: t('errors.wrong_password'),
        },
        {
          min: 8,
          message: t('errors.password_length'),
        },
      ]}
    >
      <Input.Password
        data-testid='works'
        placeholder={placeholder}
        className={inputClassName}
        autoComplete='off'
        onChange={onChange}
        name={name}
      />
    </Form.Item>
  );
};

export default PasswordField;
