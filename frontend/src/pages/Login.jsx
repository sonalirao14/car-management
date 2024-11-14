import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/users/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      navigate('/cars');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/cars');
    }
  }, [navigate]);

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background: 'linear-gradient(5deg, blue, pink)',
        backgroundSize: 'cover',
      }}
    >
      {/* Conditional Rendering of Navbar */}
      {localStorage.getItem('token') && <Navbar />} {/* Show Navbar if token exists */}

      <div
        className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 w-full max-w-md"
        style={{
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
          animation: 'fadeIn 0.5s',
        }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 transform transition-transform duration-200 hover:scale-105"
              type="submit"
            >
              Login
            </button>
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-pink-400 hover:text-green-300"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
