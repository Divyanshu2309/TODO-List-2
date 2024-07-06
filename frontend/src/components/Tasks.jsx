import React, { useState } from 'react';
import { Button, ListGroup, Form } from 'react-bootstrap';

const Task = ({ todo, removeTodo, updateTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState({ heading: todo.heading, content: todo.content });

    const handleUpdate = () => {
        updateTodo(todo._id, updatedTodo); // Assuming todo._id is used for identification in backend
        setIsEditing(false);
    };

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            {isEditing ? (
                <>
                    <Form.Control
                        type="text"
                        value={updatedTodo.heading}
                        onChange={(e) => setUpdatedTodo({ ...updatedTodo, heading: e.target.value })}
                    />
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={updatedTodo.content}
                        onChange={(e) => setUpdatedTodo({ ...updatedTodo, content: e.target.value })}
                    />
                    <Button variant="primary" size="sm" onClick={handleUpdate}>
                        Save
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
                        Cancel
                    </Button>
                </>
            ) : (
                <>
                    <div>
                        <h5>{todo.heading}</h5>
                        <p>{todo.content}</p>
                    </div>
                    <div>
                        <Button variant="info" size="sm" onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => removeTodo(todo._id)}>
                            Remove
                        </Button>
                    </div>
                </>
            )}
        </ListGroup.Item>
    );
};

export default Task;
