import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import carRoutes from './routes/car.routes.js';
import multer from 'multer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// Middleware
app.use(express.json());
app.use(multer().array('images', 10));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});