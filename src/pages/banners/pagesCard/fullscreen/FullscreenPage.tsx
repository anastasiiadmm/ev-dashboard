import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import bem from 'easy-bem';
import { useTranslation } from 'react-i18next';

import Empty from '~/shared/ui/EmptyComponent/Empty';
import { useModal } from '~/shared/hooks';
import { deleteIcon, editColor, meatballIcon } from '~/assets/images';
import { ModalComponent } from '~/shared/ui';
import { response, Cards, ModalDelete } from '~/pages/banners';

import './FullscreenPage.scss';

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

const FullscreenPage: React.FC<Props> = observer(({ archive }) => {
  const b = bem('FullscreenPage');
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
          icon: <img src={editColor} alt='editicon' />,
          label: 'Редактировать',
          key: 1,
        },
        {
          icon: <img src={deleteIcon} alt='deleteicon' />,
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
    navigate('/banners/create-fullscreen');
  };

  const openCloseModal = (key: number, id: number) => {
    switch (key) {
      case 1:
        setGetId(id);
        return navigate(`/banners/create-fullscreen/${id}`);
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
            + {t('empty.fullscreen.button')}
          </Button>
        )}
      </div>
      <div>
        {data ? (
          <div className={b('container-result')}>
            {data
              ?.filter((el) => (archive ? !el.is_active : true)) // временно пока не известно как приходит архив fullscreen
              .map((el) => (
                <Cards
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  is_active={el.is_active}
                  starts_at={el.starts_at}
                  ends_at={el.ends_at}
                  itemsMeatBalls={itemsMeatBalls}
                  modalHandler={(key: number, id: number) => openCloseModal(key, id)}
                  switchHandler={(event: boolean, id: number) => handleSwitchChange(event, id)}
                />
              ))}
          </div>
        ) : (
          <Empty variant='fullscreen' onClick={addBannerClickHandler} />
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

export default FullscreenPage;
