import { User, CreateUserData, UpdateUserData, UserWithToken } from "../entities/auth.entity";
import { IUserRepository } from "../repositories/auth.repository";
import * as bcrypt from 'bcryptjs'
import { generateToken } from "../../../common/utils/security/jwtUtils";
import { generateOtp } from "../../../common/utils/security/generateOtpCode";
import { hashPassword, comparePassword } from '../../../common/utils/security/passwordUtils'
import { Otp } from "@prisma/client";
import { sendEmail } from "../../../common/utils/services/email.services";

export class AuthService {
    constructor(private authRepo: IUserRepository) {}

    findById(id: string): Promise<User | null> {
        return this.authRepo.findById(id);
    }

    findByEmail(email: string): Promise<User | null> {
        return this.authRepo.findByEmail(email);
    }

    async register(data: CreateUserData, password: string): Promise<UserWithToken> {
        const hashedPassword = await hashPassword(password);
        const dataToCreateUser: CreateUserData = {
            email: data.email,
            password: hashedPassword,
            name: data.name,
        };
        const newUser = await this.authRepo.register(dataToCreateUser);
        const token = generateToken({ name: newUser.name, email: newUser.email });
        return { ...newUser, token };
    }

    update(id: string, data: UpdateUserData): Promise<UpdateUserData | null> {
        return this.authRepo.update(id, data);
    }

    async login(email: string, passwordPlain: string): Promise<void> {
        const user = await this.authRepo.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await comparePassword(passwordPlain, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        
        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 
        await this.authRepo.saveOtp(email, otp, expiresAt);
         const emailSubject = 'Your Login OTP';
        const emailText = `Hello ${user.name},\n\nYour one-time password (OTP) for login is: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nIf you did not request this, please ignore this email.`;
        
        const emailHtml = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); background-color: #ffffff;">
    
    <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #1a1a1a; margin: 0; padding-bottom: 10px; border-bottom: 2px solid #333;">Your Login OTP</h1>
    </div>
    <p style="margin-top: 20px;">Hello ${user.name},</p>
    <p>Your OTP for login is:</p>
    <div style="background-color: #2e2e2e; color: #f9f9f9; padding: 15px 20px; border-radius: 8px; margin: 25px 0; font-size: 26px; font-weight: bold; text-align: center; letter-spacing: 3px;">
        ${otp}
    </div>
    <p style="margin-top: 20px;">This OTP is valid for 5 minutes.</p>
    <p style="margin-top: 30px; font-size: 14px; color: #888;">
        Stay Strong
    </p>
</div>
        `;
        
        await sendEmail(email, emailSubject, emailText, emailHtml);

    }

    async getOtp(email: string): Promise<Otp | null> {
        return await this.authRepo.getOtp(email);
    }

    async verifyAndLogin(email: string, otpPlain: string): Promise<UserWithToken> {
        const storedOtp = await this.authRepo.getOtp(email);

        if (!storedOtp) {
            throw new Error('Invalid OTP');
        }

        if (new Date() > storedOtp.expiresAt) {
            throw new Error('OTP expired');
        }

        if (otpPlain !== storedOtp.otpCode) {
            throw new Error('Invalid OTP');
        }
        
        const user = await this.authRepo.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }
        const token = generateToken({ name: user.name, email: user.email });
        return { ...user, token };
    }
}