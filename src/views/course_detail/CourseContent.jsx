import React, { useState, useRef, useEffect } from 'react'
import CourseSideBar from './CourseSideBar'
import { useParams } from 'react-router-dom'
import { getLessons, markLessonComplete } from '../../api'

const CourseContent = () => {
    // Import needed (Azz)
    const { slug } = useParams()
    const [currentLesson, setCurrentLesson] = useState(null)
    const [lessons, setLessons] = useState([])
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState({})

    const categories = [
        { id: 'detail', name: 'Detail' },
        { id: 'submission', name: 'Submission' },
    ]

    const [activeTab, setActiveTab] = useState('detail')
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('')
    const [submittedFileName, setSubmittedFileName] = useState('')
    const [status, setStatus] = useState('Draft (not submitted)')
    const [gradingStatus, setGradingStatus] = useState('Not graded')
    const [timeRemaining, setTimeRemaining] = useState('26 days 18 hours')
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    const fileInputRef = useRef(null)

    const handleTabClick = tabId => {
        setActiveTab(tabId)
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

    const handleSubmit = () => {
        if (file) {
            setStatus('Submitted')
            setGradingStatus('Not graded')
            setSubmittedFileName(fileName)
            alert(`File uploaded: ${file.name}`)
        } else {
            alert('Please select a file first.')
        }
    }

    const handleClick = () => {
        fileInputRef.current.click()
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

    // Fetch lessons (Azzz)
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await getLessons(slug)
                setLessons(response.data)
                setCurrentLesson(response.data[0])
            } catch (error) {
                console.error('Error fetching lessons:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchLessons()
    }, [slug])

    const handleLessonComplete = async lessonId => {
        try {
            await markLessonComplete(lessonId)
            setProgress(prev => ({
                ...prev,
                [lessonId]: true,
            }))
        } catch (error) {
            console.error('Error marking lesson as complete:', error)
        }
    }

    const handleLessonChange = lesson => {
        setCurrentLesson(lesson)
    }

    return (
        <div className="flex">
            <div className="w-full flex lg:flex-row items-start mx-auto py-6 lg:py-8">
                <CourseSideBar />

                <div className="w-full bg-white mx-6 sm:p-8 rounded-lg shadow">
                    <iframe
                        className="w-full rounded-lg"
                        height="750"
                        src="https://www.youtube.com/embed/3iM_06QeZi8"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                    />
                    <section className="max-w-full items-center my-10">
                        <div className="text-gray-600 text-base font-medium flex justify-center gap-10 mb-8">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`py-2 focus:outline-none border-none hover:text-blue-700 relative before:absolute before:-bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full
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

                        {/* Detail */}
                        <div
                            className={`max-w-full text-justify border border-gray-200 p-4 rounded-lg mb-4 ${
                                activeTab === 'detail' ? '' : 'hidden'
                            }`}>
                            <span className="text-base font-normal text-slate-800">
                                In programming and mathematics, a variable is a
                                fundamental concept that plays a key role in
                                storing and manipulating data. Simply put, a
                                variable acts as a container that holds a value,
                                which can change during the execution of a
                                program or in different mathematical equations.
                                Understanding variables is essential for anyone
                                learning to code, solve mathematical problems,
                                or analyze data.
                            </span>
                        </div>

                        {/* Submission */}
                        <div
                            className={`max-w-full ${
                                activeTab === 'submission' ? '' : 'hidden'
                            }`}>
                            <div className="border text-normal border-gray-300 p-4 rounded-lg mb-4">
                                <table className="w-full text-gray-700 border border-gray-300">
                                    <tbody>
                                        <tr className="border-b border-gray-300">
                                            <td className="p-2 border-r border-gray-300">
                                                Submission status
                                            </td>
                                            <td className="p-2">{status}</td>
                                        </tr>
                                        <tr className="border-b border-gray-300">
                                            <td className="p-2 border-r border-gray-300">
                                                Grading status
                                            </td>
                                            <td className="p-2">
                                                {gradingStatus}
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-300">
                                            <td className="p-2 border-r border-gray-300">
                                                Time remaining
                                            </td>
                                            <td className="p-2 text-red-600">
                                                {timeRemaining}
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-300">
                                            <td className="p-2 border-r border-gray-300">
                                                Last modified
                                            </td>
                                            <td className="p-2">
                                                Tuesday, 29 October 2024, 8:57
                                                PM
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-300">
                                            <td className="p-2 border-r border-gray-300">
                                                File submissions
                                            </td>
                                            <td className="p-2">
                                                {submittedFileName ? (
                                                    <a
                                                        href="#"
                                                        className="text-blue-600">
                                                        {submittedFileName}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500">
                                                        No file submitted
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Drag-and-Drop File Upload */}
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

                                <div className="mt-4 text-end">
                                    <button
                                        onClick={handleSubmit}
                                        className="font-normal bg-blue-600 text-white px-4 py-2 rounded hover:text-white hover:bg-blue-700 transition ease-in-out duration-300">
                                        Submit assignment
                                    </button>
                                </div>
                            </div>

                            {/* Submission Comments */}
                            <div className="border p-4 rounded-lg mb-4 border-gray-300">
                                <span className="font-medium">
                                    Submission comments
                                </span>

                                {/* Comment Input */}
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

                                {/* Display Submitted Comments */}
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
                    </section>
                </div>
            </div>
        </div>
    )
}

export default CourseContent
