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
        setChecking(false);
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
          
          // Only redirect if user is at root, login, or incorrect section
          if (currentPath === '/' || currentPath === '/login') {
            // Redirect based on role
            if (role === 'hospital') {
              navigate('/dashboard', { replace: true });
            } else {
              navigate('/patient/dashboard', { replace: true });
            }
          } else {
            // If already in a specific path, check if it matches their role
            const isInHospitalSection = !currentPath.startsWith('/patient');
            const isInPatientSection = currentPath.startsWith('/patient');
            
            if (role === 'hospital' && isInPatientSection) {
              navigate('/dashboard', { replace: true });
            } else if (role === 'patient' && isInHospitalSection) {
              navigate('/patient/home', { replace: true });
            }
          }
        } else {
          setUserRole('patient');
          console.warn("No user document found in Firestore, defaulting to patient role");
          navigate('/patient/home', { replace: true });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole('patient');
        navigate('/patient/home', { replace: true });
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

  // If not logged in, return null (redirect handled in useEffect)
  if (!currentUser) {
    return null;
  }

  // User is logged in and role is checked
  return <Outlet />;
};

export default RoleBasedRoutes;
