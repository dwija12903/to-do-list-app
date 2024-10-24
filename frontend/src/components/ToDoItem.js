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
        <div className={`group flex items-center p-4 rounded-lg transition-all duration-300 ${task.completed
                ? 'bg-gray-50 border border-gray-100'
                : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
            }`}>
            <div className="relative">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleComplete}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-300"
                />
                {task.completed && (
                    <svg className="absolute top-0 left-0 w-5 h-5 text-blue-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <div className="flex-grow mx-4">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full px-3 py-1 rounded border-b-2 border-blue-500 focus:outline-none bg-transparent"
                        autoFocus
                    />
                ) : (
                    <span className={`text-lg transition-all duration-300 ${task.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-700'
                        }`}>
                        {task.text}
                    </span>
                )}
            </div>
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={handleEdit}
                    className="px-3 py-1 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-300"
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-300"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;