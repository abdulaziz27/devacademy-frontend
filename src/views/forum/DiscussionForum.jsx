import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Profile from '../../assets/images/keunggulan.png'
import { ClipLoader } from 'react-spinners'
import {
    getDiscussions,
    createDiscussion,
    deleteDiscussion,
    createComment,
    deleteComment,
    getDiscussionComments,
} from '../../api'
import Swal from 'sweetalert2'

const DiscussionForum = () => {
    const { user } = useAuth()
    const [previewImage, setPreviewImage] = useState(null) // Track the image to preview
    const [showFullPost, setShowFullPost] = useState(false) // Track whether the full post is visible
    const [showCommentSection, setShowCommentSection] = useState(false) // Track whether the comment section is visible
    const [comments, setComments] = useState([]) // Track the list of comments
    const [newComment, setNewComment] = useState('') // Track new comment input
    const [posts, setPosts] = useState([]) // Manage posts
    const [newPost, setNewPost] = useState('') // Track new post input
    const [newPostImage, setNewPostImage] = useState(null) // Track image for the post
    const [showPostOverlay, setShowPostOverlay] = useState(false) // Track overlay visibility

    const [activeDiscussionId, setActiveDiscussionId] = useState(null)
    const [discussionComments, setDiscussionComments] = useState({})
    const [discussions, setDiscussions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [discussionsPerPage] = useState(3)

    const indexOfLastDiscussion = currentPage * discussionsPerPage
    const indexOfFirstDiscussion = indexOfLastDiscussion - discussionsPerPage
    const currentDiscussions = discussions.slice(
        indexOfFirstDiscussion,
        indexOfLastDiscussion
    )
    const totalPages = Math.ceil(discussions.length / discussionsPerPage)

    const Pagination = () => {
        return (
            <div className="flex justify-center mt-8 space-x-2">
                <button
                    onClick={() =>
                        setCurrentPage(prev => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                        currentPage === 1
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 rounded ${
                            currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}>
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() =>
                        setCurrentPage(prev => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${
                        currentPage === totalPages
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                    Next
                </button>
            </div>
        )
    }

    useEffect(() => {
        fetchDiscussions()
    }, [])

    const fetchDiscussions = async () => {
        try {
            setLoading(true)
            const response = await getDiscussions()
            setDiscussions(response.data)
        } catch (err) {
            setError('Failed to load discussions')
            console.error('Error fetching discussions:', err)
        } finally {
            setLoading(false)
        }
    }

    const openPreviewImage = image => {
        setPreviewImage(image)
    }

    const closePreviewImage = () => {
        setPreviewImage(null)
    }

    const toggleCommentSection = async discussionId => {
        if (activeDiscussionId === discussionId) {
            setActiveDiscussionId(null)
        } else {
            setActiveDiscussionId(discussionId)
            try {
                const response = await getDiscussionComments(discussionId)
                setDiscussionComments({
                    ...discussionComments,
                    [discussionId]: response.data,
                })
            } catch (error) {
                console.error('Error fetching comments:', error)
            }
        }
    }

    // Handle discussion creation
    const handleSubmitPost = async () => {
        try {
            if (!newPost.trim()) {
                Swal.fire('Error', 'Post content cannot be empty', 'warning')
                return
            }

            const formData = new FormData()
            formData.append('title', newPost.substring(0, 50))
            formData.append('content', newPost)

            if (newPostImage) {
                formData.append('image', newPostImage)
            }

            const response = await createDiscussion(formData)

            Swal.fire('Success', 'Discussion posted successfully!', 'success')
            setShowPostOverlay(false)
            setNewPost('')
            setNewPostImage(null)
            await fetchDiscussions()
        } catch (error) {
            Swal.fire('Error', 'Failed to create discussion', 'error')
            console.error('Error creating discussion:', error)
        }
    }

    // Handle discussion deletion
    const handleDeletePost = async discussionId => {
        try {
            await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then(async result => {
                if (result.isConfirmed) {
                    await deleteDiscussion(discussionId)
                    await fetchDiscussions()
                    Swal.fire(
                        'Deleted!',
                        'Discussion has been deleted.',
                        'success'
                    )
                }
            })
        } catch (error) {
            Swal.fire('Error', 'Failed to delete discussion', 'error')
            console.error('Error deleting discussion:', error)
        }
    }

    // Handle comment creation
    const handleAddComment = async discussionId => {
        try {
            if (newComment.trim() === '') return

            // Call the API to create comment
            const response = await createComment(discussionId, newComment)

            // Update the local state directly
            const newCommentData = response.data // Assuming the API returns the created comment

            setDiscussionComments(prevComments => ({
                ...prevComments,
                [discussionId]: [
                    ...(prevComments[discussionId] || []),
                    newCommentData,
                ],
            }))

            // Update the comment count in discussions
            setDiscussions(prevDiscussions =>
                prevDiscussions.map(discussion =>
                    discussion.id === discussionId
                        ? {
                              ...discussion,
                              comments_count: discussion.comments_count + 1,
                          }
                        : discussion
                )
            )

            // Clear the input
            setNewComment('')
        } catch (error) {
            Swal.fire('Error', 'Failed to add comment', 'error')
            console.error('Error adding comment:', error)
        }
    }

    // Handle comment deletion
    const handleDeleteComment = async (commentId, discussionId) => {
        try {
            const result = await Swal.fire({
                title: 'Delete comment?',
                text: 'This action cannot be undone',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            })

            if (result.isConfirmed) {
                await deleteComment(commentId)

                // Update local state to remove the comment
                setDiscussionComments(prevComments => ({
                    ...prevComments,
                    [discussionId]: prevComments[discussionId].filter(
                        comment => comment.id !== commentId
                    ),
                }))

                // Update the comment count in discussions
                setDiscussions(prevDiscussions =>
                    prevDiscussions.map(discussion =>
                        discussion.id === discussionId
                            ? {
                                  ...discussion,
                                  comments_count: discussion.comments_count - 1,
                              }
                            : discussion
                    )
                )

                Swal.fire('Deleted!', 'Comment has been deleted.', 'success')
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to delete comment', 'error')
            console.error('Error deleting comment:', error)
        }
    }

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader size={50} color="#4fa94d" loading={loading} />
            </div>
        )

    if (error)
        return <div className="text-center text-red-500 p-4">{error}</div>

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="antialiased bg-white">
                <section className="max-w-[1200px] flex flex-col mx-auto p-4 py-6 lg:py-10 gap-6">
                    {/* Post Input */}
                    {user && (
                        <div className="w-full flex flex-row border shadow rounded-lg p-4 gap-4 items-center">
                            <img
                                className="h-14 w-14 object-cover border rounded-full"
                                src={
                                    user.avatar ||
                                    'https://via.placeholder.com/150'
                                }
                                alt={`${user.name}'s avatar`}
                                loading="lazy"
                            />
                            <div
                                className="w-full border hover:border-blue-500 content-center cursor-pointer rounded-3xl text-gray-600 px-5 py-1 transition ease-in-out duration-300"
                                onClick={() => setShowPostOverlay(true)}>
                                What do you want to post?
                            </div>
                            <div
                                className="flex items-center ml-5 gap-2 text-gray-600 hover:text-blue-500 cursor-pointer transition ease-in-out duration-300"
                                onClick={() => setShowPostOverlay(true)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1-2-2h5.34"></path>
                                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                                </svg>
                                Post
                            </div>
                        </div>
                    )}

                    {/* Post Display */}
                    {currentDiscussions.map(discussion => (
                        <div
                            key={discussion.id}
                            className="w-full flex flex-col border shadow rounded-lg p-4 gap-4 relative">
                            <div className="flex flex-row gap-3 items-center">
                                <img
                                    className="h-14 w-14 object-cover border rounded-full"
                                    src={
                                        discussion.user.avatar ||
                                        'https://via.placeholder.com/150'
                                    }
                                    alt={`${discussion.user.name}'s avatar`}
                                    loading="lazy"
                                />
                                <div className="flex flex-col">
                                    <h1 className="text-slate-900 text-base font-medium">
                                        {discussion.user.name}
                                    </h1>
                                    <span className="text-gray-500 text-xs font-light">
                                        {new Date(
                                            discussion.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                {discussion.can_delete && (
                                    <button
                                        className="text-red-500 text-sm border-none focus:outline-none rounded-lg hover:bg-gray-100 py-1 px-2 cursor-pointer ml-auto mr-4 transition duration-300"
                                        onClick={() =>
                                            handleDeletePost(discussion.id)
                                        }>
                                        Delete Post
                                    </button>
                                )}
                            </div>

                            <div
                                className={`flex flex-col px-4 gap-5 overflow-hidden transition-all duration-300 relative ${
                                    showFullPost
                                        ? 'max-h-screen'
                                        : 'max-h-[170px]'
                                }`}>
                                <span className="text-gray-900 text-justify">
                                    {discussion.content}
                                </span>

                                {/* Clickable Images */}
                                <div className="flex flex-wrap gap-5">
                                    {discussion.image_url && (
                                        <img
                                            className="rounded-lg"
                                            src={
                                                `http://127.0.0.1:8000/storage/` +
                                                discussion.image_url.replace(
                                                    '/storage/',
                                                    ''
                                                )
                                            }
                                            alt="Post Content"
                                            width="200"
                                            height="200"
                                            onClick={() =>
                                                openPreviewImage(
                                                    `http://127.0.0.1:8000/storage/` +
                                                        discussion.image_url.replace(
                                                            '/storage/',
                                                            ''
                                                        )
                                                )
                                            }
                                        />
                                    )}
                                </div>

                                {/* Gradient Shadow */}
                                {!showFullPost && (
                                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                                )}
                            </div>

                            {/* Show More / Show Less Button */}
                            <div className="w-full flex flex-row items-center mt-3  px-5">
                                <span
                                    className="flex flex-row text-sm text-gray-700 hover:text-blue-600 gap-2 cursor-pointer items-center relative transition ease-in-out duration-300"
                                    onClick={() =>
                                        toggleCommentSection(discussion.id)
                                    }>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    Comment ({discussion.comments_count})
                                </span>

                                <button
                                    className="text-blue-500 text-sm font-medium hover:underline border-none focus:outline-none self-end ml-auto mr-0"
                                    onClick={() =>
                                        setShowFullPost(!showFullPost)
                                    }>
                                    {showFullPost ? 'Show Less' : 'Show More'}
                                </button>
                            </div>

                            {/* Add Comment Section */}
                            {activeDiscussionId === discussion.id && (
                                <>
                                    <div className="w-full flex flex-row bg-slate-100 rounded-lg p-4 gap-4 items-center">
                                        <img
                                            className="h-14 w-14 object-cover border rounded-full"
                                            src={
                                                discussion.user.avatar ||
                                                'https://via.placeholder.com/150'
                                            }
                                            alt="User Profile"
                                        />

                                        <input
                                            type="text"
                                            value={newComment}
                                            onChange={e =>
                                                setNewComment(e.target.value)
                                            }
                                            className="flex-grow bg-white border hover:border-blue-500 content-center focus:outline-none rounded-3xl text-gray-600 px-5 py-2 transition ease-in-out duration-300"
                                            placeholder="What do you want to ask?"
                                        />

                                        <button
                                            onClick={() =>
                                                handleAddComment(discussion.id)
                                            }
                                            className="flex-shrink-0 px-3 py-2 text-sm justify-center items-center bg-blue-600 hover:bg-blue-700 text-white focus:outline-none cursor-pointer transition ease-in-out duration-300 border rounded-lg">
                                            Add Comment
                                        </button>
                                    </div>

                                    {/* Display Comments */}
                                    {activeDiscussionId === discussion.id &&
                                        discussionComments[discussion.id]?.map(
                                            comment => (
                                                <div
                                                    key={comment.id}
                                                    className="w-full flex flex-col p-4 gap-4 border rounded-lg">
                                                    <div className="flex flex-row gap-3 items-center">
                                                        <img
                                                            className="h-14 w-14 object-cover border rounded-full"
                                                            src={
                                                                comment.user
                                                                    .avatar ||
                                                                Profile
                                                            }
                                                            alt="Commenter Profile"
                                                        />
                                                        <div className="flex flex-col">
                                                            <h1 className="text-slate-900 text-base font-medium">
                                                                {
                                                                    comment.user
                                                                        .name
                                                                }
                                                            </h1>
                                                            <span className="text-gray-500 text-xs font-light">
                                                                {new Date(
                                                                    comment.created_at
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        {comment.can_delete && (
                                                            <button
                                                                className="text-red-500 text-sm rounded-lg border-none focus:outline-none hover:bg-gray-100 py-1 px-2 cursor-pointer ml-auto mr-4 transition duration-300"
                                                                onClick={() =>
                                                                    handleDeleteComment(
                                                                        comment.id,
                                                                        discussion.id
                                                                    )
                                                                }>
                                                                Delete Comment
                                                            </button>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-900 text-justify px-4">
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                </>
                            )}
                        </div>
                    ))}
                    <Pagination />
                </section>
            </div>

            {/* Overlay for Creating Post */}
            {showPostOverlay && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-1/2">
                        <h2 className="text-xl text-slate-800 font-semibold mb-4">
                            Create Post
                        </h2>
                        <textarea
                            value={newPost}
                            onChange={e => setNewPost(e.target.value)}
                            className="w-full text-gray-800 p-4 border bg-white focus:outline-none rounded-lg resize-none h-32"
                            placeholder="Type something..."
                        />
                        <div className="mt-4">
                            <input
                                type="file"
                                onChange={e =>
                                    setNewPostImage(e.target.files[0])
                                }
                                accept="image/*"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        <div className="flex flex-row items-center mt-4">
                            <label
                                htmlFor="file-input"
                                className="cursor-pointer text-gray-500 hover:text-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="2"
                                    />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M20.4 14.5L16 10 4 20" />
                                </svg>
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                onChange={e =>
                                    e.target.files[0] &&
                                    setNewPostImage(
                                        URL.createObjectURL(e.target.files[0])
                                    )
                                }
                                className="hidden"
                            />

                            <div className="flex flex-row gap-2 ml-auto mr-0">
                                <button
                                    onClick={handleSubmitPost}
                                    className="bg-blue-600 hover:bg-blue-700 border-none text-sm focus:outline-none text-white px-4 py-2 rounded-lg transition ease-in-out duration-300">
                                    Post
                                </button>
                                <button
                                    onClick={() => setShowPostOverlay(false)}
                                    className="bg-red-500 hover:bg-red-600 border-none text-sm focus:outline-none text-white px-4 py-2 rounded-lg transition ease-in-out duration-300">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Preview Modal */}
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
                    onClick={() => setPreviewImage(null)}>
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="max-w-[90%] max-h-[90vh] rounded-lg"
                    />
                </div>
            )}

            <Footer />
        </div>
    )
}

export default DiscussionForum
