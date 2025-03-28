import mongoose from 'mongoose';
import 'dotenv/config';


// Check if MongoURI is present
if (!process.env.MONGO_URI) {
    throw new Error('MongoDB URI required');
}

export function connectToDatabase() {
    mongoose.connect(process.env.MONGO_URI!, {
        // Mongoose MongoDB Connection Options


    }).catch((error) => {
        throw new Error (error);
    });
}