import React from 'react';
import bem from 'easy-bem';
import { Button, Typography } from 'antd';

import { warning } from '~/assets/images';
import './ActiveInactiveModal.scss';

const { Title, Text } = Typography;

interface Props {
  handleOkCancel?: () => void;
}

const ActiveInactiveModal: React.FC<Props> = ({ handleOkCancel }) => {
  const b = bem('ActiveInactiveModal');

  return (
    <div className={b('')}>
      <div>
        <img src={warning} alt='warning' />
      </div>
      <div className={b('modal-info-block')}>
        <Title level={4} className={b('title')}>
          Деактивировать?
        </Title>
        <Text>Выбранные Вами мерчанты будут не активны.</Text>
        <div className={b('buttons-block')}>
          <Button className={b('cancel-button')} onClick={handleOkCancel}>
            Отменить
          </Button>
          <Button type='primary'>Да</Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveInactiveModal;
