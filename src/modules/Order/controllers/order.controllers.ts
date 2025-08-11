import { Request, Response } from "express";
import { OrderService } from "../services/order.services";
import { sendResponse } from "../../../common/utils/res/response";
import { OrderCreation, OrderSearchParams } from "../entities/order.entity";
import { prismaOrderRepository } from "../repositories/order.prisma.repository";
import { OrderFilter } from "../../../common/utils/Fliter/orderDataFliter";


const OrderServiceInstance = new OrderService(new prismaOrderRepository());

export default {
    async create(req: Request, res: Response) {
        const data: OrderCreation = req.body;
        try {
            const Order = await OrderServiceInstance.create(data);
            sendResponse(res, 201, "Order created successfully", Order);
        } catch (error) {
            sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
        }
    },
    async ByShipperId(req: Request, res: Response) {
        const { shipperId } = req.params;
        try {
            const orders = await OrderServiceInstance.ByShipperId(Number(shipperId));
            sendResponse(res, 200, "Orders retrieved successfully", orders);
        } catch (error) {
            sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
        }
    },
    async ByTracking(req: Request, res: Response) {
         const { trackingId } = req.params;
        try {
            const order = await OrderServiceInstance.ByTracking(trackingId);
            const filteredOrder = OrderFilter(order);
            sendResponse(res, 200, "Order retrieved successfully", filteredOrder);
        } catch (error) {
            sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
        }
    },
    async searchOrder(req: Request, res: Response): Promise <any> {
        try {
            const params: OrderSearchParams = {
                shipperId: req.query.shipperId?.toString(),
                name: req.query.name?.toString(),
                phone: req.query.phone?.toString(),
                trackingId: req.query.trackingId?.toString(),
                startDate: req.query.startDate ? new Date(req.query.startDate.toString()) : undefined,
                endDate: req.query.endDate ? new Date(req.query.endDate.toString()) : undefined
            };

            const orders = await OrderServiceInstance.searchOrder(params);
            return res.status(200).json({ success: true, data: orders });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error", error: (error as Error).message });
        }
    },
    async createMultiple(req: Request, res: Response) {
        const shipperId: number = req.body.shipperId;
        const orders: OrderCreation[] = req.body.orders;
        try {
            const createdOrders = await OrderServiceInstance.createMultiple(orders , shipperId);
            sendResponse(res, 201, "Orders created successfully", createdOrders);
        } catch (error) {
            sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
        }
    },
    async editDeliFee(req: Request, res: Response): Promise <any> {
        try {
            const { tracking } = req.params; 
            const { deliFee } = req.body;
            
            if (!tracking || deliFee === undefined || isNaN(deliFee)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid or missing ID or delivery fee."
                });
            }

            const order = await OrderServiceInstance.ByTracking(tracking);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found."
                });
            }
            const updatedOrder = await OrderServiceInstance.updateDeliFee(Number(order.id), deliFee);

            return res.status(200).json({
                success: true,
                message: "Delivery fee updated successfully.",
                data: updatedOrder
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to update delivery fee.",
                error: (error as Error).message
            });
        }
    }
}