export interface IMerchant {
  id: number;
  name: string;
  legal_name: string;
  rate: string;
  phone: string;
  location: string;
  number_stations: number;
  active_stations: number;
  inactive_stations: number;
  agreement_number: string;
  entity: string;
  active: boolean;
  country: number;
  district: number;
  city: number;
}

export interface IMerchantPagination {
  page: number | null;
  pages: number | null;
  size: number | null;
  total: number | null;
}

export interface IQueryMerchant {
  page: number;
  search: string;
  size: number;
}

export interface ICreateMerchant {
  active: boolean;
  name_ru: string;
  name_en: string;
  name_ky: string;
  legal_name_ru: string;
  legal_name_en: string;
  legal_name_ky: string;
  rate: string;
  agreement_number: string;
  address_ru: string;
  address_en: string;
  address_ky: string;
  phone: string;
  email: string;
  country: number;
  district: number;
  city: number;
}

export interface IMerchantInfo {
  id: number;
  number_stations: number;
  active_stations: number;
  inactive_stations: number;
  name: string;
  legal_name: string;
  email: string;
  rate: string;
  agreement_number: string;
  address: string;
  phone: string;
  active: boolean;
  country: string;
  district: string;
  city: string;
  created_by: string;
  created_at: string;
}

export interface IColumn {
  title: string | JSX.Element;
  dataIndex: string;
  render?: () => JSX.Element;
  width?: number;
}

export interface ITabs {
  key: string;
  label: string;
  children: string | JSX.Element;
}
