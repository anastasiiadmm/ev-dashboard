import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import bem from 'easy-bem';
import React from 'react';
import { useTranslation } from 'react-i18next';

import uploadImg from '~/assets/images/svg/icons/default/bi_images.svg';
import './UploadImageComponent.scss';

interface Props {
  fileList: UploadFile[] | [];
  setFileList: (fileList: UploadFile[]) => void;
}

export const UploadImageComponent: React.FC<Props> = ({ fileList, setFileList }) => {
  const b = bem('UploadImageComponent');
  const { t } = useTranslation();

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url || URL.createObjectURL(file.originFileObj as Blob);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const renderPhotos = () => {
    if (!fileList.length) {
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

  const beforeUpload = (file: RcFile) => {
    const isSizeValid = file?.size / 1024 <= 256;
    if (!isSizeValid) {
      message.error(t('image_upload.image_must_be_256KB_or_smaller'));
    }
    return isSizeValid;
  };

  return (
    <div>
      <ImgCrop>
        <Upload
          data-testid='image-upload'
          className={b('upload-field')}
          listType='picture-card'
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          beforeUpload={beforeUpload}
          customRequest={(args) => {
            if (args.onSuccess) {
              args.onSuccess('ok');
            }
          }}
          accept='image/svg+xml'
        >
          {renderPhotos()}
        </Upload>
      </ImgCrop>
    </div>
  );
};
