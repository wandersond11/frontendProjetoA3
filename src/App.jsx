import React, { useContext, useEffect } from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dimensionamento } from './pages/Dimensionamento';
import './styles.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import colors from './constants/colors';
import { LoginContext } from './context/Login';
import PrivateRoute from './PrivateRoute';

export const App = () => {
    const { logged } = useContext(LoginContext);

    useEffect(() => {
        if (!logged) {
            console.log('User is not logged in');
        }
    }, [logged]);

    return (
        <div
            className="container"
            style={{ background: colors.secondary }}
        >
            <Routes>
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/dimensionamento" element={<PrivateRoute><Dimensionamento /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};
