import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://anisadhu:klShQrQmRflyxn7Q@cluster0.edr5b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";  // Replace with your MongoDB URI
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure code
  }
};

export default connectDB;
