export interface ShipperCreation {
  email: string;
  phone: string;
  name: string;
  cityId: number;
}

export interface Shipper {
  id: number;
  name: string;
  email: string;
  phone: string;
  shipperId: string;
  City:City | null; 
}

export interface City {
  id: number;
  name: string;
  stateId: number;
  status: boolean;
  Code: string;
  state: State;
}

export interface State {
  id: number;
  name: string;
}