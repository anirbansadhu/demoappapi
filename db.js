import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://anisadhu:klShQrQmRflyxn7Q@cluster0.edr5b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";  // Replace with your MongoDB URI
;

if (!MONGODB_URI) {
    throw new Error("⚠️ MongoDB URI is missing in environment variables.");
}

let cached = global.mongoose || { conn: null, promise: null };

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => {
            console.log("✅ MongoDB Connected");
            return mongoose;
        }).catch((err) => {
            console.error("❌ MongoDB Connection Error:", err.message);
            process.exit(1);
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default connectDB;
