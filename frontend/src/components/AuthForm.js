// components/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const AuthForm = ({ setToken }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(`${API_URL}/users/${isLogin ? 'login' : 'register'}`, {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                {isLogin ? 'Login to Your Account' : 'Create a New Account'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="w-full mt-4 text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
            >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default AuthForm;