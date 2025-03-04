import mongoose from 'mongoose';

// Define a User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

export default User;
