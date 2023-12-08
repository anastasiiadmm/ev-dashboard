import { Button, Divider } from 'antd';
import bem from 'easy-bem';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ICreateConnector } from '~/pages/merchants/interfaces';
import { FormField } from '~/shared/ui';

import './CardConnector.scss';

interface Props {
  connector: ICreateConnector;
  onRemoveConnector: (evseId: number, connectorId: number) => void;
  onEditConnector: () => void;
  setConnector: (connector: ICreateConnector) => void;
}

const CardConnector: React.FC<Props> = ({
  connector,
  onRemoveConnector,
  onEditConnector,
  setConnector,
}) => {
  const b = bem('CardConnector');
  const { t } = useTranslation();

  const optionsPosition = [
    {
      id: 1,
      name: 'L1',
    },
    {
      id: 3,
      name: 'L2',
    },
    {
      id: 5,
      name: 'L3',
    },
    {
      id: 7,
      name: 'L4',
    },
    {
      id: 2,
      name: 'R1',
    },
    {
      id: 4,
      name: 'R2',
    },
    {
      id: 6,
      name: 'R3',
    },
    {
      id: 8,
      name: 'R4',
    },
  ];

  const handleEditConnector = () => {
    onEditConnector();
    connector.id = connector.connector_id;
    setConnector(connector);
  };

  return (
    <div className={b()}>
      <div className={b('connector-detail')}>
        <p>ID {connector.connector_id}</p>
        <Divider className={b('connector-divider')} type='vertical' />
        <p>{connector.typo}</p>
        <Divider className={b('connector-divider')} type='vertical' />
        <FormField
          className={b('connector-select')}
          type='select'
          defaultValue={connector.position}
          options={optionsPosition}
          name='position'
        />
        <Divider className={b('connector-divider')} type='vertical' />
        <p>
          {connector.fee} {t('merchants.tariff_kwh')}
        </p>
      </div>

      <div className={b('btn-block')}>
        <Button className={b('edit-connector-btn')} onClick={handleEditConnector} />
        <Button
          className={b('remove-connector-btn')}
          onClick={() => onRemoveConnector(connector.evse_id, connector.connector_id)}
        />
      </div>
    </div>
  );
};

export default CardConnector;
