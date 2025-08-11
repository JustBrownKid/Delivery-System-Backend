import { IOrderRepository } from "./order.repository";
import { OrderCreation, Order, OrderWithCity,OrderSearchParams, OrderUpdate } from "../entities/order.entity";
import { prisma } from "../../../common/database/prismaClient";
import { trackingIdGenerator } from "../../../common/utils/services/trackingIdGenerator";
import { shipperService } from "../../Shipper/services/shipper.services";
import { prismaShipperRepository } from '../../Shipper/repositories/shipper.prisma.repository'

const ShipperService = new shipperService(new prismaShipperRepository());

export class prismaOrderRepository implements IOrderRepository {

    async create(data: OrderCreation): Promise<Order> {
        const idGenerator = new trackingIdGenerator(prisma);
        const uniqueTrackingId = await idGenerator.trackingIdGenerator();

        if (!uniqueTrackingId) {
            throw new Error("Failed to generate unique tracking ID");
        }

        const newOrder = await prisma.order.create({
            data: {
                ...data,
                trackingId: uniqueTrackingId
            },
        });

        return newOrder;
    }

    async ByShipperId(shipperId: number): Promise<Order[] | null> {
        const orders = await prisma.order.findMany({
            where: {
                shipperId: shipperId
            },
            include: {
                Shipper: {
                    select: {
                        name: true,
                        phone: true,
                        cityId: true,
                    },
                },
                City: {
                    include: {
                        state: true,
                    },
                },
            },
        });

        if (orders.length === 0) {
            return null;
        }

        const ordersWithTotalCod = orders.map(order => {
            const totalCod = order.delivery ? (order.cod + (order.City?.fee ?? 0)) : order.cod;
            return {
                ...order,
                totalCod: totalCod
            };
        });

        return ordersWithTotalCod;
    }

    async ByTracking(tracking: string): Promise<OrderWithCity | null> {
        const order = await prisma.order.findUnique({
            where: {
                trackingId: tracking
            },
            include: {
                Shipper: {
                    include: {
                        City: {
                            include: {
                                state: true,
                            },
                        },
                    },
                },
                City: {
                    include: {
                        state: true,
                    },
                },
            },
        });

        if (!order) {
            return null;
        }

        let totalCod: number;

        if (order.delivery) {
            if(order.deliFee){
                totalCod = order.cod + order.deliFee;
            }else{
                totalCod = order.cod + order.City.fee;
            }
        } else {
            totalCod = order.cod;
        }
        return { ...order, totalCod };
    }

    
    async searchOrder(params: OrderSearchParams): Promise<Order[]> {
        const { shipperId, name, phone, startDate, endDate, trackingId } = params;

        const whereConditions: any = {};

        if (shipperId) {
            const shipper = await ShipperService.findByShipperId(shipperId);
            if (shipper) {
               whereConditions.Shipper = {
                shipperId: {
                    equals: shipperId,
                    mode: 'insensitive'
                },
                
             };
            }
        }
        if (params.trackingId) whereConditions.trackingId = params.trackingId;

        if (name) {
            whereConditions.cusName = {
                contains: name,
                mode: 'insensitive',
            };
        }
        if (phone) {
            whereConditions.cusPhone = {
                contains: phone,
                mode: 'insensitive',
            };
        }
        if (startDate && endDate) {
            whereConditions.createdAt = {
                gte: startDate,
                lte: endDate,
            };
        }
        if (trackingId) {
            whereConditions.trackingId = trackingId;
        }

        const orders = await prisma.order.findMany({
            where: whereConditions,
            include: {
                Shipper: true,
                City: true,
            },
        });
        
         if (orders.length === 0) {
            return [];
        }

        const ordersWithTotalCod = orders.map(order => {
            const totalCod = order.delivery ? (order.cod + (order.City?.fee ?? 0)) : order.cod;
            return {
                ...order,
                totalCod: totalCod
            };
        });

        return ordersWithTotalCod;
    }
    async edit(id: number, deliFee: number): Promise<Order> {
        const updatedOrder = await prisma.order.update({
            where: { id: id },
               data: { 
        deliFee: deliFee,
    },
        });

        return updatedOrder;
    }
}
