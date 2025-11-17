import { IOrderRepository } from "./order.repository";
import { OrderCreation, Order, OrderWithCity, OrderSearchParams, OrderUpdate } from "../entities/order.entity";
import { prisma } from "../../../common/database/prismaClient";
import { trackingIdGenerator } from "../../../common/utils/services/trackingIdGenerator";
import { shipperService } from "../../Shipper/services/shipper.services";
import { prismaShipperRepository } from '../../Shipper/repositories/shipper.prisma.repository'
import { any } from "joi";

const ShipperService = new shipperService(new prismaShipperRepository());

export class prismaOrderRepository implements IOrderRepository {
    async state(): Promise<any> {
        const states = await prisma.state.findMany();
        return states;
    }

    async city(): Promise<any> {
        const cities = await prisma.city.findMany({
            where: { status: true }
        });
        return cities;
    }

    async getAll(page: number): Promise<Order[] | null> {
        const take = 20;
        // const currentPage = Math.max(1, page);
        // const skip = (currentPage - 1) * take;

        const orders = await prisma.order.findMany({
            take,
            // skip,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                Shipper: {
                    include: {
                        City: true,
                    },
                },
                destinationCity: {
                    include: {
                        state: true,
                    },
                },
                pickUpCity: {
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
            let totalCod: number;

            if (order.delivery) {
                const deliveryFee = order.deliFee ?? order.destinationCity?.fee ?? 0;
                totalCod = order.cod + deliveryFee;
            } else {
                totalCod = order.cod;
            }
            return {
                ...order,
                totalCod: totalCod
            };
        });
        return ordersWithTotalCod;
    }

    async create(data: OrderCreation): Promise<Order> {
        const idGenerator = new trackingIdGenerator(prisma);
        const uniqueTrackingId = await idGenerator.trackingIdGenerator();

        if (!uniqueTrackingId) {
            throw new Error("Failed to generate unique tracking ID");
        }

        const { shipperId, destinationCityId, pickUpCityId, pickUpDate, ...dataToCreate } = data;

        const newOrder = await prisma.order.create({
            data: {
                ...dataToCreate,
                trackingId: uniqueTrackingId,
                pickUpDate: pickUpDate,
                Shipper: { connect: { id: shipperId } },
                destinationCity: { connect: { id: destinationCityId } },
                pickUpCity: { connect: { id: pickUpCityId } },
            },
        });

        return newOrder;
    }


    async ByShipperId(shipperId: number): Promise<Order[] | null> {
        const orders = await prisma.order.findMany({
            where: {
                shipperId: shipperId
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                Shipper: {
                    select: {
                        name: true,
                        phone: true,
                        cityId: true,
                    },
                },
                destinationCity: {
                    include: {
                        state: true
                    }
                },
                pickUpCity: {
                    include: {
                        state: true
                    }
                },
            },
        });
        if (orders.length === 0) {
            return null;
        }

        const ordersWithTotalCod = orders.map(order => {
            let totalCod: number;
            if (order.delivery) {
                const deliveryFee = order.deliFee ?? order.destinationCity?.fee ?? 0;
                totalCod = order.cod + deliveryFee;
            } else {
                totalCod = order.cod;
            }
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
                destinationCity: {
                    include: {
                        state: true
                    }
                },
                pickUpCity: {
                    include: {
                        state: true
                    }
                },
            },
        });

        if (!order) {
            return null;
        }

        let totalCod: number;

        if (order.delivery) {
            if (order.deliFee) {
                totalCod = order.cod + order.deliFee;
            } else {
                totalCod = order.cod + order.destinationCity.fee;
            }
        } else {
            totalCod = order.cod;
        }
        return { ...order, totalCod };
    }

    async searchOrder(params: OrderSearchParams): Promise<Order[] | null> {
        const { shipperId, name, phone, startDate, endDate, trackingId, trackingIds } = params;
        const whereConditions: any = {};

        if (shipperId) {
            whereConditions.Shipper = { is: { shipperId: shipperId } };
        }
        if (trackingIds && trackingIds.length > 0) {
            whereConditions.trackingId = { in: trackingIds };
        } else if (trackingId) {
            whereConditions.trackingId = trackingId.trim();
        }
        if (phone) {
            whereConditions.cusPhone = phone.trim();
        }
        if (name) {
            whereConditions.cusName = { contains: name.trim(), mode: 'insensitive' };
        }
        if (startDate && endDate) {
            whereConditions.createdAt = { gte: startDate, lte: endDate };
        }

        const orders = await prisma.order.findMany({
            where: whereConditions,
            orderBy: { createdAt: 'desc' },
            include: {
                Shipper: true,
                destinationCity: { include: { state: true } },
                pickUpCity: { include: { state: true } },
            },
        });

        if (!orders || orders.length === 0) return null;

        const ordersWithTotalCod = orders.map(order => {
            const deliveryFee = order.delivery ? (order.deliFee ?? order.destinationCity?.fee ?? 0) : 0;
            const totalCod = order.cod + deliveryFee;
            return { ...order, totalCod };
        });

        return ordersWithTotalCod;
    }
    async deliFeeUpdate(id: number, deliFee: number): Promise<Order> {
        const updatedOrder = await prisma.order.update({
            where: { id: id },
            data: {
                deliFee: deliFee,
                note: "SW Update",
            },
        });
        return updatedOrder;
    }
    

    async orderUpdate(id: number, data: OrderUpdate): Promise<Order> {
        return prisma.order.update({
            where: { id },
            data: data
        });
    }
}
