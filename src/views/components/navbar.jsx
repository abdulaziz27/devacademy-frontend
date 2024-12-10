import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './search_bar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            id="navbar"
            className={`sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 bg-white supports-backdrop-blur:bg-white/60 ${
                isScrolled ? 'border-b border-slate-200 shadow-md' : ''
            }`}
            >
            <div className="flex items-center h-[70px]">
                <div className="w-[1200px] relative flex items-center mx-auto p-4 py-6 lg:py-8">
                <div className="flex items-center gap-4 md:gap-0">
                    <div className="flex items-center h-full">
                    <div className="relative">
                        {/* Menu Button (visible on md and smaller screens) */}
                        <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center md:hidden"
                        >
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M4 6H20M4 12H20M4 18H20"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        </svg>
                        </button>

                        {/* Backdrop */}
                        {isOpen && (
                        <div
                            onClick={() => setIsOpen(false)}
                            className="fixed h-screen inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40 lg:hidden"
                        ></div>
                        )}

                        {/* Sidebar */}
                        {isOpen && (
                        <div
                            className="fixed top-0 left-0 h-screen w-2/4 max-w-[212px] bg-white shadow-lg z-50 md:hidden"
                        >
                            <div className="py-6 px-4">
                            <a href="/" className="text-2xl font-bold mr-4">
                                DevAcademy
                            </a>
                            <div className="border-t border-slate-300 my-4"></div>
                            <div className="pt-1">
                                <x-search-bar />
                            </div>
                            <a href="/courses" className="text-slate-900 block pt-4 px-4">
                                Course
                            </a>
                            <a href="/resume" className="text-slate-900 block pt-4 px-4">
                                Resume
                            </a>
                            </div>
                        </div>
                        )}
                    </div>
                    </div>

                    {/* Brand Name */}
                    <a
                        href="/"
                        className="text-2xl font-bold mr-4"
                    >
                        <span className="text-black">
                            DevAcademy
                        </span>
                    </a>
                </div>

                {/* Search Input (visible on larger screens) */}
                <div className="hidden md:block">
                    <SearchBar />
                </div>

                {/* Desktop Navigation (hidden on md and smaller screens) */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8 mx-4">
                    <Link
                        to="/courses"
                        className="flex text-lg font-semibold text-gray-600 hover:text-blue-500 transition duration-300 ease-in-out"
                    >
                    Course
                    </Link>
                    <a
                        href="/resume"
                        className="flex text-lg font-semibold text-gray-600 hover:text-blue-500 transition duration-300 ease-in-out"
                    >
                    Resume
                    </a>
                </div>

                {/* Search and Login Buttons */}
                <div className="flex items-center gap-4 ml-auto">
                    {/* Login Button */}
                    <nav className="relative flex gap-4">
                    {/* Replace with authentication logic */}
                    <a
                        href="/login"
                        className="rounded-full md:rounded bg-blue-500 md:bg-white hover:bg-blue-500 border border-blue-500 p-2 md:py-2 md:px-4 font-semibold text-blue-500 hover:text-white text-center transition duration-300 ease-in-out"
                    >
                        <span className="hidden md:inline">Log In</span>
                        <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6 md:hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        </svg>
                    </a>
                    <a
                        href="/register"
                        className="hidden md:inline rounded bg-blue-500 hover:bg-blue-900 border border-blue-500 hover:border-blue-600 hover:text-white py-2 px-4 font-semibold text-white text-center transition duration-300 ease-in-out"
                    >
                        Sign Up
                    </a>
                    </nav>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
