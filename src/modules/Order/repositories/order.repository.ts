import { Order, OrderCreation ,OrderWithCity,OrderSearchParams,OrderUpdate } from '../entities/order.entity';

export interface IOrderRepository {
  ByShipperId(shipperId: number): Promise<Order[] | null>;
  getAll(page: number): Promise<Order[] | null>;
  ByTracking(tracking: string): Promise<OrderWithCity | null>;
  searchOrder(params: OrderSearchParams): Promise<Order[] | null>;
  create(data: OrderCreation): Promise<Order>;
  deliFeeUpdate(id: number, deliFee: number): Promise<Order>;
  orderUpdate(id: number, data: any): Promise<Order>;
}