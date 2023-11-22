import React from 'react';
import { Button, Flex, Row, Skeleton, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { CardComponent } from '~/shared/ui';
import { TextBlock } from '~/pages/merchants/Merchant/ui';
import { edit } from '~/assets/images';
import { IMerchantDetail } from '~/pages/merchants/interfaces';

const { Title } = Typography;

type Props = {
  merchant: IMerchantDetail | null;
  classNameTitle?: string;
  merchantDetailLoading?: boolean;
  classNameButton?: string;
  merchantId?: number;
  style?: React.CSSProperties;
};

const CardMerchantInfo: React.FC<Props> = ({
  merchantId,
  merchant,
  merchantDetailLoading,
  classNameTitle,
  classNameButton,
}) => {
  const { t } = useTranslation();

  if (merchantDetailLoading) {
    return <Skeleton />;
  }

  return (
    <CardComponent>
      <Row>
        <Flex vertical style={{ marginRight: '44px' }}>
          <Title level={5} className={classNameTitle}>
            {t('merchants.merchant_information')}
          </Title>
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.merchant_name') as string}
            text={merchant?.name}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.entity_full') as string}
            text={merchant?.legal_name}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.agreement_number') as string}
            text={merchant?.agreement_number}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.under_agency_agreement') as string}
            text={merchant?.rate}
          />
        </Flex>
        <Flex vertical style={{ marginRight: '44px' }}>
          <Title level={5} className={classNameTitle}>
            {t('merchants.contacts')}
          </Title>
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.phone') as string}
            text={merchant?.phone}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.email') as string}
            text={merchant?.email}
          />
        </Flex>
        <Flex vertical style={{ marginRight: '44px' }}>
          <Title level={5} className={classNameTitle}>
            {t('merchants.location')}
          </Title>
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.country') as string}
            text={merchant?.country_name}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.city') as string}
            text={merchant?.city_name}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.district') as string}
            text={merchant?.district_name}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.street') as string}
            text={merchant?.address}
          />
        </Flex>
        <Flex vertical style={{ marginRight: '44px' }}>
          <Title level={5} className={classNameTitle}>
            {t('merchants.stations')}
          </Title>
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.number_of_stations') as string}
            text={merchant?.number_stations}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.active_stations') as string}
            text={merchant?.active_stations}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title={t('merchants.inactive_stations') as string}
            text={merchant?.inactive_stations}
          />
        </Flex>
      </Row>
      <Link to={`/merchants/create-edit-merchant/${merchantId}`}>
        <Button className={classNameButton} type='primary' icon={<img src={edit} alt='edit' />}>
          {t('merchants.edit')}
        </Button>
      </Link>
    </CardComponent>
  );
};

export default CardMerchantInfo;
