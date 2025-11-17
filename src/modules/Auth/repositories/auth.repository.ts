import { Otp } from '@prisma/client';
import { User, UpdateUserData, CreateUserData, UserWithToken } from '../entities/auth.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  register(data: CreateUserData): Promise<UserWithToken>;
  update(id: string, data: UpdateUserData): Promise<UpdateUserData | null>;
  saveOtp(email: string, otpCode: string, expiresAt: Date): Promise<void>;
  getOtp(email: string): Promise<Otp | null>
}