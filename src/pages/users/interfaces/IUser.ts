export interface IUser {
  id: number;
  personal_account: string;
  name: string;
  gender: string;
  birthday: string;
  age: number;
  registration_date: string;
  phone_number: string;
  email: string;
  car: IVehicle[];
  balance: string;
  active: boolean;
  licence: boolean;
}

export interface IVehicle {
  brand: string;
  model: string;
  color: string;
  year: number;
}
