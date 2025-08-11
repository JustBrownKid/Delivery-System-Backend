import { IOrderRepository } from "../repositories/order.repository";
import { OrderCreation, Order,OrderWithCity, OrderSearchParams } from "../entities/order.entity";

export class OrderService {
    constructor(private orderRepo: IOrderRepository) {}
    async create(data: OrderCreation): Promise<Order> {
        return this.orderRepo.create(data);
    }
    async ByShipperId(shipperId: number): Promise<Order[] | null> {
        const order = await this.orderRepo.ByShipperId(shipperId);
        if (!order) {
            throw new Error("Order not found.");
        }
        return order;
    }   
    async ByTracking(tracking: string): Promise<OrderWithCity | null> {
        const order = await this.orderRepo.ByTracking(tracking);
        if (!order) {
            throw new Error("Order not found.");
        }
        return order;
    }
    async searchOrder(params: OrderSearchParams) {
        return this.orderRepo.searchOrder(params);
    }
    async updateDeliFee(id: number, deliFee: number): Promise<Order> {
        const order = await this.orderRepo.edit(id, deliFee);
        if (!order) {
            throw new Error("Order not found.");
        }
        return order;
    }
    async createMultiple(orderData: OrderCreation[] ,shipperId: number): Promise<Order[]> {
        const createdOrders = [];
        for (const order of orderData) {
             const orderWithShipper = {
            ...order,
            shipperId: shipperId
        };
            const newOrder = await this.orderRepo.create(orderWithShipper);
            createdOrders.push(newOrder);
        }
        return createdOrders;
    }

}
