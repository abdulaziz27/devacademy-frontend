import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../views/auth/LoginPage';
import RegisterPage from '../views/auth/RegisterPage';
import HomePage from '../views/HomePage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}

export default AppRoutes;
