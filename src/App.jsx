import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import AppContextProvider from "./context/AppContext"; // Import AppContextProvider
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import WhatWeDo from "./pages/WhatWeDo";
import Solutions from "./pages/Solutions";
import Insights from "./pages/Insights";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Reservations from "./pages/dashboard/Reservations";
import DoctorSchedule from "./pages/dashboard/DoctorSchedule";
import Patients from "./pages/dashboard/Patients";
import Treatments from "./pages/dashboard/Treatments";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";
import AuthLayout from "./layouts/AuthLayout";
import Appointment from "./pages/Appointment";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContextProvider> {/* Wrap with AppContextProvider */}
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
              <Route path="/reservations" element={<PrivateRoute><Reservations /></PrivateRoute>} />
              <Route path="/doctor-schedule" element={<PrivateRoute><DoctorSchedule /></PrivateRoute>} />
              <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
              <Route path="/treatments" element={<PrivateRoute><Treatments /></PrivateRoute>} />
              <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              <Route path="/appointment/:docId" element={<PrivateRoute><Appointment /></PrivateRoute>} />
            </Routes>
            <ToastContainer />
          </div>
        </AppContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
