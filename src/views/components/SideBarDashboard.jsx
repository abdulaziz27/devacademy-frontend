import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const [open, setOpen] = useState(false)

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            roles: ['owner', 'teacher'],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 mr-3">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
        },
        {
            name: 'Teachers',
            path: '/admin/teachers',
            roles: ['owner'],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 mr-3">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20v-6a4 4 0 015-3.87M9 10V6a4 4 0 114 4v4m0 10h-5v-6m5-4h5"
                    />
                </svg>
            ),
        },
        {
            name: 'Categories',
            path: '/admin/categories',
            roles: ['owner'],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 mr-3">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h11M9 21v-6m0 6h3M6 9l6-6m2 6H3m8 6v6m0-6h6"
                    />
                </svg>
            ),
        },
        {
            name: 'Courses',
            path: '/user-courses',
            roles: ['owner', 'teacher'],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                    <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                </svg>
            ),
        },
        {
            name: 'Transactions',
            path: '/subscribe_transactions',
            roles: ['owner'],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 mr-3">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7h4V3h4v4h4v4h4V3h4v4h4M3 7h4V3h4v4h4v4h4V3"
                    />
                </svg>
            ),
        },
        {
            name: 'Profile',
            path: '/profile',
            roles: ['owner', 'teacher'],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            ),
        },
        {
            name: 'Settings',
            path: '/settings',
            roles: ['owner', 'teacher'],
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            ),
        },
    ]

    const userRole = 'teacher' // Example: Replace with logic to fetch the user's role.

    return (
        <>
            {/* Sidebar for larger screens */}
            <div className="bg-white w-1/6 hidden lg:block rounded-lg shadow">
                <div className="px-6 py-4">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">
                        MENU
                    </h2>
                    <ul className="space-y-4">
                        {menuItems.map(
                            item =>
                                item.roles.includes(userRole) && (
                                    <li key={item.name}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `flex items-center hover:text-sky-500 focus:outline-none transition ease-in-out duration-300 ${
                                                    isActive
                                                        ? 'text-blue-700 relative'
                                                        : 'text-slate-900'
                                                }`
                                            }>
                                            {({ isActive }) => (
                                                <>
                                                    {isActive && (
                                                        <div className="absolute -left-6 h-full w-1 bg-blue-500"></div>
                                                    )}
                                                    {item.icon}
                                                    <span>{item.name}</span>
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                )
                        )}
                        <li>
                            <button
                                className="flex border-none font-medium items-center text-slate-900 hover:text-red-600 transition ease-in-out duration-300"
                                onClick={() => {
                                    // Handle logout logic here
                                    console.log('Logged out')
                                }}>
                                {/* Logout Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-5 w-5 mr-3"
                                    fill="none"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
                                </svg>
                                <span>Log Out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className="absolute left-0 top-12"
                onClick={() => setOpen(false)}>
                {/* Menu Button */}
                <button
                    onClick={e => {
                        e.stopPropagation()
                        setOpen(!open)
                    }}
                    className="lg:hidden fixed z-10">
                    <div className="bg-white p-4 cursor-pointer rounded-r shadow-lg">
                        {/* Arrow Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-5 w-5">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </button>

                {/* Backdrop */}
                {open && (
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40 lg:hidden"
                        onClick={() => setOpen(false)}></div>
                )}

                {/* Sidebar for small screens */}
                {open && (
                    <div className="fixed top-0 left-0 h-full w-2/4 max-w-[212px] bg-white shadow-lg z-40 lg:hidden">
                        <div className="space-y-4 pt-4 pb-4 px-6">
                            {menuItems.map(
                                item =>
                                    item.roles.includes(userRole) && (
                                        <div key={item.name}>
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `flex items-center ${
                                                        isActive
                                                            ? 'text-blue-500'
                                                            : 'text-slate-900'
                                                    }`
                                                }>
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </NavLink>
                                        </div>
                                    )
                            )}
                            <button
                                className="flex items-center text-slate-900 mt-6"
                                onClick={() => {
                                    // Handle logout logic here
                                    console.log('Logged out')
                                }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-5 w-5 mr-3">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H3"
                                    />
                                </svg>
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Sidebar
