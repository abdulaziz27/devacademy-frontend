import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '../../app.css'
import Sidebar from '../components/SideBarDashboard'

const Dashboard = ({
    teacherCount,
    studentCount,
    courseCount,
    subscription,
    courses = [],
    activities = [],
    totalStudents,
}) => {
    // Hardcoded role (use 'owner', 'teacher', or 'student')
    const role = 'student' // Change this to 'teacher' or 'student' to simulate other roles
    const user = { name: 'John Doe' } // Simulated user data

    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-in-out', once: true })

        const link = document.createElement('link')
        link.href =
            'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
        link.rel = 'stylesheet'
        document.head.appendChild(link)

        return () => {
            document.head.removeChild(link)
        }
    }, [])

    return (
        <div className="flex">
            <div className="w-[1200px] relative flex items-start mx-auto p-4 py-6 lg:py-8 gap-8">
                <Sidebar />
                {/* Main Content */}
                <div className="w-full min-h-screen lg:w-5/6">
                    {role === 'owner' && (
                        <>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-2xl font-semibold">
                                        Hello {user.name}
                                    </div>
                                    <h1 className="text-sm text-gray-500">
                                        Welcome Back!
                                    </h1>
                                </div>

                                {/* Statistics */}
                                <div className="bg-gradient-to-br from-blue-700 to-blue-400 rounded-lg p-6 shadow-xl">
                                    <div className="text-lg font-semibold text-white mb-4">
                                        Statistics
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            {
                                                label: 'Teachers',
                                                count: teacherCount,
                                                icon: 'teacher-icon',
                                            },
                                            {
                                                label: 'Students',
                                                count: studentCount,
                                                icon: 'student-icon',
                                            },
                                            {
                                                label: 'Courses',
                                                count: courseCount,
                                                icon: 'course-icon',
                                            },
                                            {
                                                label: 'Transactions',
                                                count:
                                                    subscription?.length || 0,
                                                icon: 'transaction-icon',
                                            },
                                        ].map(
                                            ({ label, count, icon }, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg p-3 md:p-5 text-center">
                                                    <div className="flex items-center gap-4">
                                                        <div className="rounded p-2">
                                                            <svg
                                                                className={`h-8 w-8 text-white ${icon}`}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor">
                                                                {/* SVG path for each icon */}
                                                            </svg>
                                                        </div>
                                                        <div className="text-white text-start">
                                                            <div className="text-xl font-semibold">
                                                                {label}
                                                            </div>
                                                            <div className="text-xs">
                                                                {count}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Activity */}
                                <div className="text-xl">Activity</div>
                                <div className="bg-white rounded-lg px-6 pt-6 pb-2 shadow border border-gray-200">
                                    <table
                                        id="dataTable"
                                        className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Account
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Action
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Details
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {activities.map(activity => (
                                                <tr key={activity.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {activity
                                                                        .causer
                                                                        ?.name ||
                                                                        'System'}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {activity
                                                                        .causer
                                                                        ?.email ||
                                                                        ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {
                                                                activity.description
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {activity.subject
                                                                ? `${activity.subject_type} #${activity.subject_id}`
                                                                : ''}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(
                                                                activity.created_at
                                                            ).toLocaleString()}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {role === 'teacher' && (
                        <>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-2xl font-semibold">
                                        Hello {user.name}
                                    </div>
                                    <h1 className="text-sm text-gray-500">
                                        Welcome Back!
                                    </h1>
                                </div>

                                {/* Teacher Statistics */}
                                <div className="bg-gradient-to-br from-blue-700 to-blue-400 rounded-lg p-4 sm:p-8 shadow-xl">
                                    <div className="text-lg font-semibold text-white mb-4">
                                        Statistics
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg p-3 md:p-5 text-center">
                                            <div className="flex items-center gap-4">
                                                <div className="rounded p-2">
                                                    <svg
                                                        className="h-8 w-8 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor">
                                                        {/* Icon for My Courses */}
                                                    </svg>
                                                </div>
                                                <div className="text-white text-start">
                                                    <div className="text-xl font-semibold">
                                                        My Courses
                                                    </div>
                                                    <div className="text-xs">
                                                        {courseCount}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg p-3 md:p-5 text-center">
                                            <div className="flex items-center gap-4">
                                                <div className="rounded p-2">
                                                    <svg
                                                        className="h-8 w-8 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor">
                                                        {/* Icon for My Students */}
                                                    </svg>
                                                </div>
                                                <div className="text-white text-start">
                                                    <div className="text-xl font-semibold">
                                                        My Students
                                                    </div>
                                                    <div className="text-xs">
                                                        {totalStudents}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Teacher's Courses */}
                                <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg p-4 sm:p-8 shadow-xl">
                                    <div className="text-lg font-semibold text-gray-800">
                                        Teaching Activities
                                    </div>
                                    <div className="space-y-6 mt-6">
                                        {courses.length === 0 ? (
                                            <div className="flex border rounded justify-between items-center p-4">
                                                <div className="text-sm font-semibold text-gray-800">
                                                    You are not teaching any
                                                    courses.
                                                </div>
                                                <div>
                                                    <Link
                                                        to="/admin/courses/create"
                                                        className="text-blue-500">
                                                        Create a new course
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            courses.map(course => (
                                                <div
                                                    key={course.id}
                                                    className="flex border rounded justify-between items-center p-4">
                                                    <div className="text-sm font-semibold text-gray-800">
                                                        {course.name}
                                                    </div>
                                                    <form
                                                        action={`/admin/courses/destroy/${course.id}`}
                                                        method="POST">
                                                        <button
                                                            type="submit"
                                                            className="text-sm font-semibold text-red-500">
                                                            Stop Teaching
                                                        </button>
                                                    </form>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {role === 'student' && (
                        <>
                            <div className="space-y-6 text-black">
                                <div>
                                    <div className="text-2xl font-semibold">
                                        Hello {user.name}
                                    </div>
                                    <h1 className="text-sm text-gray-500">
                                        Welcome Back!
                                    </h1>
                                </div>

                                {/* Subscription */}
                                <div className="bg-gradient-to-br from-blue-700 to-blue-400 rounded-lg p-4 sm:p-8 shadow-xl">
                                    <div className="text-lg font-semibold text-white mb-4">
                                        Subscription
                                    </div>
                                    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg p-3 md:p-5 text-center">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2">
                                                    <svg
                                                        className="h-8 w-8 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor">
                                                        {/* Icon for Subscription */}
                                                    </svg>
                                                </div>
                                                <div className="text-start text-sm w-3/4 text-white">
                                                    {subscription
                                                        ? `Your subscription is active until ${new Date(
                                                              subscription.endDate
                                                          ).toLocaleDateString()}.`
                                                        : `You haven't subscribed yet. Choose a subscription plan to get started.`}
                                                </div>
                                            </div>
                                            {subscription ? (
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

                                {/* My Courses */}
                                <div className="w-full rounded-lg bg-white shadow p-4 sm:p-8">
                                    <div className="text-lg font-semibold text-gray-800">
                                        My Courses
                                    </div>
                                    <div className="space-y-6 mt-6">
                                        {courses.length === 0 ? (
                                            <div className="flex border rounded justify-between items-center p-4">
                                                <div className="text-sm font-semibold text-gray-800">
                                                    You haven't enrolled in any
                                                    courses.
                                                </div>
                                            </div>
                                        ) : (
                                            courses.map(course => (
                                                <div
                                                    key={course.id}
                                                    className="flex border rounded justify-between items-center p-4">
                                                    <div className="text-sm font-semibold text-gray-800">
                                                        {course.name}
                                                    </div>
                                                    <Link
                                                        to={`/course/${course.id}`}
                                                        className="text-sm font-semibold text-blue-500 px-4 py-2">
                                                        Continue
                                                    </Link>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
