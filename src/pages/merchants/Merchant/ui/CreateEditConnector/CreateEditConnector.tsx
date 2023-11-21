import { Button, Form } from 'antd';
import bem from 'easy-bem';
import React, { ChangeEvent } from 'react';

import { ICreateConnector } from '~/pages/merchants/interfaces';
import { TextBlock } from '~/pages/merchants/Merchant/ui';
import { FormField } from '~/shared/ui';

import './CreateEditConnector.scss';

const CreateEditConnector: React.FC<{
  onAddConnector: (evse_id: number, connector: ICreateConnector) => void;
  onFinish: () => void;
  handleFormChange: (key: string, value: string | number | boolean) => void;
  stationId: number;
  error: boolean;
}> = ({ stationId, error, onFinish, handleFormChange }) => {
  const b = bem('CreateEditConnector');
  const [form] = Form.useForm();

  const typo = [
    {
      id: 'cCCS1',
      name: 'cCCS1',
    },
    {
      id: 'cCCS2',
      name: 'cCCS2',
    },
    {
      id: 'cG105',
      name: 'CHAdeMO',
    },
    {
      id: 'cType1',
      name: 'Type 1',
    },
    {
      id: 'cType2',
      name: 'c Type 2',
    },
    {
      id: 'sType2',
      name: 'Type 2',
    },
    {
      id: 'GBTAC',
      name: 'GB/T (AC)',
    },
    {
      id: 'GBTDC',
      name: 'GB/T (DC)',
    },
  ];

  return (
    <>
      <div className={b()}>
        {stationId && (
          <TextBlock styleText={{ marginBottom: '24px' }} title='ID станции' text={stationId} />
        )}
        <Form
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
          size='middle'
        >
          <FormField
            customStyle={{ width: '100%' }}
            type='select'
            data-testid='typo_id'
            id='typo_id'
            name='typo'
            placeholder={'Тип разъема'}
            label={'Тип разъема'}
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
            options={typo}
            error={error}
            handleChange={(value: string | number | boolean) => handleFormChange('typo', value)}
          />
          <FormField
            data-testid='power_kWh_id'
            id='power_kWh_id'
            name='power_kWh'
            placeholder={'Мощность коннектора'}
            label={'Мощность коннектора'}
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
            error={error}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormChange('power_kWh', e.target.value)
            }
          />
          <div className={b('rate-connector')}>
            <FormField
              data-testid='fee_id'
              id='fee_id'
              name='fee'
              placeholder={'Персональный тариф'}
              label={'Персональный тариф'}
              addonAfter='сом за 1 кВтч за 1 мин'
              inputType='number'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFormChange('fee', e.target.value)
              }
            />
            <p>
              *Вы можете добавить персональный тариф, или пропустить, тогда тариф будет установлен
              по умолчанию
            </p>
          </div>
          <FormField
            data-testid='fee_id'
            id='fee_id'
            placeholder={'Тариф по умолчанию'}
            label={'Тариф по умолчанию'}
            disabled
            defaultValue='50'
            addonAfter='сом за 1 кВтч за 1 мин'
          />
          <FormField
            data-testid='cable_length_id'
            id='cable_length_id'
            name='cable_length'
            placeholder={'Длина кабеля'}
            label={'Длина кабеля'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormChange('cable_length', e.target.value)
            }
          />
        </Form>
      </div>
      <Button className={b('add-connector-btn')} type='primary' onClick={onFinish}>
        Сохранить
      </Button>
    </>
  );
};

export default CreateEditConnector;
