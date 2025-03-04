import express from 'express';
import userRoutes from './userRoutes.js';
import connectDB from './db.js';
import cors from 'cors'
const app = express();
app.use(cors());

const requestLogger = (req, res, next) => {
    console.log(`Request received at: ${new Date().toISOString()}`);
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    next(); // Pass control to the next middleware or route handler
  };
connectDB()

app.use(requestLogger)
// Middleware to parse JSON bodies
app.use(express.json());
app.use('/user', userRoutes);  // Now the route becomes `/api/users`, `/api/createUser`

// Sample data to simulate a "database"
// let users = [
//   { id: 1, name: 'John Doe', email: 'john@example.com' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
// ];

// // GET route to fetch all users
// app.get('/users',requestLogger, (req, res,next) => {
// //  res.json(users);
// const error = new Error('Something went wrong!');
// error.status = 500; // You can also set a custom status code for the error
// next(error)
// });

// // POST route to create a new user
app.post('/createUser', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: users.length + 1, // Generate a new user ID
    name,
    email,
  };

  users.push(newUser); // Add the new user to the array

  res.status(201).json(newUser); // Respond with the created user
});


// Error-handling middleware (needs to be after all routes)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    console.log('hello')
    // Default response if error status code is not set
    const statusCode = err.status || 500;
  
    res.status(statusCode).json({
      message: err.message || 'Something went wrong!',
      status: statusCode,
    });
  });

// Set the port the server will listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
