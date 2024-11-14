import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/cars`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    (car.title + car.description + car.tags.join(' ')).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCars.map((car) => (
          <div key={car._id} className="bg-white shadow-md rounded overflow-hidden">
            <Link to={`/cars/${car._id}`}>
              <img src="/placeholder.jpg" alt={car.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{car.title}</h3>
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
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;