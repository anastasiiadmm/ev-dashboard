import React from 'react';
import bem from 'easy-bem';
import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { greenCheck, warning } from '~/assets/images';
import './ActiveInactiveModal.scss';

const { Title, Text } = Typography;

interface Props {
  handleOkCancel?: () => void;
  handleAgreeHandler?: () => void;
  hasCancelButton?: boolean;
  successModal?: boolean;
  loadingStatus?: boolean;
  textTitle: string;
  infoText: string;
}

const ActiveInactiveModal: React.FC<Props> = ({
  hasCancelButton = true,
  successModal = false,
  handleAgreeHandler,
  loadingStatus,
  handleOkCancel,
  textTitle,
  infoText,
}) => {
  const b = bem('ActiveInactiveModal');
  const { t } = useTranslation();

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
              {t('modals.cancel')}
            </Button>
          )}
          <Button type='primary' onClick={handleAgreeHandler} loading={loadingStatus}>
            {successModal ? t('modals.okay') : t('modals.yes')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveInactiveModal;
