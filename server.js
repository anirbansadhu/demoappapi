import express from 'express';
import cors from 'cors';
import userRoutes from './userRoutes.js';
import connectDB from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

const requestLogger = (req, res, next) => {
    console.log(`Request received at: ${new Date().toISOString()}`);
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    next();
};
app.use(requestLogger);

connectDB();

// Define users array (temporary storage for now)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Mount user routes
app.use('/user', userRoutes);

// Fix: Define `createUser` route correctly
app.post('/createUser', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Error-handling middleware (should be last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || 'Something went wrong!',
        status: statusCode,
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
