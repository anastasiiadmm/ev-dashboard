import { useState, useEffect } from 'react';

import { useDebounce } from '~/shared/hooks';
import { getParams } from '~/shared/utils';
import { useLanguage } from '~/shared/context';

const useTableFilter = (fetchFunction) => {
  const { currentLanguage } = useLanguage();
  const [filters, setFilters] = useState({ page: 1, search: '', size: 10 });

  const debouncedSearchTerm = useDebounce(filters?.search, 500);
  const debouncedPageTerm = useDebounce(filters?.page, 500);

  useEffect(() => {
    const queryString = getParams({
      page: filters?.page,
      search: filters?.search,
      size: filters?.size,
    });

    fetchFunction(queryString, currentLanguage);
  }, [currentLanguage, debouncedSearchTerm, debouncedPageTerm, filters?.size]);

  const handlePageChange = (page, size) => {
    setFilters((prevFilters) => ({ ...prevFilters, page, size }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, search: value }));
  };

  const pagePrevHandler = () => {
    setFilters((prevFilters) => ({ ...prevFilters, page: Math.max(1, prevFilters.page - 1) }));
  };

  const pageNextHandler = () => {
    setFilters((prevFilters) => ({ ...prevFilters, page: prevFilters.page + 1 }));
  };

  const onChangePageCheckHandler = (e) => {
    const value = parseInt(e.target.value, 10);
    setFilters((prevFilters) => ({ ...prevFilters, page: value }));
  };

  const changeShowByHandler = (value) => {
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
