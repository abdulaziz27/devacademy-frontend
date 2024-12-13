import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import { getAllCourses, getCategories } from '../../api'
import thumbnail from '../../assets/images/thumbnail.jpg'
import { ClipLoader } from 'react-spinners'

const CoursesPage = () => {
    const [categories, setCategories] = useState([])
    const [coursesByCategory, setCoursesByCategory] = useState({})
    const [activeTab, setActiveTab] = useState('all')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Fetch categories and courses
        const fetchData = async () => {
            try {
                const [categoriesResponse, coursesResponse] = await Promise.all(
                    [getCategories(), getAllCourses()]
                )

                const categories = categoriesResponse.data
                const courses = coursesResponse.data

                const categorizedCourses = {
                    all: courses,
                    premium: courses.filter(course => course.is_premium),
                }

                // Initialize all categories with empty course arrays
                categories.forEach(category => {
                    categorizedCourses[category.id] = []
                })

                // Group courses by category
                courses.forEach(course => {
                    const { category } = course
                    if (categorizedCourses[category.id]) {
                        categorizedCourses[category.id].push(course)
                    }
                })

                console.log('Categorized Courses:', categorizedCourses) // Debug categorized courses

                setCategories([
                    { id: 'all', name: 'All' },
                    { id: 'premium', name: 'Premium' },
                    ...categories,
                ])
                setCoursesByCategory(categorizedCourses)
                setActiveTab('all')
            } catch (error) {
                console.error('Failed to fetch data:', error)
                setError('Failed to fetch data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleTabClick = categoryId => {
        setActiveTab(categoryId)
    }

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader size={50} color="#4fa94d" loading={loading} />
            </div>
        )
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="bg-white select-none">
            <Navbar />

            {/* Hero Section */}
            <section
                className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8 mt-12 mb-20"
                data-aos="fade-up">
                <h1 className="text-6xl text-black text-center font-extrabold bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 my-12">
                    Courses
                </h1>
                <p className="w-full lg:w-2/4 text-gray-700 mx-auto text-center text-lg">
                    Build your career as a professional developer. Choose from a
                    wide variety of professional development courses designed to
                    enhance your skills and improve your career.
                </p>
            </section>

            {/* Course selection section */}
            <section
                className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8 mb-20"
                data-aos="fade-up"
                data-aos-delay="400">
                <div className="flex justify-center mb-8 space-x-10">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`py-2 text-lg font-medium focus:outline-none border-none text-gray-600 hover:text-blue-700 relative text-blue-500 before:absolute before:-bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full 
                                ${
                                    activeTab === category.id
                                        ? 'sm:text-blue-700 before:w-full'
                                        : ''
                                }`}
                            onClick={() => handleTabClick(category.id)}>
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Tab Contents */}
                {categories.map(category => (
                    <div
                        key={category.id}
                        className={`tab-content ${
                            activeTab === category.id ? 'active' : 'hidden'
                        }`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {coursesByCategory[category.id] &&
                                coursesByCategory[category.id].map(course => (
                                    <div
                                        key={course.id}
                                        className={`relative bg-white border rounded-lg p-3 hover:shadow-lg hover:-translate-y-2 transition duration-300 ease-in-out transform flex flex-col justify-between ${
                                            course.is_premium
                                                ? 'border-yellow-400'
                                                : ''
                                        }`}>
                                        {/* Premium Badge on Top-Right Corner */}
                                        {course.is_premium && (
                                            <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                                Premium
                                            </div>
                                        )}

                                        <img
                                            src={course.thumbnail || thumbnail}
                                            alt={course.title}
                                            className="w-full h-48 shadow-md object-cover rounded-lg mb-4"
                                            loading="lazy"
                                        />

                                        <div className="flex flex-col flex-grow">
                                            <h1 className="font-semibold text-xl text-black mb-2">
                                                {course.title}
                                            </h1>

                                            <div className="flex flex-col justify-between h-full">
                                                <p className="text-md text-gray-600 min-h-16">
                                                    {course.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex-row mt-3">
                                                    <p className="text-sm text-gray-600 ml-1 mb-1">
                                                        By {course.teacher.name}
                                                    </p>
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="h-4 w-4 mr-2 text-gray-800"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                            />
                                                        </svg>
                                                        <span className="text-xs text-gray-800">
                                                            {course.students_count ||
                                                                0}{' '}
                                                            Students
                                                        </span>
                                                    </div>
                                                </div>

                                                <Link
                                                    to={`/courses/${course.slug}`}
                                                    className="text-center font-semibold bg-blue-500 text-sm hover:bg-blue-600 text-white hover:text-white px-4 py-2 rounded transition duration-300 ease-in-out w-1/2">
                                                    Download
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </section>

            <Footer />
        </div>
    )
}

export default CoursesPage
