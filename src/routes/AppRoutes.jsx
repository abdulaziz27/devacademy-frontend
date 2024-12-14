import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
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
import CoursePreview from '../views/course_detail/CoursePreview'
import CourseContent from '../views/course_detail/CourseContent'
import DiscussionForum from '../views/forum/DiscussionForum'
import CourseDetail from '../views/course_detail/CourseDetail'

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:slug" element={<CoursePreview />} />
            <Route path="/pricing" element={<SubscriptionPage />} />

            {/* <Route
                path="/pricing"
                element={
                    <ProtectedRoute>
                        <SubscriptionPage />
                    </ProtectedRoute>
                }
            /> */}

            {/* Learning Routes - Protected */}
            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <CourseDetail />
                    </ProtectedRoute>
                }>
                <Route path="learn/courses/:slug" element={<CourseContent />} />
            </Route>

            {/* Dashboard Routes */}
            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <MenuDashboard />
                    </ProtectedRoute>
                }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="user-courses" element={<UserCourses />} />
            </Route>

            {/* Admin Routes */}
            <Route
                path="/admin/*"
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <MenuDashboard />
                    </ProtectedRoute>
                }>
                {/* Add admin routes here */}
            </Route>

            {/* Teacher Routes */}
            <Route
                path="/teacher/*"
                element={
                    <ProtectedRoute allowedRoles={['teacher']}>
                        <MenuDashboard />
                    </ProtectedRoute>
                }>
                {/* Add teacher routes here */}
            </Route>
            <Route path="/discussion-forum" element={<DiscussionForum />} />
        </Routes>
    )
}

export default AppRoutes
