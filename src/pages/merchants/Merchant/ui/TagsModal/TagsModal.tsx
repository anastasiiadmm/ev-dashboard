import { Button, Divider, Form } from 'antd';
import bem from 'easy-bem';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { search } from '~/assets/images';
import { IColumn } from '~/pages/merchants/interfaces';
import { ITag } from '~/pages/tags/interfaces';
import { tagsStore } from '~/shared/api/store';
import { useRowSelection, useTableFilter } from '~/shared/hooks';
import { FormField, TableComponent } from '~/shared/ui';

import './TagsModal.scss';

interface Props {
  language: string;
}

const TagsModal: React.FC<Props> = observer(({ language }) => {
  const b = bem('TagsModal');
  const { t } = useTranslation();
  const { tags, tagsPagination, tagsLoading } = toJS(tagsStore);
  const {
    filters,
    handleSearchChange,
    pagePrevHandler,
    pageNextHandler,
    changeShowByHandler,
    onChangePageCheckHandler,
  } = useTableFilter(tagsStore.fetchTags.bind(tagsStore));
  const { selectedRowKeys, onSelectChange } = useRowSelection(
    tags || [],
    tagsStore.changeTagsStatuses.bind(tagsStore),
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const renderName = (infrastructure: ITag) => {
    switch (language) {
      case 'ky':
        return infrastructure?.title_ky;
      case 'en':
        return infrastructure?.title_en;
      default:
        return infrastructure?.title_ru;
    }
  };

  const columns: IColumn[] = [
    {
      title: t('merchants.tags'),
      render: (record: ITag) => {
        return (
          <div className={b('tags-block')}>
            <div className={b('tag')}>{renderName(record)}</div>
            <div className={b('text-language')}>
              {record?.title_ky && 'KG'} <Divider type='vertical' />
              {record?.title_ru && 'RU'} <Divider type='vertical' />
              {record?.title_en && 'ENG'}
            </div>
          </div>
        );
      },
    },
  ] as IColumn[];

  return (
    <div className={b()}>
      <div className={b('search-pagination-block')}>
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
      <div className={b('table-block')}>
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
          scroll={{ x: 0 }}
          notGrayRow
        />
      </div>
      <Button
        className={b('save-tags')}
        type='primary'
        onClick={() => console.log('[ВЫБРАТЬ]')}
        disabled={!selectedRowKeys.length}
      >
        {t('merchants.choose')}
      </Button>
    </div>
  );
});

export default TagsModal;
