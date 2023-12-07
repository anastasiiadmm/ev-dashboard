export interface IUser {
  id: number;
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  age: number;
  account_balance: string;
  is_active: boolean;
  gender: number;
  registered_on: string;
  vehicles: IVehicle[];
  access: boolean;
}

export interface IVehicle {
  brand: string;
  model: string;
  color: string;
  year: number;
}
