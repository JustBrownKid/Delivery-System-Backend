import { prisma } from "../../../common/database/prismaClient";
import { Oswm , OswmCreation } from "../entities/oswm.entity";
import { IOswmRepository } from "./oswm.repository";

export class  prismaOswmRepository implements IOswmRepository {
   async getByTrackingId(trackingId: number): Promise<Oswm | null> {
    const oswm = await prisma.orderDetails.findFirst({
      where: {
        OrderId: trackingId,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return oswm;
  }

  async create(data: OswmCreation): Promise<void> {
    await prisma.orderDetails.create({
      data: data
    })
  }
  
  async createMultiple(data: OswmCreation[]): Promise<void> {
    await prisma.orderDetails.createMany({
      data: data
    })
  }
}