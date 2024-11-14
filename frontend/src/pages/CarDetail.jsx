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
        const response = await axios.get(`http://localhost:3000/api/cars/${id}`, {
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
      await axios.delete(`http://localhost:3000/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/cars');
    } catch (err) {
      console.error(err);
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-md rounded overflow-hidden">
        <img src="/placeholder.jpg" alt={car.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{car.title}</h2>
          <p className="text-gray-600 mb-4">{car.description}</p>
          <div className="flex flex-wrap">
            {car.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-xs mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Link
              to={`/cars/${car._id}/edit`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;