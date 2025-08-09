import { Order, OrderCreation ,OrderSearchParams,OrderUpdate } from '../entities/order.entity';

export interface IOrderRepository {
  ByShipperId(shipperId: number): Promise<Order[] | null>;
  ByTracking(tracking: string): Promise<Order | null>;
  searchOrder(params: OrderSearchParams): Promise<Order[]>;
  create(data: OrderCreation): Promise<Order>;
  edit(id: number, data: OrderUpdate): Promise<Order>;
}