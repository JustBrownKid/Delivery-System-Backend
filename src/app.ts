import express from 'express';
import authRoutes from './modules/Auth/routes/auth.routes';
import shipperRoutes from './modules/Shipper/routes/shipper.routes'
import orderRoutes from './modules/Order/routes/order.routes'
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
app.use('/shipper', shipperRoutes);
app.use('/order', orderRoutes);

app.get('/', (req, res) => {
    res.send('Hello !'); 
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});