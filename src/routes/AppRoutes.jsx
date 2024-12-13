import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../views/auth/LoginPage'
import RegisterPage from '../views/auth/RegisterPage'
import HomePage from '../views/HomePage'
import SubscriptionPage from '../views/layouts/Subscription'
import CoursesPage from '../views/layouts/Courses'
import MenuDashboard from '../views/MenuDashboard'
import Dashboard from '../views/layouts/dashbord'
import ProfilePage from '../views/layouts/Profile'
import Settings from '../views/layouts/Settings'
import UserCourses from '../views/layouts/UserCourses'
import CourseDetail from '../views/course_detail/CourseDetail'
import CourseContent from '../views/course_detail/CourseContent'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pricing" element={<SubscriptionPage />} />
            <Route path="/courses" element={<CoursesPage />} />/
            <Route path="/*" element={<MenuDashboard />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="user-courses" element={<UserCourses />} />
            </Route>
            <Route path="/*" element={<CourseDetail />}>
                <Route path="course-detail" element={<CourseContent />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
