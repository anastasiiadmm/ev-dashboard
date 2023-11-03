import React from 'react';
import bem from 'easy-bem';
import { Button, Typography } from 'antd';

import { greenCheck, warning } from '~/assets/images';
import './ActiveInactiveModal.scss';

const { Title, Text } = Typography;

interface Props {
  handleOkCancel?: () => void;
  handleAgreeHandler?: () => void;
  hasCancelButton?: boolean;
  successModal?: boolean;
  textTitle: string;
  infoText: string;
}

const ActiveInactiveModal: React.FC<Props> = ({
  hasCancelButton = true,
  successModal = false,
  handleAgreeHandler,
  handleOkCancel,
  textTitle,
  infoText,
}) => {
  const b = bem('ActiveInactiveModal');

  return (
    <div className={b('')}>
      <div>
        {successModal ? (
          <img src={greenCheck} alt='greenCheck' />
        ) : (
          <img src={warning} alt='warning' />
        )}
      </div>
      <div className={b('modal-info-block')}>
        <Title level={4} className={b('title')}>
          {textTitle}
        </Title>
        <Text>{infoText}</Text>
        <div className={b('buttons-block') + successModal ? 'float-style' : ''}>
          {hasCancelButton && (
            <Button className={b('cancel-button')} onClick={handleOkCancel}>
              Отменить
            </Button>
          )}
          <Button type='primary' onClick={handleAgreeHandler}>
            {successModal ? 'Хорошо' : 'Да'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveInactiveModal;
