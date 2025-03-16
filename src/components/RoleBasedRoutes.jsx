import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/UseAuth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const RoleBasedRoutes = () => {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check user role from Firebase when component mounts or user changes
  useEffect(() => {
    const checkUserRole = async () => {
      if (!currentUser) {
        // If not logged in, redirect to login
        navigate('/login', { replace: true });
        return;
      }

      try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role || 'patient';
          setUserRole(role);
          
          // Check if user is in the correct section based on role
          const currentPath = location.pathname;
          const isInHospitalSection = currentPath.startsWith('/patient') === false;
          const isInPatientSection = currentPath.startsWith('/patient');
          
          // Redirect if needed
          if (role === 'hospital' && isInPatientSection) {
            navigate('/dashboard', { replace: true });
          } else if (role === 'patient' && isInHospitalSection) {
            navigate('/patient/dashboard', { replace: true });
          }
        } else {
          // No user document found
          setUserRole('patient');
          console.warn("No user document found in Firestore, defaulting to patient role");
          if (!location.pathname.startsWith('/patient')) {
            navigate('/patient/dashboard', { replace: true });
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole('patient'); // Default on error
        if (!location.pathname.startsWith('/patient')) {
          navigate('/patient/dashboard', { replace: true });
        }
      } finally {
        setChecking(false);
      }
    };

    checkUserRole();
  }, [currentUser, navigate, location.pathname]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return <Outlet />;
};

export default RoleBasedRoutes;
