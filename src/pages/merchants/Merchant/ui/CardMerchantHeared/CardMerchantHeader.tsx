import React from 'react';
import { Row, Typography } from 'antd';
import bem from 'easy-bem';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { CardComponent } from '~/shared/ui';
import { TextBlock } from '~/pages/merchants/Merchant/ui';
import { IMerchantDetail } from '~/pages/merchants/interfaces';

import './CardMerchantHeader.scss';

const { Title, Text } = Typography;

type Props = {
  merchant: IMerchantDetail | null;
  className?: string;
};

const CardMerchantHeader: React.FC<Props> = ({ merchant, className }) => {
  const b = bem('CardMerchantHeader');
  const { t } = useTranslation();

  return (
    <CardComponent className={className}>
      <Title level={5} className={b('title-info-block')}>
        {merchant?.name}
      </Title>
      <Text className={b('text-info-block')}>{merchant?.legal_name}</Text>
      <Row>
        <TextBlock
          styleBlock={{ marginRight: '44px' }}
          title={t('merchants.merchant_id') as string}
          text={merchant?.id}
        />
        <TextBlock
          styleBlock={{ marginRight: '44px' }}
          title={t('merchants.created_by') as string}
          text={merchant?.created_by}
        />
        <TextBlock
          styleBlock={{ marginRight: '44px' }}
          title={t('merchants.date_of_creation') as string}
          text={dayjs(merchant?.created_at).format('DD.MM.YYYY HH-mm')}
        />
        <TextBlock
          styleBlock={{ marginRight: '44px' }}
          title={t('merchants.status') as string}
          text={
            merchant?.active
              ? (t('merchants.active') as string)
              : (t('merchants.inactive') as string)
          }
        />
      </Row>
    </CardComponent>
  );
};

export default CardMerchantHeader;
