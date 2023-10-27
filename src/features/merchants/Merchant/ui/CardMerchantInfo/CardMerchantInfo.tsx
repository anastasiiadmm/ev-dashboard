import React from 'react';
import { Button, Flex, Row, Typography } from 'antd';

import { CardComponent } from '~/shared/ui/components';
import { TextBlock } from '~/features/merchants/Merchant/ui';

import { edit } from '~/assets/images';

const { Title, Text } = Typography;

type Props = {
  merchant: object;
  classNameTitle?: string;
  classNameButton?: string;
  style?: React.CSSProperties;
};

const CardMerchantInfo: React.FC<Props>  = ({ merchant, classNameTitle, classNameButton }) => {
  return (
    <CardComponent>
      <Row>
        <Flex vertical style={{ marginRight: '44px' }}>
          <Title level={5} className={classNameTitle}>
            Информация о мерчанте
          </Title>
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Наименование мерчанта'
            text={merchant?.name}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Юридическое лицо'
            text={merchant?.legal_name}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='№ договора'
            text={merchant?.agreement_number}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='% по агентскому договору'
            text={merchant?.rate}
          />
        </Flex>
        <Flex vertical style={{ marginRight: '44px' }}>
          <Title level={5} className={classNameTitle}>
            Контакты
          </Title>
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Телефон'
            text={merchant?.phone}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Email'
            text={merchant?.email}
          />
        </Flex>
        <Flex vertical style={{ marginRight: '44px' }}>
          <Title level={5} className={classNameTitle}>
            Локация
          </Title>
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Страна'
            text={merchant?.country}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Город'
            text={merchant?.city}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Район'
            text={merchant?.district}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Улица'
            text={merchant?.address}
          />
        </Flex>
        <Flex vertical style={{ marginRight: '44px' }}>
          <Title level={5} className={classNameTitle}>
            Станции
          </Title>
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Кол-во станций'
            text={merchant?.number_stations}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Активных станций'
            text={merchant?.active_stations}
          />
          <TextBlock
            styleText={{ marginBottom: '24px' }}
            title='Неактивных станций'
            text={merchant?.inactive_stations}
          />
        </Flex>
      </Row>
      <Button className={classNameButton} type='primary' icon={<img src={edit} alt='edit' />}>
        Редактировать
      </Button>
    </CardComponent>
  );
};

export default CardMerchantInfo;
