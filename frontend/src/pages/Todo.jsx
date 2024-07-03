import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import Task from '../components/Tasks';
import { useAuth } from '../provider/AuthContext'; // Import the custom hook to use auth context

const TodoList = () => {
    const { user } = useAuth(); // Get the user from the auth context
    const [todos, setTodos] = useState([]); // Initialize todos as an empty array
    const [todoInput, setTodoInput] = useState({ heading: '', content: '' });

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:5005/todos/getall');
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            const data = await response.json();
            setTodos(data); // Assuming data is an array of todos
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        if (todoInput.heading.trim() !== '' && todoInput.content.trim() !== '') {
            try {
                const userId = user._id; // Assuming you have the user object available
                const response = await fetch('http://localhost:5005/todos/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...todoInput, userId }), // Include the user ID
                });
                if (!response.ok) {
                    throw new Error('Failed to add todo');
                }
                const newTodo = await response.json();
                setTodos([...todos, newTodo]);
                setTodoInput({ heading: '', content: '' });
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };


    const removeTodo = async (id) => {
        try {
            const response = await fetch('http://localhost:5005/todos/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete todo');
            }
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error('Error removing todo:', error);
        }
    };

    const updateTodo = async (id, updatedTodo) => {
        try {
            const response = await fetch('http://localhost:5005/todos/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, ...updatedTodo }),
            });
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
            const newTodo = await response.json();
            setTodos(todos.map((todo) => (todo._id === id ? newTodo : todo)));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Todo List</h2>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter todo heading"
                        value={todoInput.heading}
                        onChange={(e) => setTodoInput({ ...todoInput, heading: e.target.value })}
                    />
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter todo content"
                        value={todoInput.content}
                        onChange={(e) => setTodoInput({ ...todoInput, content: e.target.value })}
                    />
                    <Button variant="primary" className="mt-2" onClick={addTodo}>
                        Add Todo
                    </Button>
                </Form.Group>
                <ListGroup>
                    {todos.map((todo) => (
                        <Task
                            key={todo._id}
                            todo={todo}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo}
                        />
                    ))}
                </ListGroup>
            </div>
        </div>
    );
};

export default TodoList;
