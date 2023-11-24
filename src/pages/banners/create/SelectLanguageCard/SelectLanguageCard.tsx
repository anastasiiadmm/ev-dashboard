import React, { useEffect, useMemo, useState } from 'react';
import bem from 'easy-bem';
import { Button, Form, Radio, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useTranslation } from 'react-i18next';

import { eng, kg, rus } from '~/assets/images';
import { useCurrentLocale } from '~/shared/hooks';
import { merchantStore } from '~/shared/api/store';

import { CardComponent } from '../../../../shared/ui';

const { Title, Text } = Typography;

import './SelectLanguageCard.scss';

const languageItems = [
  { name: 'Кыргызский', value: 'ky', lang: 'Кыргызча', icon: kg },
  { name: 'Русский', value: 'ru', lang: 'Орусча', icon: rus },
  { name: 'Английский', value: 'en', lang: 'Англисча', icon: eng },
];

const SelectLanguageCard = observer(() => {
  const b = bem('SelectLanguageCard');
  const { t } = useTranslation();
  const { createMerchantSuccess } = toJS(merchantStore);
  const [form] = Form.useForm();
  const currentLocale = useCurrentLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);
  const [error, setError] = useState<boolean>(false);
  const [previousSelectedLanguage, setPreviousSelectedLanguage] = useState(selectedLanguage);
  const [radioButtonStates, setRadioButtonStates] = useState({
    ru: false,
    en: false,
    ky: false,
  });
  const isAllSelected = Object.values(radioButtonStates).every((value) => value);

  useEffect(() => {
    if (createMerchantSuccess) {
      setError(false);
    }
    return () => {
      merchantStore.createMerchantSuccess = false;
    };
  }, [createMerchantSuccess]);

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

  const onFinish = async () => {
    console.log(error, 'test');
  };

  return (
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
        <Button type='default' className={b('cancel-button')}>
          {t('merchants.cancel')}
        </Button>
      </div>
    </CardComponent>
  );
});

export default SelectLanguageCard;
