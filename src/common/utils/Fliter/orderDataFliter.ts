export interface FilteredOrderData {
  id: number;
  cusName: string;
  cusPhone: string;
  cusAddress: string;
  note: string;
  cod: number;
  delivery: boolean;
  trackingId: string;
  deliFee?: number;
  shipperId: number;
  shipper_id: string;
  shipperName: string;
  shipperPhone: string;
  shipperCityName: string;
  shipperStateName: string;
  orderCityName: string;
  orderCityCode: string;
  orderStateName: string;
  totalCod: number;
}

export function OrderFilter(data: any): FilteredOrderData {
  const calculatedDeliFee = data.deliFee ?? data.City?.fee ?? 0;
  const totalCod = data.delivery ? data.cod + calculatedDeliFee : data.cod;

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
    shipper_id: data.Shipper?.id,
    shipperId: data.Shipper?.shipperId,
    shipperName: data.Shipper?.name,
    shipperPhone: data.Shipper?.phone,
    shipperCityName: data.Shipper?.City?.name,
    shipperStateName: data.Shipper?.City?.state?.name,
    orderCityName: data.City?.name,
    orderCityCode: data.City?.Code,
    orderStateName: data.City?.state?.name,
    totalCod: totalCod,
  };
}