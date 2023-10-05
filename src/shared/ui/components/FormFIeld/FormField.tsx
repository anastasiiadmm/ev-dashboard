import React from 'react';

import EmailField from '~/shared/ui/components/Fields/EmailField/EmailField';
import PasswordField from '~/shared/ui/components/Fields/PasswordField/PasswordField';
import DefaultField from '~/shared/ui/components/Fields/DefaultField/DefaultField';

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
    default:
      return <DefaultField {...props} />;
  }
};

export default FormField;
