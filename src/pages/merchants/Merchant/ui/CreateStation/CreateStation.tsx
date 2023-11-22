import { Button, Form, Radio, Typography } from 'antd';
import bem from 'easy-bem';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { eng, kg, rus } from '~/assets/images';
import { ICreateConnector, ICreateMerchant, IModule } from '~/pages/merchants/interfaces';
import { CardEVSEModule } from '~/pages/merchants/Merchant/ui';
import { commonStore, merchantStore } from '~/shared/api/store';
import { useCurrentLocale } from '~/shared/hooks';
import {
  ActiveInactiveModal,
  AlertComponent,
  BreadcrumbComponent,
  CardComponent,
  FormField,
  ModalComponent,
  UploadFile,
} from '~/shared/ui';
import { getParams } from '~/shared/utils';

import './CreateStation.scss';

const { Title, Text } = Typography;

const languageItems = [
  { name: 'Кыргызский', value: 'ky', lang: 'Кыргызча', icon: kg },
  { name: 'Русский', value: 'ru', lang: 'Орусча', icon: rus },
  { name: 'Английский', value: 'en', lang: 'Англисча', icon: eng },
];

const CreateStation = observer(() => {
  const b = bem('CreateStation');
  const { t } = useTranslation();
  const { id: merchantId } = useParams();
  const { stationId } = useParams();
  const {
    countries,
    countriesLoading,
    settlements,
    settlementsLoading,
    districts,
    districtsLoading,
  } = toJS(commonStore);
  const { createMerchantSuccess } = toJS(merchantStore);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const currentLocale = useCurrentLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);
  const [formData, setFormData] = useState<ICreateMerchant>({
    active: false,
    name_ru: '',
    name_en: '',
    name_ky: '',
    legal_name_ru: '',
    legal_name_en: '',
    legal_name_ky: '',
    rate: '',
    agreement_number: '',
    address_ru: '',
    address_en: '',
    address_ky: '',
    phone: '',
    email: '',
    country: 0,
    district: 0,
    city: 0,
  });
  const [error, setError] = useState<boolean>(false);
  const isCountrySelected = formData.country && formData.country !== 0;
  const isCitySelected = formData.city && formData.city !== 0;
  const [previousSelectedLanguage, setPreviousSelectedLanguage] = useState(selectedLanguage);
  const [radioButtonStates, setRadioButtonStates] = useState({
    ru: false,
    en: false,
    ky: false,
  });
  const isAllSelected = Object.values(radioButtonStates).every((value) => value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [modules, setModules] = useState<IModule[]>([]);

  const items = [
    { title: t('merchants.merchant'), href: `/merchants/merchant/${merchantId}` },
    {
      title: t('merchants.create_station'),
      href: `/merchants/merchant/${merchantId}/create-station`,
    },
  ];

  useEffect(() => {
    if (createMerchantSuccess) {
      setError(false);
      showSuccessModal();
    }
    return () => {
      merchantStore.createMerchantSuccess = false;
    };
  }, [createMerchantSuccess]);

  useEffect(() => {
    let locationType;

    switch (true) {
      case !isCountrySelected && !isCitySelected:
        locationType = 'countries';
        break;
      case isCountrySelected && !isCitySelected:
        locationType = 'settlements';
        break;
      case isCitySelected:
        locationType = 'districts';
        break;
      default:
        return;
    }

    const queryString = getParams({ location_type: locationType });
    commonStore.fetchLocations(queryString);
  }, [isCountrySelected, isCitySelected]);

  const executionTypes = [
    {
      id: 0,
      name: 'wall',
    },
    {
      id: 1,
      name: 'floor',
    },
    {
      id: 2,
      name: 'mobile',
    },
  ];

  const handleFormChange = (key: string, value: string | number | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleNextLanguage = async () => {
    try {
      await form.validateFields();
      setError(false);
      let nextLanguageIndex =
        sortedLanguageItems.findIndex((item) => item.value === selectedLanguage) + 1;
      if (nextLanguageIndex >= sortedLanguageItems.length) {
        nextLanguageIndex = 0;
      }

      const currentLanguage = selectedLanguage;
      const previousLanguage = previousSelectedLanguage;
      setRadioButtonStates((prevState) => ({
        ...prevState,
        [currentLanguage]: true,
        [previousLanguage]: true,
      }));

      setPreviousSelectedLanguage(currentLanguage);
      setSelectedLanguage(sortedLanguageItems[nextLanguageIndex].value);
    } catch (errorInfo) {
      setError(true);
    }
  };

  const sortedLanguageItems = useMemo(() => {
    return languageItems.sort((a, b) => {
      if (a.value === currentLocale) return -1;
      if (b.value === currentLocale) return 1;
      return 0;
    });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOkCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAgreeHandler = () => {
    navigate('/merchants');
  };

  const showSuccessModal = () => {
    setIsModalSuccessOpen(true);
  };

  const handleOkSuccessCancel = () => {
    setIsModalSuccessOpen(!isModalOpen);
  };

  const onFinish = async () => {
    try {
      await merchantStore.postCreateMerchant(formData);
    } catch (error) {
      if (error) {
        setError(true);
      }
    }
  };

  const addModule = () => {
    setModules((prevModules) => [
      ...prevModules,
      {
        evse_id: prevModules.length + 1,
        connectors: [],
      },
    ]);
  };

  const removeModule = (evseId: number) => {
    const updatedModules = modules
      .filter((module) => module.evse_id !== evseId)
      .map((module, index) => {
        module.evse_id = index + 1;
        module.connectors.map((connector) => (connector.evse_id = index + 1));
        return module;
      });
    setModules(updatedModules);
  };

  const removeConnector = (evseId: number, connectorId: number) => {
    const moduleIndex = modules.findIndex((module) => module.evse_id === evseId);
    const updatedConnectors = modules[moduleIndex].connectors
      .filter((connector) => connector.connector_id !== connectorId)
      .map((connector, index) => {
        connector.connector_id = index + 1;
        return connector;
      });
    const updatedModules = [...modules];
    updatedModules[moduleIndex].connectors = updatedConnectors;
    setModules(updatedModules);
  };

  const addConnector = (evseId: number, connector: ICreateConnector) => {
    const moduleIndex = modules.findIndex((module) => module.evse_id === evseId);
    if (moduleIndex !== -1) {
      const newConnector: ICreateConnector = connector;
      newConnector.evse_id = evseId;
      newConnector.connector_id = modules[moduleIndex].connectors.length + 1;
      const updatedModules = [...modules];
      updatedModules[moduleIndex].connectors.push(newConnector);
      setModules(updatedModules);
    }
  };

  const onEditConnector = (evseId: number, connectorId: number, connector: ICreateConnector) => {
    const moduleIndex = modules.findIndex((module) => module.evse_id === evseId);
    if (moduleIndex !== -1) {
      const connectorIndex = modules[moduleIndex].connectors.findIndex(
        ({ id }) => id === connectorId,
      );
      const updatedModules = [...modules];
      updatedModules[moduleIndex].connectors[connectorIndex] = connector;
      setModules(updatedModules);
    }
  };

  return (
    <div className={b()}>
      <BreadcrumbComponent items={items} />
      <div className={b('cards-block')}>
        <CardComponent>
          <Title level={3} style={{ margin: 0 }}>
            {t('merchants.create_station')}
          </Title>

          {error && (
            <AlertComponent
              className={b('alert-styles')}
              message={t('alerts.incorrectly_filled_field') as string}
              description={t('alerts.one_or_more_of_the_required_fields_are_not_filled') as string}
              type='error'
              showIcon
              closable
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
            <p className={b('info')}>{t('merchants.station_information')}</p>
            <div className={b('display-block')}>
              <FormField
                data-testid='name_id'
                id='name_id'
                name={`name_${selectedLanguage}`}
                placeholder={t('merchants.name')}
                label={t('merchants.name')}
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                error={error}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange(`name_${selectedLanguage}`, e.target.value)
                }
              />
              <FormField
                data-testid='pic_id'
                id='pic_id'
                name={`pic`}
                placeholder={t('merchants.responsible_person')}
                label={t('merchants.responsible_person')}
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                error={error}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange(`pic`, e.target.value)
                }
              />
            </div>
            <div className={b('display-block')}>
              <FormField
                data-testid='identity_id'
                id='identity_id'
                name='identity'
                placeholder={'UID'}
                label={'UID'}
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                error={error}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange('identity', e.target.value)
                }
              />
              <FormField
                data-testid='password_id'
                id='password_id'
                name='password'
                type='password'
                placeholder={t('merchants.password_station')}
                label={t('merchants.password_station')}
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                error={error}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange('password', e.target.value)
                }
              />
            </div>
            <div className={b('display-block')}>
              <FormField
                data-testid='schedule_id'
                id='schedule_id'
                name='schedule'
                placeholder={t('merchants.operating_mode')}
                F
                label={t('merchants.operating_mode')}
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                error={error}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange('schedule', e.target.value)
                }
              />
              <FormField
                data-testid='environment_id'
                id='environment_id'
                name='environment'
                className={b('infra-label')}
                placeholder={t('merchants.infrastructure_around_stations')}
                label={t('merchants.infrastructure_around_stations')}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange('environment', e.target.value)
                }
              />
            </div>
            <div className={b('display-block')}>
              <FormField
                data-testid='tags_id'
                id='tags_id'
                name='tags'
                placeholder={t('merchants.tag')}
                label={t('merchants.tag')}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange('tags', e.target.value)
                }
              />
            </div>

            <p className={b('info')}>{t('merchants.column_information')}</p>
            <FormField
              data-testid='manufacturer_id'
              id='manufacturer_id'
              name='manufacturer'
              placeholder={t('merchants.manufacturer_stations')}
              label={t('merchants.manufacturer_stations')}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFormChange('manufacturer', e.target.value)
              }
            />

            <FormField
              data-testid='execution_type_id'
              id='execution_type_id'
              type='select'
              options={executionTypes}
              name='execution_type'
              label={t('merchants.execution_type')}
              placeholder={t('merchants.execution_type')}
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
              error={error}
              handleChange={(value: string | number | boolean) =>
                handleFormChange('execution_type', value)
              }
            />

            <p className={b('info')}>{t('merchants.information_about_evse_modules')}</p>
            <Button className={b('add-evse')} type='link' onClick={addModule}>
              {t('merchants.add_evse_module')}
              <span style={{ color: '#FF4B55' }}>*</span>
            </Button>
            {!!modules.length &&
              modules.map((module, index) => (
                <CardEVSEModule
                  key={index}
                  stationId={Number(stationId)}
                  module={module}
                  onRemoveModule={() => removeModule(module.evse_id)}
                  onRemoveConnector={removeConnector}
                  onAddConnector={addConnector}
                  onEditConnector={onEditConnector}
                />
              ))}
            <p className={b('info-module')}>
              *Если ваша станция может заряжать всеми коннекторами одновременно, то на один модуль
              EVSE приходится по одному коннектору.
            </p>

            <p className={b('info')}>{t('merchants.location')}</p>
            <div className={b('display-block')}>
              <div>
                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='country_id'
                  id='country_id'
                  name='country'
                  placeholder={t('merchants.country')}
                  label={t('merchants.country')}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  loading={countriesLoading}
                  error={error}
                  options={countries}
                  handleChange={(value: string | number | boolean) =>
                    handleFormChange('country', value)
                  }
                />

                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='district_id'
                  id='district_id'
                  name='district'
                  placeholder={t('merchants.district')}
                  label={t('merchants.district')}
                  loading={districtsLoading}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  error={error}
                  disabled={!isCitySelected}
                  options={districts}
                  handleChange={(value: string | number | boolean) =>
                    handleFormChange('district', value)
                  }
                />
                <FormField
                  customStyle={{ width: '100%' }}
                  data-testid='latitude_id'
                  id='latitude_id'
                  name='latitude'
                  placeholder={t('merchants.latitude')}
                  label={t('merchants.latitude')}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  error={error}
                  disabled={!isCitySelected}
                  handleChange={(value: string | number | boolean) =>
                    handleFormChange('district', value)
                  }
                />
                <Button
                  className={b('point-btn')}
                  type='primary'
                  onClick={() => console.log('[OPEN_MAP]')}
                >
                  {t('merchants.select_on_map')}
                </Button>
              </div>
              <div>
                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='city_id'
                  id='city_id'
                  name='city'
                  loading={settlementsLoading}
                  placeholder={t('merchants.city')}
                  label={t('merchants.city')}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  error={error}
                  disabled={!isCountrySelected}
                  options={settlements}
                  handleChange={(value: string | number | boolean) =>
                    handleFormChange('city', value)
                  }
                />
                <FormField
                  data-testid='address_id'
                  id='address_id'
                  name={`address_${selectedLanguage}`}
                  placeholder={t('merchants.address')}
                  label={t('merchants.address')}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  error={error}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormChange(`address_${selectedLanguage}`, e.target.value)
                  }
                />
                <FormField
                  customStyle={{ width: '100%' }}
                  data-testid='longitude_id'
                  id='longitude_id'
                  name='longitude'
                  placeholder={t('merchants.longitude')}
                  label={t('merchants.longitude')}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  error={error}
                  disabled={!isCitySelected}
                  handleChange={(value: string | number | boolean) =>
                    handleFormChange('longitude', value)
                  }
                />
              </div>
            </div>

            <div className={b('upload-block')}>
              <UploadFile />
              <p className={b('warning-text')}>
                {t('merchants.maximum_size_files')}
                <br /> {t('merchants.available_format_files')}
                <br /> {t('merchants.maximum_number_of__files')}
              </p>
            </div>

            <div className={b('switch-block')}>
              <FormField
                type='switch'
                data-testid='status_id'
                id='status_id'
                name='status'
                text={t('merchants.active')}
                label={t('merchants.status')}
                onChange={(checked: boolean) => handleFormChange('status', checked)}
              />
              <FormField
                type='switch'
                data-testid='is_new_id'
                id='is_new_id'
                name='is_new'
                text={t('merchants.active')}
                label={t('merchants.new_station')}
                onChange={(checked: boolean) => handleFormChange('is_new', checked)}
              />
            </div>
          </Form>
        </CardComponent>
        <CardComponent className={b('lang-block')}>
          <Title level={4} style={{ margin: 0 }}>
            {t('merchants.data_must_be_provided_in_several_languages')}
          </Title>
          <Text style={{ marginBottom: 20 }}>
            {t('merchants.for_correct_display_in_user_applications')}
          </Text>
          <Radio.Group style={{ width: 260 }} value={selectedLanguage}>
            {sortedLanguageItems.map((item) => {
              const isChecked =
                radioButtonStates[item.value as keyof typeof radioButtonStates] || false;

              return (
                <CardComponent
                  className={
                    b('language-item') +
                    (item.value === selectedLanguage && !isAllSelected ? ' active-border' : '')
                  }
                  key={item.name}
                >
                  <img src={item.icon} alt={item.name} />
                  <div className={b('button-info')}>
                    <Text style={{ margin: 0 }}>{item.name}</Text>
                    <Text type='secondary' style={{ margin: 0 }}>
                      {item.lang}
                    </Text>
                  </div>
                  <Radio
                    value={item.value}
                    className={`radio-styles ${isChecked ? 'radio-group-button' : ''}`}
                    checked={isChecked}
                  />
                </CardComponent>
              );
            })}
          </Radio.Group>
          <div className={b('button-block')}>
            {isAllSelected ? (
              <Button type='primary' onClick={onFinish}>
                {t('merchants.create')}
              </Button>
            ) : (
              <Button type='primary' onClick={handleNextLanguage}>
                {t('merchants.further')}
              </Button>
            )}
            <Button type='default' className={b('cancel-button')} onClick={showModal}>
              {t('merchants.cancel')}
            </Button>
          </div>
        </CardComponent>
      </div>

      <ModalComponent
        width={400}
        isModalOpen={isModalOpen}
        handleOk={handleOkCancel}
        handleCancel={handleOkCancel}
      >
        <ActiveInactiveModal
          textTitle={t('modals.are_you_sure_you_want_to_cancel_your_changes') as string}
          infoText={t('modals.after_cancellation_all_data_will_be_lost') as string}
          handleOkCancel={handleOkCancel}
          handleAgreeHandler={handleAgreeHandler}
        />
      </ModalComponent>

      <ModalComponent
        width={400}
        isModalOpen={isModalSuccessOpen}
        handleOk={handleOkSuccessCancel}
        handleCancel={handleOkSuccessCancel}
      >
        <ActiveInactiveModal
          hasCancelButton={false}
          successModal
          textTitle={t('modals.merchant_has_been_created') as string}
          infoText={t('modals.a_new_merchant_account_has_been_successfully_created') as string}
          handleOkCancel={handleOkSuccessCancel}
          handleAgreeHandler={handleAgreeHandler}
        />
      </ModalComponent>

      <ModalComponent
        width={400}
        isModalOpen={isModalSuccessOpen}
        handleOk={handleOkSuccessCancel}
        handleCancel={handleOkSuccessCancel}
      >
        <ActiveInactiveModal
          hasCancelButton={false}
          successModal
          textTitle={t('modals.merchant_has_been_created') as string}
          infoText={t('modals.a_new_merchant_account_has_been_successfully_created') as string}
          handleOkCancel={handleOkSuccessCancel}
          handleAgreeHandler={handleAgreeHandler}
        />
      </ModalComponent>
    </div>
  );
});

export default CreateStation;
