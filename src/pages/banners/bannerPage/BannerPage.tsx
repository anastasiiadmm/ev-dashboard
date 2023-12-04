import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import bem from 'easy-bem';

import Empty from '~/shared/ui/EmptyComponent/Empty';

import './BannerPage.scss';

const BannerPage = observer(() => {
  const b = bem('BannerPage');
  const navigate = useNavigate();

  const data: [] = [];

  const addBannerClickHandler = () => {
    navigate('/banners/create-banner');
  };
  return (
    <div className={b('container')}>
      <div className={b('container-button')}>
        {data?.length > 0 && (
          <Button type='primary' onClick={addBannerClickHandler}>
            + Добавить баннер
          </Button>
        )}
      </div>
      <div>
        {data?.length > 0 ? (
          data?.map(() => <h1>Banner есть</h1>)
        ) : (
          <Empty variant='banner' onClick={addBannerClickHandler} />
        )}
      </div>
    </div>
  );
});

export default BannerPage;
