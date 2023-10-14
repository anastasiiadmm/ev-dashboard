import React from 'react';

import {
  EmailField,
  PasswordField,
  CheckboxField,
  DefaultField,
  SelectField,
} from '~/shared/ui/components/index';

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
    default:
      return <DefaultField {...props} />;
  }
};

export default FormField;
