import React from 'react';
import { Button, Form, Typography } from 'antd';
import bem from 'easy-bem';
import { useTranslation } from 'react-i18next';

import { FormField } from '~/shared/ui';
import './CreateEditTagModal.scss';

const { Title } = Typography;

interface Props {
  textTitle: string;
  creating?: boolean;
}

const CreateEditTagModal: React.FC<Props> = ({ textTitle, creating = false }) => {
  const b = bem('CreateEditTagModal');
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = () => {};

  return (
    <div className={b('')}>
      <Title level={4} className={b('title')}>
        {textTitle}
      </Title>

      <Form
        form={form}
        initialValues={{ remember: true, active: false }}
        onFinish={onFinish}
        autoComplete='off'
        layout='vertical'
        size='middle'
      >
        <FormField
          data-testid='title_ky_id'
          id='title_ky_id'
          name='title_ky'
          placeholder={t('tags.name_in_kyrgyz')}
          label={t('tags.name_in_kyrgyz')}
        />
        <FormField
          data-testid='title_ru_id'
          id='title_ru_id'
          name='title_ru'
          placeholder={t('tags.name_in_russian')}
          label={t('tags.name_in_russian')}
        />
        <FormField
          data-testid='title_en_id'
          id='title_en_id'
          name='title_en'
          placeholder={t('tags.name_in_eng')}
          label={t('tags.name_in_eng')}
        />
        <FormField
          type='switch'
          data-testid='active_id'
          id='active_id'
          name='active'
          text={t('merchants.active')}
          label={t('merchants.status')}
        />

        <Button htmlType='submit' type='primary' style={{ width: '100%' }}>
          {creating ? t('merchants.create') : t('tags.save')}
        </Button>
      </Form>
    </div>
  );
};

export default CreateEditTagModal;
