import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from './context/Login';

const PrivateRoute = ({ children }) => {
    const { logged } = useContext(LoginContext);

    if (!logged) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
