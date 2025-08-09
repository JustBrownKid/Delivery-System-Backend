
export interface OrderCreation {
  shipperId:number
  cusName: string;
  cusPhone: string;
  cusAddress: string;
  cod: number;
  delivery: boolean;
  note: string;
  cityId: number;
}
export interface Order {
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