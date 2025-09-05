
export interface OrderCreation {
  shipperId:number
  trackingId?: string;
  cusName: string;
  cusPhone: string;
  cusAddress: string;
  cod: number;
  delivery: boolean;
  note: string;
  destinationCityId: number;
  pickUpCityId: number;
  pickUpAddress: string;
  pickUpState: string;
  pickUpDate: Date;
  pickUpPhone: string;
  pickUpName: string;
  destinationCity?: string;
  pickUpCity?: string;
}
export interface Order {
  id: number;
  shipperId:number
  cusName: string;
  cusPhone: string;
  cusAddress: string;
  cod: number;
  destinationCity?: City;
  pickUpCity?: City;
  pickUpAddress: string;
  pickUpPhone: string;
  pickUpName: string;
  delivery: boolean;
  trackingId: string;
  note: string;
  cityId: number;
  totalCod? : number;
}
export interface OrderWithCity {
  destinationCity?: City;
  id: number;
  shipperId:number
  cusName: string;
  cusPhone: string;
  cusAddress: string;
  cod: number;
  delivery: boolean;
  trackingId: string;
  note: string;
  cityId: number;
  totalCod? : number;
}
export interface OrderUpdate {
  cusName?: string;
  cusPhone?: string;
  cusAddress?: string;
  cod?: number;
  delivery?: boolean;
  trackingId?: string;
  note?: string;
  cityId?: number;
}

export interface OrderSearchParams {
  shipperId?: string;
  name?: string;
  phone?: string;
  startDate?: Date;
  endDate?: Date;
  trackingId?: string;
  trackingIds?: string[];
}

export interface City {
  id: number;
  name: string;
  stateId: number;
  status: boolean;
  fee:number;
  Code: string;
  state: State;
}

export interface State {
  id: number;
  name: string;
}