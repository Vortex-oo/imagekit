import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async () => {

    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI)
            .then(() => {
                return mongoose.connection
            })
    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
        throw error;
    }
    return cached.conn
}

export default dbConnect