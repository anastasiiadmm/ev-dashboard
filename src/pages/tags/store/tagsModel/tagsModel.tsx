import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import { ITagPagination, ITag } from '~/pages/tags/interfaces';
import { getAxiosConfig } from '~/shared/utils';
import { IChangeStatuses } from '~/shared/interfaces';

interface TagsState {
  tags: ITag[] | null;
  tagsPagination: ITagPagination | null;
  tagsLoading: boolean;
  tagsError: string | null;
  changeStatusesSuccess: boolean;
  changeStatusesLoading: boolean;
  changeStatusesError: string | null;
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
  changeStatusesSuccess: boolean = false;
  changeStatusesLoading: boolean = false;
  changeStatusesError: string | null = null;

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

  async changeTagsStatuses(data: IChangeStatuses) {
    try {
      runInAction(() => {
        this.changeStatusesSuccess = false;
        this.changeStatusesLoading = true;
        this.changeStatusesError = null;
      });

      const resp = await axiosApi.patch(`/common/tags/statuses/`, data);
      const updatedTags = resp.data;

      runInAction(() => {
        if (!this.tags) {
          this.tags = [];
        }

        updatedTags.forEach((updatedTag: ITag) => {
          const index = this.tags!.findIndex((tag) => tag.id === updatedTag.id);
          if (index !== -1) {
            this.tags![index] = updatedTag;
          } else {
            this.tags!.push(updatedTag);
          }
        });

        this.changeStatusesSuccess = true;
        this.changeStatusesLoading = false;
        this.changeStatusesError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.changeStatusesLoading = false;
        this.changeStatusesSuccess = false;
        this.changeStatusesError = error?.message || null;
      });
    }
  }

  setChangeStatusesSuccess(value: boolean) {
    this.changeStatusesSuccess = value;
  }
}

const tagsStore = new TagsStore();
export default tagsStore;
