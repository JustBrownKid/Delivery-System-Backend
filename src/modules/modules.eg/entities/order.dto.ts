import { Shipper as PrismaShipper, City as PrismaCity, State as PrismaState } from '@prisma/client';

export interface ShipperResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  shipperId: string;
  cityName: string;
  stateName: string;
}

export class Shipper implements ShipperResponse {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public shipperId: string;
  public cityName: string;
  public stateName: string;

  constructor(
    rawData: {
      id: number;
      name: string;
      email: string;
      phone: string;
      shipperId: string;
      City: PrismaCity & { state: PrismaState } | null;
    }
  ) {
    this.id = rawData.id;
    this.name = rawData.name;
    this.email = rawData.email;
    this.phone = rawData.phone;
    this.shipperId = rawData.shipperId;
    this.cityName = rawData.City?.name || '';
    this.stateName = rawData.City?.state?.name || '';
  }

  public static from(
    rawData: {
      id: number;
      name: string;
      email: string;
      phone: string;
      shipperId: string;
      City: PrismaCity & { state: PrismaState } | null;
    }
  ): Shipper {
    return new Shipper(rawData);
  }
}