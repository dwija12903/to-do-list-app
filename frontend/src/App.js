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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">TaskFlow</h1>
          </div>
          {token && (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100 hover:border-blue-200 font-medium"
            >
              Logout
            </button>
          )}
        </header>
        <main className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
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