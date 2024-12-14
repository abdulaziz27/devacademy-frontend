import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import Sidebar from '../components/SideBarDashboard'
import thumbnail from '../../assets/images/thumbnail.jpg'
import isAuthenticated from '../../auth'
import { useNavigate, Link } from 'react-router-dom'
import {
    getMyEnrolledCourses,
    getCourseDetails,
    getAllCourses,
    getUserProfile,
    getTeacherDashboardData,
    createCourse,
    updateCourse,
    getCategories,
} from '../../api'

const UserCourses = () => {
    const [activeTab, setActiveTab] = useState('On Progress')
    const [userRole, setUserRole] = useState(null)
    const [inProgressCourses, setInProgressCourses] = useState([])
    const [completedCourses, setCompletedCourses] = useState([])
    const [allCourses, setAllCourses] = useState([])
    const [teacherCourses, setTeacherCourses] = useState([])
    const [entriesPerPage, setEntriesPerPage] = useState(10)
    const [searchQuery, setSearchQuery] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [categories, setCategories] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        category: '',
        slug: '',
        is_premium: false,
        thumbnail: '',
        trailer_url: '',
    })
    const navigate = useNavigate()

    const handleCloseModal = () => {
        resetForm() / setIsModalOpen(false)
    }

    const handleCourseFormSubmit = async e => {
        e.preventDefault()
        try {
            const courseDataToSubmit = {
                ...courseData,
                is_premium: courseData.is_premium ? true : false,
            }

            if (isEditing) {
                await handleEditCourse(
                    courseDataToSubmit.slug,
                    courseDataToSubmit
                )
            } else {
                await handleCreateCourse(courseDataToSubmit)
            }

            resetForm()
        } catch (error) {
            console.error('Error in form submission:', error)
        }
        setIsModalOpen(false)
    }

    const resetForm = () => {
        setCourseData({
            title: '',
            description: '',
            category: '',
            slug: '',
            is_premium: false,
            thumbnail: '',
            trailer_url: '',
        })
        setIsEditing(false)
    }

    const handleCreateCourse = async courseData => {
        try {
            const payload = {
                title: courseData.title,
                description: courseData.description,
                category_id: courseData.category,
                is_premium: courseData.is_premium,
                thumbnail: courseData.thumbnail,
                trailer_url: courseData.trailer_url,
            }

            const response = await createCourse(payload)
            swal('Success', 'Course created successfully!', 'success')
            console.log('Course created successfully:', response)

            // Update daftar courses dengan menambahkan course yang baru dibuat
            setAllCourses([...allCourses, response])

            // Reset form setelah submit
            resetForm()
            setIsModalOpen(false) // Menutup modal setelah create
        } catch (error) {
            swal('Error', 'Failed to create course', 'error')
            console.error('Error creating course:', error)
        }
    }

    const handleEditCourse = async (courseSlug, updatedData) => {
        try {
            // Membuat FormData untuk mengirim data
            const formData = new FormData()
    
            formData.append('title', updatedData.title)
            formData.append('description', updatedData.description)
            formData.append('category_id', updatedData.category)
            formData.append('is_premium', updatedData.is_premium ? '1' : '0')
            formData.append('trailer_url', updatedData.trailer_url)
    
            // Memastikan thumbnail ditambahkan jika ada
            if (updatedData.thumbnail instanceof File) {
                formData.append('thumbnail', updatedData.thumbnail)
            } else if (updatedData.thumbnail) {
                formData.append('thumbnail', updatedData.thumbnail)
            }
    
            // Mengirim data ke API untuk memperbarui kursus
            const response = await updateCourse(courseSlug, formData)
            console.log('API response data:', response.data);
            console.log('Course updated successfully:', response)
    
            // Periksa apakah respons berisi data yang benar
            if (response && response.data) {
                swal('Success', 'Course updated successfully!', 'success')
                console.log('Course updated successfully:', response.data);

                // Update state allCourses dengan kursus yang sudah diperbarui
                setAllCourses(prevCourses => {
                    const updatedCourses = prevCourses.map(course =>
                        course.slug === courseSlug ? response.data : course
                    )
                    console.log('Updated allCourses state:', updatedCourses)
                    return updatedCourses
                })
    
                // Reset form dan tutup modal
                console.log('Closing modal and resetting form')
                resetForm()
                setIsModalOpen(false)
            }
        } catch (error) {
            swal('Error', 'Failed to update course', 'error')
            console.error('Error updating course:', error)
        }
    }
    
    const handleEditCourseClick = course => {
        console.log('Editing course:', course)
        setCourseData({
            title: course.title,
            description: course.description,
            category: course.category_id,
            slug: course.slug,
            is_premium: course.is_premium,
            thumbnail: course.thumbnail,
            trailer_url: course.trailer_url,
        })
        setIsEditing(true)
        setIsModalOpen(true)
    }
    

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories()
                setCategories(response.data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        if (!isAuthenticated()) {
            swal('Warning!', 'Login terlebih dahulu!', 'warning').then(() => {
                navigate('/login')
            })
        }
    }, [navigate])

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const profileResponse = await getUserProfile()
                const roles = profileResponse.data.roles
                const role = roles.includes('admin')
                    ? 'admin'
                    : roles.includes('teacher')
                    ? 'teacher'
                    : 'student'
                setUserRole(role)
            } catch (error) {
                console.error('Failed to fetch user profile:', error)
            }
        }

        fetchUserRole()
    }, [])

    useEffect(() => {
        if (userRole === 'student') {
            const fetchCourses = async () => {
                try {
                    const response = await getMyEnrolledCourses()
                    console.log('Enrolled courses data:', response.data)
                    const courses = response.data

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
                                        details.teacher?.name ||
                                        'Unknown Teacher',
                                    category:
                                        details.category?.name ||
                                        'Unknown Category',
                                    thumbnail: details.thumbnail || thumbnail,
                                },
                            }
                        })
                    )

                    const inProgress = detailedCourses.filter(
                        course => !course.completed_at
                    )
                    const completed = detailedCourses.filter(
                        course => course.completed_at
                    )

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
        } else if (userRole === 'admin') {
            const fetchAllCourses = async () => {
                try {
                    // Ambil semua kursus tanpa pagination
                    const response = await getAllCourses({
                        entriesPerPage: 1000, // Atau angka besar untuk memastikan semua kursus didapat dalam satu permintaan
                    })
                    const { data } = response
        
                    // Setel semua kursus ke state
                    setAllCourses(data)
                    console.log('All courses fetched:', data) // Debugging
                } catch (error) {
                    console.error('Failed to fetch all courses:', error)
                }
            }
            fetchAllCourses()
        }
        else if (userRole === 'teacher') {
            const fetchTeacherCourses = async () => {
                try {
                    const response = await getTeacherDashboardData()
                    console.log(
                        'Teacher courses data:',
                        response.courses.courses
                    ) // Debugging
                    setTeacherCourses(response.courses.courses)
                } catch (error) {
                    console.error('Failed to fetch teacher courses:', error)
                }
            }

            fetchTeacherCourses()
        }
    }, [userRole])

    const filteredCourses = courses => {
        return courses.filter(
            course =>
                course.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (course.category?.name || '')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        )
    }

    const formatDate = dateString => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }
    const renderStudentView = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Courses</h2>
            <div className="bg-white p-4 sm:p-8 rounded-lg shadow">
                <header className="select-none flex gap-5 text-sm font-medium text-gray-900 mb-5">
                    <button
                        onClick={() => setActiveTab('On Progress')}
                        className={`border-gray-400 rounded-2xl py-0.5 px-3 ${
                            activeTab === 'On Progress'
                                ? 'bg-blue-600 text-white'
                                : 'hover:border-blue-600 hover:bg-blue-600 hover:text-white'
                        }`}>
                        In Progress
                    </button>
                    <button
                        onClick={() => setActiveTab('Completed')}
                        className={`border-gray-400 rounded-2xl py-0.5 px-3 ${
                            activeTab === 'Completed'
                                ? 'bg-blue-600 text-white'
                                : 'hover:border-blue-600 hover:bg-blue-600 hover:text-white'
                        }`}>
                        Completed
                    </button>
                </header>
                <div className="flex flex-col gap-3">
                    {activeTab === 'On Progress' &&
                        inProgressCourses.map(course => (
                            <div key={course.id} className="flex text-black">
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
                                            {course.category?.name ||
                                                'No Category'}
                                        </span>
                                        <p className="text-sm mt-2">{`Progress: ${course.progress.completed_lessons}/${course.progress.total_lessons} lessons`}</p>
                                    </div>
                                    <div className="flex flex-col items-end ml-auto my-auto">
                                        <span className="text-sm font-normal mb-3">
                                            By {course.teacher}
                                        </span>
                                        <button className="place-self-end px-8 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-800 text-white hover:text-white border-blue-600 hover:border-blue-800 focus:outline-none transition ease-in-out duration-300">
                                            Resume
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {activeTab === 'Completed' &&
                        completedCourses.map(course => (
                            <div key={course.id} className="flex text-black">
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
                                            {course.category?.name ||
                                                'No Category'}
                                        </span>
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
                                            By {course.teacher}
                                        </span>
                                        <button className="place-self-end px-8 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-800 text-white hover:text-white border-blue-600 hover:border-blue-800 focus:outline-none transition ease-in-out duration-300">
                                            Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )

    const renderAdminView = () => (
        <div className="space-y-6 px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-800">
                All Courses
            </h2>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                        Create New Course
                    </button>
    
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="p-3 border border-gray-300 bg-white text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                        />
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-700 mr-2">
                            Entries per page:
                        </span>
                        <select
                            value={entriesPerPage}
                            onChange={e =>
                                setEntriesPerPage(Number(e.target.value))
                            }
                            className="p-3 border border-gray-300 bg-white text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 transition-colors duration-200">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600">
                                <th className="px-6 py-3">No</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Teacher</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {allCourses
                            .filter(course =>
                                course.title &&
                                course.title.toLowerCase().includes(searchQuery.toLowerCase()) // Pastikan course.title tidak undefined atau null
                            )
                                .slice(0, entriesPerPage)
                                .map(course => (
                                    <tr
                                        key={course.id}
                                        className="border-t hover:bg-gray-50 transition-colors duration-300">
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {course.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {course.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {course.teacher?.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {formatDate(course.created_at)}{' '}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {course.category?.name ||
                                                'No Category'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center">
                                            <button
                                                onClick={() =>
                                                    handleEditCourseClick(course)
                                                }
                                                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mr-4">
                                                Edit
                                            </button>
                                            <Link
                                                to={`/course-details/${course.slug}`}
                                                className="text-green-600 hover:text-green-800 transition-colors duration-300">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

    const renderTeacherView = () => (
        <div className="space-y-6 px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-800">My Courses</h2>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                        Create New Course
                    </button>

                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="p-3 border border-gray-300 bg-white text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                        />
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-700 mr-2">
                            Entries per page:
                        </span>
                        <select
                            value={entriesPerPage}
                            onChange={e =>
                                setEntriesPerPage(Number(e.target.value))
                            }
                            className="p-3 border border-gray-300 bg-white text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 transition-colors duration-200">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600">
                                <th className="px-6 py-3">No</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Premium</th>
                                <th className="px-6 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherCourses
                                .filter(course =>
                                    course.title
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase())
                                )
                                .slice(0, entriesPerPage)
                                .map(course => (
                                    <tr
                                        key={course.id}
                                        className="border-t hover:bg-gray-50 transition-colors duration-300">
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {course.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {course.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {formatDate(course.created_at)}{' '}
                                            {/* Menormalkan tanggal */}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {course.is_premium ? 'Yes' : 'No'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center">
                                            <button
                                                onClick={() =>
                                                    handleEditCourseClick(
                                                        course
                                                    )
                                                }
                                                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mr-4">
                                                Edit
                                            </button>
                                            <Link
                                                to={`/course-details/${course.slug}`}
                                                className="text-green-600 hover:text-green-800 transition-colors duration-300">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
    const renderCourseForm = () => (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <form
                onSubmit={handleCourseFormSubmit}
                className="space-y-6 p-8 bg-white rounded-lg shadow-lg w-[600px] text-black">
                {' '}
                {/* Pastikan teks hitam */}
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-black">
                        {' '}
                        {/* Pastikan label berwarna hitam */}
                        Course Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={courseData.title}
                        onChange={e =>
                            setCourseData({
                                ...courseData,
                                title: e.target.value,
                            })
                        }
                        className="mt-1 p-3 border rounded-lg w-full bg-white text-black"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-black">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={courseData.description}
                        onChange={e =>
                            setCourseData({
                                ...courseData,
                                description: e.target.value,
                            })
                        }
                        className="mt-1 p-3 border rounded-lg w-full bg-white text-black"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-black">
                        Category
                    </label>
                    <select
                        id="category"
                        value={courseData.category}
                        onChange={e =>
                            setCourseData({
                                ...courseData,
                                category: e.target.value,
                            })
                        }
                        className="mt-1 p-3 border rounded-lg w-full bg-white text-black"
                        required>
                        <option value="" disabled>
                            Select Category
                        </option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="isPremium"
                        className="block text-sm font-medium text-black">
                        {' '}
                        {/* Pastikan label berwarna hitam */}
                        Premium Status
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="isPremium"
                                value="true"
                                checked={courseData.is_premium === true}
                                onChange={() =>
                                    setCourseData({
                                        ...courseData,
                                        is_premium: true,
                                    })
                                }
                                className="mr-2"
                            />
                            Yes
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="isPremium"
                                value="false"
                                checked={courseData.is_premium === false}
                                onChange={() =>
                                    setCourseData({
                                        ...courseData,
                                        is_premium: false,
                                    })
                                }
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="thumbnail"
                        className="block text-sm font-medium text-black">
                        {' '}
                        {/* Pastikan label berwarna hitam */}
                        Thumbnail Image
                    </label>
                    <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={e => {
                            setCourseData({
                                ...courseData,
                                thumbnail: e.target.files[0],
                            })
                        }}
                        className="mt-1 p-3 border rounded-lg w-full bg-white text-black"
                    />
                </div>
                <div>
                    <label
                        htmlFor="trailer_url"
                        className="block text-sm font-medium text-black">
                        Trailer URL
                    </label>
                    <input
                        id="trailer_url"
                        type="url"
                        value={courseData.trailer_url}
                        onChange={e =>
                            setCourseData({
                                ...courseData,
                                trailer_url: e.target.value,
                            })
                        }
                        className="mt-1 p-3 border rounded-lg w-full bg-white text-black"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full">
                        {isEditing ? 'Update Course' : 'Create Course'}
                    </button>
                    <button
                        onClick={handleCloseModal}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg w-20">
                        Close
                    </button>
                </div>
            </form>
        </div>
    )

    return (
        <div className="flex select-none">
            <div className="w-[1200px] relative flex items-start mx-auto p-4 py-6 lg:py-8 gap-8">
                <Sidebar />
                <div className="w-full lg:w-5/6 min-h-screen">
                    {userRole === 'student' && renderStudentView()}
                    {userRole === 'admin' && renderAdminView()}
                    {userRole === 'teacher' && renderTeacherView()}
                    {isModalOpen && renderCourseForm()}{' '}
                    {/* Render modal if open */}
                </div>
                
            </div>
        </div>
    )
}

export default UserCourses
