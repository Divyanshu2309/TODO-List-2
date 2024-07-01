const express = require('express');
const cors = require('cors'); // Import the cors package
const connectDB = require('./dbConection');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Use CORS and allow requests from localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

// Define Routes
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});