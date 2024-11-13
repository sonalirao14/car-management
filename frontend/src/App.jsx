import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import CreateCar from './pages/CreateCar';
import EditCar from './pages/EditCar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cars/create"
          element={
            <PrivateRoute>
              <CreateCar />
            </PrivateRoute>
          }
        />
        <Route
          path="/cars/:id/edit"
          element={
            <PrivateRoute>
              <EditCar />
            </PrivateRoute>
          }
        />
        <Route
          path="/cars/:id"
          element={
            <PrivateRoute>
              <CarDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/cars"
          element={
            <PrivateRoute>
              <CarList />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/cars" />} />
      </Routes>
    </Router>
  );
}

export default App;