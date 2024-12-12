import React, { useState } from 'react';
import Sidebar from '../components/SideBarDashboard';
import thumbnail from '../../assets/images/thumbnail.jpg';

const UserCourses = () => {
    const [activeTab, setActiveTab] = useState('On Progress');

    const inProgressCourses = [
        {
            title: 'Generative Deep Learning with TensorFlow: Advanced Techniques and Applications',
            category: 'Deep Learning',
            status: 'In Progress',
            image: thumbnail,
            teacher: 'Dr. Jane Smith',
            students: 120,
        },
        {
            title: 'Advanced Machine Learning: From Algorithms to Implementations',
            category: 'Machine Learning',
            status: 'In Progress',
            image: thumbnail,
            teacher: 'Prof. John Doe',
            students: 95,
        },
        {
            title: 'Natural Language Processing with Transformers',
            category: 'AI',
            status: 'In Progress',
            image: thumbnail,
            teacher: 'Dr. Emily White',
            students: 85,
        },
        {
            title: 'Python for Data Science: Data Wrangling and Visualization',
            category: 'Data Science',
            status: 'In Progress',
            image: thumbnail,
            teacher: 'Prof. Michael Brown',
            students: 150,
        },
    ];
    
    const completedCourses = [
        {
            title: 'Introduction to AI: The Basics and Beyond',
            category: 'AI',
            status: 'Completed',
            image: thumbnail,
            teacher: 'Dr. Alice Green',
            students: 200,
        },
        {
            title: 'Data Science with Python: A Comprehensive Guide',
            category: 'Data Science',
            status: 'Completed',
            image: thumbnail,
            teacher: 'Prof. David Blue',
            students: 175,
        },
        {
            title: 'Machine Learning Algorithms: A Hands-On Approach',
            category: 'Machine Learning',
            status: 'Completed',
            image: thumbnail,
            teacher: 'Dr. Sarah Johnson',
            students: 140,
        },
        {
            title: 'Deep Learning Fundamentals: Neural Networks from Scratch',
            category: 'Deep Learning',
            status: 'Completed',
            image: thumbnail,
            teacher: 'Prof. William Black',
            students: 160,
        },
    ];

    return (
        <div className="flex select-none">
            <div className="w-[1200px] relative flex items-start mx-auto p-4 py-6 lg:py-8 gap-8">
                <Sidebar />

                {/* Main Content */}
                <div className="w-full lg:w-5/6 min-h-screen">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Courses</h2>

                        <div className="bg-white p-4 sm:p-8 rounded-lg shadow">
                            <div className="w-full">
                                <section>
                                    <header className="select-none flex gap-5 text-sm font-medium text-gray-900 mb-5">
                                        <button
                                            onClick={() => setActiveTab('On Progress')}
                                            className={`border-gray-400 rounded-2xl py-0.5 px-3 focus:outline-none transition ease-in-out duration-300 ${
                                                activeTab === 'On Progress'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'hover:border-blue-600 hover:bg-blue-600 hover:text-white'
                                            }`}
                                        >
                                            In Progress
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('Completed')}
                                            className={`border-gray-400 rounded-2xl py-0.5 px-3 focus:outline-none transition ease-in-out duration-300 ${
                                                activeTab === 'Completed'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'hover:border-blue-600 hover:bg-blue-600 hover:text-white'
                                            }`}
                                        >
                                            Completed
                                        </button>
                                    </header>
                                    
                                    <div className="flex flex-col gap-3">
                                        {/* In Progress Courses */}
                                        {activeTab === 'On Progress' &&
                                            inProgressCourses.map((course, index) => (
                                                <div key={index} className="flex text-black">
                                                    <div className="content-center flex border shadow rounded-lg py-3 px-4 w-full">
                                                        <img
                                                            src={course.image}
                                                            className="w-32 h-full shadow-md object-cover rounded-lg mb-4"
                                                            loading="lazy"
                                                        />
                                                        <div className="ml-5 w-1/2 content-center">
                                                            <h1 className="text-lg text-slate-900 font-medium">{course.title}</h1>
                                                            <span className="text-base text-gray-500 font-normal">{course.category}</span>
                                                        </div>
                                                        <div className="flex flex-col items-end ml-auto my-auto">
                                                            <div className="flex flex-col mb-3">
                                                                <span className="text-sm font-normal">By {course.teacher}</span>
                                                                <span className="flex flex-row items-center place-self-end text-sm font-normal">
                                                                    <svg
                                                                        className="h-4 w-4 mr-2 text-gray-800"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                        />
                                                                    </svg>
                                                                    {course.students} students
                                                                </span>
                                                            </div>
                                                            <button className="place-self-end px-8 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-800 text-white hover:text-white border-blue-600 hover:border-blue-800 focus:outline-none transition ease-in-out duration-300">
                                                                Resume
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        
                                        {/* Completed Courses */}
                                        {activeTab === 'Completed' &&
                                            completedCourses.map((course, index) => (
                                                <div key={index} className="flex text-black">
                                                    <div className="content-center flex border shadow rounded-lg py-3 px-4 w-full">
                                                        <img
                                                            src={course.image}
                                                            className="w-32 h-full shadow-md object-cover rounded-lg mb-4"
                                                            loading="lazy"
                                                        />
                                                        <div className="ml-5 w-1/2 content-center">
                                                            <h1 className="text-lg text-slate-900 font-medium">{course.title}</h1>
                                                            <span className="text-base text-gray-500 font-normal">{course.category}</span>
                                                            <div></div>
                                                            <div className="flex flex-row items-center mt-4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="bg-green-200 rounded-full p-1 mr-2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                                Completed
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end ml-auto my-auto">
                                                            <div className="flex flex-col mb-3">
                                                                <span className="text-sm font-normal">By {course.teacher}</span>
                                                                <span className="flex flex-row items-center place-self-end text-sm font-normal">
                                                                    <svg
                                                                        className="h-4 w-4 mr-2 text-gray-800"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                        />
                                                                    </svg>
                                                                    {course.students} students
                                                                </span>
                                                            </div>
                                                            <button className="place-self-end px-8 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-800 text-white hover:text-white border-blue-600 hover:border-blue-800 focus:outline-none transition ease-in-out duration-300">
                                                                Review
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCourses;
