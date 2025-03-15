import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import CircuitLine from '../components/CircuitLine';
import { toast } from 'react-toastify';
import { useState } from 'react';
import React from 'react';
import { useAuth } from '../context/UseAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login,currentUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success('Logged in successfully!');

      
      console.log(currentUser);
      if (currentUser.role === 'hospital') {
        navigate('/dashboard');
      } else if (currentUser.role === 'patient') {
        navigate('/patients');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#170b2c] to-[#220046]">
      <CircuitLine />
      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md mx-4"
      >
        {/* Card Background */}
        <div className="absolute inset-0 bg-secondary/40 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-lg shadow-primary/10"></div>

        {/* Content */}
        <div className="relative p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 text-gray-400 hover:text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-secondary/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-600 rounded bg-secondary/50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="text-primary hover:text-primary-dark transition-colors">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors font-medium"
            >
              Sign in
            </button>
          </form>

          {/* Simplified account creation section */}
          <p className="mt-6 text-center text-gray-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary-dark transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 