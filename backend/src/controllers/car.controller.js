import Car from '../models/car.model.js';
import User from '../models/user.model.js';
import firebase from '../config/firebase.js';

export const createCar = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const userId = req.userId;
        const imageUrls = await Promise.all(
            req.files.map(async (file) => {
                const snapshot = await storage.ref(`cars/${userId}/${file.originalname}`).put(file.buffer);
                return await snapshot.ref.getDownloadURL();
            })
        );
        const car = new Car({ title, description, tags, images: imageUrls, owner: userId });
        await car.save();
        const user = await User.findById(userId);
        user.cars.push(car._id);
        await user.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCars = async (req, res) => {
    try {
        const userId = req.userId;
        const cars = await Car.find({ owner: userId }).populate('owner', 'name');
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id).populate('owner', 'name');
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags, images } = req.body;
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        if (car.owner.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to update this car' });
        }
        car.title = title;
        car.description = description;
        car.tags = tags;
        car.images = images;
        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        if (car.owner.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this car' });
        }
        await Car.findByIdAndDelete(id);
        const user = await User.findById(req.userId);
        user.cars.pull(id);
        await user.save();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchCars = async (req, res) => {
    try {
        const { keyword } = req.query;
        const userId = req.userId;
        const cars = await Car.find({
            owner: userId,
            $text: { $search: keyword },
        }).populate('owner', 'name');
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};