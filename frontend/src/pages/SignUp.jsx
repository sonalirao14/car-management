import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if fields are valid
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Invalid email format');
      return;
    }
  
    try {
      setLoading(true);
      setError('');
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/users/signup`, { name, email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      navigate('/cars');  // Navigate to the cars page after successful signup
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background: 'linear-gradient(15deg, indigo 20%, pink 60%)',
        animation: 'gradientBackground 5s ease infinite',
      }}
    >
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          Sign Up
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow-md appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow-md appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow-md appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`${
                loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-500'
              } text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 hover:opacity-90 transform transition-transform duration-300`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-red-300 transition-transform duration-300 transform hover:scale-110"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>

      {/* Keyframes for gradient animation */}
      <style>
        {`
          @keyframes gradientBackground {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default SignUp;
