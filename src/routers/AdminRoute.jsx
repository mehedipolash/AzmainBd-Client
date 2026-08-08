import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../Hooks/UseAuth';
import Loader from '../components/Loader';

// Hides admin screens from non-admins. This is presentation only — the API
// re-checks the role in MongoDB on every write, so bypassing this guard in
// devtools reveals an empty shell, not the ability to change anything.
const AdminRoute = ({ children }) => {
    const { isLoggedIn, isAdmin, loading } = UseAuth();
    const location = useLocation();

    if (loading) return <Loader fullScreen />;

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
