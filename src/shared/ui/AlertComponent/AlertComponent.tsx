import React from 'react';
import { Alert } from 'antd';

interface Props {
  message: string;
  description: string;
  className?: string;
  type: 'success' | 'error' | 'warning' | 'info' | undefined;
  showIcon?: boolean;
  closable?: boolean;
}

const AlertComponent: React.FC<Props> = ({
  message,
  description,
  type,
  className,
  showIcon,
  closable,
}) => {
  return (
    <Alert
      className={className}
      message={message}
      description={description}
      type={type}
      showIcon={showIcon}
      closable={closable}
    />
  );
};

export default AlertComponent;
