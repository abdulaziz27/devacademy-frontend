import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Sidebar from '../components/SideBarDashboard'
import isAuthenticated from '../../auth'
import { useNavigate, Link } from 'react-router-dom'
import swal from 'sweetalert'
import { ClipLoader } from 'react-spinners'

import {
    getStudentDashboardData,
    getTeacherDashboardData,
    getAdminDashboardData,
    getUserProfile,
} from '../../api'

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null)
    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated()) {
            swal('Warning!', 'Login terlebih dahulu!', 'warning').then(() => {
                navigate('/login')
            })
        }
    }, [navigate])
    
    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-in-out', once: true })

        const fetchDashboardAndProfile = async () => {
            try {
                const profileResponse = await getUserProfile()
                setUserProfile(profileResponse.data)

                const role = profileResponse.data.roles.includes('admin')
                    ? 'admin'
                    : profileResponse.data.roles.includes('teacher')
                    ? 'teacher'
                    : 'student'

                let dashboardResponse

                if (role === 'student') {
                    dashboardResponse = await getStudentDashboardData()
                } else if (role === 'teacher') {
                    dashboardResponse = await getTeacherDashboardData()
                } else if (role === 'admin') {
                    dashboardResponse = await getAdminDashboardData()
                }

                setDashboardData(dashboardResponse)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardAndProfile()
    }, [])

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <ClipLoader size={50} color="#4fa94d" loading={loading} />
        </div>
    )
    if (error) return <div>Error: {error.message}</div>

    const role = userProfile?.roles.includes('admin')
        ? 'admin'
        : userProfile?.roles.includes('teacher')
        ? 'teacher'
        : 'student'

    const userName = userProfile?.name || 'Guest'

    return (
        <div className="flex">
            <div className="w-[1200px] relative flex items-start mx-auto p-4 py-6 lg:py-8 gap-8">
                <Sidebar />
                <div className="w-full min-h-screen lg:w-5/6">
                    {role === 'admin' && (
                        <div className="space-y-6 text-black">
                            <div>
                                <div className="text-2xl font-semibold">
                                    Hello {userName}
                                </div>
                                <h1 className="text-sm text-gray-500">
                                    Welcome Back!
                                </h1>
                            </div>
                            <div className="bg-gradient-to-br from-blue-700 to-blue-400 rounded-lg p-4 sm:p-8 shadow-xl">
                                <div className="text-lg font-semibold text-white mb-4">
                                    Admin Statistics
                                </div>
                                <div className="text-white">
                                    <p>
                                        Total Users: {dashboardData.users.total}
                                    </p>
                                    <p>
                                        Students: {dashboardData.users.students}
                                    </p>
                                    <p>
                                        Teachers: {dashboardData.users.teachers}
                                    </p>
                                    <p>Admins: {dashboardData.users.admin}</p>
                                    <p>
                                        Total Courses:{' '}
                                        {dashboardData.courses.total}
                                    </p>
                                    <p>
                                        Active Subscriptions:{' '}
                                        {
                                            dashboardData.subscriptions
                                                .active_subscriptions
                                        }
                                    </p>
                                    <p>
                                        Total Revenue:{' '}
                                        {
                                            dashboardData.subscriptions
                                                .total_revenue
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {role === 'teacher' && (
                        <div className="space-y-6 text-black">
                            <div>
                                <div className="text-2xl font-semibold">
                                    Hello {userName}
                                </div>
                                <h1 className="text-sm text-gray-500">
                                    Welcome Back!
                                </h1>
                            </div>
                            <div className="bg-gradient-to-br from-blue-700 to-blue-400 rounded-lg p-4 sm:p-8 shadow-xl">
                                <div className="text-lg font-semibold text-white mb-4">
                                    Teacher Statistics
                                </div>
                                <div className="text-white">
                                    <p>
                                        Total Courses:{' '}
                                        {dashboardData.courses.total}
                                    </p>
                                    <p>
                                        Free Courses:{' '}
                                        {dashboardData.courses.free_courses}
                                    </p>
                                    <p>
                                        Premium Courses:{' '}
                                        {dashboardData.courses.premium_courses}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {role === 'student' && (
                        <div className="space-y-6 text-black">
                            <div>
                                <div className="text-2xl font-semibold">
                                    Hello {userName}
                                </div>
                                <h1 className="text-sm text-gray-500">
                                    Welcome Back!
                                </h1>
                            </div>
                            <div className="bg-gradient-to-br from-blue-700 to-blue-400 rounded-lg p-4 sm:p-8 shadow-xl">
                                <div className="text-lg font-semibold text-white mb-4">
                                    Subscription
                                </div>
                                <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg p-3 md:p-5 text-center">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-start text-sm w-3/4 text-white">
                                                {dashboardData.subscription
                                                    ?.is_active
                                                    ? `Your subscription is active until ${new Date(
                                                          dashboardData.subscription.details.end_date
                                                      ).toLocaleDateString()}.`
                                                    : 'You have not subscribed yet. Choose a plan to get started.'}
                                            </div>
                                        </div>
                                        {dashboardData.subscription
                                            ?.is_active ? (
                                            <span className="bg-white rounded px-4 py-2 font-semibold text-sm text-blue-500">
                                                Active
                                            </span>
                                        ) : (
                                            <Link
                                                to="/pricing"
                                                className="bg-white rounded px-4 py-2 font-semibold text-sm text-blue-500">
                                                Subscribe
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full rounded-lg bg-white shadow p-4 sm:p-8">
                                <div className="text-lg font-semibold text-gray-800">
                                    My Courses
                                </div>
                                <div className="space-y-6 mt-6">
                                    {dashboardData.enrolled_courses?.courses
                                        .length === 0 ? (
                                        <div className="flex border rounded justify-between items-center p-4">
                                            <div className="text-sm font-semibold text-gray-800">
                                                You have not enrolled in any
                                                courses.
                                            </div>
                                        </div>
                                    ) : (
                                        dashboardData.enrolled_courses?.courses.map(
                                            course => (
                                                <div
                                                    key={course.id}
                                                    className="flex border rounded justify-between items-center p-4">
                                                    <div className="text-sm font-semibold text-gray-800">
                                                        {course.course.title}
                                                    </div>
                                                    <Link
                                                        to={`/course/${course.course.slug}`}
                                                        className="text-sm font-semibold text-blue-500 px-4 py-2">
                                                        Continue
                                                    </Link>
                                                </div>
                                            )
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
