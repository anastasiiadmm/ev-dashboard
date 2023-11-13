import { useCallback } from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const useNotification = () => {
  return useCallback((type: NotificationType, message: string, description: string) => {
    notification[type]({
      message,
      description,
    });
  }, []);
};
