import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/cars" className="text-white font-bold text-lg">
          Car Management
        </Link>
        <div className="flex space-x-4">
          <Link to="/cars" className="text-white hover:text-gray-300">
            Cars
          </Link>
          <Link to="/cars/create" className="text-white hover:text-gray-300">
            Create Car
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;