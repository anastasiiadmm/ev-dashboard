import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import { ITagPagination, ITag } from '~/features/tags/interfaces';
import { getAxiosConfig } from '~/shared/utils';

interface TagsState {
  tags: ITag[] | null;
  tagsPagination: ITagPagination | null;
  tagsLoading: boolean;
  tagsError: string | null;
}

class TagsStore implements TagsState {
  tags: ITag[] | null = null;
  tagsPagination: ITagPagination | null = {
    page: null,
    pages: null,
    size: null,
    total: null,
  };
  tagsLoading: boolean = false;
  tagsError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTags(queryString: string, currentLanguage: string) {
    try {
      runInAction(() => {
        this.tagsLoading = true;
        this.tagsError = null;
      });

      const config = getAxiosConfig(currentLanguage);

      const resp = await axiosApi.get(`/common/tags/${queryString}`, config);
      const data = resp.data;

      runInAction(() => {
        this.tags = data?.items;
        if (this.tagsPagination) {
          this.tagsPagination.page = data?.page;
          this.tagsPagination.pages = data?.pages;
          this.tagsPagination.size = data?.size;
          this.tagsPagination.total = data?.total;
        }
        this.tagsLoading = false;
        this.tagsError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.tagsLoading = false;
        this.tagsError = error?.message || null;
      });
    }
  }
}

const tagsStore = new TagsStore();
export default tagsStore;
