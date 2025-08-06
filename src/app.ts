import express from 'express';
import authRoutes from './modules/Auth/routes/auth.routes';
import dotenv from 'dotenv';
import cors from "cors"
dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());
app.use('/users', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello !'); 
});

app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});