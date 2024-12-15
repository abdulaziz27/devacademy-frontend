import React, { useState, useRef, useEffect } from 'react'
import CourseSideBar from './CourseSideBar'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import {
    getLessons,
    getLessonDetails,
    getAssignmentDetails,
    getAssignments,
    submitAssignment,
    markLessonComplete,
    fetchSubmissions as apiFetchSubmissions,
} from '../../api'
import Swal from 'sweetalert2'

const CourseContent = () => {
    const { slug } = useParams()
    const [currentItem, setCurrentItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [contentType, setContentType] = useState('lesson')
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [content, setContent] = useState('')
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const fileInputRef = useRef(null)
    const [submissions, setSubmissions] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const loadInitialLesson = async () => {
            try {
                const response = await getLessons(slug)
                if (response.data && response.data.length > 0) {
                    await handleItemSelect(response.data[0].id, 'lesson')
                }
            } catch (err) {
                console.error('Error loading initial lesson:', err)
                setError('Failed to load lessons')
            }
        }

        loadInitialLesson()
    }, [slug])

    const handleItemSelect = async (itemId, type) => {
        try {
            setLoading(true)
            setContentType(type)

            if (type === 'lesson') {
                const response = await getLessonDetails(slug, itemId)
                if (response) {
                    setCurrentItem({
                        ...response.lesson,
                        is_completed: response.is_completed,
                    })
                    console.log('Lesson details:', response)
                }
            } else if (type === 'assignment') {
                const response = await getAssignmentDetails(slug, itemId)
                console.log('Assignment details response:', response) // Tambahkan ini
                if (response.data) {
                    setCurrentItem(response.data)
                    await fetchSubmissions(itemId) // Tambahkan await di sini
                }
            }
        } catch (err) {
            console.error('Error fetching item details:', err)
            setError('Failed to load content')
        } finally {
            setLoading(false)
        }
    }

    const handleFileChange = event => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
        setFileName(selectedFile.name)
    }

    const handleDrop = event => {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files[0]
        if (droppedFile) {
            setFile(droppedFile)
            setFileName(droppedFile.name)
        }
    }

    const handleDragOver = event => {
        event.preventDefault()
    }

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleSubmit = async () => {
        if (!file && !content.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please provide either a file or written content for your submission.',
            })
            return
        }

        const formData = new FormData()
        if (file) formData.append('file_url', file)
        if (content) formData.append('content', content)

        try {
            await submitAssignment(slug, currentItem.id, formData)
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Assignment submitted successfully.',
            }).then(() => {
                setFile(null)
                setFileName('')
                setContent('')
                if (currentItem && currentItem.id) {
                    fetchSubmissions(currentItem.id)
                } else {
                    console.error('No current assignment ID available')
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text:
                    error.response?.data?.message ||
                    'An error occurred while submitting.',
            })
        }
    }

    const handleCommentChange = event => {
        setNewComment(event.target.value)
    }

    const handleCommentSubmit = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, newComment])
            setNewComment('')
        }
    }

    const getVideoIdFromUrl = url => {
        const match = url.match(
            /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/[^\s]*\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        )
        return match ? match[1] : null
    }

    const handleMarkComplete = async () => {
        try {
            const response = await markLessonComplete(slug, currentItem.id)
            setCurrentItem(prevItem => ({
                ...prevItem,
                is_completed: true,
            }))

            Swal.fire({
                icon: 'success',
                title: 'Lesson Completed!',
                text: 'Your progress has been saved.',
                showConfirmButton: false,
                timer: 1500,
            })
            // Refresh the lesson data to update completion status
            await handleItemSelect(currentItem.id, 'lesson')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to mark lesson as complete. Please try again.',
            })
        }
    }

    const getNextItem = (currentItemId, items) => {
        const currentIndex = items.findIndex(item => item.id === currentItemId)
        if (currentIndex !== -1 && currentIndex < items.length - 1) {
            return items[currentIndex + 1]
        }
        return null
    }

    const fetchSubmissions = async assignmentId => {
        try {
            if (!assignmentId) {
                console.error('No assignment ID provided')
                return
            }

            const response = await apiFetchSubmissions(slug, assignmentId)
            console.log('Raw API Response:', response) // Tambahkan ini

            if (response.data && Array.isArray(response.data)) {
                const submissionsData = response.data

                // Sort submissions by date and get the latest one
                const sortedSubmissions = submissionsData.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                )

                console.log('Sorted submissions:', sortedSubmissions) // Tambahkan ini

                if (sortedSubmissions.length > 0) {
                    setSubmissions(sortedSubmissions)
                    setHasSubmitted(true)
                } else {
                    setSubmissions([])
                    setHasSubmitted(false)
                }
            } else {
                console.error('Invalid submissions data structure:', response)
                setSubmissions([])
                setHasSubmitted(false)
            }
        } catch (error) {
            console.error('Error fetching submissions:', error)
            setSubmissions([])
            setHasSubmitted(false)
        }
    }

    useEffect(() => {
        if (contentType === 'assignment' && currentItem && currentItem.id) {
            fetchSubmissions()
        }
    }, [contentType, currentItem, slug])

    const renderLessonContent = () => {
        return (
            <>
                {currentItem.video_url && (
                    <iframe
                        className="w-full rounded-lg relative z-10 pointer-events-auto"
                        height="750"
                        src={`https://www.youtube.com/embed/${getVideoIdFromUrl(
                            currentItem.video_url
                        )}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                )}
                <div className="max-w-full text-justify border border-gray-200 p-4 rounded-lg mb-4 mt-4">
                    <span className="text-base font-normal text-slate-800">
                        {currentItem.content ||
                            'No content available for this lesson.'}
                    </span>
                </div>
                <div className="text-right mt-4">
                    <button
                        onClick={handleMarkComplete}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-300 text-white ${
                            currentItem.is_completed
                                ? 'bg-green-600 hover:bg-green-700 cursor-default'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={currentItem.is_completed}>
                        {currentItem.is_completed ? (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Completed
                            </>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Mark as Complete
                            </>
                        )}
                    </button>
                </div>
            </>
        )
    }

    const renderSubmissionHistory = () => {
        if (!submissions || submissions.length === 0) return null

        const submission = submissions[0]

        return (
            <div className="mt-8">
                <div className="bg-white border rounded-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="border-b px-6 py-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Your Latest Submission
                        </h3>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-6">
                        {/* Content and File */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Written Content */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                    Written Answer
                                </h4>
                                <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
                                    <p className="text-gray-800 whitespace-pre-wrap">
                                        {submission.content ||
                                            'No written content submitted'}
                                    </p>
                                </div>
                            </div>

                            {/* File Submission */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                    Submitted File
                                </h4>
                                <div className="bg-gray-50 rounded-lg p-4 min-h-[100px] flex items-center">
                                    {submission.file_url ? (
                                        <a
                                            href={submission.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" />
                                                <line
                                                    x1="12"
                                                    y1="15"
                                                    x2="12"
                                                    y2="3"
                                                />
                                            </svg>
                                            Download Submission File
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">
                                            No file submitted
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Grade and Feedback */}
                        <div className="border-t pt-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Grade */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                        Grade
                                    </h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p
                                            className={`${
                                                submission.score
                                                    ? 'text-green-600 font-semibold'
                                                    : 'text-gray-500'
                                            }`}>
                                            {submission.score
                                                ? `${submission.score}/100`
                                                : 'Not graded yet'}
                                        </p>
                                    </div>
                                </div>

                                {/* Feedback */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                        Teacher Feedback
                                    </h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p
                                            className={`${
                                                submission.feedback
                                                    ? 'text-gray-800'
                                                    : 'text-gray-500 italic'
                                            }`}>
                                            {submission.feedback ||
                                                'No feedback provided yet'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="bg-gray-50 px-6 py-4 border-t">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-600">
                            <span>
                                Submitted by:{' '}
                                {submission.user?.name || 'Unknown User'}
                            </span>
                            <span className="text-gray-500">
                                {moment(submission.created_at).format(
                                    'MMMM Do YYYY, h:mm:ss a'
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderAssignmentContent = () => {
        return (
            <div className="max-w-full">
                <div className="border text-normal border-gray-300 p-4 rounded-lg mb-4">
                    <table className="w-full text-gray-700 border border-gray-300">
                        <tbody>
                            <tr className="border-b border-gray-300">
                                <td className="p-2 border-r border-gray-300">
                                    Submission title
                                </td>
                                <td className="p-2">{currentItem.title}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <td className="p-2 border-r border-gray-300">
                                    Detail Submission
                                </td>
                                <td className="p-2">
                                    {currentItem.description ||
                                        'No description available.'}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <td className="p-2 border-r border-gray-300">
                                    Last Modified
                                </td>
                                <td className="p-2">
                                    {moment(currentItem.created_at).format(
                                        'dddd, DD MMMM YYYY, hh:mm A'
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {hasSubmitted ? (
                        renderSubmissionHistory()
                    ) : (
                        <>
                            <div
                                className="flex flex-col text-gray-600 hover:text-blue-500 mt-12 border-2 border-dashed hover:border-solid border-gray-400 hover:border-blue-600 p-4 rounded-lg items-center text-center gap-2 transition ease-in-out duration-300"
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={handleClick}
                                style={{ cursor: 'pointer' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="text-gray-600 h-10 w-10 mr-3"
                                    fill="none"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                                </svg>
                                <p className="text-gray-600">
                                    Drag and drop your file here or click to
                                    select
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            {file && (
                                <div className="mt-4 text-end">
                                    <span className="text-gray-600">
                                        Selected file: {file.name}
                                    </span>
                                </div>
                            )}

                            <div className="mt-4">
                                <label
                                    htmlFor="content"
                                    className="block text-gray-700 font-medium">
                                    Answer/Description:
                                </label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    className="bg-white w-full text-gray-800 focus:outline-none p-2 border border-gray-300 rounded-md"
                                    rows="4"
                                    placeholder="Write your answer or description here..."
                                />
                            </div>

                            <div className="mt-4 text-end">
                                <button
                                    onClick={handleSubmit}
                                    className="font-normal bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                                    Submit Assignment
                                </button>
                            </div>
                        </>
                    )}

                    <div className="border p-4 rounded-lg mb-4 mt-8 border-gray-300">
                        <span className="font-medium">Submission comments</span>

                        <div className="mt-4">
                            <textarea
                                value={newComment}
                                onChange={handleCommentChange}
                                className="bg-white w-full text-gray-800 focus:outline-none p-2 border border-gray-300 rounded-md"
                                rows="4"
                                placeholder="Add a comment..."
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className="bg-blue-600 text-white px-4 py-2 mt-2 rounded focus:outline-none hover:bg-blue-700 transition duration-300">
                                Post Comment
                            </button>
                        </div>

                        <div className="mt-4 text-sm text-gray-800">
                            <div>Comments ({comments.length})</div>
                            <ul className="mt-2">
                                {comments.map((comment, index) => (
                                    <li key={index} className="border-b py-2">
                                        {comment}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            )
        }

        if (error) {
            return <div className="text-red-500 text-center p-4">{error}</div>
        }

        if (!currentItem) {
            return <div className="text-center p-4">No content selected</div>
        }

        return contentType === 'lesson'
            ? renderLessonContent()
            : renderAssignmentContent()
    }

    return (
        <div className="flex">
            <div className="w-full flex lg:flex-row items-start mx-auto py-6 lg:py-8">
                <CourseSideBar
                    courseSlug={slug}
                    onItemSelect={handleItemSelect}
                />
                <div className="w-full bg-white mx-6 sm:p-8 rounded-lg shadow">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default CourseContent
