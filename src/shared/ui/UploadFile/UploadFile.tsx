import Icon from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import bem from 'easy-bem';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './UploadFile.scss';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const UploadFile: React.FC = () => {
  const { t } = useTranslation();
  const b = bem('UploadFile');

  const ImageSvg = () => (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M18.0022 6.65893H3.00037C2.6025 6.65893 2.22092 6.81066 1.93958 7.08075C1.65824 7.35083 1.50018 7.71715 1.50018 8.0991V19.6205C1.50018 20.0025 1.65824 20.3688 1.93958 20.6389C2.22092 20.909 2.6025 21.0607 3.00037 21.0607H18.0022C18.4001 21.0607 18.7817 20.909 19.063 20.6389C19.3443 20.3688 19.5024 20.0025 19.5024 19.6205V8.0991C19.5024 7.71715 19.3443 7.35083 19.063 7.08075C18.7817 6.81066 18.4001 6.65893 18.0022 6.65893ZM3.00037 5.21875C2.20462 5.21875 1.44147 5.52221 0.878788 6.06239C0.31611 6.60256 0 7.33519 0 8.0991V19.6205C0 20.3844 0.31611 21.1171 0.878788 21.6572C1.44147 22.1974 2.20462 22.5009 3.00037 22.5009H18.0022C18.798 22.5009 19.5611 22.1974 20.1238 21.6572C20.6865 21.1171 21.0026 20.3844 21.0026 19.6205V8.0991C21.0026 7.33519 20.6865 6.60256 20.1238 6.06239C19.5611 5.52221 18.798 5.21875 18.0022 5.21875H3.00037Z'
        fill='#707A94'
      />
      <path
        d='M15.9708 13.3489C16.0822 13.2422 16.2257 13.1719 16.3811 13.1478C16.5364 13.1238 16.6957 13.1473 16.8364 13.2149L19.5022 16.019V21.0596H1.5V19.6194L5.46949 16.2292C5.5921 16.1119 5.7532 16.039 5.92545 16.0227C6.09771 16.0064 6.27053 16.0478 6.41461 16.1399L10.4051 18.6934L15.9708 13.3503V13.3489Z'
        fill='#707A94'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M6.75053 13.8593C7.34734 13.8593 7.91971 13.6317 8.34172 13.2266C8.76373 12.8215 9.00081 12.272 9.00081 11.699C9.00081 11.1261 8.76373 10.5766 8.34172 10.1715C7.91971 9.76638 7.34734 9.53878 6.75053 9.53878C6.15372 9.53878 5.58136 9.76638 5.15935 10.1715C4.73734 10.5766 4.50026 11.1261 4.50026 11.699C4.50026 12.272 4.73734 12.8215 5.15935 13.2266C5.58136 13.6317 6.15372 13.8593 6.75053 13.8593ZM5.99744 3.77807H20.9993C21.3972 3.77807 21.7787 3.9298 22.0601 4.19989C22.3414 4.46997 22.4995 4.83629 22.4995 5.21825V16.7397C22.4995 17.1216 22.3414 17.4879 22.0601 17.758C21.7787 18.0281 21.3972 18.1798 20.9993 18.1798V19.62C21.795 19.62 22.5582 19.3166 23.1209 18.7764C23.6835 18.2362 23.9997 17.5036 23.9997 16.7397V5.21825C23.9997 4.45433 23.6835 3.7217 23.1209 3.18153C22.5582 2.64136 21.795 2.33789 20.9993 2.33789H5.99744C5.20169 2.33789 4.43854 2.64136 3.87586 3.18153C3.31318 3.7217 2.99707 4.45433 2.99707 5.21825H4.49726C4.49726 4.83629 4.65531 4.46997 4.93665 4.19989C5.21799 3.9298 5.59957 3.77807 5.99744 3.77807Z'
        fill='#707A94'
      />
    </svg>
  );

  const ImageIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ImageSvg} {...props} />
  );

  return (
    <Dragger className={b()} {...props}>
      <p className='ant-upload-drag-icon'>
        <ImageIcon />
      </p>
      <p className='ant-upload-hint'>
        {t('merchants.transfer_or_upload_photos_or_videos_of_the_station')}
      </p>
      <Button type='link'>{t('merchants.download')}</Button>
    </Dragger>
  );
};

export default UploadFile;
