import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../Hooks/UseAuth';
import Loader from '../components/Loader';

// Guards routes that require a signed-in user. Waits for Firebase to resolve
// before deciding — redirecting while `loading` is true would bounce a
// signed-in visitor to the login page on every hard refresh.
const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading } = UseAuth();
    const location = useLocation();

    if (loading) return <Loader fullScreen />;

    if (!isLoggedIn) {
        // Remember where they were headed so login can send them back.
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default PrivateRoute;
