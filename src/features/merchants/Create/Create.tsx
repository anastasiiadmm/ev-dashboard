import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bem from 'easy-bem';
import { Button, Form, Radio, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useTranslation } from 'react-i18next';

import { eng, kg, rus } from '~/assets/images';
import {
  ActiveInactiveModal,
  AlertComponent,
  BreadcrumbComponent,
  CardComponent,
  FormField,
  ModalComponent,
} from '~/shared/ui';
import { useCurrentLocale } from '~/shared/hooks';
import { ICreateMerchant } from '~/features/merchants/interfaces';
import { commonStore, merchantStore } from '~/shared/api/store';
import { getParams } from '~/shared/utils/helper';
import './Create.scss';

const { Title, Text } = Typography;

const languageItems = [
  { name: 'Кыргызский', value: 'ky', lang: 'Кыргызча', icon: kg },
  { name: 'Русский', value: 'ru', lang: 'Орусча', icon: rus },
  { name: 'Английский', value: 'en', lang: 'Англисча', icon: eng },
];

const Create = observer(() => {
  const b = bem('Create');
  const { t } = useTranslation();
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

  const items = [
    { title: t('merchants.merchants'), href: '/merchants' },
    { title: t('merchants.create_merchant'), href: '/merchants/create-merchant' },
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

  return (
    <div className={b('')} data-testid='create-component'>
      <BreadcrumbComponent items={items} />
      <div className={b('cards-block')}>
        <CardComponent>
          <Title level={3} style={{ margin: 0 }}>
            {t('merchants.create_merchant')}
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
            <p className={b('info')}>{t('merchants.merchant_information')}</p>
            <div className={b('display-block')}>
              <div>
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
                  data-testid='document_id'
                  id='document_id'
                  name='agreement_number'
                  placeholder={t('merchants.contract_no')}
                  label={t('merchants.contract_no')}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  error={error}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormChange('agreement_number', e.target.value)
                  }
                />
              </div>
              <div>
                <FormField
                  data-testid='legal_name'
                  id='legal_name'
                  name={`legal_name_${selectedLanguage}`}
                  placeholder={t('merchants.entity_full')}
                  label={t('merchants.entity_full')}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  error={error}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormChange(`legal_name_${selectedLanguage}`, e.target.value)
                  }
                />

                <FormField
                  data-testid='percent_id'
                  id='percent_id'
                  name='rate'
                  inputType='number'
                  placeholder={t('merchants.under_agency_agreement')}
                  label={t('merchants.under_agency_agreement')}
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  error={error}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormChange('rate', e.target.value)
                  }
                />
              </div>
            </div>

            <p className={b('info')}>{t('merchants.contacts')}</p>
            <div className={b('display-block')}>
              <FormField
                type='phone'
                data-testid='phone_id'
                id='phone_id'
                name='phone'
                placeholder={t('merchants.phone')}
                label={t('merchants.phone')}
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                error={error}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange('phone', e.target.value)
                }
              />

              <FormField
                data-testid='email_id_login'
                type='email'
                id='email_id'
                name='email'
                label={t('merchants.your_email')}
                placeholder={t('merchants.your_email')}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange('email', e.target.value)
                }
              />
            </div>

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
              </div>
              <div>
                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='settlements_id'
                  id='settlements_id'
                  name='settlements'
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
                  placeholder={t('merchants.street')}
                  label={t('merchants.street')}
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
              </div>
            </div>

            <FormField
              type='switch'
              data-testid='active_id'
              id='active_id'
              name='active'
              text={t('merchants.active')}
              label={t('merchants.status')}
              onChange={(checked: boolean) => handleFormChange('active', checked)}
            />
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
    </div>
  );
});

export default Create;
