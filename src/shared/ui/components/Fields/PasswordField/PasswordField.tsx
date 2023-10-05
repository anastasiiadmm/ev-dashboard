import { Form, Input } from 'antd';
import bem from 'easy-bem';
import React from 'react';

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

  return name === 'confirm_password' ? (
    <Form.Item
      className={className || b()}
      label={label}
      name={name}
      dependencies={dependencies}
      rules={[
        {
          required: true,
          message: 'Подтвердите пароль',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            const password = getFieldValue(['user', 'password']) || getFieldValue('password');
            if (!value || password === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('Пароли не совпадают'));
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
    <Form.Item id={id} className={className || b()} label={label} name={name}>
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
      id={id}
      className={className || b()}
      label={label}
      name={name}
      rules={[
        {
          required: true,
          message: 'Подтвердите пароль',
        },
        {
          min: 8,
          message: 'Пароль должен содержать минимум 8 символов',
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
