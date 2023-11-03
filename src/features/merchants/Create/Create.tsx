import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import bem from 'easy-bem';
import { Button, Form, Radio, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { eng, kg, rus } from '~/assets/images';
import { AlertComponent, BreadcrumbComponent, CardComponent, FormField } from '~/shared/ui';
import { useCurrentLocale } from '~/shared/hooks';
import { ICreateMerchant } from '~/features/merchants/interfaces';
import { commonStore } from '~/shared/api/store';
import { getParams } from '~/shared/utils/helper';
import './Create.scss';

const { Title, Text } = Typography;

const languageItems = [
  { name: 'Кыргызский', value: 'ky', lang: 'Кыргызча', icon: kg },
  { name: 'Русский', value: 'ru', lang: 'Орусча', icon: rus },
  { name: 'Английский', value: 'en', lang: 'Англисча', icon: eng },
];

const items = [
  { title: 'Мерчанты', href: '/merchants' },
  { title: 'Создание мерчанта', href: '/merchants/create-merchant' },
];

const Create = observer(() => {
  const b = bem('Create');
  const {
    countries,
    countriesLoading,
    settlements,
    settlementsLoading,
    districts,
    districtsLoading,
  } = toJS(commonStore);
  const [form] = Form.useForm();
  const currentLocale = useCurrentLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);
  const [formData, setFormData] = useState<ICreateMerchant>({
    active: true,
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
  }, [currentLocale]);

  const onFinish = () => {
    // try {
    //   if (isAllSelected && !error) {
    //   }
    // } catch (e) {}
  };

  return (
    <div className={b('')}>
      <BreadcrumbComponent items={items} />
      <div className={b('cards-block')}>
        <CardComponent>
          <Title level={3} style={{ margin: 0 }}>
            Создание мерчанта
          </Title>

          {error && (
            <AlertComponent
              className={b('alert-styles')}
              message='Неправильно заполненное поле'
              description='Одно или несколько из обязательных полей не заполнено или содержит неверные данные, проверьте введенные данные.'
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
            <p className={b('info')}>Информация о мерчанте</p>
            <div className={b('display-block')}>
              <div>
                <FormField
                  data-testid='name_id'
                  id='name_id'
                  name={`name_${selectedLanguage}`}
                  placeholder='Наименование'
                  label='Наименование'
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
                  placeholder='№ договора'
                  label='№ договора'
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
                  placeholder='Юридическое лицо'
                  label='Юридическое лицо'
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
                  placeholder='% по агентскому договору'
                  label='% по агентскому договору'
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

            <p className={b('info')}>Контакты</p>
            <div className={b('display-block')}>
              <FormField
                type='phone'
                data-testid='phone_id'
                id='phone_id'
                name='phone'
                placeholder='Телефон'
                label='Телефон'
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
                label='Ваш email'
                placeholder='Введите email'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange('email', e.target.value)
                }
              />
            </div>

            <p className={b('info')}>Локация</p>
            <div className={b('display-block')}>
              <div>
                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='country_id'
                  id='country_id'
                  name='country'
                  placeholder='Страна'
                  label='Страна'
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  loading={countriesLoading}
                  error={error}
                  options={countries}
                  handleChange={(value) => handleFormChange('country', value)}
                />

                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='district_id'
                  id='district_id'
                  name='district'
                  placeholder='Район'
                  label='Район'
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
                  handleChange={(value) => handleFormChange('district', value)}
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
                  placeholder='Город'
                  label='Город'
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                  error={error}
                  disabled={!isCountrySelected}
                  options={settlements}
                  handleChange={(value) => handleFormChange('city', value)}
                />

                <FormField
                  data-testid='address_id'
                  id='address_id'
                  name={`address_${selectedLanguage}`}
                  placeholder='Улица'
                  label='Улица'
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
              text='Активный'
              label='Статус'
              onChange={(checked: boolean) => handleFormChange('active', checked)}
            />
          </Form>
        </CardComponent>
        <CardComponent className={b('lang-block')}>
          <Title level={4} style={{ margin: 0 }}>
            Данные нужно указать на нескольких языках
          </Title>
          <Text style={{ marginBottom: 20 }}>
            Для корректного отображения в пользовательских приложениях
          </Text>
          <Radio.Group style={{ width: 260 }} value={selectedLanguage}>
            {sortedLanguageItems.map((item) => {
              const isChecked = radioButtonStates[item.value] || false;

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
                Создать
              </Button>
            ) : (
              <Button type='primary' onClick={handleNextLanguage}>
                Далее
              </Button>
            )}
            <Button type='default' className={b('cancel-button')}>
              Отменить
            </Button>
          </div>
        </CardComponent>
      </div>
    </div>
  );
});

export default Create;
