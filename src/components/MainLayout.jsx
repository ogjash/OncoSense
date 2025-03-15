import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import React from 'react';
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-secondary-dark text-white overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout; 