import { Request, Response } from "express";
import { sendResponse } from "../../../common/utils/res/response";
import { OswmService } from "../services/oswm.services";
import { Oswm , OswmCreation } from "../entities/oswm.entity";
import { prismaOswmRepository } from "../repositories/oswm.prisma.repository";
import { OrderService } from "../../Order/services/order.services";
import { prismaOrderRepository } from "../../Order/repositories/order.prisma.repository";
import { promises } from "nodemailer/lib/xoauth2";

const orderServices = new OrderService(new prismaOrderRepository())
const oswmService = new OswmService(new prismaOswmRepository())

export default {
    async create(req: Request, res: Response): Promise <any> {
        try {
            const data: OswmCreation = req.body;
            const { trackingId } = req.body;

            if (!trackingId) {
                return res.status(400).json({
                    success: false,
                    message: 'Tracking ID is required.',
                });
            }
            const order = await orderServices.ByTracking(trackingId);
            if (!order) {
                throw new Error("Invalid trackingId, Order not found");
            }
              if (!order || !order.City?.fee) {
                throw new Error("Invalid trackingId or City not found");
            }

             let totalDeliFee = order.City?.fee;
             if (data.kg > 10) {
                const extraKg = data.kg - 10;
                totalDeliFee += extraKg * 500;
            }

            if (data.cm && data.cm > 100) {
                const extraCmInTens = Math.floor((data.cm - 100) / 10);
                totalDeliFee += extraCmInTens * 1000;
            }

            await orderServices.updateDeliFee(order.id, totalDeliFee);
            const oswm = await oswmService.create({
                cm: data.cm,
                kg: data.kg,
                OrderId: order.id, 
                Images: data.Images,
            });
            return res.status(201).json({
                success: true,
                message: 'Oswm Add Success',
                data: oswm,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to create Oswm",
                error: (error as Error).message,
            });
        }
    },
    
    async getOswm(req: Request, res: Response): Promise <any>{
        try {
            const { trackingId } = req.params;
            if (!trackingId) {
                return res.status(400).json({ 
                    success: false,
                    message: "Tracking ID is missing from the URL.",
                });
            }
            
            const order = await orderServices.ByTracking(trackingId);
            if (!order) {
                throw new Error("Invalid trackingId, Order not found");
            }
            
            const oswm = await oswmService.getOswm(order.id);
            return sendResponse(res, 200, 'Oswm fetched successfully', oswm);
        } catch (error) {
            return sendResponse(res, 500, "Failed to get Oswm", (error as Error).message);
        }
    }
};