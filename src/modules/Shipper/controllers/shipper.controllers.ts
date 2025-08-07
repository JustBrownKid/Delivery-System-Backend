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
      const data = req.body;
      const rawData = await ShipperService.create(data);
      const shipper = new Shipper(rawData)
      sendResponse(res , 201  , "Shipper Create Success" , shipper )
    } catch (error) {
      res.status(500).json('Internal Server Error during shipper creation.' );
    }
  },

  async findByShipperId(req: Request, res: Response) {
    try {
      const { shipperId } = req.params; 

      const rawData  = await ShipperService.findByShipperId(shipperId);
      const shipper = new Shipper(rawData)
      sendResponse(res , 201  , "Shipper Create Success" , shipper)
    } catch (error) {
      res.status(500).json( 'Internal Server Error while fetching shipper.' );
    }
  },
  
   async createMultipleShippers(req: Request, res: Response) {
    const shippersData: ShipperCreation[] = req.body;
    
    try {
      const newShippers = await ShipperService.createMultiple(shippersData);
      sendResponse(res, 201, 'Shippers created successfully', newShippers);
    } catch (e: any) {
      sendResponse(res, 500, 'Failed to create shippers', null, e.message);
    }
  }
};