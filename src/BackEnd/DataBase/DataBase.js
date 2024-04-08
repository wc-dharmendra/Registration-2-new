import mongoose from 'mongoose';
const uri = process.env.NEXT_PUBLIC_DB_URL;

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB Atlas connection failed', error);
    }
}

export { connectDB }; 