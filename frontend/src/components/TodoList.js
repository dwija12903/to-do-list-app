// components/TodoList.js
import React, { useState } from 'react';
import TodoItem from './ToDoItem';
import TodoForm from './ToDoForm';

const TodoList = ({ tasks, setTasks, token }) => {
    const [filter, setFilter] = useState('all');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    return (
        <div className="space-y-6">
            <TodoForm setTasks={setTasks} token={token} />
            <div className="flex justify-center space-x-4 mb-6">
                {['all', 'active', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded transition duration-300 ease-in-out ${filter === f
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
            <div className="space-y-2">
                {filteredTasks.map(task => (
                    <TodoItem key={task._id} task={task} setTasks={setTasks} token={token} />
                ))}
            </div>
            {filteredTasks.length === 0 && (
                <p className="text-center text-gray-500">No tasks to display.</p>
            )}
        </div>
    );
};

export default TodoList;