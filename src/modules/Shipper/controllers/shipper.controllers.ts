import { Request, Response } from "express";
import { shipperService } from "../services/shipper.services";
import { prismaShipperRepository } from "../repositories/shipper.prisma.repository";
import { sendResponse } from "../../../common/utils/res/response";
import { Shipper } from "../entities/shipper.dto";
import { ShipperCreation } from "../entities/shipper.entity";

const ShipperService = new shipperService(new prismaShipperRepository());

export default  {
  async create(req: Request, res: Response) {
    try {
      const data: ShipperCreation = req.body;
      const rawData = await ShipperService.create(data);
      if (!rawData) {
            return sendResponse(res, 404, "Shipper not found.", null);
      }
      const shipper = new Shipper(rawData)
      sendResponse(res , 201  , "Shipper Create Success" , shipper )
    } catch (error) {
      sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
    }
  },

  async findByShipperId(req: Request, res: Response) {
    try {
      const { shipperId } = req.params;
      const rawData = await ShipperService.findByShipperId(shipperId);
      if (!rawData) {
            return sendResponse(res, 404, "Shipper not found.", null);
      }
      const shipper = new Shipper(rawData)
      sendResponse(res, 200, "Shipper fetched successfully", shipper);
    } catch (error) {
      sendResponse(res, 500, "Internal Server Error", null, (error as Error).message);
    }
  },
  
   async createMultipleShippers(req: Request, res: Response) {
    const shippersData: ShipperCreation[] = req.body;
    
    try {
      const newShippers = await ShipperService.createMultiple(shippersData);
      sendResponse(res, 201, 'Shippers created successfully', newShippers);
    } catch (error) {
      sendResponse(res, 500, 'Failed to create shippers', null, (error as Error).message);
    }
  }
};