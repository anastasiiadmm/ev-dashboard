export interface IMerchant {
  id: number;
  name_ru: string;
  legal_name_ru: string;
  rate: string;
  phone: string;
  address_ru: string;
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
  render?: (render: IMerchant) => JSX.Element;
  width?: number;
}
export interface ITabs {
  key: string;
  label: string;
  children: string | JSX.Element;
}
