// components/TodoForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const TodoForm = ({ setTasks, token }) => {
    const [taskText, setTaskText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (taskText.trim()) {
            try {
                const response = await axios.post(`${API_URL}/tasks`, {
                    text: taskText,
                    priority: 'medium',
                }, {
                    headers: { 'x-auth-token': token }
                });
                setTasks(prevTasks => [...prevTasks, response.data]);
                setTaskText('');
            } catch (error) {
                console.error('Error adding task:', error.response?.data?.errors || error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add a new task"
                className="flex-grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
            >
                Add Task
            </button>
        </form>
    );
};

export default TodoForm;