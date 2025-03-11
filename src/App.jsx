import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import HowItWorks from './pages/HowItWorks';
import Insights from './pages/Insights';
import Login from './pages/Login';
import Signup from './pages/Signup';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Main Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/insights" element={<Insights />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 