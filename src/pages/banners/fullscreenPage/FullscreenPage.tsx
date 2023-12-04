import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import bem from 'easy-bem';

import Empty from '~/shared/ui/EmptyComponent/Empty';

import './FullscreenPage.scss';

const FullscreenPage = observer(() => {
  const b = bem('FullscreenPage');
  const navigate = useNavigate();
  const data: [] = [];

  const addedClickHandler = () => {
    navigate('/banners/create-fullscreen');
  };
  return (
    <div className={b('container')}>
      <div className={b('container-button')}>
        {data?.length > 0 && (
          <Button type='primary' onClick={addedClickHandler}>
            + Добавить фулскрин
          </Button>
        )}
      </div>
      <div>
        {data?.length > 0 ? (
          data?.map(() => <h1>fullscreen есть</h1>)
        ) : (
          <Empty variant='fullscreen' onClick={addedClickHandler} />
        )}
      </div>
    </div>
  );
});

export default FullscreenPage;
