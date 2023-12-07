import React, { useState, useEffect } from 'react';
import bem from 'easy-bem';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ModalComponent } from '~/shared/ui';
import Empty from '~/shared/ui/EmptyComponent/Empty';
import { deleteIcon, editColor, meatballIcon } from '~/assets/images';
import { useModal } from '~/shared/hooks';
import { response, Cards, ModalDelete } from '~/pages/banners';

import './BannerPage.scss';

interface IData {
  id: number;
  name: string;
  image_path: string;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
}
[];

interface Props {
  archive: boolean;
}

const BannerPage: React.FC<Props> = observer(({ archive }) => {
  const b = bem('BannerPage');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const modalDelete = useModal();
  const [getId, setGetId] = useState<number>();
  const [data, setData] = useState<IData[]>();

  useEffect(() => {
    setData(response.results);
  }, []);

  const itemsMeatBalls = [
    {
      icon: <img src={meatballIcon} alt='iconmeat' />,
      key: 'menu',
      children: [
        {
          icon: <img src={editColor} alt='iconmeat' />,
          label: 'Редактировать',
          key: 1,
        },
        {
          icon: <img src={deleteIcon} alt='iconmeat' />,
          label: 'Удалить',
          key: 2,
        },
      ],
    },
  ];

  const handleSwitchChange = (event: boolean, id: number) => {
    const updateSwitch = data?.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          is_active: event,
        };
      }
      return el;
    });
    setData(updateSwitch);
  };

  const addBannerClickHandler = () => {
    navigate('/banners/create-banner');
  };

  const openCloseModal = (key: number, id: number) => {
    switch (key) {
      case 1:
        return navigate(`/banners/create-banner/${id}`);
      case 2:
        setGetId(id);
        return modalDelete.handleOkCancel();
    }
  };

  const handleCloseModal = () => {
    modalDelete.closeModal();
  };

  const deleteHandler = () => {
    setData(data?.filter((el) => el.id !== getId));
    modalDelete.handleOkCancel();
  };

  return (
    <>
      <div className={b('container-button')}>
        {data && (
          <Button type='primary' onClick={addBannerClickHandler}>
            + {t('empty.banner.button')}
          </Button>
        )}
      </div>
      <div>
        {data ? (
          <div className={b('container-result')}>
            {data
              ?.filter((el) => (archive ? !el.is_active : true)) // временно пока не известно как приходит архив banner
              .map((el) => {
                return (
                  <Cards
                    key={el.id}
                    id={el.id}
                    image={el.image_path}
                    name={el.name}
                    is_active={el.is_active}
                    starts_at={el.starts_at}
                    ends_at={el.ends_at}
                    itemsMeatBalls={itemsMeatBalls}
                    modalHandler={(key: number, id: number) => openCloseModal(key, id)}
                    switchHandler={(event: boolean, id: number) => handleSwitchChange(event, id)}
                  />
                );
              })}
          </div>
        ) : (
          <Empty variant='banner' onClick={addBannerClickHandler} />
        )}
      </div>
      <ModalComponent
        width={330}
        isModalOpen={modalDelete.isModalOpen}
        handleCancel={handleCloseModal}
        handleOk={() => {}}
      >
        <ModalDelete handleCloseModal={handleCloseModal} deleteHandler={deleteHandler} />
      </ModalComponent>
    </>
  );
});

export default BannerPage;
