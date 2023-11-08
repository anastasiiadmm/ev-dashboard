import bem from 'easy-bem';
import { Button, Form, Row, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveInactiveModal, FormField, ModalComponent, TableComponent } from '~/shared/ui';
import { add, deleteIcon, editColor, inactive, infoCircle, search, status } from '~/assets/images';
import { IColumn } from '~/features/merchants/interfaces';
import { ITag } from '~/features/tags/interfaces';
import { CreateEditTagModal } from '~/features/tags';
import './Tags.scss';

const Tags = () => {
  const b = bem('Tags');
  const { t } = useTranslation();
  const [creating, setCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDeactivateButton, setIsDeactivateButton] = useState(true);
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const pagePrevHandler = () => {};
  const pageNextHandler = () => {};

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOkCancel = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTagOkCancel = () => {
    setIsTagModalOpen(!isTagModalOpen);
  };

  const showTagModal = (isCreating: boolean) => {
    setCreating(isCreating);
    setIsTagModalOpen(true);
  };

  const showEditModal = () => {
    showTagModal(false);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedStatuses = newSelectedRowKeys.map((key) => {
      const selectedMerchant = data.find((item) => item.id === parseInt(key.toString()));
      return selectedMerchant ? selectedMerchant.active : false;
    });
    const hasActiveTrue = selectedStatuses.includes(true);
    const hasActiveFalse = selectedStatuses.includes(false);
    const hasMixedStatus = hasActiveTrue && hasActiveFalse;
    setIsDeactivateButton(hasActiveTrue && !hasActiveFalse);
    setIsDisabledButton(hasMixedStatus);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: IColumn[] = [
    {
      title: '№',
      width: 10,
      dataIndex: 'id',
    },
    {
      title: t('tags.name') + ' KG',
      render: (record: ITag) => {
        return <div className={b('tag')}>{record?.tag_ky}</div>;
      },
    },
    {
      title: t('tags.name') + ' RU',
      render: (record: ITag) => {
        return <div className={b('tag')}>{record?.tag_ru}</div>;
      },
    },
    {
      title: t('tags.name') + ' ENG',
      render: (record: ITag) => {
        return <div className={b('tag')}>{record?.tag_en}</div>;
      },
    },
    {
      title: t('merchants.status'),
      dataIndex: 'active',
      render: (text: boolean) => {
        return <img className={b('center-block')} src={text ? status : inactive} alt='status' />;
      },
    },
    {
      title: t('merchants.action'),
      render: () => {
        return (
          <div className={b('tags-block')}>
            <Tooltip
              color='#707A94'
              placement='left'
              title={
                <div className={b('info')}>
                  <img src={infoCircle} alt='infoCircle' />
                  <p>{t('tags.edit_tag')}</p>
                </div>
              }
            >
              <Button
                onClick={showEditModal}
                className={b('add-button')}
                icon={<img src={editColor} alt='plus' />}
              />
            </Tooltip>
            <Tooltip
              color='#707A94'
              placement='left'
              title={
                <div className={b('info')}>
                  <img src={infoCircle} alt='infoCircle' />
                  <p>{t('tags.delete_tag')}</p>
                </div>
              }
            >
              <Button className={b('delete-button')} icon={<img src={deleteIcon} alt='plus' />} />
            </Tooltip>
          </div>
        );
      },
    },
  ] as IColumn[];

  const data: ITag[] = [
    {
      id: 1,
      tag_ky: '#Тег аты',
      tag_ru: '#Название тега',
      tag_en: '#Naimenovanie',
      active: false,
    },
    {
      id: 2,
      tag_ky: '#Тег аты',
      tag_ru: '#Название тега',
      tag_en: '#Naimenovanie',
      active: true,
    },
    {
      id: 3,
      tag_ky: '#Тег аты',
      tag_ru: '#Название тега',
      tag_en: '#Naimenovanie',
      active: false,
    },
  ];

  return (
    <Row justify='space-between' data-testid='auth-component' className={b()}>
      <Row className={b('search-pagination-block')}>
        <div>
          <Form>
            <FormField
              style={{ width: 300 }}
              id='autocomplete_id'
              placeholder={t('tags.search_by')}
              size='large'
              prefix={<img src={search} alt='search' />}
            />
          </Form>
        </div>
      </Row>
      <Row className={b('table-block')}>
        <Button
          className={b('button-style')}
          type='primary'
          icon={<img src={add} alt='add' />}
          onClick={() => showTagModal(true)}
        >
          {t('tags.add_tag')}
        </Button>

        <TableComponent
          rowKey={(record) => record.id.toString()}
          rowSelection={rowSelection}
          loading={false}
          data={data}
          columns={columns}
          pagePrevHandler={pagePrevHandler}
          pageNextHandler={pageNextHandler}
        />

        {!!selectedRowKeys.length && (
          <div className={b('pagination-block')}>
            <Button
              className={isDeactivateButton ? b('deactivate-button') : b('activate-button')}
              type='default'
              onClick={showModal}
              disabled={isDisabledButton}
            >
              {isDeactivateButton ? t('merchants.deactivate') : t('merchants.activate')} (
              {selectedRowKeys.length})
            </Button>
          </div>
        )}
      </Row>

      <ModalComponent
        width={311}
        isModalOpen={isModalOpen}
        handleOk={handleOkCancel}
        handleCancel={handleOkCancel}
      >
        <ActiveInactiveModal
          textTitle={
            isDeactivateButton
              ? (t('merchants.deactivate') as string)
              : (t('merchants.activate') as string)
          }
          infoText={
            isDeactivateButton
              ? (t('tags.the_tags_you_select_will_not_be_active') as string)
              : (t('tags.the_tags_you_select_will_be_active') as string)
          }
          handleOkCancel={handleOkCancel}
        />
      </ModalComponent>

      <ModalComponent
        closeIcon
        width={360}
        isModalOpen={isTagModalOpen}
        handleOk={handleTagOkCancel}
        handleCancel={handleTagOkCancel}
      >
        <CreateEditTagModal
          textTitle={
            creating
              ? (t('modals.creating_a_tag') as string)
              : (t('modals.editing_a_tag') as string)
          }
          creating={creating}
        />
      </ModalComponent>
    </Row>
  );
};

export default Tags;
