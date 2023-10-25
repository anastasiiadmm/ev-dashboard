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

export interface IColumn {
  title: string | JSX.Element;
  dataIndex: string;
  render?: (text: string) => JSX.Element;
  width?: number;
}
