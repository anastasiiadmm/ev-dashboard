import React, { useEffect, useState } from 'react';
import { Button, message, Upload } from 'antd';
import bem from 'easy-bem';
import { useTranslation } from 'react-i18next';
import type { UploadProps, UploadFile } from 'antd/es/upload/interface';

import { IInfrastructure } from '~/pages/infrastructure/interfaces';
import { cancel, uploadImg } from '~/assets/images';
import './UploadImageComponent.scss';

interface Props {
  file: File | string | null;
  onFileChange: (newFile: File | null) => void;
  selectedInfrastructure?: IInfrastructure | null | undefined;
  creating?: boolean | undefined;
}

export const UploadImageComponent: React.FC<Props> = ({ file, onFileChange, creating }) => {
  const b = bem('UploadImageComponent');
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (creating) {
      setFileList([]);
    } else if (file && typeof file === 'string') {
      setFileList([
        {
          uid: '1',
          name: 'image',
          url: file,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [creating, file]);

  const onChange: UploadProps['onChange'] = ({ file: newFile, fileList: updatedFileList }) => {
    setFileList(updatedFileList as UploadFile[]);

    if (newFile.status === 'uploading') {
      onFileChange(newFile.originFileObj);
    }

    if (newFile.status === 'removed') {
      onFileChange(null);
    }
  };

  const onRemove = () => {
    setFileList([]);
    onFileChange(null);
  };

  const renderPhotos = () => {
    if (!file) {
      return (
        <div className={b('upload-image-block')}>
          <img
            src={uploadImg}
            alt='uploadImg'
            style={{ paddingTop: 16, display: 'inline-block' }}
          />
          <p>{t('image_upload.transfer_or_download_infrastructure_icon')}</p>
          <Button type='link' style={{ marginBottom: 16 }}>
            {t('image_upload.download')}
          </Button>
        </div>
      );
    }
    return null;
  };

  const beforeUpload = (file: File) => {
    const isSvg = file.type === 'image/svg+xml';
    if (!isSvg) {
      message.error(t('image_upload.only_svg_files_allowed'));
      return Upload.LIST_IGNORE;
    }

    const isSizeValid = file.size / 1024 <= 256;
    if (!isSizeValid) {
      message.error(t('image_upload.image_must_be_256KB_or_smaller'));
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  return (
    <div>
      <Upload
        data-testid='image-upload'
        className={b('upload-field')}
        listType='picture-card'
        fileList={fileList}
        onChange={onChange}
        onRemove={onRemove}
        beforeUpload={beforeUpload}
        customRequest={(args) => {
          if (args.onSuccess) {
            args.onSuccess('ok');
          }
        }}
        showUploadList={{
          showPreviewIcon: false,
          showRemoveIcon: true,
          removeIcon: () => (
            <img
              src={cancel}
              alt='cancel'
              onClick={() => onFileChange(null)}
              style={{ cursor: 'pointer', position: 'absolute', top: '-42px', right: '-39px' }}
            />
          ),
        }}
        accept='image/svg+xml'
      >
        {renderPhotos()}
      </Upload>
    </div>
  );
};
