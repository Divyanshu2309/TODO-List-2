// index.js
const express = require('express');

const connectDB = require('./dbConection');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();


app.use(express.json());



// Define Routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
