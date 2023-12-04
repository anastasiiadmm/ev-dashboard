import { Dayjs } from 'dayjs';

export interface ICommon {
  id: number;
  name: string;
}
export interface IFormData {
  name_ru: string;
  name_en: string;
  name_ky: string;
  source: string;
  image: string;
  category: number;
  button_label: string;
  button_color: string;
  start_time: null;
  start_date: null;
  finish_time: null;
  finish_date: Dayjs | null;
  is_active: boolean;
  link: string;
  merchant: number[];
  stations: number[];
}
