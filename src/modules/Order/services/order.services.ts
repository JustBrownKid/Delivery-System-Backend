import { IOrderRepository } from "../repositories/order.repository";
import { OrderCreation, Order, OrderSearchParams } from "../entities/order.entity";
import { ShipperCreation } from "../../modules.eg/entities/order.entity";

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
    async ByTracking(tracking: string): Promise<Order | null> {
        const order = await this.orderRepo.ByTracking(tracking);
        if (!order) {
            throw new Error("Order not found.");
        }
        return order;
    }
    async searchOrder(params: OrderSearchParams) {
  return this.orderRepo.searchOrder(params);
}
    async edit(id: number, data: any): Promise<Order> {
        const order = await this.orderRepo.edit(id, data);
        if (!order) {
            throw new Error("Order not found.");
        }
        return order;
    }
    async createMultiple(orderData: OrderCreation[]): Promise<Order[]> {
        const createdOrders = [];
        for (const order of orderData) {
            const newOrder = await this.orderRepo.create(order);
            createdOrders.push(newOrder);
        }
        return createdOrders;
    }
}
