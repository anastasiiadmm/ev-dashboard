import React, { useState, useEffect } from 'react';

import { useDebounce } from '~/shared/hooks';
import { getParams } from '~/shared/utils';
import { useLanguage } from '~/shared/context';
import { IQueryType } from '~/shared/interfaces';

interface FetchFunctionType {
  (queryString: string, currentLanguage: string): Promise<void>;
}

const useTableFilter = (
  fetchFunction: FetchFunctionType,
  { includeSearch = true, additionalParams = {} } = {},
) => {
  const { currentLanguage } = useLanguage();
  const [filters, setFilters] = useState<IQueryType>({ page: 1, search: '', size: 10 });

  const debouncedSearchTerm = useDebounce(filters?.search, 500);
  const debouncedPageTerm = useDebounce(filters?.page, 500);

  useEffect(() => {
    const params: IQueryType = {
      ...additionalParams,
      page: filters.page,
      size: filters.size,
    };
    if (includeSearch) {
      params.search = filters.search;
    }
    const queryString = getParams(params);
    fetchFunction(queryString, currentLanguage);
  }, [currentLanguage, debouncedSearchTerm, debouncedPageTerm, filters?.size]);

  const handlePageChange = (page: number, size: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, page, size }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, search: value }));
  };

  const pagePrevHandler = () => {
    setFilters((prevFilters) => ({ ...prevFilters, page: Math.max(1, prevFilters.page - 1) }));
  };

  const pageNextHandler = () => {
    setFilters((prevFilters) => ({ ...prevFilters, page: prevFilters.page + 1 }));
  };

  const onChangePageCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFilters((prevFilters) => ({ ...prevFilters, page: value }));
  };

  const changeShowByHandler = (value: string) => {
    const size = parseInt(value, 10);
    setFilters((prevFilters) => ({ ...prevFilters, size }));
  };

  return {
    filters,
    handlePageChange,
    handleSearchChange,
    pagePrevHandler,
    pageNextHandler,
    onChangePageCheckHandler,
    changeShowByHandler,
  };
};

export default useTableFilter;
