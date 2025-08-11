import { Order, OrderCreation ,OrderWithCity,OrderSearchParams,OrderUpdate } from '../entities/order.entity';

export interface IOrderRepository {
  ByShipperId(shipperId: number): Promise<Order[] | null>;
  ByTracking(tracking: string): Promise<OrderWithCity | null>;
  searchOrder(params: OrderSearchParams): Promise<Order[]>;
  create(data: OrderCreation): Promise<Order>;
  edit(id: number, deliFee: number): Promise<Order>;
}