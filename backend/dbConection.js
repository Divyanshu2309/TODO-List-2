const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://divyanshu:admin@divyanshucluster.kp9llkv.mongodb.net/?retryWrites=true&w=majority&appName=divyanshucluster', {
            });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;