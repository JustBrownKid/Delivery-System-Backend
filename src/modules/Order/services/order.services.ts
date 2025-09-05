import { IOrderRepository } from "../repositories/order.repository";
import { OrderCreation, Order,OrderWithCity, OrderSearchParams } from "../entities/order.entity";

export class OrderService {
    constructor(private orderRepo: IOrderRepository) {}
    async city() : Promise<any> {
        return this.orderRepo.city();
    }
    async state() : Promise<any> {
        return this.orderRepo.state();
    }

    async create(data: OrderCreation): Promise<Order> {
        return this.orderRepo.create(data);
    }
    async getAll(page: number): Promise<Order[] | null> {
        return this.orderRepo.getAll(page);
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
        const order = await this.orderRepo.deliFeeUpdate(id, deliFee);
        if (!order) {
            throw new Error("Order not found.");
        }
        return order;
    }
    async orderUpdate(id: number, data: any): Promise<Order> {
        return this.orderRepo.orderUpdate(id, data);
    }
   async createMultiple(orderData: OrderCreation[]): Promise<Order[]> {
    const createdOrders: Order[] = [];

    for (const order of orderData) {
        const orderToCreate: OrderCreation = {
            cusName: order.cusName,
            cusPhone: order.cusPhone,
            cusAddress: order.cusAddress,
            cod: order.cod,
            delivery: order.delivery,
            note: order.note,
            shipperId: order.shipperId,
            pickUpAddress: order.pickUpAddress,
            pickUpState: order.pickUpState,
            pickUpDate: order.pickUpDate,
            pickUpPhone: order.pickUpPhone,
            pickUpName: order.pickUpName,
            destinationCityId: order.destinationCityId,
            pickUpCityId: order.pickUpCityId,
        };

        const newOrder = await this.orderRepo.create(orderToCreate);
        createdOrders.push(newOrder);
    }

        return createdOrders;
    }

}
