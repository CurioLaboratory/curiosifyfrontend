import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path as necessary

const ProtectedRoute = ({ element }) => {
    const { getUser } = useAuth(); // Get user info from AuthContext
    const user=getUser();

    // If the user is not authenticated, redirect to the login page
    return user ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
