import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const TodoForm = ({ setTasks, token }) => {
    const [taskText, setTaskText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (taskText.trim() && !isSubmitting) {
            setIsSubmitting(true);
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
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-6 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 pr-24 text-lg"
            />
            <button
                type="submit"
                disabled={isSubmitting || !taskText.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-md font-medium transition-all duration-300 ${isSubmitting || !taskText.trim()
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
            >
                {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
};

export default TodoForm;