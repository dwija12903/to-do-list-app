// components/TodoItem.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const TodoItem = ({ task, setTasks, token }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);

    const handleComplete = async () => {
        try {
            const response = await axios.put(`${API_URL}/tasks/${task._id}`, {
                completed: !task.completed
            }, {
                headers: { 'x-auth-token': token }
            });
            setTasks(prevTasks =>
                prevTasks.map(t =>
                    t._id === task._id ? response.data : t
                )
            );
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/tasks/${task._id}`, {
                headers: { 'x-auth-token': token }
            });
            setTasks(prevTasks => prevTasks.filter(t => t._id !== task._id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = async () => {
        if (isEditing && editedText.trim()) {
            try {
                const response = await axios.put(`${API_URL}/tasks/${task._id}`, {
                    text: editedText
                }, {
                    headers: { 'x-auth-token': token }
                });
                setTasks(prevTasks =>
                    prevTasks.map(t =>
                        t._id === task._id ? response.data : t
                    )
                );
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating task:', error);
            }
        } else {
            setIsEditing(!isEditing);
        }
    };

    return (
        <div className={`flex items-center p-3 mb-2 bg-gray-50 rounded border ${task.completed ? 'border-gray-300' : 'border-gray-400'}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleComplete}
                className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            {isEditing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="flex-grow px-2 py-1 mr-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
            ) : (
                <span className={`flex-grow mr-3 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{task.text}</span>
            )}
            <div className="flex space-x-2">
                <button
                    onClick={handleEdit}
                    className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;