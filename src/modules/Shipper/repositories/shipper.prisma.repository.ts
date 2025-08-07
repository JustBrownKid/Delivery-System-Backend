import { prisma } from '../../../common/database/prismaClient';
import { IShipperRepository } from './shipper.repository';
import { ShipperCreation, Shipper } from '../entities/shipper.entity';
import { ShipperIdGenerator } from '../../../common/utils/services/shipperIdGenerator';

export class prismaShipperRepository implements IShipperRepository {
  async findByShipperId(shipperId: string): Promise<Shipper | null> {
  const shipper = await prisma.shipper.findUnique({ where: { shipperId } 
  ,
  include: {
    City: {
      include: {
        state: true,
      },
    },
  }, });
if (!shipper) {
      throw new Error("Internal Server Error while fetching shipper."); 
    }
  return shipper;
  }

async create(data: ShipperCreation): Promise<Shipper> {
  const { cityId, ...shipperData } = data;

  const idGenerator = new ShipperIdGenerator(prisma);
  const uniqueShipperId = await idGenerator.generateUniqueShipperId();

  const newShipper = await prisma.shipper.create({
    data: {
      ...shipperData,
      shipperId: uniqueShipperId,
      City: {
        connect: { id: cityId }, 
      },
    },
    include: {
      City: {
        include: {
          state: true,
        },
      },
    },
  });

  return newShipper;
}}
