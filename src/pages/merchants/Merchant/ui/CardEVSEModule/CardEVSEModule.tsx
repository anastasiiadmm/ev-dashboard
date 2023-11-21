import { Button } from 'antd';
import bem from 'easy-bem';
import React, { useState } from 'react';

import { ICreateConnector, IModule } from '~/pages/merchants/interfaces';
import { CardConnector, CreateEditConnector } from '~/pages/merchants/Merchant/ui';
import { CardComponent, ModalComponent } from '~/shared/ui';

import './CardEVSEModule.scss';

const CardEVSEModule: React.FC<{
  module: IModule;
  stationId: number;
  onAddConnector: (evse_id: number, connector: ICreateConnector) => void;
  onEditConnector: (evse_id: number, connectorId: number, connector: ICreateConnector) => void;
  onRemoveModule: () => void;
  onRemoveConnector: (evse_id: number, connector_id: number) => void;
}> = ({
  module,
  stationId,
  onRemoveModule,
  onRemoveConnector,
  onAddConnector,
  onEditConnector,
}) => {
  const b = bem('CardModule');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ICreateConnector>({
    evse_id: module.evse_id,
    fee: '',
    power_kWh: 0,
    ocpp_16_id: 0,
    connector_id: 0,
    typo: '',
    position: 1,
    cable_length: 0,
  });
  const [error, setError] = useState<boolean>(false);

  const showModalConnector = () => {
    setIsModalOpen(true);
  };
  const handleCreateEditConnector = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormChange = (key: string, value: string | number | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const onFinish = async () => {
    try {
      if (formData.id) {
        onEditConnector(module.evse_id, formData.id, formData);
      } else {
        onAddConnector(module.evse_id, formData);
      }

      setFormData({
        evse_id: module.evse_id,
        fee: '',
        power_kWh: 0,
        ocpp_16_id: 0,
        connector_id: 0,
        typo: '',
        position: 1,
        cable_length: 0,
      });
      handleCreateEditConnector();
    } catch (error) {
      if (error) {
        setError(true);
      }
    }
  };

  return (
    <>
      <CardComponent className={b()}>
        <h4 className={b('title-module')}>Модуль EVSE#{module.evse_id}</h4>
        {module.connectors.length ? (
          <Button className={b('add-connector-btn')} type='link' onClick={showModalConnector}>
            + Добавить коннектор
          </Button>
        ) : (
          <Button className={b('remove-module-btn')} onClick={onRemoveModule} />
        )}

        {!!module.connectors.length &&
          module.connectors.map((connector, index) => (
            <CardConnector
              connector={connector}
              setConnector={setFormData}
              onRemoveConnector={onRemoveConnector}
              onEditConnector={handleCreateEditConnector}
              key={index}
            />
          ))}
        {!module.connectors.length && (
          <Button style={{ padding: 0 }} type='link' onClick={showModalConnector}>
            + Добавить коннектор
          </Button>
        )}
      </CardComponent>

      <ModalComponent
        width={352}
        title={'Коннектор'}
        closeIcon
        isModalOpen={isModalOpen}
        handleOk={handleCreateEditConnector}
        handleCancel={handleCreateEditConnector}
        className={b('modal-connector')}
      >
        <CreateEditConnector
          stationId={stationId}
          onAddConnector={onAddConnector}
          handleFormChange={handleFormChange}
          onFinish={onFinish}
          error={error}
        />
      </ModalComponent>
    </>
  );
};

export default CardEVSEModule;
