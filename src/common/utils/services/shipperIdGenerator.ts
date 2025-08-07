import { PrismaClient } from '@prisma/client';

export class ShipperIdGenerator {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async generateUniqueShipperId(): Promise<string> {
    let isUnique = false;
    let randomShipperId: string = '';

    while (!isUnique) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
      randomShipperId = '74' + randomSuffix;

      const existingShipper = await this.prisma.shipper.findUnique({
        where: {
          shipperId: randomShipperId,
        },
      });

      if (!existingShipper) {
        isUnique = true;
      }
    }
    return randomShipperId;
  }
}