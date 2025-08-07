import { IShipperRepository } from "../repositories/shipper.repository";
import { ShipperCreation, Shipper } from "../entities/shipper.entity";

export class shipperService {
  constructor(private shipperRepo: IShipperRepository) {}

  async create(data: ShipperCreation): Promise<Shipper> {
    const newShipper = await this.shipperRepo.create(data);
    return newShipper;
  }

  async findByShipperId(shipperId: string): Promise<Shipper> {
    const shipper = await this.shipperRepo.findByShipperId(shipperId);
    if (!shipper) {
      throw new Error("Shipper not found.");
    }
    return shipper;
  }

  async createMultiple(shippersData: ShipperCreation[]): Promise<Shipper[]> {
    const createdShippers = [];
    for (const shipperData of shippersData) {
      const newShipper = await this.shipperRepo.create(shipperData);
      createdShippers.push(newShipper);
    }
    return createdShippers;
  }
}
