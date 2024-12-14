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
} from '../../api'

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
                if (response.data) {
                    setCurrentItem(response.data)
                }
            } else if (type === 'assignment') {
                const response = await getAssignments(slug)
                if (response.data) {
                    setCurrentItem(
                        response.data.find(
                            assignment => assignment.id === itemId
                        )
                    )
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
        if (!file || !(file instanceof File)) {
            alert('Please select a valid file.')
            return
        }

        if (!content.trim()) {
            alert('Please write an answer or description.')
            return
        }

        const formData = new FormData()
        formData.append('file_url', file)
        formData.append('content', content)

        try {
            const response = await submitAssignment(
                slug,
                currentItem.id,
                formData
            )
            if (response.status === 200) {
                alert('Assignment submitted successfully.')
            } else if (response.status === 201) {
                alert('Assignment submitted successfully.')
            } else {
                alert('Failed to submit assignment.')
            }
        } catch (error) {
            alert(
                'An error occurred while submitting the assignment: ' +
                    (error.response?.data?.message || error.message)
            )
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

        if (contentType === 'lesson') {
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
                </>
            )
        }

        // Assignment content
        if (contentType === 'assignment') {
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
                                Drag and drop your file here or click to select
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

                        {/* Textbox for content */}
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

                        {/* Submit button */}
                        <div className="mt-4 text-end">
                            <button
                                onClick={handleSubmit}
                                className="font-normal bg-blue-600 text-white px-4 py-2 rounded hover:text-white hover:bg-blue-700 transition ease-in-out duration-300">
                                Submit assignment
                            </button>
                        </div>

                        {/* Comments Section */}
                        <div className="border p-4 rounded-lg mb-4 mt-8 border-gray-300">
                            <span className="font-medium">
                                Submission comments
                            </span>

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
                                    className="bg-blue-600 text-white px-4 py-2 mt-2 rounded focus:outline-none hover:bg-blue-700 transition ease-in-out duration-300">
                                    Post Comment
                                </button>
                            </div>

                            <div className="mt-4 text-sm text-gray-800">
                                <div>Comments ({comments.length})</div>
                                <ul className="mt-2">
                                    {comments.map((comment, index) => (
                                        <li
                                            key={index}
                                            className="border-b py-2">
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
