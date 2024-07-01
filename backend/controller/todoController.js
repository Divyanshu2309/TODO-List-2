const Todo = require('../model/TodoModel');
const User = require('../model/userModel');

const createTodo = async (req, res) => {
    try {
        const { heading, content } = req.body;
        const userId = req.user.id; // Assuming you have userId in req.user

        const newTodo = new Todo({
            heading,
            content,
            user: userId, // Assigning the user ID to the todo
        });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
};


const getTodos = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have userId in req.user
        const todos = await Todo.find({ user: userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id, heading, content } = req.body;
        const userId = req.user.id; // Assuming you have userId in req.user

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: userId }, // Query by todo ID and user ID
            { heading, content },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.user.id; // Assuming you have userId in req.user

        const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
};
module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
