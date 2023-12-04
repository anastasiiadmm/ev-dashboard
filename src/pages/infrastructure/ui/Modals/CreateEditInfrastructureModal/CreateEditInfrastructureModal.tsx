import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Typography } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import bem from 'easy-bem';

import { informationCircleGray } from '~/assets/images';
import { FormField, UploadImageComponent } from '~/shared/ui';
import { IInfrastructure } from '~/pages/infrastructure/interfaces';
import './CreateEditInfrastructureModal.scss';

const { Title, Text } = Typography;

interface Props {
  textTitle: string;
  selectedInfrastructure?: IInfrastructure | null;
  creating?: boolean;
  setCreating?: React.Dispatch<React.SetStateAction<boolean>>;
  handleTagOkCancel?: () => void;
}

const CreateEditInfrastructureModal: React.FC<Props> = ({ textTitle = false }) => {
  const b = bem('CreateEditInfrastructureModal');
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFileChange = (newFileList: UploadFile[]) => {
    setFileList(newFileList);
  };

  const onFinish = () => {};

  return (
    <div className={b('')}>
      <Title level={4} className={b('title')}>
        {textTitle}
      </Title>

      <Form form={form} onFinish={onFinish} autoComplete='off' layout='vertical' size='middle'>
        <UploadImageComponent
          fileList={fileList}
          setFileList={onFileChange}
          title={t('image_upload.transfer_or_download_infrastructure_icon')}
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
        />
      </Form>
    </div>
  );
};

export default CreateEditInfrastructureModal;
