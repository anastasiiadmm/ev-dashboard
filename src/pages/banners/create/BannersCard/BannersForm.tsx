import React, { ChangeEvent, useEffect, useState, useMemo } from 'react';
import bem from 'easy-bem';
import { Button, DatePicker, Form, Radio, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import dayjs, { Dayjs } from 'dayjs';
import type { UploadFile } from 'antd/es/upload/interface';

import { useCurrentLocale, useModal } from '~/shared/hooks';
import { eng, kg, chevronRight, rus, greenCheck, clockIcon, calendarIcon } from '~/assets/images';
import { bannerStore } from '~/pages/banners/';
import { ICommon, IFormData } from '~/pages/banners/interfaces';
import {
  ActiveInactiveModal,
  CardComponent,
  FormField,
  ModalComponent,
  TableIdModal,
  BreadcrumbComponent,
  AlertComponent,
  UploadImageComponent,
  TimePicker as TimePickerComponent,
} from '~/shared/ui';
import './BannersForm.scss';

const languageItems = [
  { name: 'Кыргызский', value: 'ky', lang: 'Кыргызча', icon: kg },
  { name: 'Русский', value: 'ru', lang: 'Орусча', icon: rus },
  { name: 'Английский', value: 'en', lang: 'Англисча', icon: eng },
];

const { Title, Text } = Typography;

interface IData {
  id: number[];
  name: string[];
}

const BannersForm = observer(() => {
  const b = bem('BannersForm');
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const merchantModal = useModal();
  const stationModal = useModal();
  const cancelModal = useModal();
  const currentLocale = useCurrentLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);
  const [previousSelectedLanguage, setPreviousSelectedLanguage] = useState(selectedLanguage);
  const [error, setError] = useState<boolean>(false);
  const { merchantId, stationId } = toJS(bannerStore);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [getMerchant, setGetMerchant] = useState<IData>({
    id: [],
    name: [],
  });
  const [getStation, setGetStation] = useState<IData>({
    id: [],
    name: [],
  });
  const [radioButtonStates, setRadioButtonStates] = useState({
    ru: false,
    en: false,
    ky: false,
  });
  const [formData, setFormData] = useState<IFormData>({
    name_ru: '',
    name_en: '',
    name_ky: '',
    source: '',
    image: '',
    category: 1,
    button_label: '',
    button_color: '',
    start_time: null,
    start_date: null,
    finish_time: null,
    finish_date: null,
    is_active: false,
    link: '',
    merchant: getMerchant.id,
    stations: getStation.id,
  });

  const isAllSelected = Object.values(radioButtonStates).every((value) => value);

  useEffect(() => {
    bannerStore.merchantsForPromotions();
  }, []);

  useEffect(() => {
    if (getMerchant.id) {
      bannerStore.stationForPromotions(getMerchant.id);
    }
  }, [getMerchant.id]);

  const openCloseModal = (id: string) => {
    switch (id) {
      case 'MERCHANT':
        return merchantModal.handleOkCancel();
      case 'STATION':
        return stationModal.handleOkCancel();
      case 'CANCEL':
        return cancelModal.handleOkCancel();
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
  ];

  const selectMerchant = (data: ICommon[] | undefined) => {
    if (data && Array.isArray(data)) {
      const ids = data.map((el) => el.id);
      const names = data.map((el) => el.name);
      setGetMerchant({ ...getMerchant, id: ids, name: names });
      openCloseModal('MERCHANT');
    }
  };

  const selectStation = (data: ICommon[] | undefined) => {
    if (data && Array.isArray(data)) {
      const ids = data.map((el) => el.id);
      const names = data.map((el) => el.name);
      setGetStation({ ...getStation, id: ids, name: names });
      openCloseModal('STATION');
    }
  };

  const handleFormChange = (key: string, value: string | number | boolean | null | Dayjs) => {
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
      (itemValue === selectedLanguage && !isAllSelected) || itemValue === selectedLanguage;
    return b(isActiveBorder ? 'border-item' : 'language-item');
  };

  const merchantLength = getMerchant.id.length > 0;
  const stationlength = getStation.id.length > 0;

  const merchantName = Array.isArray(getMerchant.name)
    ? getMerchant.name.join(', ')
    : getMerchant.name;

  const displayedMerchantName =
    merchantName.length > 23 ? `${merchantName.substring(0, 23)}...` : merchantName;

  const stationName = Array.isArray(getStation.name) ? getStation.name.join(', ') : getStation.name;

  const displayedStationName =
    stationName.length > 23 ? `${stationName.substring(0, 23)}...` : stationName;

  const languageKey = `name_${selectedLanguage}` as keyof IFormData;
  const isNameEmpty = !formData[languageKey];

  const onFinish = async () => {
    try {
      await form.validateFields();
      setError(false);
      bannerStore.postBanner(formData);
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
          {error && (
            <AlertComponent
              className={b('alert-styles')}
              message={t('alerts.incorrectly_filled_field') as string}
              description={t('alerts.one_or_more_of_the_required_fields_are_not_filled') as string}
              type='warning'
              showIcon
              closable
            />
          )}
          <div className={b('container-upload-file')}>
            <UploadImageComponent
              fileList={fileList}
              setFileList={setFileList}
              format='jpeg'
              title={t('banners.add_banner.title_image')}
            />
          </div>
          <h2 className={b('info-banner-title')}>{t('banners.add_banner.text')}</h2>
          <Form
            form={form}
            initialValues={{ remember: true }}
            onFinish={() => {}}
            autoComplete='off'
            layout='vertical'
            size='middle'
            className={b('container-form')}
          >
            <FormField
              className={b('input')}
              placeholder={t('banners.add_banner.name_input')}
              label={t('banners.add_banner.name_input')}
              id='name_id'
              error={error && isNameEmpty}
              name={languageKey}
              data-testid='name_id'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFormChange(languageKey, e.target.value)
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
              error={error && !formData.link}
              name='link'
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

            <div className={b('container-label-field')}>
              <label>{t('banners.add_banner.date_start')}</label>
              <div className={b('container-time')}>
                <div className={b('container-picker')}>
                  <div>
                    <TimePickerComponent icon id='start_time_id' time={new Date()} />
                    <label htmlFor='start_time_id'>
                      <img src={clockIcon} alt='clockicon' />
                    </label>
                  </div>
                </div>
                <div className={b('container-picker')}>
                  <div>
                    <DatePicker
                      suffixIcon
                      className={b('datepicker')}
                      id='start_date_id'
                      name='start_date'
                      placeholder='yyyy-mm-dd'
                      data-testid='start_date_id'
                      value={!formData.start_date ? dayjs() : formData.start_date}
                      onChange={(date: Dayjs | null) => handleFormChange(`start_date`, date)}
                    />
                    <label htmlFor='start_date_id'>
                      <img src={calendarIcon} alt='calendaricon' />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={b('container-label-field')}>
              <label>{t('banners.add_banner.date_finish')}</label>
              <div className={b('container-time')}>
                <div className={b('container-picker')}>
                  <div>
                    <TimePickerComponent icon id='finish_time_id' time={new Date()} />
                    <label htmlFor='finish_time_id'>
                      <img src={clockIcon} alt='clockicon' />
                    </label>
                  </div>
                </div>
                <div className={b('container-picker')}>
                  <div>
                    <DatePicker
                      suffixIcon
                      className={b('datepicker')}
                      id='finish_date_id'
                      name='finish_date'
                      placeholder='yyyy-mm-dd'
                      data-testid='finish_date_id'
                      value={!formData.finish_date ? dayjs() : formData.finish_date}
                      onChange={(date: Dayjs | null) => handleFormChange(`finish_date`, date)}
                    />
                    <label htmlFor='finish_date_id'>
                      <img src={calendarIcon} alt='calendaricon' />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={b('display-block')}>
              <FormField
                className={b('input')}
                placeholder={t('banners.add_banner.name_button')}
                label={t('banners.add_banner.name_button')}
                id='button_label_id'
                error={error && !formData.button_label}
                name='button_label'
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
                error={error && !formData.button_color}
                name='button_color'
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
                  className={merchantLength ? b('button') : b('button-select')}
                  onClick={() => openCloseModal('MERCHANT')}
                  style={{
                    borderColor: error && !merchantLength ? '#ff4b55' : '',
                    color: !merchantLength ? '#bfbfbf' : '#707a94',
                  }}
                >
                  {merchantLength
                    ? displayedMerchantName
                    : t('banners.add_banner.merchant_placeholder')}
                  <img src={chevronRight} alt='chevronrighticon' />
                </Button>
              </div>

              {merchantLength && (
                <div className={b('container-open-modal')}>
                  <p>{t('banners.add_banner.id_station')}</p>
                  <Button
                    className={b('button')}
                    onClick={() => openCloseModal('STATION')}
                    style={{
                      borderColor: error && !stationlength ? '#ff4b55' : '',
                      color: !stationlength ? '#bfbfbf' : '#707a94',
                    }}
                  >
                    {stationlength
                      ? displayedStationName
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
            onChange={(e) => handleLanguageSelect(e.target.value)}
            value={selectedLanguage}
          >
            {sortedLanguageItems.map((item) => {
              const isChecked =
                radioButtonStates[item.value as keyof typeof radioButtonStates] || false;

              return (
                <CardComponent
                  className={getLanguageItemClassName(item.value)}
                  key={item.name}
                  onClick={() => handleLanguageSelect(item.value)}
                >
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
                {t('merchants.save')}
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
            isModalOpen={merchantModal.isModalOpen}
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
            isModalOpen={stationModal.isModalOpen}
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
            isModalOpen={cancelModal.isModalOpen}
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
