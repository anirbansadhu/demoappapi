import express from 'express';
import User from './usermodel.js';  // Import the User model

const router = express.Router();

// Sample data to simulate a "database"
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// GET route to fetch all users
router.get('/users', async (req, res, next) => {
//   try {
//     // Simulating an error
//     const error = new Error('Something went wrong!');
//     error.status = 500;
//     throw error;
//   } catch (error) {
//     next(error);
//   }
const Users = await User.find()
  res.json(Users);

});

// POST route to create a new user
router.post('/createUser', async (req, res) => {
    const { name, email, age } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ error: 'Name and email are required' });
//   }

  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser); // Return the created user
  } catch (err) {
    res.status(400).json({ error: 'Error creating user', details: err.message });
  }

//   const newUser = {
//     id: users.length + 1,
//     name,
//     email,
//   };

  //users.push(newUser);
  //res.status(201).json(newUser); // Respond with the created user
});


router.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user', details: err.message });
  }
});

export default router;
