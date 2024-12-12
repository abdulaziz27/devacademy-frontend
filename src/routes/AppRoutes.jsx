import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../views/auth/LoginPage';
import RegisterPage from '../views/auth/RegisterPage';
import HomePage from '../views/HomePage';
import SubscriptionPage from '../views/layouts/Subscription';
import CoursesPage from '../views/layouts/Courses';
import MenuDashboard from '../views/MenuDashboard';
import Dashboard from '../views/layouts/dashbord';
import ProfilePage from '../views/layouts/Profile';
import Settings from '../views/layouts/Settings';
import UserCourses from '../views/layouts/UserCourses';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pricing" element={<SubscriptionPage />} />
            <Route path="/courses" element={<CoursesPage />} />/
            <Route path="/*" element={<MenuDashboard />}>
                {/* Nested routes under MenuDashboard */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="user-courses" element={<UserCourses />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
