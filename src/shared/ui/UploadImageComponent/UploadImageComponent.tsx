import React, { useEffect, useState } from 'react';
import { Button, message, Upload } from 'antd';
import bem from 'easy-bem';
import { useTranslation } from 'react-i18next';
import type { UploadProps, UploadFile } from 'antd/es/upload/interface';

import { cancel, uploadImg } from '~/assets/images';
import './UploadImageComponent.scss';

interface Props {
  file?: File | string | null;
  onFileChange?: (newFile: File | null) => void;
  creating?: boolean | undefined;
  bannersCreate?: boolean | undefined;
  fileListUpload?: UploadFile[] | [];
  format: string;
  title: string;
  bannersFileList?: UploadFile[] | [];
  setBannersFileList?: (fileList: UploadFile[]) => void;
}

export const UploadImageComponent: React.FC<Props> = ({
  file,
  onFileChange,
  creating,
  format,
  title,
  bannersFileList,
  setBannersFileList,
  bannersCreate,
}) => {
  const b = bem('UploadImageComponent');
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (creating) {
      setFileList([]);
    } else if (file && typeof file === 'string' && !bannersCreate) {
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
  }, [bannersCreate, creating, file]);

  const onChange: UploadProps['onChange'] = ({ file: newFile, fileList: updatedFileList }) => {
    if (!bannersCreate) {
      setFileList(updatedFileList as UploadFile[]);
    } else {
      if (setBannersFileList) {
        setBannersFileList(updatedFileList);
      }
    }

    if (newFile.status === 'uploading') {
      if (onFileChange) {
        onFileChange(newFile.originFileObj as File);
      }
    }

    if (newFile.status === 'removed') {
      if (onFileChange) {
        onFileChange(null);
      }
    }
  };

  const onRemove = () => {
    setFileList([]);
    if (onFileChange) {
      onFileChange(null);
    }
  };

  const renderPhotos = () => {
    if (bannersCreate ? !bannersFileList?.length : !file) {
      return (
        <div className={b('upload-image-block')}>
          <img
            src={uploadImg}
            alt='uploadImg'
            style={{ paddingTop: 16, display: 'inline-block' }}
          />
          <p>{title}</p>
          <Button type='link' style={{ marginBottom: 16 }}>
            {t('image_upload.download')}
          </Button>
        </div>
      );
    }
    return null;
  };

  const beforeUpload = (file: File) => {
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
        fileList={bannersCreate ? bannersFileList : fileList}
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
              onClick={() => onFileChange && onFileChange(null)}
              style={{ cursor: 'pointer', position: 'absolute', top: '-42px', right: '-39px' }}
            />
          ),
        }}
        accept={`image/${format}`}
      >
        {renderPhotos()}
      </Upload>
    </div>
  );
};
