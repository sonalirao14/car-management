import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import carRoutes from './routes/car.routes.js';
import multer from 'multer';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(multer().array('images', 10));
app.use(cors({
    origin: "https://car-management-cqzk.vercel.app", 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
}));


// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
