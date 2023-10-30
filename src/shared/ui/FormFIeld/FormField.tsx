import React from 'react';

import {
  AutoCompleteComponent,
  CheckboxField,
  DefaultField,
  EmailField,
  PasswordField,
  SelectField,
} from '~/shared/ui/Fields';

interface Props {
  type?: string;
  [p: string]: unknown;
}

const FormField: React.FC<Props> = ({ type, ...props }) => {
  switch (type) {
    case 'email':
      return <EmailField {...props} />;
    case 'password':
      return <PasswordField {...props} />;
    case 'checkbox':
      return <CheckboxField {...props} />;
    case 'select':
      return <SelectField {...props} />;
    case 'autocomplete':
      return <AutoCompleteComponent {...props} />;
    default:
      return <DefaultField {...props} />;
  }
};

export default FormField;
