import { Select, Form } from 'antd';
import React, { CSSProperties } from 'react';

interface Rule {}

interface Props {
  bordered?: boolean;
  handleChange?: (value: string) => void;
  defaultValue?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  customStyle?: CSSProperties;
  className?: string;
  suffixIconData?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  dropdownStyle?: CSSProperties | undefined;
  options?: { value: string; label: string; icon?: string; disabled?: boolean }[];
  rules?: Rule[];
}

const SelectField: React.FC<Props> = ({
  name,
  label,
  rules,
  bordered = true,
  handleChange,
  disabled,
  defaultValue,
  options,
  customStyle,
  suffixIconData,
  dropdownStyle,
  className,
}) => {
  return (
    <Form.Item name={name} label={label} rules={rules} className={`${className} custom-label`}>
      <Select
        bordered={bordered}
        disabled={disabled}
        defaultValue={defaultValue}
        style={customStyle}
        onChange={handleChange}
        suffixIcon={suffixIconData}
        dropdownStyle={dropdownStyle}
      >
        {options?.map((option) => (
          <Select.Option key={option.value} value={option.value} disabled={option.disabled}>
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
              {option?.icon && (
                <img src={option?.icon} alt={option.label} style={{ marginRight: '8px' }} />
              )}
              {option.label}
            </div>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectField;
