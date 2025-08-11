export interface FilteredOrderData {
  id: number;
  cusName: string;
  cusPhone: string;
  cusAddress: string;
  note: string;
  cod: number;
  delivery: boolean;
  trackingId: string;
  deliFee: number;
  shipperId: number;
  shipperName: string;
  shipperPhone: string;
  shipperCityName: string;
  shipperStateName: string;
  orderCityName: string;
  orderCityCode: string;
  orderStateName: string;
}

export function OrderFilter(data: any): FilteredOrderData {
  return {
    id: data.id,
    cusName: data.cusName,
    cusPhone: data.cusPhone,
    cusAddress: data.cusAddress,
    note: data.note,
    cod: data.cod,
    delivery: data.delivery,
    trackingId: data.trackingId,
    deliFee: data.deliFee,
    shipperId: data.Shipper.id,
    shipperName: data.Shipper.name,
    shipperPhone: data.Shipper.phone,
    shipperCityName: data.Shipper.City.name,
    shipperStateName: data.Shipper.City.state.name,
    orderCityName: data.City.name,
    orderCityCode: data.City.Code,
    orderStateName: data.City.state.name,
  };
}