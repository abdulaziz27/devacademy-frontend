import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', roles: ['owner', 'teacher'] },
        { name: 'Teachers', path: '/admin/teachers', roles: ['owner'] },
        { name: 'Categories', path: '/admin/categories', roles: ['owner'] },
        { name: 'Courses', path: '/admin/courses', roles: ['owner', 'teacher'] },
        { name: 'Transactions', path: '/admin/subscribe_transactions', roles: ['owner'] },
        { name: 'Profile', path: '/profile/edit', roles: ['owner', 'teacher'] },
        { name: 'Settings', path: '/settings/edit', roles: ['owner', 'teacher'] },
    ];

    const userRole = 'teacher'; // Example: Replace with logic to fetch the user's role.

    return (
        <>
        {/* Sidebar for larger screens */}
        <div className="bg-white w-1/6 hidden lg:block rounded-lg shadow">
            <div className="px-6 py-4">
            <h2 className="text-lg font-bold text-slate-900 mb-4">MENU</h2>
            <ul className="space-y-4">
                {menuItems.map(
                (item) =>
                    item.roles.includes(userRole) && (
                    <li key={item.name}>
                        <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center ${
                            isActive ? 'text-blue-500 relative' : 'text-slate-900'
                            }`
                        }
                        >
                        {({ isActive }) =>
                            isActive && <div className="absolute -left-6 h-full w-1 bg-blue-500"></div>
                        }
                        {/* Dashboard Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-3">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>{item.name}</span>
                        </NavLink>
                    </li>
                    )
                )}
                <li>
                <button
                    className="flex items-center text-slate-900"
                    onClick={() => {
                    // Handle logout logic here
                    console.log('Logged out');
                    }}
                >
                    {/* Logout Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-3 text-slate-900">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H3" />
                    </svg>
                    <span>Log Out</span>
                </button>
                </li>
            </ul>
            </div>
        </div>

        {/* Mobile Menu */}
        <div className="absolute left-0 top-12" onClick={() => setOpen(false)}>
            {/* Menu Button */}
            <button
            onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
            }}
            className="lg:hidden fixed z-10"
            >
            <div className="bg-white p-4 cursor-pointer rounded-r shadow-lg">
                {/* Arrow Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
            </button>

            {/* Backdrop */}
            {open && (
            <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40 lg:hidden"
                onClick={() => setOpen(false)}
            ></div>
            )}

            {/* Sidebar for small screens */}
            {open && (
            <div
                className="fixed top-0 left-0 h-full w-2/4 max-w-[212px] bg-white shadow-lg z-40 lg:hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">MENU</h2>
                <ul className="space-y-4">
                    {menuItems.map(
                    (item) =>
                        item.roles.includes(userRole) && (
                        <li key={item.name}>
                            <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center ${
                                isActive ? 'text-blue-500 relative' : 'text-slate-900'
                                }`
                            }
                            onClick={() => setOpen(false)}
                            >
                            {({ isActive }) =>
                                isActive && (
                                <div className="absolute -left-6 h-full w-1 bg-blue-500"></div>
                                )
                            }
                            {/* Dashboard Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-3">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>{item.name}</span>
                            </NavLink>
                        </li>
                        )
                    )}
                    <li>
                    <button
                        className="flex items-center text-slate-900"
                        onClick={() => {
                        // Handle logout logic here
                        console.log('Logged out');
                        }}
                    >
                        {/* Logout Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-3 text-slate-900">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H3" />
                        </svg>
                        <span>Log Out</span>
                    </button>
                    </li>
                </ul>
                </div>
            </div>
            )}
        </div>
        </>
    );
};

export default Sidebar;
