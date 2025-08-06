import { prisma } from '../../../common/database/prismaClient'
import { generateToken } from "../../../common/utils/security/jwtUtils";
import { IUserRepository } from './auth.repository';
import { User ,CreateUserData ,UpdateUserData  ,UserWithToken} from '../entities/auth.entity'
import { Otp } from '@prisma/client';

export class PrismaAuthRepository  implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        return user as User | null; 
    }
    
     async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user as User | null; 
    }
    async register(data: CreateUserData): Promise<UserWithToken> {
        const user = await prisma.user.create({ data });
        const token = generateToken({ name: user.name, email: user.email }); 
        const result = { name: user.name , email: user.email , token: token}
        return result ;
    }
    async  update(id:string , data:UpdateUserData) : Promise<UpdateUserData | null>{
        const UpdateUser = await prisma.user.update({ where:{id: Number(id)} ,  data});
        return UpdateUser;
    }
    async saveOtp(email: string, otpCode: string, expiresAt: Date): Promise<void> {
        await prisma.otp.create({
            data: {
                email: email,
                otpCode: otpCode,
                expiresAt: expiresAt,
            },
        });
    }
    async getOtp(email: string): Promise<Otp  | null> {
    const otp = await prisma.otp.findFirst({
        where: {
            email: email,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    if (!otp) {
        return null; 
    }

    return otp;
}
}