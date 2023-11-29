import React, { ChangeEvent, useEffect, useState, useMemo } from 'react';
import bem from 'easy-bem';
import { Button, Form, Radio, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { useCurrentLocale } from '~/shared/hooks';
import { eng, kg, chevronRight, rus, greenCheck } from '~/assets/images';
import { bannerStore } from '~/pages/banners/';
import { ICommon } from '~/pages/banners/interfaces';
import {
  ActiveInactiveModal,
  CardComponent,
  FormField,
  ModalComponent,
  UploadFile,
  TableIdModal,
  BreadcrumbComponent,
} from '~/shared/ui';
const { Title, Text } = Typography;
import './BannersForm.scss';

const languageItems = [
  { name: 'Кыргызский', value: 'ky', lang: 'Кыргызча', icon: kg },
  { name: 'Русский', value: 'ru', lang: 'Орусча', icon: rus },
  { name: 'Английский', value: 'en', lang: 'Англисча', icon: eng },
];

interface Modal {
  merchant: boolean;
  station: boolean;
  cancel: boolean;
}

interface IData {
  id: string;
  name: string;
}

const BannersForm = observer(() => {
  const id = 33;
  const b = bem('BannersForm');
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const currentLocale = useCurrentLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);
  const [previousSelectedLanguage, setPreviousSelectedLanguage] = useState(selectedLanguage);
  const [error, setError] = useState<boolean>(false);
  const { merchantId, stationId } = toJS(bannerStore);
  const [getMerchant, setGetMerchant] = useState<IData>({
    id: '',
    name: '',
  });
  const [getStation, setGetStation] = useState<IData>({
    id: '',
    name: '',
  });
  const [radioButtonStates, setRadioButtonStates] = useState({
    ru: false,
    en: false,
    ky: false,
  });
  const [open, setOpen] = useState<Modal>({
    merchant: false,
    station: false,
    cancel: false,
  });
  const [formData, setFormData] = useState({
    name_ru: '',
    name_en: '',
    name_ky: '',
    source: '',
    image: '',
    category: 1,
    button_label: '',
    button_color: '',
    start_time: '',
    start_date: '',
    finish_time: '',
    finish_date: '',
    is_active: false,
    link: '',
    merchant: +getMerchant.id,
    stations: [getStation.id],
  });
  const isAllSelected = Object.values(radioButtonStates).every((value) => value);

  useEffect(() => {
    bannerStore.merchantsForPromotions();
  }, []);

  useEffect(() => {
    if (getMerchant.id) {
      bannerStore.stationForPromotions(+getMerchant.id);
    }
  }, [getMerchant.id]);

  const openCloseModal = (id: string) => {
    switch (id) {
      case 'MERCHANT':
        return setOpen({ ...open, merchant: !open.merchant });
      case 'STATION':
        return setOpen({ ...open, station: !open.station });
      case 'CANCEL':
        return setOpen({ ...open, cancel: !open.cancel });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
  ];

  const selectMerchant = (data: ICommon[] | undefined) => {
    if (data) {
      data.map((el) => {
        setGetMerchant({ ...getMerchant, id: el.id.toString(), name: el.name });
      });
    }
    openCloseModal('MERCHANT');
  };

  const selectStation = (data: ICommon[] | undefined) => {
    if (data) {
      data.map((el) => {
        setGetStation({ ...getStation, id: el.id.toString(), name: el.name });
      });
    }
    openCloseModal('STATION');
  };

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

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
  };

  const handleAgreeHandler = () => {
    navigate('/');
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
      console.log(formData);
    } catch (error) {
      if (error) {
        setError(true);
      }
    }
  };

  return (
    <>
      <div className={b('container-meatballs')}>
        <BreadcrumbComponent
          items={[{ title: t('banners.add_banner.title'), href: '/create-banner' }]}
        />
      </div>
      <div className={b('container-card')}>
        <CardComponent className={b('container')}>
          <h1 className={b('title')}>{t('banners.add_banner.title')}</h1>
          <div className={b('container_upload_file')}>
            <UploadFile />
          </div>
          <h2 className={b('info_banner_title')}>{t('banners.add_banner.text')}</h2>
          <Form
            form={form}
            initialValues={{ remember: true }}
            onFinish={() => {}}
            autoComplete='off'
            layout='vertical'
            size='middle'
            className={b('container_form')}
          >
            <FormField
              className={b('input')}
              placeholder={t('banners.add_banner.name_input')}
              label={t('banners.add_banner.name_input')}
              id='name_id'
              error={error}
              name={`name_${selectedLanguage}`}
              data-testid='name_id'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFormChange(`name_${selectedLanguage}`, e.target.value)
              }
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
            />
            <FormField
              className={b('input')}
              placeholder={t('banners.add_banner.link_input')}
              label={t('banners.add_banner.link_input')}
              id='link_id'
              error={error}
              name={`link`}
              data-testid='link_id'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFormChange(`link`, e.target.value)
              }
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
            />

            <div className={b('container_label_field')}>
              <label>{t('banners.add_banner.date_start')}</label>
              <div className={b('container_time')}>
                <FormField
                  className={b('input')}
                  inputType='time'
                  id='start_time_id'
                  error={error}
                  name={`start_time`}
                  data-testid='start_time_id'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormChange(`start_time`, e.target.value)
                  }
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                />
                <FormField
                  className={b('input')}
                  inputType='date'
                  id='start_date_id'
                  error={error}
                  name={`start_date`}
                  data-testid='start_date_id'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormChange(`start_date`, e.target.value)
                  }
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                />
              </div>
            </div>
            <div className={b('container_label_field')}>
              <label>{t('banners.add_banner.date_finish')}</label>
              <div className={b('container_time')}>
                <FormField
                  className={b('input')}
                  inputType='time'
                  id='finish_time_id'
                  error={error}
                  name={`finish_time`}
                  data-testid='finish_time_id'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormChange(`finish_time`, e.target.value)
                  }
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                />
                <FormField
                  className={b('input')}
                  inputType='date'
                  id='finish_date_id'
                  error={error}
                  name={`finish_date`}
                  data-testid='finish_date_id'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormChange(`finish_date`, e.target.value)
                  }
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}
                />
              </div>
            </div>

            <div className={b('display-block')}>
              <FormField
                className={b('input')}
                placeholder={t('banners.add_banner.name_button')}
                label={t('banners.add_banner.name_button')}
                id='button_label_id'
                error={error}
                name={`button_label`}
                data-testid='button_label_id'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange(`button_label`, e.target.value)
                }
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              />
              <FormField
                className={b('input')}
                placeholder={t('banners.add_banner.color_button')}
                label={t('banners.add_banner.color_button')}
                id='button_color_id'
                error={error}
                name={`button_color`}
                data-testid='button_color_id'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFormChange(`button_color`, e.target.value)
                }
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              />
            </div>

            <div className={b('display-block')}>
              <div className={b('container-open-modal')}>
                <p>{t('banners.add_banner.merchant_label')}</p>
                <Button
                  className={getMerchant.id ? b('button') : b('button-select')}
                  onClick={() => openCloseModal('MERCHANT')}
                  style={{
                    borderColor: error ? 'red' : '',
                  }}
                >
                  {getMerchant.name
                    ? getMerchant.name.length > 13
                      ? `${getMerchant.name.substring(0, 13)}...`
                      : getMerchant.name
                    : t('banners.add_banner.merchant_placeholder')}
                  <img src={chevronRight} alt='chevronrighticon' />
                </Button>
              </div>

              {getMerchant.id && (
                <div className={b('container-open-modal')}>
                  <p>{t('banners.add_banner.id_station')}</p>
                  <Button className={b('button')} onClick={() => openCloseModal('STATION')}>
                    {getStation.name
                      ? getStation.name.length > 13
                        ? `${getStation.name.substring(0, 13)}...`
                        : getStation.name
                      : t('banners.add_banner.id_station_placeholder')}
                    <img src={chevronRight} alt='chevronrighticon' />
                  </Button>
                </div>
              )}
            </div>
            <div className={b('container-switch')}>
              <FormField
                className={b('input')}
                type='switch'
                data-testid='active_id'
                id='active_id'
                name='active'
                defaultChecked={error}
                label={t('merchants.status')}
                onChange={(checked: boolean) => handleFormChange('is_active', checked)}
              />
              <p>{t('merchants.active')}</p>
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
                  {isChecked ? (
                    <img
                      style={{ width: '16px', marginRight: '8px' }}
                      src={greenCheck}
                      alt='checkdone'
                    />
                  ) : (
                    <Radio
                      value={item.value}
                      className={`radio-styles ${isChecked ? 'radio-group-button' : ''}`}
                      checked={isChecked}
                    />
                  )}
                </CardComponent>
              );
            })}
          </Radio.Group>
          <div className={b('button-block')}>
            {isAllSelected ? (
              <Button type='primary' onClick={onFinish}>
                {id ? t('merchants.save') : t('merchants.create')}
              </Button>
            ) : (
              <Button type='primary' data-testid='further-button' onClick={handleNextLanguage}>
                {t('merchants.further')}
              </Button>
            )}
            <Button
              type='default'
              className={b('cancel-button')}
              onClick={() => openCloseModal('CANCEL')}
            >
              {t('merchants.cancel')}
            </Button>
          </div>
        </CardComponent>
        <>
          <ModalComponent
            width={352}
            isModalOpen={open.merchant}
            handleOk={() => openCloseModal('MERCHANT')}
            handleCancel={() => openCloseModal('MERCHANT')}
            closeIcon
          >
            <TableIdModal
              data={merchantId}
              columns={columns}
              title={t('banners.add_banner.choose_merchant')}
              placeholder={t('banners.add_banner.search_id_name_merchant')}
              saveHandler={selectMerchant}
            />
          </ModalComponent>
          <ModalComponent
            width={352}
            closeIcon
            isModalOpen={open.station}
            handleCancel={() => openCloseModal('STATION')}
            handleOk={() => openCloseModal('STATION')}
          >
            <TableIdModal
              data={stationId}
              columns={columns}
              title={t('banners.add_banner.choose_station')}
              placeholder={t('banners.add_banner.search_station')}
              saveHandler={selectStation}
            />
          </ModalComponent>
          <ModalComponent
            width={400}
            isModalOpen={open.cancel}
            handleOk={() => openCloseModal('CANCEL')}
            handleCancel={() => openCloseModal('CANCEL')}
          >
            <ActiveInactiveModal
              textTitle={t('modals.are_you_sure_you_want_to_cancel_your_changes') as string}
              infoText={t('modals.after_cancellation_all_data_will_be_lost') as string}
              handleOkCancel={() => openCloseModal('CANCEL')}
              handleAgreeHandler={handleAgreeHandler}
            />
          </ModalComponent>
        </>
      </div>
    </>
  );
});

export default BannersForm;
