import React, { useEffect, useMemo, useState } from 'react';
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
  const { countries, settlements, districts } = toJS(commonStore);
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

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
  };

  const handleFormChange = (key, eventOrValue) => {
    const value = eventOrValue && eventOrValue.target ? eventOrValue.target.value : eventOrValue;
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleNextLanguage = async () => {
    try {
      await form.validateFields();
      setError(false);

      // Переход к следующему языку в списке
      let nextLanguageIndex =
        sortedLanguageItems.findIndex((item) => item.value === selectedLanguage) + 1;

      // Если текущий выбранный язык последний в списке, начинаем сначала
      if (nextLanguageIndex >= sortedLanguageItems.length) {
        nextLanguageIndex = 0;
      }

      // Установка следующего языка в качестве выбранного
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

  const onFinish = () => {};

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
                    },
                  ]}
                  error={error}
                  onChange={(e) => handleFormChange(`name_${selectedLanguage}`, e.target.value)}
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
                    },
                  ]}
                  error={error}
                  onChange={(e) => handleFormChange('agreement_number', e.target.value)}
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
                    },
                  ]}
                  error={error}
                  onChange={(e) =>
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
                    },
                  ]}
                  error={error}
                  onChange={(e) => handleFormChange('rate', e.target.value)}
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
                    message: 'Введите номер телефона',
                  },
                ]}
                error={error}
                onChange={(e) => handleFormChange('phone', e.target.value)}
              />

              <FormField
                data-testid='email_id_login'
                type='email'
                id='email_id'
                name='email'
                label='Ваш email'
                placeholder='Введите email'
                onChange={(e) => handleFormChange('email', e.target.value)}
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
                      message: 'Введите страну',
                    },
                  ]}
                  error={error}
                  options={countries}
                  handleChange={(e) => handleFormChange('country', e)}
                />

                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='district_id'
                  id='district_id'
                  name='district'
                  placeholder='Район'
                  label='Район'
                  rules={[
                    {
                      required: true,
                      message: 'Введите район',
                    },
                  ]}
                  error={error}
                  disabled={!isCitySelected}
                  options={districts}
                  handleChange={(e) => handleFormChange('district', e)}
                />
              </div>
              <div>
                <FormField
                  customStyle={{ width: '100%' }}
                  type='select'
                  data-testid='settlements_id'
                  id='settlements_id'
                  name='settlements'
                  placeholder='Город'
                  label='Город'
                  rules={[
                    {
                      required: true,
                      message: 'Введите город',
                    },
                  ]}
                  error={error}
                  disabled={!isCountrySelected}
                  options={settlements}
                  handleChange={(e) => handleFormChange('city', e)}
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
                      message: 'Введите улицу',
                    },
                  ]}
                  error={error}
                  onChange={(e) => handleFormChange(`address_${selectedLanguage}`, e.target.value)}
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
              onChange={(checked) => handleFormChange('active', checked)}
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
          <Radio.Group
            style={{ width: 260 }}
            onChange={(e) => handleLanguageSelect(e.target.value)}
            value={selectedLanguage}
          >
            {sortedLanguageItems.map((item) => (
              <CardComponent
                className={
                  b('language-item') + (item.value === selectedLanguage ? ' active-border' : '')
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                />
              </CardComponent>
            ))}
          </Radio.Group>
          <div className={b('button-block')}>
            <Button type='primary' onClick={handleNextLanguage}>
              Далее
            </Button>
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
