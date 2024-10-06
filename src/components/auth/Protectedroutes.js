import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path as necessary

const TeacherProtectedRoute = ({ element }) => {
    const { getUser } = useAuth(); // Get user info from AuthContext
    const user = getUser();
    // If the user is not authenticated or the role is not 'teacher', redirect to the login page
    return user && user.role === 'teacher' ? element : <Navigate to="/" />;
};

const StudentProtectedRoute = ({ element }) => {
    const { getUser } = useAuth(); // Get user info from AuthContext
    const user = getUser();

    // If the user is not authenticated or the role is not 'student', redirect to the login page
    return user && user.role === 'student' ? element : <Navigate to="/" />;
};

// Use named exports instead of default
export { TeacherProtectedRoute, StudentProtectedRoute };
