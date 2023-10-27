import React from 'react';
import { Flex, Row, Typography } from 'antd';
import bem from 'easy-bem';
import dayjs from 'dayjs';

import { CardComponent } from '~/shared/ui/components';
import { TextBlock } from '~/features/merchants/Merchant/ui';

import './CardMerchantHeader.scss';

const { Title, Text } = Typography;

type Props = {
  merchant: object;
  className?: string;
};

const CardMerchantHeader: React.FC<Props> = ({ merchant, className }) => {
  const b = bem('CardMerchantHeader');
  return (
    <CardComponent className={className}>
      <Title level={5} className={b('title-info-block')}>
        {merchant?.name}
      </Title>
      <Text className={b('text-info-block')}>
        {merchant?.legal_name}
      </Text>
      <Row>
        <TextBlock
          styleBlock={{ marginRight: '44px' }}
          title='ID Мерчанта'
          text={merchant?.id}
        />
        <TextBlock
          styleBlock={{ marginRight: '44px' }}
          title='Кем был создан'
          text={merchant?.created_by}
        />
        <TextBlock
          styleBlock={{ marginRight: '44px' }}
          title='Дата создания'
          text={dayjs(merchant?.created_at).format('DD.MM.YYYY hh-mm')}
        />
        <TextBlock
          styleBlock={{ marginRight: '44px' }}
          title='Статус'
          text={merchant?.active ? 'Активный' : 'Неактивный'}
        />
      </Row>
    </CardComponent>
  );
};

export default CardMerchantHeader;
