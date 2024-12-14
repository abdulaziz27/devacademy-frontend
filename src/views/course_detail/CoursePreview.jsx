import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    enrollInCourse,
    getCourseDetails,
    getSubscriptionStatus,
} from '../../api'
import { useAuth } from '../../contexts/AuthContext'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'

const CoursePreview = () => {
    const { slug } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [enrolling, setEnrolling] = useState(false)
    const [subscriptionStatus, setSubscriptionStatus] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseResponse, subscriptionResponse] =
                    await Promise.all([
                        getCourseDetails(slug),
                        getSubscriptionStatus(),
                    ])
                setCourse(courseResponse.data)
                setSubscriptionStatus(subscriptionResponse)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [slug])

    const handleEnrollment = async () => {
        if (!user) {
            navigate('/login', { state: { from: `/courses/${slug}` } })
            return
        }

        if (course.is_enrolled) {
            navigate(`/learn/courses/${slug}`)
            return
        }

        if (course.is_premium && !subscriptionStatus.can_access_premium) {
            Swal.fire({
                icon: 'info',
                title: 'Subscription Required',
                text: 'This is a premium course. Please subscribe to access this content.',
                showCancelButton: true,
                confirmButtonText: 'View Plans',
                cancelButtonText: 'Later',
            }).then(result => {
                if (result.isConfirmed) {
                    navigate('/pricing')
                }
            })
            return
        }

        setEnrolling(true)
        try {
            await enrollInCourse(slug)
            Swal.fire({
                icon: 'success',
                title: 'Enrolled Successfully!',
                text: 'You can now start learning.',
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                navigate(`/learn/courses/${slug}`)
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Enrollment Failed',
                text: 'An error occurred while enrolling in the course.',
            })
        } finally {
            setEnrolling(false)
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!course) return <div>Course not found</div>

    return (
        <div className="bg-white">
            <Navbar />
            <div className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8">
                {/* Course Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {course.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                        {course.description}
                    </p>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <img
                                src={
                                    course.teacher.avatar ||
                                    '/default-avatar.png'
                                }
                                alt={course.teacher.name}
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            <span className="text-gray-700">
                                By {course.teacher.name}
                            </span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-700">
                            {course.category.name}
                        </span>
                    </div>
                </div>

                {/* Course Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {/* Course Thumbnail or Preview Video */}
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6">
                            {course.trailer_url ? (
                                <iframe
                                    src={course.trailer_url}
                                    className="w-full h-full"
                                    allowFullScreen></iframe>
                            ) : (
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {/* Course Content Preview */}
                        <div className="bg-white rounded-lg border p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                What you'll learn
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.highlights?.map((highlight, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Course Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg border p-6 sticky top-24">
                            {course.is_premium ? (
                                <div className="mb-4">
                                    <span className="text-2xl font-bold text-gray-900">
                                        Premium
                                    </span>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <span className="text-2xl font-bold text-gray-900">
                                        Free
                                    </span>
                                </div>
                            )}

                            {/* Enroll Button */}
                            <button
                                onClick={handleEnrollment}
                                disabled={enrolling}
                                className={`w-full ${
                                    enrolling
                                        ? 'bg-gray-400'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } text-white rounded-lg py-3 px-4 font-semibold transition duration-300`}>
                                {enrolling
                                    ? 'Processing...'
                                    : course.is_enrolled
                                    ? 'Continue Learning'
                                    : course.is_premium &&
                                      !subscriptionStatus.can_access_premium
                                    ? 'Subscribe to Enroll'
                                    : 'Enroll in Course'}
                            </button>

                            {/* Course Stats */}
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        Students
                                    </span>
                                    <span className="font-medium">
                                        {course.students_count}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        Lessons
                                    </span>
                                    <span className="font-medium">
                                        {course.lessons_count}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        Duration
                                    </span>
                                    <span className="font-medium">
                                        {course.total_duration} hours
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CoursePreview
