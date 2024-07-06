const Todo = require('../model/TodoModel');
const User = require('../model/userModel');

const createTodo = async (req, res) => {
    const { heading, content, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newTodo = new Todo({
            heading,
            content,
            user: userId
        });

        const savedTodo = await newTodo.save();

        user.todos.push(savedTodo);
        await user.save();

        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create todo', error });
    }
};



const getTodos = async (req, res) => {
    const { userId } = req.body; // Extract userId from request body

    try {
        // Find the user based on userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find all todos associated with the user
        const todos = await Todo.find({ user: userId });

        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        res.status(500).json({ message: 'Failed to fetch todos', error });
    }
};

// Update todo by ID
const updateTodo = async (req, res) => {
    const { todoId, updatedTodo } = req.body;

    try {
        // Check if the todo exists
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found', todoId });
        }

        // Update the todo
        const updated = await Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true });

        res.status(200).json(updated);
    } catch (error) {
        console.error('Error updating todo:', error.message);
        res.status(500).json({ message: 'Failed to update todo', error });
    }
};


const deleteTodo = async (req, res) => {
    const { todoId } = req.body;

    try {
        // Check if the todo exists
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Delete the todo
        await Todo.findByIdAndDelete(todoId);

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error.message);
        res.status(500).json({ message: 'Failed to delete todo', error });
    }
};
module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
