import React from 'react';
import bem from 'easy-bem';
import { Button, Typography } from 'antd';

import { warning } from '~/assets/images';
import './ActiveInactiveModal.scss';

const { Title, Text } = Typography;

const ActiveInactiveModal = () => {
  const b = bem('ActiveInactiveModal');

  return (
    <div className={b('')}>
      <div>
        <img src={warning} alt='warning' />
      </div>
      <div className={b('modal-info-block')}>
        <Title level={4}>Деактивировать?</Title>
        <Text>Выбранные Вами мерчанты будут не активны.</Text>
        <div>
          <Button>Отменить</Button>
          <Button>Да</Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveInactiveModal;
