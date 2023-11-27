import React, { useEffect } from 'react';
import { Button, Form, Typography } from 'antd';
import bem from 'easy-bem';
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx';

import { FormField } from '~/shared/ui';
import { tagsStore } from '~/shared/api/store';
import { ITag, ITagCreate } from '~/pages/tags/interfaces';
import { useLanguage } from '~/shared/context';
import { getParams } from '~/shared/utils';
import { useNotification } from '~/shared/hooks';
import './CreateEditTagModal.scss';

const { Title } = Typography;

interface Props {
  textTitle: string;
  selectedTag?: ITag | null;
  creating?: boolean;
  setCreating?: React.Dispatch<React.SetStateAction<boolean>>;
  handleTagOkCancel?: () => void;
}

const CreateEditTagModal: React.FC<Props> = ({
  handleTagOkCancel,
  textTitle,
  creating = false,
  setCreating,
  selectedTag,
}) => {
  const b = bem('CreateEditTagModal');
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const openNotification = useNotification();
  const { currentLanguage } = useLanguage();
  const { createTagSuccess, createTagLoading, updateTagSuccess, updateTagLoading } =
    toJS(tagsStore);

  useEffect(() => {
    if (!creating && selectedTag) {
      form.setFieldsValue(selectedTag);
    } else {
      form.resetFields();
    }
  }, [creating, form, selectedTag]);

  useEffect(() => {
    if (createTagSuccess) {
      if (handleTagOkCancel) {
        handleTagOkCancel();
      }
      if (typeof setCreating === 'function') {
        setCreating(false);
      }
    }
    return () => {
      tagsStore.setCreateTagSuccess(false);
    };
  }, [createTagSuccess, handleTagOkCancel, setCreating]);

  useEffect(() => {
    if (updateTagSuccess) {
      if (handleTagOkCancel) {
        handleTagOkCancel();
      }
      if (typeof setCreating === 'function') {
        setCreating(false);
      }
    }
    return () => {
      tagsStore.setUpdateSuccess(false);
    };
  }, [updateTagSuccess, handleTagOkCancel, setCreating]);

  const handleSwitchChange = (checked: boolean) => {
    form.setFieldsValue({ active: checked });
  };

  const onFinish = async (values: ITagCreate) => {
    try {
      if (creating) {
        await tagsStore.createTag(values, getParams({ page: 1 }), currentLanguage);
      } else {
        await tagsStore.updateTag(selectedTag?.id, values, getParams({ page: 1 }), currentLanguage);
      }
      form.resetFields();
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
        <FormField
          data-testid='title_ky_id'
          id='title_ky_id'
          name='title_ky'
          placeholder={t('tags.name_in_kyrgyz')}
          label={t('tags.name_in_kyrgyz')}
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
          placeholder={t('tags.name_in_russian')}
          label={t('tags.name_in_russian')}
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
          placeholder={t('tags.name_in_eng')}
          label={t('tags.name_in_eng')}
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
          defaultChecked={selectedTag ? selectedTag?.active : false}
        />

        <Button
          loading={createTagLoading || updateTagLoading}
          htmlType='submit'
          type='primary'
          style={{ width: '100%' }}
        >
          {creating ? t('merchants.create') : t('tags.save')}
        </Button>
      </Form>
    </div>
  );
};

export default CreateEditTagModal;
