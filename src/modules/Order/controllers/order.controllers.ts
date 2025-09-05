import { Request, Response } from "express";
import { OrderService } from "../services/order.services";
import { sendResponse } from "../../../common/utils/res/response";
import { OrderCreation, OrderSearchParams } from "../entities/order.entity";
import { prismaOrderRepository } from "../repositories/order.prisma.repository";
import { OrderFilter } from "../../../common/utils/Fliter/orderDataFliter";

const OrderServiceInstance = new OrderService(new prismaOrderRepository());

export default {
  async city(req: Request, res: Response): Promise<any> {
    try {
      const city = await OrderServiceInstance.city();
      sendResponse(res, 200,  "Success" ,city);
    } catch (error) {
      sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
    }
  },

  async state(req: Request, res: Response): Promise<any> {
    try {
      const state = await OrderServiceInstance.state();
      sendResponse(res , 200 , "success" , state);
    } catch (error) {
      sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
    }
  },

  async create(req: Request, res: Response) {
    const data: OrderCreation = req.body;
    try {
      const order = await OrderServiceInstance.create(data);
      sendResponse(res, 201, "Order created successfully", order);
    } catch (error) {
      sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
    }
  },

  async getAll(req: Request, res: Response) {
    const { page } = req.query;
    try {
      const orders = await OrderServiceInstance.getAll(Number(page));
      if (!orders || orders.length === 0) {
        return sendResponse(res, 404, "No orders found", null);
      }
      sendResponse(res, 200, "Orders retrieved successfully", orders);
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
      sendResponse(res, 200, "Order retrieved successfully", order);
    } catch (error) {
      sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
    }
  },async searchOrder(req: Request, res: Response): Promise<any> {
    try {
      // Convert comma-separated tracking IDs into an array
      const trackingIdParam = req.query.trackingId?.toString();
      const trackingIds = trackingIdParam
          ? trackingIdParam.split(',').map(id => id.trim())
          : [];

      const params: OrderSearchParams = {
        shipperId: req.query.shipperId?.toString(),
        name: req.query.name?.toString(),
        phone: req.query.phone?.toString(),
        trackingIds, // Use array of tracking IDs
        startDate: req.query.startDate
            ? new Date(req.query.startDate.toString())
            : undefined,
        endDate: req.query.endDate
            ? new Date(req.query.endDate.toString())
            : undefined,
      };

      const orders = await OrderServiceInstance.searchOrder(params);
      return res.status(200).json({ success: true, data: orders });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message,
      });
    }
  }
,

  async createMultiple(req: Request, res: Response) {
    const shipperId: number = req.body.shipperId;
    const {
      pickUpAddress,
      pickUpState,
      pickUpDate,
      pickUpCityId,
      pickUpPhone,
      pickUpName,
      orders,
    } = req.body;

    try {
      const ordersWithPickUpInfo: OrderCreation[] = orders.map((order: any) => ({
        cusName: order.cusName,
        cusPhone: order.cusPhone,
        cusAddress: order.cusAddress,
        cod: order.cod,
        delivery: order.delivery,
        note: order.note,
        shipperId,
        pickUpAddress,
        pickUpState,
        pickUpDate: new Date(pickUpDate),
        pickUpPhone,
        pickUpName,
        destinationCityId: order.cityId,
        pickUpCityId,
      }));

      const createdOrders = await OrderServiceInstance.createMultiple(ordersWithPickUpInfo);
      sendResponse(res, 201, "Orders created successfully", createdOrders);
    } catch (error) {
      sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
    }
  },

  async editDeliFee(req: Request, res: Response): Promise<any> {
    try {
      const { tracking } = req.params;
      const { deliFee } = req.body;

      if (!tracking || deliFee === undefined || isNaN(deliFee)) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing ID or delivery fee.",
        });
      }

      const order = await OrderServiceInstance.ByTracking(tracking);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found.",
        });
      }

      const updatedOrder = await OrderServiceInstance.updateDeliFee(Number(order.id), deliFee);
      return res.status(200).json({
        success: true,
        message: "Delivery fee updated successfully.",
        data: updatedOrder,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update delivery fee.",
        error: (error as Error).message,
      });
    }
  },

  async orderUpdate(req: Request, res: Response): Promise<any> {
    const { trackingId } = req.params;
    const data = req.body;

    try {
      if (!trackingId) {
        return res.status(400).json({
          success: false,
          message: "Tracking ID is required.",
        });
      }

      const order = await OrderServiceInstance.ByTracking(trackingId);
      if (!order) {
        throw new Error("Invalid trackingId, Order not found");
      }

      const updatedOrder = await OrderServiceInstance.orderUpdate(order.id, data);
      return sendResponse(res, 200, "Order updated successfully", updatedOrder);
    } catch (error) {
      console.error("Prisma update error:", error);
      return sendResponse(res, 500, (error as Error).message);
    }
  },
};
