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
import Footer from '../components/Footer'

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

    const benefits = [
        {
            title: 'Certificate',
            description: 'Get your certificate after finishing the course.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256">
                    <path d="M128,140a12,12,0,0,1-12,12H72a12,12,0,0,1,0-24h44A12,12,0,0,1,128,140ZM116,88H72a12,12,0,0,0,0,24h44a12,12,0,0,0,0-24Zm120,79.14V228a12,12,0,0,1-17.95,10.42L196,225.82,174,238.42A12,12,0,0,1,156,228V204H40a20,20,0,0,1-20-20V56A20,20,0,0,1,40,36H216a20,20,0,0,1,20,20V88.86a55.87,55.87,0,0,1,0,78.28ZM196,160a32,32,0,1,0-32-32A32,32,0,0,0,196,160Zm-40,20V167.14a56,56,0,0,1,56-92.8V60H44V180Zm56,27.32V181.66a55.87,55.87,0,0,1-32,0v25.66l10.05-5.74a12,12,0,0,1,11.9,0Z"></path>
                </svg>
            ),
        },
        {
            title: 'Tutorial',
            description: 'Get video tutorial for this course from our teacher.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256">
                    <path d="M216,36H40A20,20,0,0,0,20,56V160a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A20,20,0,0,0,216,36Zm-4,120H44V60H212Zm24,52a12,12,0,0,1-12,12H32a12,12,0,0,1,0-24H224A12,12,0,0,1,236,208ZM104,128V88a12,12,0,0,1,18.36-10.18l32,20a12,12,0,0,1,0,20.36l-32,20A12,12,0,0,1,104,128Z"></path>
                </svg>
            ),
        },
        {
            title: 'Project',
            description: 'Build your own project from learning the course.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256">
                    <path d="M220,32H76A20,20,0,0,0,56,52V72H36A20,20,0,0,0,16,92V204a20,20,0,0,0,20,20H180a20,20,0,0,0,20-20V184h20a20,20,0,0,0,20-20V52A20,20,0,0,0,220,32ZM176,96v16H40V96Zm0,104H40V136H176Zm40-40H200V92a20,20,0,0,0-20-20H80V56H216Z"></path>
                </svg>
            ),
        },
    ]

    return (
        <div className="bg-white select-none">
            <Navbar />
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
                    <h1
                        className="text-6xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 mb-8 mt-12"
                        style={{ lineHeight: 'inherit' }}>
                        {course.title}
                    </h1>
                    <p className="text-center text-gray-500 mb-4">
                        Last updated:{' '}
                        {new Date(course.updated_at).toLocaleDateString(
                            'en-US',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }
                        )}
                    </p>
                </div>

                <div className="max-w-lg text-slate-900 mx-auto p-4 sm:px-6 lg:px-8 flex justify-between">
                    {/* Category */}
                    <div className="flex gap-2 items-center">
                        <svg
                            className="h-8 w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                        </svg>
                        <span className="text-base">
                            {course.category.name}
                        </span>
                    </div>
                    {/* Students */}
                    <div className="flex gap-2 items-center">
                        <svg
                            className="h-8 w-8"
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
                        <span className="text-sm">
                            {course.students_count} Students
                        </span>
                    </div>
                    {/* Teacher */}
                    <div className="flex gap-2 items-center">
                        <svg
                            className="h-8 w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                        </svg>
                        <span className="text-sm">{course.teacher.name}</span>
                    </div>
                </div>

                {/* Course Intorduction */}
                <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-8/12">
                            <div
                                id="mainVideoContainer"
                                className="aspect-video rounded-lg overflow-hidden w-full h-full relative">
                                <iframe
                                    className="w-full h-full overflow-hidden"
                                    src={
                                        course.trailer_url ||
                                        'https://www.youtube.com/embed/3iM_06QeZi8'
                                    }
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-4/12 relative">
                            <div className="rounded-lg border text-gray-800 font-medium w-full px-4 flex flex-col">
                                <div className="flex justify-between py-4">
                                    <h1 className="max-w-[250px] leading-relaxed">
                                        Sylabus
                                    </h1>
                                </div>
                                <div>
                                    {/* Mock course videos */}
                                    {/* Tampilkan List Nama Lesson dari course ini */}
                                    {course.lessons.map(lesson => (
                                        <div
                                            key={lesson.id}
                                            className="flex justify-between items-center py-4 border-t border-gray-200">
                                            <h1 className="max-w-[250px] leading-relaxed">
                                                {lesson.title}
                                                {/* Show duration if available */}
                                                {/* {lesson.duration && (
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        {lesson.duration} min
                                                    </span>
                                                )} */}
                                            </h1>
                                            {/* Show icon based on lesson type */}
                                            {lesson.type === 'video' && (
                                                <svg
                                                    className="w-5 h-5 text-gray-500" // Add video icon
                                                    // ... icon SVG code
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Course Benefits */}
                <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8">
                    <h1 className="text-2xl font-semibold text-black mb-8">
                        What you will get?
                    </h1>
                    <div className="grid grid-cols-1 text-black md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="border rounded-lg h-max md:h-[120px] p-5 hover:shadow-lg hover:-translate-y-2 transition duration-300 ease-in-out">
                                <div className="flex flex-col lg:flex-row">
                                    <div className="mr-3 mb-2 lg:mb-0">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-1">
                                            {benefit.title}
                                        </p>
                                        <span className="text-gray-500">
                                            {benefit.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8">
                    <div className="flex flex-col-reverse lg:flex-row gap-8">
                        {/* Left Section */}
                        {/* Tampilkan Deskripsi Course dari api */}
                        <div className="w-full text-black lg:w-8/12">
                            <h1 className="text-2xl font-semibold mb-4">
                                Description
                            </h1>
                            <p className="text-gray-600 leading-10 text-justify">
                                {course.description}
                            </p>
                            <h1 className="text-2xl font-semibold mt-12 mb-4">
                                Teacher
                            </h1>
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                        className="h-10 w-10 object-cover rounded-full"
                                        src={
                                            course.teacher.avatar ||
                                            'https://via.placeholder.com/150'
                                        }
                                        alt={`${course.teacher.name}'s avatar`}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-semibold text-gray-900">
                                        {course.teacher.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {course.teacher.email}
                                    </div>
                                </div>
                            </div>

                            <div className="text-2xl font-semibold mt-16 mb-4">
                                What you will learn?
                            </div>
                            <div className="rounded-lg border w-full px-4 flex flex-col mb-12">
                                <div className="flex justify-between py-4">
                                    <h1>Sylabus</h1>
                                </div>
                                <div>
                                    {course.lessons.map(lesson => (
                                        <div
                                            key={lesson.id}
                                            className="flex justify-between items-center py-4 border-t border-gray-200">
                                            <h1 className="max-w-[400px] leading-relaxed">
                                                {lesson.title}
                                                {/* Show duration if available */}
                                                {/* {lesson.duration && (
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        {lesson.duration} min
                                                    </span>
                                                )} */}
                                            </h1>
                                            {/* Show icon based on lesson type */}
                                            {lesson.type === 'video' && (
                                                <svg
                                                    className="w-5 h-5 text-gray-500" // Add video icon
                                                    // ... icon SVG code
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="w-full lg:w-4/12 relative">
                            <div className="pb-8 sticky top-24">
                                <div className="rounded-lg border p-4 space-y-4">
                                    <div className="overflow-hidden rounded w-full h-[200px] shadow-md bg-gray-200">
                                        {/* Placeholder for video preview */}
                                        <iframe
                                            className="w-full h-full overflow-hidden"
                                            src={
                                                course.trailer_url ||
                                                'https://www.youtube.com/embed/3iM_06QeZi8'
                                            }
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                            allowFullScreen
                                        />
                                    </div>

                                    <div className="py-2">
                                        <hr />
                                    </div>
                                    {/* Tambahkan pengkondisian lain, jika sudah di enroll (is_enrolled true) maka teksnya berubah Continue Learning*/}

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
                                              !subscriptionStatus?.can_access_premium
                                            ? 'Subscribe to Enroll'
                                            : 'Enroll in Course'}
                                    </button>
                                    {course.is_premium && (
                                        <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                            Premium
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default CoursePreview
