import React, { useEffect, useState } from 'react';
import { Row, Skeleton, Tabs } from 'antd';
import bem from 'easy-bem';
import { toJS } from 'mobx';
import { useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { CardMerchantHeader, CardMerchantInfo, TableStations } from '~/pages/merchants/Merchant/ui';
import { ITabs } from '~/pages/merchants/interfaces';
import { merchantStore } from '~/shared/api/store';
import { useLanguage } from '~/shared/context';
import './Merchant.scss';

const Merchant = observer(() => {
  const b = bem('Merchant');
  const { t } = useTranslation();
  const { id } = useParams();
  const { currentLanguage } = useLanguage();
  const { merchantDetail, merchantDetailLoading } = toJS(merchantStore);
  const [activeKey, setActiveKey] = useState<string>('1');

  useEffect(() => {
    merchantStore.getMerchantDetail(currentLanguage, Number(id));
  }, [currentLanguage, id]);

  const onTabChange = (key: string) => {
    setActiveKey(key);
  };

  const items: ITabs[] = [
    {
      key: '1',
      label: t('merchants.about_merchant') as string,
      children: (
        <CardMerchantInfo
          merchantId={id}
          merchant={merchantDetail}
          merchantDetailLoading={merchantDetailLoading}
          classNameButton={b('button-style')}
          classNameTitle={b('title-info')}
        />
      ),
    },
    {
      key: '2',
      label: t('merchants.stations') as string,
      children: <TableStations />,
    },
  ];

  return (
    <Row justify='space-between' data-testid='merchant-component' className={b()}>
      {merchantDetailLoading ? (
        <Skeleton />
      ) : (
        <CardMerchantHeader className={b('card-text-block')} merchant={merchantDetail} />
      )}

      <Tabs
        defaultActiveKey={activeKey}
        activeKey={activeKey}
        onChange={onTabChange}
        items={items}
      />
    </Row>
  );
});

export default Merchant;
