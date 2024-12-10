import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../views/auth/LoginPage';
import RegisterPage from '../views/auth/RegisterPage';
import HomePage from '../views/HomePage';
import SubscriptionPage from '../views/layouts/subscription';
import CoursesPage from '../views/layouts/courses';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pricing" element={<SubscriptionPage />} />
            <Route path="/courses" element={<CoursesPage />} />
        </Routes>
    );
}

export default AppRoutes;
