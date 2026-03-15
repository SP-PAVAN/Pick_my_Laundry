import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Waves, LogOut } from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid px-4 px-lg-5">
          <a className="navbar-brand d-flex align-items-center text-primary fw-bold" href="/">
            <Waves size={32} className="me-2" />
            Pick my Laundry
          </a>
          
          <button
            onClick={handleLogout}
            className="btn btn-primary d-flex align-items-center"
          >
            <LogOut size={16} className="me-2" />
            Logout
          </button>
        </div>
      </nav>
      
      <main className="flex-grow-1 container d-flex flex-column align-items-center justify-content-center py-5">
        <h1 className="display-4 fw-bolder text-dark text-center">Welcome back!</h1>
        <p className="lead text-muted text-center mt-3">
          You are successfully logged in! Pick my Laundry Dashboard is ready.
        </p>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
