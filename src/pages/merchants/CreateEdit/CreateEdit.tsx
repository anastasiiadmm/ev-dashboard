import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bem from 'easy-bem';
import { Button, Form, Radio, Skeleton, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { eng, kg, rus } from '~/assets/images';
import {
  ActiveInactiveModal,
  AlertComponent,
  BreadcrumbComponent,
  CardComponent,
  FormField,
  ModalComponent,
} from '~/shared/ui';
import { useCurrentLocale, useModal } from '~/shared/hooks';
import { ICreateMerchant } from '~/pages/merchants/interfaces';
import { commonStore, merchantStore } from '~/shared/api/store';
import { getParams } from '~/shared/utils';
import { TextBlock } from '~/pages/merchants/Merchant/ui';
import './CreateEdit.scss';

const { Title, Text } = Typography;

const languageItems = [
  { name: 'Кыргызский', value: 'ky', lang: 'Кыргызча', icon: kg },
  { name: 'Русский', value: 'ru', lang: 'Орусча', icon: rus },
  { name: 'Английский', value: 'en', lang: 'Англисча', icon: eng },
];

const CreateEdit = observer(() => {
  const b = bem('CreateEdit');
  const { t } = useTranslation();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { countries, countriesLoading, settlements, settlementsLoading } = toJS(commonStore);
  const {
    createMerchantSuccess,
    merchantDetailForUpdate,
    merchantDetailForUpdateLoading,
    patchMerchantSuccess,
    patchMerchantLoading,
  } = toJS(merchantStore);
  const navigate = useNavigate();
  const currentLocale = useCurrentLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);
  const [previousSelectedLanguage, setPreviousSelectedLanguage] = useState(selectedLanguage);
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
    city: 0,
  });
  const [updatedData, setUpdatedData] = useState<ICreateMerchant | null>(null);
  const [error, setError] = useState<boolean>(false);
  const isCountrySelected = formData.country && formData.country !== 0;
  const isCitySelected = formData.city && formData.city !== 0;
  const [radioButtonStates, setRadioButtonStates] = useState({
    ru: false,
    en: false,
    ky: false,
  });
  const isAllSelected = Object.values(radioButtonStates).every((value) => value);
  const { isModalOpen, showModal, handleOkCancel } = useModal(false);
  const {
    isModalOpen: isModalSuccessOpen,
    showModal: showSuccessModal,
    handleOkCancel: handleOkSuccessCancel,
  } = useModal(false);

  const items = [
    { title: t('merchants.merchants'), href: '/merchants' },
    {
      title: id ? t('merchants.edit_merchant') : t('merchants.create_merchant'),
      href: `/merchants/create-edit-merchant/${id ? id : ''}`,
    },
  ];

  useEffect(() => {
    if (id) {
      merchantStore.getMerchantDetailForUpdate(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (createMerchantSuccess) {
      setError(false);
      showSuccessModal();
    }
    return () => {
      merchantStore.setCreateMerchantStatusesSuccess(false);
    };
  }, [createMerchantSuccess]);

  useEffect(() => {
    if (patchMerchantSuccess && id) {
      setError(false);
      showSuccessModal();
    }
    return () => {
      merchantStore.setPatchMerchantStatusesSuccess(false);
    };
  }, [id, patchMerchantSuccess]);

  useEffect(() => {
    if (!id || !merchantDetailForUpdate) return;

    const fetchLocationData = (locationType: string) => {
      const queryString = getParams({ location_type: locationType });
      commonStore.fetchLocations(queryString);
    };

    if (!countries) {
      fetchLocationData('countries');
    } else if (!settlements) {
      fetchLocationData('settlements');
    }
  }, [merchantDetailForUpdate]);

  useEffect(() => {
    let locationType;

    switch (true) {
      case !id && !isCountrySelected && !isCitySelected:
        locationType = 'countries';
        break;
      case !id && isCountrySelected && !isCitySelected:
        locationType = 'settlements';
        break;
      default:
        return;
    }

    const queryString = getParams({ location_type: locationType });
    commonStore.fetchLocations(queryString);
  }, [isCountrySelected, isCitySelected, id]);

  const handleFormChange = (key: string, value: string | number | boolean) => {
    if (id) {
      setUpdatedData({
        ...(updatedData as ICreateMerchant),
        [key]: value,
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
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

  const handleAgreeHandler = () => {
    navigate('/merchants');
  };

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
  };

  const getLanguageItemClassName = (itemValue: string) => {
    const isActiveBorder =
      (itemValue === selectedLanguage && !isAllSelected) || (id && itemValue === selectedLanguage);

    return b('language-item') + (isActiveBorder ? ' active-border' : '');
  };

  const onFinish = async () => {
    try {
      await form.validateFields();
      setError(false);
      if (id) {
        await merchantStore.patchMerchant(id, updatedData);
      } else {
        await merchantStore.postCreateMerchant(formData);
      }
    } catch (error) {
      if (error) {
        setError(true);
      }
    }
  };

  return (
    <div className={b('')} data-testid='create-component'>
      <BreadcrumbComponent items={items} />
      {merchantDetailForUpdateLoading ? (
        <Skeleton style={{ marginTop: 20 }} />
      ) : (
        <div className={b('cards-block')}>
          <CardComponent>
            <Title level={3} style={{ margin: 0 }}>
              {id ? t('merchants.edit_merchant') : t('merchants.create_merchant')}
            </Title>

            {error && (
              <AlertComponent
                className={b('alert-styles')}
                message={t('alerts.incorrectly_filled_field') as string}
                description={
                  t('alerts.one_or_more_of_the_required_fields_are_not_filled') as string
                }
                type='error'
                showIcon
                closable
              />
            )}

            <Form
              form={form}
              initialValues={merchantDetailForUpdate || {}}
              onFinish={onFinish}
              autoComplete='off'
              layout='vertical'
              size='middle'
            >
              {id && (
                <TextBlock
                  styleBlock={{ marginTop: 15 }}
                  styleText={{ marginBottom: 20 }}
                  title={t('merchants.merchant_id') as string}
                  text={id}
                />
              )}

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
                    placeholder={t('merchants.agreement_number')}
                    label={t('merchants.agreement_number')}
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
                <div>
                  <FormField
                    customStyle={{ width: '100%' }}
                    type='select'
                    data-testid='settlements_id'
                    id='settlements_id'
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
                    disabled={!id && !isCountrySelected}
                    options={settlements}
                    handleChange={(value: string | number | boolean) =>
                      handleFormChange('city', value)
                    }
                  />
                </div>
              </div>

              <FormField
                type='switch'
                data-testid='active_id'
                id='active_id'
                name='active'
                defaultChecked={id ? merchantDetailForUpdate?.active : false}
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
            <Radio.Group
              style={{ width: 260 }}
              onChange={(e) => id && handleLanguageSelect(e.target.value)}
              value={selectedLanguage}
            >
              {sortedLanguageItems.map((item) => {
                const isChecked =
                  radioButtonStates[item.value as keyof typeof radioButtonStates] || false;

                return (
                  <CardComponent className={getLanguageItemClassName(item.value)} key={item.name}>
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
                <Button type='primary' onClick={onFinish} loading={patchMerchantLoading}>
                  {id ? t('merchants.save') : t('merchants.create')}
                </Button>
              ) : (
                <Button type='primary' data-testid='further-button' onClick={handleNextLanguage}>
                  {t('merchants.further')}
                </Button>
              )}
              <Button type='default' className={b('cancel-button')} onClick={showModal}>
                {t('merchants.cancel')}
              </Button>
            </div>
          </CardComponent>
        </div>
      )}

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
          textTitle={
            id
              ? (t('merchants.changes_saved') as string)
              : (t('modals.merchant_has_been_created') as string)
          }
          infoText={
            id
              ? (t('merchants.the_merchant_account_has_been_successfully_updated') as string)
              : (t('modals.a_new_merchant_account_has_been_successfully_created') as string)
          }
          handleOkCancel={handleOkSuccessCancel}
          handleAgreeHandler={handleAgreeHandler}
        />
      </ModalComponent>
    </div>
  );
});

export default CreateEdit;
