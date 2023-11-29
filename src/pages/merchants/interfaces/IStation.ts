export interface ISchedule {
  days: number[];
  open: string;
  breaks: string[];
}

export interface IStation {
  id: number;
  name: string;
  location: string;
  schedule: ISchedule[];
  status: number;
  connectors: string[];
  tags: string[];
  surroundings: string[];
}

export interface ICreateSchedule {
  id: number;
  day: number;
  start_time: string;
  end_time: string;
  is_break: boolean;
  break?: ICreateSchedule[];
}

export interface ICreateConnector {
  id?: number;
  evse_id: number;
  fee: string;
  power_kWh: number;
  ocpp_16_id: number;
  connector_id: number;
  typo: string;
  position: number;
  cable_length: number;
}

export interface IModule {
  evse_id: number;
  connectors: ICreateConnector[];
}

enum ExecutionType {
  Wall = 'wall',
  Floor = 'floor',
  Mobile = 'mobile',
}

export interface ICreateStation {
  media_files: [
    {
      content: 'http://example.com';
    },
  ];
  schedule: ICreateSchedule[];
  connectors: ICreateConnector[];
  identity: string;
  password: string;
  pic: string;
  name_ru: string;
  name_en: string;
  name_ky: string;
  manufacturer: string;
  execution_type: ExecutionType;
  address_ru: string;
  address_en: string;
  address_ky: string;
  longitude: string;
  latitude: string;
  status: number;
  is_new: boolean;
  last_seen: string;
  merchant: number;
  country: number;
  district: number;
  city: number;
  tags: number[];
  environment: number[];
}
