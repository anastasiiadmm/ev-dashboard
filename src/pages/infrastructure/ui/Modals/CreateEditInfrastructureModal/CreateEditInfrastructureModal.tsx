import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, message, Typography } from 'antd';
import bem from 'easy-bem';

import { informationCircleGray } from '~/assets/images';
import { FormField, UploadImageComponent } from '~/shared/ui';
import { IInfrastructure, IInfrastructureCreate } from '~/pages/infrastructure/interfaces';
import { infrastructureStore } from '~/shared/api/store';
import { useNotification } from '~/shared/hooks';
import { apiImageURL } from '~/shared/utils/config';
import { getParams } from '~/shared/utils';
import './CreateEditInfrastructureModal.scss';

const { Title, Text } = Typography;

interface Props {
  textTitle: string;
  selectedInfrastructure?: IInfrastructure | null;
  loading: boolean;
  creating?: boolean;
  setCreating?: React.Dispatch<React.SetStateAction<boolean>>;
  handleInfrastructureOkCancel?: () => void;
  setSelectedInfrastructure?: React.Dispatch<React.SetStateAction<IInfrastructure | null>>;
}

const CreateEditInfrastructureModal: React.FC<Props> = ({
  textTitle = false,
  loading,
  selectedInfrastructure,
  creating,
  setSelectedInfrastructure,
  handleInfrastructureOkCancel,
}) => {
  const b = bem('CreateEditInfrastructureModal');
  const openNotification = useNotification();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | string | null>(null);

  useEffect(() => {
    if (!creating && selectedInfrastructure) {
      form.setFieldsValue(selectedInfrastructure);
      setFile(`${apiImageURL}${selectedInfrastructure?.icon_path}` as string);
    } else {
      form.resetFields();
      setFile(null);
      if (setSelectedInfrastructure) {
        setSelectedInfrastructure(null);
      }
    }
  }, [creating, form, selectedInfrastructure, setSelectedInfrastructure]);

  const onFileChange = (newFile: File | null) => {
    if (!newFile) {
      setFile(null);
    } else {
      setFile(newFile);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    form.setFieldsValue({ active: checked });
  };

  const onFinish = (values: IInfrastructureCreate) => {
    try {
      if (values && file) {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (key in values) {
            const value = values[key as keyof IInfrastructureCreate];
            formData.append(key, value as string);
          }
        });

        if (typeof file !== 'string') {
          const blob = new Blob([file], { type: 'image/svg+xml' });
          formData.append('icon', blob, file.name);
        }
        if (creating) {
          infrastructureStore.infrastructureCreate(formData, getParams({ page: 1 }));
        } else {
          infrastructureStore.infrastructureUpdate(
            selectedInfrastructure?.id as number,
            formData,
            getParams({ page: 1 }),
          );
        }
        if (handleInfrastructureOkCancel) {
          handleInfrastructureOkCancel();
        }
      } else {
        message.error(t('errors.no_icon'));
      }
    } catch (e) {
      if (e instanceof Error) {
        openNotification('error', '', e.message);
      } else {
        console.error('Unexpected error type:', e);
      }
    }
  };

  return (
    <div className={b('')}>
      <Title level={4} className={b('title')}>
        {textTitle}
      </Title>

      <Form
        form={form}
        initialValues={{ active: false }}
        onFinish={onFinish}
        autoComplete='off'
        layout='vertical'
        size='middle'
      >
        <UploadImageComponent
          creating={creating}
          file={file}
          onFileChange={onFileChange}
          title={t('image_upload.transfer_or_download_infrastructure_icon') as string}
          format='svg+xml'
        />

        <div className={b('upload-validation-info')}>
          <img src={informationCircleGray} alt='informationCircleGray' />
          <div>
            <Text type='secondary'>{t('image_upload.maximum_photo_size_256kb')}</Text>
            <Text type='secondary'>{t('image_upload.available_format_svg')}</Text>
          </div>
        </div>

        <FormField
          data-testid='title_ky_id'
          id='title_ky_id'
          name='title_ky'
          placeholder={t('infrastructure.name_in_kyrgyz')}
          label={t('infrastructure.name_in_kyrgyz')}
          rules={[
            {
              required: true,
              message: '',
            },
          ]}
        />
        <FormField
          data-testid='title_ru_id'
          id='title_ru_id'
          name='title_ru'
          placeholder={t('infrastructure.name_in_russian')}
          label={t('infrastructure.name_in_russian')}
          rules={[
            {
              required: true,
              message: '',
            },
          ]}
        />
        <FormField
          data-testid='title_en_id'
          id='title_en_id'
          name='title_en'
          placeholder={t('infrastructure.name_in_eng')}
          label={t('infrastructure.name_in_eng')}
          rules={[
            {
              required: true,
              message: '',
            },
          ]}
        />
        <FormField
          type='switch'
          data-testid='active_id'
          id='active_id'
          name='active'
          text={t('merchants.active')}
          label={t('merchants.status')}
          onChange={handleSwitchChange}
          defaultChecked={selectedInfrastructure ? selectedInfrastructure?.active : false}
        />
        <Button loading={loading} htmlType='submit' type='primary' style={{ width: '100%' }}>
          {t('infrastructure.save')}
        </Button>
      </Form>
    </div>
  );
};

export default CreateEditInfrastructureModal;
