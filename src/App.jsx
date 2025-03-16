import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import WhatWeDo from './pages/WhatWeDo';
import Solutions from './pages/Solutions';
import Insights from './pages/Insights';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Appointment from './pages/dashboard/Appointment';
import DoctorSchedule from './pages/dashboard/DoctorSchedule';
import Patients from './pages/dashboard/Patients';
import Treatments from './pages/dashboard/Treatments';
import Staff from './pages/dashboard/Staff';
import Settings from './pages/dashboard/Settings';
import AuthLayout from './layouts/AuthLayout';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route element={<><Navbar /><MainLayout /></>}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/what-we-do" element={<WhatWeDo />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/insights" element={<Insights />} />
            </Route>
            
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/appointment" element={<PrivateRoute><Appointment /></PrivateRoute>} />
            <Route path="/doctor-schedule" element={<PrivateRoute><DoctorSchedule /></PrivateRoute>} />
            <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
            <Route path="/treatments" element={<PrivateRoute><Treatments /></PrivateRoute>} />
            <Route path="/staff" element={<PrivateRoute><Staff /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            
          </Routes>
          <ToastContainer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;