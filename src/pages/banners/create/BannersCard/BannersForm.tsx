import React, { useEffect, useState } from 'react';
import bem from 'easy-bem';
import { Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { chevronRight } from '~/assets/images';

import SelectLanguageCard from '../SelectLanguageCard/SelectLanguageCard';
import TableIdModal from '../../../../shared/ui/ModalComponent/Modals/BannerModal/TableIdModal/TableIdModal';
import { CardComponent, FormField, UploadFile } from '../../../../shared/ui';
import { bannerStore } from '../..';
import './BannersForm.scss';

interface Modal {
  merchant: boolean;
  station: boolean;
}

interface Select {
  id: number;
  name: string;
}

const BannersForm = observer(() => {
  const b = bem('BannersForm');
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [getId, setGetId] = useState<number>();
  const [getName, setGetName] = useState<string>();
  const { merchantId, stationId } = toJS(bannerStore);
  const [open, setOpen] = useState<Modal>({
    merchant: false,
    station: false,
  });

  useEffect(() => {
    bannerStore.merchantsForPromotions();
  }, []);

  useEffect(() => {
    if (getId) {
      bannerStore.stationForPromotions(getId);
    }
  }, [getId]);

  const openCloseModal = (id: string) => {
    switch (id) {
      case 'MERCHANT':
        return setOpen({ ...open, merchant: !open.merchant });
      case 'STATION':
        return setOpen({ ...open, station: !open.station });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
  ];

  const saveHandler = (data: Select[] | undefined) => {
    if (data) {
      data.map((el) => {
        setGetId(el.id);
        setGetName(el.name);
      });
    }
    openCloseModal('MERCHANT');
  };

  return (
    <>
      <div className={b('container-meatballs')}>
        <Link to=''>{t('banners.add_banner.home')}</Link>
        <span>/</span>
        <p className={b('second-text')}>{t('banners.add_banner.title')}</p>
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
            />
            <FormField
              className={b('input')}
              placeholder={t('banners.add_banner.link_input')}
              label={t('banners.add_banner.link_input')}
            />

            <div className={b('container_label_field')}>
              <label>{t('banners.add_banner.date_start')}</label>
              <div className={b('container_time')}>
                <FormField className={b('input')} inputType='time' />
                <FormField className={b('input')} inputType='date' />
              </div>
            </div>
            <div className={b('container_label_field')}>
              <label>{t('banners.add_banner.date_finish')}</label>
              <div className={b('container_time')}>
                <FormField className={b('input')} inputType='time' />
                <FormField className={b('input')} inputType='date' />
              </div>
            </div>

            <div className={b('display-block')}>
              <FormField
                className={b('input')}
                placeholder={t('banners.add_banner.name_button')}
                label={t('banners.add_banner.name_button')}
              />
              <FormField
                className={b('input')}
                placeholder={t('banners.add_banner.color_button')}
                label={t('banners.add_banner.color_button')}
              />
            </div>

            <div className={b('display-block')}>
              <div className={b('container-open-modal')}>
                <p>{t('banners.add_banner.merchant_label')}</p>
                <Button
                  className={getId ? b('button-select') : b('button-s')}
                  onClick={() => openCloseModal('MERCHANT')}
                >
                  {getName
                    ? getName.length > 13
                      ? `${getName.substring(0, 13)}...`
                      : getName
                    : t('banners.add_banner.merchant_placeholder')}
                  <img src={chevronRight} alt='chevronrighticon' />
                </Button>
              </div>

              {getId && (
                <div className={b('container-open-modal')}>
                  <p>{t('banners.add_banner.id_station')}</p>
                  <Button className={b('button-select')} onClick={() => openCloseModal('STATION')}>
                    {t('banners.add_banner.id_station_placeholder')}
                    <img src={chevronRight} alt='chevronrighticon' />
                  </Button>
                </div>
              )}
            </div>
            <div className={b('container-switch')}>
              <FormField
                className={b('input')}
                label={t('banners.add_banner.status')}
                type='switch'
              />
              <p>{t('banners.add_banner.status')}</p>
            </div>
          </Form>
        </CardComponent>
        <SelectLanguageCard />
        <TableIdModal
          data={merchantId}
          columns={columns}
          isModalOpen={open.merchant}
          handleCancel={() => openCloseModal('MERCHANT')}
          handleOk={() => {}}
          title='Выбрать ID мерчанта'
          placeholder='Искать ID, наименование'
          saveHandler={saveHandler}
        />
        <TableIdModal
          data={stationId}
          columns={columns}
          isModalOpen={open.station}
          handleCancel={() => openCloseModal('STATION')}
          handleOk={() => {}}
          title='Выбрать станции'
          placeholder='Искать ID, наименование станции'
          saveHandler={() => {}}
        />
      </div>
    </>
  );
});

export default BannersForm;
