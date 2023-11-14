import bem from 'easy-bem';
import { Button, Form, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { ActiveInactiveModal, FormField, ModalComponent, TableComponent } from '~/shared/ui';
import { add, deleteIcon, editColor, inactive, infoCircle, search, status } from '~/assets/images';
import { IColumn } from '~/pages/merchants/interfaces';
import { ITag } from '~/pages/tags/interfaces';
import { CreateEditTagModal } from '~/pages/tags';
import { useNotification, useRowSelection, useTableFilter } from '~/shared/hooks';
import { tagsStore } from '~/shared/api/store';
import './Tags.scss';

const Tags = observer(() => {
  const b = bem('Tags');
  const { t } = useTranslation();
  const openNotification = useNotification();
  const {
    tags,
    tagsPagination,
    tagsLoading,
    changeStatusesSuccess,
    changeStatusesLoading,
    deleteTagLoading,
  } = toJS(tagsStore);
  const {
    filters,
    handleSearchChange,
    pagePrevHandler,
    pageNextHandler,
    changeShowByHandler,
    onChangePageCheckHandler,
  } = useTableFilter(tagsStore.fetchTags.bind(tagsStore));
  const {
    selectedRowKeys,
    onSelectChange,
    isDeactivateButton,
    isDisabledButton,
    applyChangeStatus,
  } = useRowSelection(tags || [], tagsStore.changeTagsStatuses.bind(tagsStore));
  const [selectedRowKey, setSelectedRowKey] = useState<number>(null);
  const [creating, setCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  useEffect(() => {
    if (changeStatusesSuccess) {
      handleOkCancel();
    }
    return () => {
      tagsStore.setChangeStatusesSuccess(false);
    };
  }, [changeStatusesSuccess]);

  const showDeleteModal = () => {
    setIsModalDeleteOpen(true);
  };

  const handleDeleteOkCancel = () => {
    setIsModalDeleteOpen(!isModalDeleteOpen);
  };

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

  const handleAgreeHandler = async () => {
    try {
      await applyChangeStatus();
    } catch (e) {
      if (e instanceof Error) {
        openNotification('error', '', e.message);
      } else {
        console.error('Unexpected error type:', e);
      }
    }
  };

  const handleAgreeDeleteTagHandler = async () => {
    try {
      await tagsStore.deleteTag(selectedRowKey);
      handleDeleteOkCancel();
    } catch (e) {
      if (e instanceof Error) {
        openNotification('error', '', e.message);
      } else {
        console.error('Unexpected error type:', e);
      }
    }
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
        return <div className={b('tag')}>{record?.title_ky}</div>;
      },
    },
    {
      title: t('tags.name') + ' RU',
      render: (record: ITag) => {
        return <div className={b('tag')}>{record?.title_ru}</div>;
      },
    },
    {
      title: t('tags.name') + ' ENG',
      render: (record: ITag) => {
        return <div className={b('tag')}>{record?.title_en}</div>;
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
      render: (record: ITag) => {
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
              <Button
                onClick={() => {
                  showDeleteModal();
                  setSelectedRowKey(record.id);
                }}
                className={b('delete-button')}
                icon={<img src={deleteIcon} alt='plus' />}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ] as IColumn[];

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
              onChange={handleSearchChange}
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
          loading={tagsLoading}
          data={tags}
          columns={columns}
          pagePrevHandler={pagePrevHandler}
          pageNextHandler={pageNextHandler}
          changeShowByHandler={changeShowByHandler}
          onChangePageCheckHandler={onChangePageCheckHandler}
          defaultSizeValue={filters?.page}
          pages={tagsPagination}
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
          handleAgreeHandler={handleAgreeHandler}
          loadingStatus={changeStatusesLoading}
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

      <ModalComponent
        width={311}
        isModalOpen={isModalDeleteOpen}
        handleOk={handleDeleteOkCancel}
        handleCancel={handleDeleteOkCancel}
      >
        <ActiveInactiveModal
          textTitle={t('tags.deleting_tag') as string}
          infoText={t('tags.if_you_delete_it_you_wont_be_able_to_restore') as string}
          handleOkCancel={handleDeleteOkCancel}
          loadingStatus={deleteTagLoading}
          handleAgreeHandler={handleAgreeDeleteTagHandler}
        />
      </ModalComponent>
    </Row>
  );
});

export default Tags;
