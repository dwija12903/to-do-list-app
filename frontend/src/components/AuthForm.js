import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const AuthForm = ({ setToken }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setError('');
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${API_URL}/users/${isLogin ? 'login' : 'register'}`, {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-600">
                    {isLogin
                        ? 'Enter your credentials to access your account'
                        : 'Sign up for a new account to get started'}
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        placeholder="Enter your password"
                    />
                </div>
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                        <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${isSubmitting
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {isLogin ? 'Logging in...' : 'Creating account...'}
                        </span>
                    ) : (
                        isLogin ? 'Login' : 'Create Account'
                    )}
                </button>
            </form>
            <div className="mt-6 text-center">
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300 text-sm font-medium"
                >
                    {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;
