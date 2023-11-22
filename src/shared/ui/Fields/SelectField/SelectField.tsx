import { Select, Form } from 'antd';
import React, { CSSProperties } from 'react';

import { IRule, OptionType } from '~/shared/interfaces';

interface Props {
  bordered?: boolean;
  handleChange?: (value: string) => void;
  defaultValue?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  optionStyles?: CSSProperties | undefined;
  className?: string;
  suffixIconData?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  dropdownStyle?: CSSProperties | undefined;
  customStyle?: CSSProperties | undefined;
  options?: OptionType[];
  rules?: IRule[];
  error?: boolean;
  loading?: boolean;
}

const SelectField: React.FC<Props> = ({
  name,
  label,
  placeholder,
  rules,
  bordered = true,
  loading,
  handleChange,
  disabled,
  defaultValue,
  options,
  customStyle,
  suffixIconData,
  dropdownStyle,
  className,
  error = false,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      className={`${className} custom-label`}
      validateStatus={error ? 'error' : undefined}
      help={error ? '' : undefined}
    >
      <Select
        loading={loading}
        bordered={bordered}
        disabled={disabled}
        defaultValue={defaultValue}
        style={customStyle}
        onChange={handleChange}
        suffixIcon={suffixIconData}
        dropdownStyle={dropdownStyle}
        placeholder={placeholder}
      >
        {options?.map((option) => {
          const key = 'value' in option ? option.value : option.id;
          const label = 'label' in option ? option.label : option.name;
          const icon = 'icon' in option ? option.icon : undefined;

          return (
            <Select.Option key={key} value={key} disabled={option.disabled}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {icon && <img src={icon} alt={label} style={{ marginRight: '8px' }} />}
                {label}
              </div>
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

export default SelectField;
