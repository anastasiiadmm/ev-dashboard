import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import axiosApi from '~/shared/utils/mobx-api';
import { ITagPagination, ITag, ITagCreate } from '~/pages/tags/interfaces';
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
  deleteTagSuccess: boolean;
  deleteTagLoading: boolean;
  deleteTagError: string | null;
  createTagLoading: boolean;
  createTagSuccess: boolean;
  createTagError: string | null;
  updateTagLoading: boolean;
  updateTagSuccess: boolean;
  updateTagError: string | null;
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
  deleteTagSuccess: boolean = false;
  deleteTagLoading: boolean = false;
  deleteTagError: string | null = null;
  createTagLoading: boolean = false;
  createTagSuccess: boolean = false;
  createTagError: string | null = null;
  updateTagLoading: boolean = false;
  updateTagSuccess: boolean = false;
  updateTagError: string | null = null;

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

  async deleteTag(id: number | null) {
    try {
      runInAction(() => {
        this.deleteTagSuccess = false;
        this.deleteTagLoading = true;
        this.deleteTagError = null;
      });

      await axiosApi.delete(`/common/tags/${id}/`);

      runInAction(() => {
        if (!this.tags) {
          this.tags = [];
        } else {
          this.tags = this.tags.filter((item) => item.id !== Number(id));
        }
        this.deleteTagSuccess = true;
        this.deleteTagLoading = false;
        this.deleteTagError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.deleteTagLoading = false;
        this.deleteTagSuccess = false;
        this.deleteTagError = error?.message || null;
      });
    }
  }

  async createTag(data: ITagCreate) {
    try {
      runInAction(() => {
        this.createTagSuccess = false;
        this.createTagLoading = true;
        this.createTagError = null;
      });

      const resp = await axiosApi.post(`/common/tags/`, data);
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

        this.createTagSuccess = true;
        this.createTagLoading = false;
        this.createTagError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.createTagLoading = false;
        this.createTagSuccess = false;
        this.createTagError = error?.message || null;
      });
    }
  }

  setCreateTagSuccess(value: boolean) {
    this.createTagSuccess = value;
  }

  async updateTag(id: number | null, data: ITagCreate) {
    try {
      runInAction(() => {
        this.updateTagSuccess = false;
        this.updateTagLoading = true;
        this.updateTagError = null;
      });

      const resp = await axiosApi.patch(`/common/tags/${id}/`, data);
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

        this.updateTagSuccess = true;
        this.updateTagLoading = false;
        this.updateTagError = null;
      });
    } catch (e) {
      const error = e as AxiosError;
      runInAction(() => {
        this.updateTagLoading = false;
        this.updateTagSuccess = false;
        this.updateTagError = error?.message || null;
      });
    }
  }

  setUpdateSuccess(value: boolean) {
    this.updateTagSuccess = value;
  }
}

const tagsStore = new TagsStore();
export default tagsStore;
