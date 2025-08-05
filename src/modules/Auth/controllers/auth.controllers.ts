import { AuthService } from "../services/auth.services";
import { PrismaAuthRepository } from "../repositories/auth.prisma.repository";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";


const newAuthService = new AuthService(new PrismaAuthRepository());

export default {
    async findById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await newAuthService.findById(id);
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    },

    async findByEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.body;
        const user = await newAuthService.findByEmail(email);
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    },

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password, name } = req.body;
            
            if (!email || !password || !name) {
                res.status(400).json({ message: 'Email, password, and name are required.' });
                return;
            }
            
            const result = await newAuthService.register({
                email,
                name,
                password: ""
            }, password);
            
            res.status(201).json({
                message: 'User registered successfully!',
                name: result.name,
                email: result.email,
                token: result.token,
            });
            
        } catch (error: any) {
            if (error.message === 'User with this email already exists.') {
                res.status(409).json({ message: error.message });
            } else {
                console.error('Error during user registration:', error);
                next(error);
            }
        }
    },
    
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            
            await newAuthService.login(email, password);
            
            res.status(200).json({
                message: 'Login successful! Please check your email for the OTP to complete the login.',
            });
        
        } catch (error: any) {
            if (error.message === 'Invalid credentials.' || error.message === 'Invalid email or password') {
                res.status(401).json({ message: 'Invalid email or password' });
            } else {
                console.error('Error during user login:', error);
                next(error);
            }
        }
    },
    
    async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, otp } = req.body;
            
            const result = await newAuthService.verifyAndLogin(email, otp);
            
            res.status(200).json({
                message: 'Login successful!',
                data: {
                    name: result.name,
                    email: result.email,
                    token: result.token,
                }
            });
            
        } catch (error: any) {
            if (error.message === 'Invalid OTP' || error.message === 'OTP expired' || error.message === 'User not found') {
                res.status(401).json({ message: error.message });
            } else {
                console.error('Error during OTP verification:', error);
                next(error);
            }
        }
    }
}