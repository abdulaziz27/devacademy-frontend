import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Profile from '../../assets/images/keunggulan.png'

const DiscussionForum = () => {
    const [previewImage, setPreviewImage] = useState(null) // Track the image to preview
    const [showFullPost, setShowFullPost] = useState(false) // Track whether the full post is visible
    const [showCommentSection, setShowCommentSection] = useState(false) // Track whether the comment section is visible
    const [comments, setComments] = useState([]) // Track the list of comments
    const [newComment, setNewComment] = useState('') // Track new comment input
    const [posts, setPosts] = useState([]) // Manage posts
    const [newPost, setNewPost] = useState('') // Track new post input
    const [newPostImage, setNewPostImage] = useState(null) // Track image for the post
    const [showPostOverlay, setShowPostOverlay] = useState(false) // Track overlay visibility

    const openPreviewImage = image => {
        setPreviewImage(image)
    }

    const closePreviewImage = () => {
        setPreviewImage(null)
    }

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, { text: newComment, id: Date.now() }])
            setNewComment('') // Clear the input after adding
        }
    }

    const handleDeleteComment = commentId => {
        setComments(comments.filter(comment => comment.id !== commentId))
    }

    const handleSubmitPost = () => {
        if (newPost.trim() !== '' || newPostImage) {
            const newPostData = {
                id: Date.now(),
                text: newPost,
                image: newPostImage,
                date: new Date().toLocaleDateString(),
                author: 'John Lenon',
            }

            setPosts([newPostData, ...posts]) // Add the new post to the list
            setNewPost('') // Clear the text input
            setNewPostImage(null) // Clear the image
            setShowPostOverlay(false) // Close the overlay
        }
    }

    const handleDeletePost = postId => {
        setPosts(posts.filter(post => post.id !== postId)) // Remove the selected post
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="antialiased bg-white">
                <section className="max-w-[1200px] flex flex-col mx-auto p-4 py-6 lg:py-10 gap-6">
                    {/* Post Input */}
                    <div className="w-full flex flex-row border shadow rounded-lg p-4 gap-4 items-center">
                        <img
                            className="h-14 w-14 object-cover border rounded-full"
                            src={Profile}
                            alt="User Profile"
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

                    {/* Post Display */}
                    {posts.map(post => (
                        <div
                            key={post.id}
                            className="w-full flex flex-col border shadow rounded-lg p-4 gap-4 relative">
                            <div className="flex flex-row gap-3 items-center">
                                <img
                                    className="h-14 w-14 object-cover border rounded-full"
                                    src={Profile}
                                    alt="User Profile"
                                />
                                <div className="flex flex-col">
                                    <h1 className="text-slate-900 text-base font-medium">
                                        {post.author}
                                    </h1>
                                    <span className="text-gray-500 text-xs font-light">
                                        {post.date}
                                    </span>
                                </div>
                                <button
                                    className="text-red-500 text-sm border-none focus:outline-none rounded-lg hover:bg-gray-100 py-1 px-2 cursor-pointer ml-auto mr-4 transition duration-300"
                                    onClick={() => handleDeletePost(post.id)}>
                                    Delete Post
                                </button>
                            </div>

                            <div
                                className={`flex flex-col px-4 gap-5 overflow-hidden transition-all duration-300 relative ${
                                    showFullPost
                                        ? 'max-h-screen'
                                        : 'max-h-[170px]'
                                }`}>
                                <span className="text-gray-900 text-justify">
                                    {post.text}
                                </span>

                                {/* Clickable Images */}
                                <div className="flex flex-wrap gap-5">
                                    {post.image && (
                                        <img
                                            className="rounded-lg"
                                            src={post.image}
                                            alt="Post Content"
                                            width="200"
                                            height="200"
                                            onClick={() =>
                                                openPreviewImage(post.image)
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
                                        setShowCommentSection(
                                            !showCommentSection
                                        )
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
                                    Comment ({comments.length})
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
                            {showCommentSection && (
                                <>
                                    <div className="w-full flex flex-row bg-slate-100 rounded-lg p-4 gap-4 items-center">
                                        <img
                                            className="h-14 w-14 object-cover border rounded-full"
                                            src={Profile}
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
                                            onClick={handleAddComment}
                                            className="flex-shrink-0 px-3 py-2 text-sm justify-center items-center bg-blue-600 hover:bg-blue-700 text-white focus:outline-none cursor-pointer transition ease-in-out duration-300 border rounded-lg">
                                            Add Comment
                                        </button>
                                    </div>

                                    {/* Display Comments */}
                                    {comments.map(comment => (
                                        <div
                                            key={comment.id}
                                            className="w-full flex flex-col p-4 gap-4 border rounded-lg">
                                            <div className="flex flex-row gap-3 items-center">
                                                <img
                                                    className="h-14 w-14 object-cover border rounded-full"
                                                    src={Profile}
                                                    alt="User Profile"
                                                />
                                                <div className="flex flex-col">
                                                    <h1 className="text-slate-900 text-base font-medium">
                                                        John Lenon
                                                    </h1>
                                                    <span className="text-gray-500 text-xs font-light">
                                                        19 September
                                                    </span>
                                                </div>
                                                <button
                                                    className="text-red-500 text-sm rounded-lg border-none focus:outline-none hover:bg-gray-100 py-1 px-2 cursor-pointer ml-auto mr-4 transition duration-300"
                                                    onClick={() =>
                                                        handleDeleteComment(
                                                            comment.id
                                                        )
                                                    }>
                                                    Delete Comment
                                                </button>
                                            </div>
                                            <p className="text-gray-900 text-justify px-4">
                                                {comment.text}
                                            </p>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    ))}
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload an image (optional)
                            </label>
                            {newPostImage && (
                                <img
                                    src={newPostImage}
                                    alt="Post Preview"
                                    className="mt-4 max-h-40 rounded-lg"
                                />
                            )}
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
                    onClick={closePreviewImage}>
                    <div className="relative">
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="max-w-screen-md max-h-screen-md rounded-lg"
                        />
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default DiscussionForum
