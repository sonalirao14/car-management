import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCar(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/cars');
    } catch (err) {
      console.error(err);
    }
  };

  if (!car) return <div className="text-center text-xl text-gray-600">Loading...</div>;

  return (
    <div className="container bg-green-100 mx-auto py-8 px-4">
      <div className="flex justify-center">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 w-full md:w-3/4 lg:w-2/3">
          <img
            src={car.image || "/placeholder.jpg"}
            alt={car.title}
            className="w-full h-72 object-cover object-center rounded-t-lg transition-transform duration-500 transform hover:scale-110"
          />
          <div className="p-6">
            <h2 className="text-3xl font-semibold text-gray-600 mb-3 text-center">{car.title}</h2>
            <p className="text-gray-600 text-lg mb-6">{car.description}</p>
            <div className="flex flex-wrap justify-center mb-6">
              {car.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-400 rounded-full px-4 py-2 text-sm mr-3 mb-3 font-medium transition-all duration-300 transform hover:bg-blue-300 hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-6">
              <Link
                to={`/cars/${car._id}/edit`}
                className="bg-blue-600 hover:bg-blue-400 text-white font-semibold py-2 px-5 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-400 text-white font-semibold py-2 px-5 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Delete
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <Link
                to="/cars"
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-5 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Back to Cars
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
