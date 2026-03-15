import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import SessionTimeout from './auth/SessionTimeout';

const App = () => {
  return (
    <Router>
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={
            <>
              <SessionTimeout timeout={15 * 60 * 1000} />
              <Dashboard />
            </>
          } />
        </Route>
      </Routes>
    </Router>
  );
};


export default App;
