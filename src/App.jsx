import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import HowItWorks from './pages/HowItWorks';
import Insights from './pages/Insights';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary-dark text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 