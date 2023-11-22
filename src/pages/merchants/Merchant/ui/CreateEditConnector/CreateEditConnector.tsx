import { Button, Form } from 'antd';
import bem from 'easy-bem';
import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { ICreateConnector } from '~/pages/merchants/interfaces';
import { TextBlock } from '~/pages/merchants/Merchant/ui';
import { FormField } from '~/shared/ui';

import './CreateEditConnector.scss';

interface Props {
  onAddConnector: (evse_id: number, connector: ICreateConnector) => void;
  onFinish: () => void;
  handleFormChange: (key: string, value: string | number | boolean) => void;
  stationId?: number | string;
  error: boolean;
}

const CreateEditConnector: React.FC<Props> = ({ stationId, error, onFinish, handleFormChange }) => {
  const b = bem('CreateEditConnector');
  const { t } = useTranslation();
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
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.id_station')}
            text={stationId}
          />
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
            placeholder={t('merchants.connector_type')}
            label={t('merchants.connector_type')}
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
            placeholder={t('merchants.connector_power')}
            label={t('merchants.connector_power')}
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
              placeholder={t('merchants.personal_tariff')}
              label={t('merchants.personal_tariff')}
              addonAfter={t('merchants.tariff_kwh')}
              inputType='number'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFormChange('fee', e.target.value)
              }
            />
            <p>{t('merchants.warning_personal_tariff')}</p>
          </div>
          <FormField
            data-testid='fee_id'
            id='fee_id'
            placeholder={t('merchants.default_tariff')}
            label={t('merchants.default_tariff')}
            disabled
            defaultValue='50'
            addonAfter={t('merchants.tariff_kwh')}
          />
          <FormField
            data-testid='cable_length_id'
            id='cable_length_id'
            name='cable_length'
            placeholder={t('merchants.length_of_cable')}
            label={t('merchants.length_of_cable')}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFormChange('cable_length', e.target.value)
            }
          />
        </Form>
      </div>
      <Button className={b('add-connector-btn')} type='primary' onClick={onFinish}>
        {t('merchants.save')}
      </Button>
    </>
  );
};

export default CreateEditConnector;
