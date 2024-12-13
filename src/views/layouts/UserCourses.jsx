import React, { useState, useEffect } from 'react'
import Sidebar from '../components/SideBarDashboard'
import thumbnail from '../../assets/images/thumbnail.jpg'
import { getMyEnrolledCourses, getCourseDetails } from '../../api' // Gunakan fungsi baru untuk fetch data API

const UserCourses = () => {
    const [activeTab, setActiveTab] = useState('On Progress')
    const [inProgressCourses, setInProgressCourses] = useState([])
    const [completedCourses, setCompletedCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getMyEnrolledCourses() // API call untuk data kursus yang di-enroll
                const courses = response.data

                // Ambil detail tambahan untuk setiap kursus
                const detailedCourses = await Promise.all(
                    courses.map(async course => {
                        const detailResponse = await getCourseDetails(
                            course.course.slug
                        )
                        const details = detailResponse.data

                        return {
                            ...course,
                            course: {
                                ...course.course,
                                teacher:
                                    details.teacher?.name || 'Unknown Teacher',
                                category:
                                    details.category?.name ||
                                    'Unknown Category',
                                thumbnail: details.thumbnail || thumbnail,
                            },
                        }
                    })
                )

                // Pisahkan kursus berdasarkan status selesai atau belum
                const inProgress = detailedCourses.filter(
                    course => !course.completed_at
                )
                const completed = detailedCourses.filter(
                    course => course.completed_at
                )

                // Map data API ke struktur yang sesuai dengan UI
                setInProgressCourses(
                    inProgress.map(course => ({
                        id: course.course.id,
                        title: course.course.title,
                        category: course.course.category,
                        status: 'In Progress',
                        image: course.course.thumbnail,
                        teacher: course.course.teacher,
                        progress: course.progress,
                    }))
                )

                setCompletedCourses(
                    completed.map(course => ({
                        id: course.course.id,
                        title: course.course.title,
                        category: course.course.category,
                        status: 'Completed',
                        image: course.course.thumbnail,
                        teacher: course.course.teacher,
                    }))
                )
            } catch (error) {
                console.error('Failed to fetch courses:', error)
            }
        }

        fetchCourses()
    }, [])

    return (
        <div className="flex select-none">
            <div className="w-[1200px] relative flex items-start mx-auto p-4 py-6 lg:py-8 gap-8">
                <Sidebar />

                {/* Main Content */}
                <div className="w-full lg:w-5/6 min-h-screen">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Courses
                        </h2>

                        <div className="bg-white p-4 sm:p-8 rounded-lg shadow">
                            <div className="w-full">
                                <section>
                                    <header className="select-none flex gap-5 text-sm font-medium text-gray-900 mb-5">
                                        <button
                                            onClick={() =>
                                                setActiveTab('On Progress')
                                            }
                                            className={`border-gray-400 rounded-2xl py-0.5 px-3 focus:outline-none transition ease-in-out duration-300 ${
                                                activeTab === 'On Progress'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'hover:border-blue-600 hover:bg-blue-600 hover:text-white'
                                            }`}>
                                            In Progress
                                        </button>
                                        <button
                                            onClick={() =>
                                                setActiveTab('Completed')
                                            }
                                            className={`border-gray-400 rounded-2xl py-0.5 px-3 focus:outline-none transition ease-in-out duration-300 ${
                                                activeTab === 'Completed'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'hover:border-blue-600 hover:bg-blue-600 hover:text-white'
                                            }`}>
                                            Completed
                                        </button>
                                    </header>

                                    <div className="flex flex-col gap-3">
                                        {/* In Progress Courses */}
                                        {activeTab === 'On Progress' &&
                                            inProgressCourses.map(course => (
                                                <div
                                                    key={course.id}
                                                    className="flex text-black">
                                                    <div className="content-center flex border shadow rounded-lg py-3 px-4 w-full">
                                                        <img
                                                            src={course.image}
                                                            className="w-32 h-full shadow-md object-cover rounded-lg mb-4"
                                                            loading="lazy"
                                                        />
                                                        <div className="ml-5 w-1/2 content-center">
                                                            <h1 className="text-lg text-slate-900 font-medium">
                                                                {course.title}
                                                            </h1>
                                                            <span className="text-base text-gray-500 font-normal">
                                                                {
                                                                    course.category
                                                                }
                                                            </span>
                                                            <p className="text-sm mt-2">{`Progress: ${course.progress.completed_lessons}/${course.progress.total_lessons} lessons`}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end ml-auto my-auto">
                                                            <span className="text-sm font-normal mb-3">
                                                                By{' '}
                                                                {course.teacher}
                                                            </span>
                                                            <button className="place-self-end px-8 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-800 text-white hover:text-white border-blue-600 hover:border-blue-800 focus:outline-none transition ease-in-out duration-300">
                                                                Resume
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        {/* Completed Courses */}
                                        {activeTab === 'Completed' &&
                                            completedCourses.map(course => (
                                                <div
                                                    key={course.id}
                                                    className="flex text-black">
                                                    <div className="content-center flex border shadow rounded-lg py-3 px-4 w-full">
                                                        <img
                                                            src={course.image}
                                                            className="w-32 h-full shadow-md object-cover rounded-lg mb-4"
                                                            loading="lazy"
                                                        />
                                                        <div className="ml-5 w-1/2 content-center">
                                                            <h1 className="text-lg text-slate-900 font-medium">
                                                                {course.title}
                                                            </h1>
                                                            <span className="text-base text-gray-500 font-normal">
                                                                {
                                                                    course.category
                                                                }
                                                            </span>
                                                            <div></div>
                                                            <div className="flex flex-row items-center mt-4">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="bg-green-200 rounded-full p-1 mr-2"
                                                                    width="22"
                                                                    height="22"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="#000000"
                                                                    strokeWidth="3"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                                Completed
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end ml-auto my-auto">
                                                            <span className="text-sm font-normal mb-3">
                                                                By{' '}
                                                                {course.teacher}
                                                            </span>
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
    )
}

export default UserCourses
