export interface IMerchant {
  id: number;
  number_stations: number;
  active_stations: number;
  inactive_stations: number;
  name: string;
  legal_name: string;
  rate: string;
  agreement_number: string;
  phone: string;
  location: string;
  entity: string;
  active: boolean;
  country: number;
  district: number;
  city: number;
}

export interface IMerchantDetail extends Omit<IMerchant, 'country' | 'district' | 'city'> {
  created_by: string;
  city_name: string;
  country_name: string;
  district_name: string;
  created_at: string;
  address: string;
  email: string;
}

export interface IMerchantStation {
  id: number;
  name: string;
  location: string;
  schedule: IScheduleStation[];
  status: number;
  connectors: string[];
  tags: string[];
  surroundings: string[];
  active?: boolean;
}

export interface IScheduleStation {
  days: number[];
  open: string;
  breaks: string[];
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

export interface ISelectMerchant {
  id: number;
  name: string;
}
