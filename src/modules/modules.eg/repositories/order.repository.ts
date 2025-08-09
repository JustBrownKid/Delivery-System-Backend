import { Otp } from '@prisma/client';
import { Shipper, ShipperCreation } from '../entities/order.entity';

export interface IShipperRepository {
  findByShipperId(shipperId: string): Promise<Shipper | null>;
  create(data: ShipperCreation): Promise<Shipper>;
}