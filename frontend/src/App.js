// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthForm from './components/AuthForm';
import TodoList from './components/TodoList';
import { API_URL } from './config';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { 'x-auth-token': token }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">ToDo App Manager</h1>
          {token && (
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Logout
            </button>
          )}
        </header>
        <main className="bg-white rounded-lg shadow-md p-6">
          {token ? (
            <TodoList tasks={tasks} setTasks={setTasks} token={token} />
          ) : (
            <AuthForm setToken={setToken} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;