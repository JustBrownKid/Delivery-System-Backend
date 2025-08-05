import express from 'express';
import postRoutes from './modules/post/routes/post.route';
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
app.use('/post', postRoutes);
app.use('/users', authRoutes);


app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});