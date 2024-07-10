import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import Task from '../components/Tasks';
import { useAuth } from '../provider/AuthContext'; // Import the custom hook to use auth context

const TodoList = () => {
    const { user } = useAuth(); // Get the user from the auth context
    const [todos, setTodos] = useState([]); // Initialize todos as an empty array
    const [todoInput, setTodoInput] = useState({ heading: '', content: '' });
    console.log("this is user id", user.id)

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`http://localhost:5005/todos/getall`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id }), // Send userId in the request body
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setTodos(data);
            } else {
                console.error(data.message || 'Failed to fetch todos');
            }
        } catch (error) {
            console.error('An error occurred. Please try again.');
        }
    };

    const updateTodo = async (todoId, updatedTodoData) => {
        try {
            const response = await fetch(`http://localhost:5005/todos/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ todoId, updatedTodo: updatedTodoData }),
            });

            const data = await response.json();

            if (response.ok) {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === todoId ? { ...todo, ...updatedTodoData } : todo
                    )
                );
                alert('Todo updated successfully');
            } else {
                console.error(data.message || 'Failed to update todo');
            }
        } catch (error) {
            console.error('An error occurred. Please try again.');
        }
    };

    const createTodo = async () => {
        if (!todoInput.heading || !todoInput.content) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:5005/todos/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    heading: todoInput.heading,
                    content: todoInput.content,
                    userId: user.id,
                }),
            });

            if (!response) {
                console.error('Response is undefined');
                return;
            }

            const data = await response.json();

            if (response.ok) {
                alert('Todo created successfully');
                setTodos([...todos, data]); // Add the new todo to the current list
                setTodoInput({ heading: '', content: '' }); // Clear the form fields
            } else {
                alert(data.message || 'Failed to create todo');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error('An error occurred:', error);
        }
    };


    const removeTodo = async (todoId) => {
        try {
            const response = await fetch(`http://localhost:5005/todos/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ todoId }),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful deletion (e.g., update state)
                fetchTodos();

            } else {
                console.error(data.message || 'Failed to delete todo');
            }
        } catch (error) {
            console.error('An error occurred. Please try again.');
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
                    <Button variant="primary" className="mt-2" onClick={createTodo}>
                        Add Todo
                    </Button>
                </Form.Group>
                <ListGroup>
                    {todos.map((todo) => (
                        <Task
                            key={todo.id}
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
