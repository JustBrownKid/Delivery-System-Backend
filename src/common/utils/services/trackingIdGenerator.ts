import { PrismaClient } from '@prisma/client';

export class trackingIdGenerator {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async trackingIdGenerator(): Promise<string> {
    let isUnique = false;
    let trackingId: string = '';

    while (!isUnique) {
      const randomSuffix = Math.floor(10000000000000000000 + Math.random() * 90000000000000000000).toString();
      trackingId = 'DOME' + randomSuffix;

      const existingShipper = await this.prisma.shipper.findUnique({
        where: {
          shipperId: trackingId,
        },
      });

      if (!existingShipper) {
        isUnique = true;
      }
    }
    return trackingId;
  }
}