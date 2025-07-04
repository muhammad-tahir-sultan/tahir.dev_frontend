import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUser } from '../utils/authManager';
import { loadUser } from '../redux/actions/user';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated: reduxIsAuthenticated, user } = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const checkAuth = async () => {
      // If already authenticated in Redux state, no need to load user
      if (reduxIsAuthenticated && user) {
        setLoading(false);
        return;
      }
      
      // Check if we have user data in localStorage
      if (isAuthenticated()) {
        try {
          // Load user data from localStorage into Redux state
          await dispatch(loadUser());
        } catch (err) {
          console.error("Error loading user from localStorage:", err);
        }
      }
      
      // Always complete loading to prevent infinite spinner
      setLoading(false);
    };
    
    checkAuth();
    
    // Safety timeout to prevent infinite loading
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(safetyTimeout);
  }, [dispatch, reduxIsAuthenticated, user]);
  
  // Show brief loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated() && !reduxIsAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Render children if authenticated
  return children;
};

export default ProtectedRoute; 