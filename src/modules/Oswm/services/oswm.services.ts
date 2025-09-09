import {IOswmRepository} from "../repositories/oswm.repository";
import {Oswm, OswmCreation} from "../entities/oswm.entity";
import {OrderService} from "../../Order/services/order.services";
import {prismaOrderRepository} from "../../Order/repositories/order.prisma.repository";

const orderServices = new OrderService(new prismaOrderRepository())

export class OswmService {
    constructor(private  oswmRepo:IOswmRepository) { }

    async create(data:OswmCreation): Promise <void>{
        await this.oswmRepo.create(data);
    }

    async createMultiple(data: OswmCreation[]): Promise<void> {
        await this.oswmRepo.createMultiple(data);
    }
    
    async getOswm(trackingId:number): Promise <Oswm | null >{
        return await this.oswmRepo.getByTrackingId(trackingId)
    }

}
