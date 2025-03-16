import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import AppContextProvider from "./context/AppContext";
import Navbar from "./components/Navbar";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import WhatWeDo from "./pages/WhatWeDo";
import Solutions from "./pages/Solutions";
import Insights from "./pages/Insights";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Hospital dashboard pages
import Dashboard from "./pages/dashboard/Dashboard";
import Reservations from "./pages/dashboard/Reservations";
import Doctors from "./pages/dashboard/Doctors";
import Patients from "./pages/dashboard/Patients";
import Treatments from "./pages/dashboard/Treatments";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";
import AuthLayout from "./layouts/AuthLayout";
import React from "react";

// Patient dashboard pages
import PatientDashboard from './pages/patient/dashboard/Dashboard';
import PatientAppointment from './pages/patient/dashboard/Appointment';
import PatientReport from './pages/patient/dashboard/Report';

// New component for role-based routing
import RoleBasedRoutes from './components/RoleBasedRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContextProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route element={<><Navbar /><MainLayout /></>}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/what-we-do" element={<WhatWeDo />} />
                <Route path="/Solutions" element={<Solutions />} />
                <Route path="/insights" element={<Insights />} />
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              {/* Role-based protected routes */}
              <Route element={<RoleBasedRoutes />}>
                {/* Hospital routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/treatments" element={<Treatments />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reservations" element={<Reservations />} />

                {/* Patient routes */}
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/appointment" element={<PatientAppointment />} />
                <Route path="/patient/report" element={<PatientReport />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastContainer />
          </div>
        </AppContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
