import React, { useState } from 'react'

const CourseSideBar = () => {
    const [openSections, setOpenSections] = useState({})
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
    const [activeLessonId, setActiveLessonId] = useState(null) // State to track active lesson

    const toggleSection = sectionIndex => {
        setOpenSections(prevState => ({
            ...prevState,
            [sectionIndex]: !prevState[sectionIndex],
        }))
    }

    const handleLessonClick = lessonId => {
        setActiveLessonId(lessonId)
    }

    const courseData = [
        {
            sectionTitle: 'Course Introduction',
            lessons: [
                { id: 1, title: 'Getting your Python On' },
                { id: 2, title: 'Understanding Variables' },
            ],
        },
        {
            sectionTitle: 'Basic Python Concepts',
            lessons: [
                { id: 3, title: 'Loops and Iterations' },
                { id: 4, title: 'Functions and Methods' },
            ],
        },
        {
            sectionTitle: 'Advanced Topics',
            lessons: [
                { id: 5, title: 'Object-Oriented Programming' },
                { id: 6, title: 'Error Handling' },
            ],
        },
    ]

    return (
        <div className="select-none bg-white min:w-auto max:w-64 ml-4 p-4 lg:block rounded-lg shadow flex-shrink-0">
            {/* Button to toggle sidebar content */}
            <button
                className="w-full flex flex-row gap-3 items-center text-sm text-blue-600 border-none focus:outline-none hover:text-blue-800 transition ease-in-out duration-300"
                onClick={() => setIsMenuCollapsed(prev => !prev)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-300 ${
                        isMenuCollapsed ? '' : ''
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                {isMenuCollapsed ? '' : 'Hide Menu'}
            </button>

            {/* Sidebar Content */}
            {!isMenuCollapsed && (
                <div>
                    {courseData.map((section, index) => (
                        <div
                            key={section.sectionTitle}
                            className="w-full mt-2 flex flex-col">
                            {/* Section Button */}
                            <button
                                className="w-full text-justify text-base p-2 text-black border-none hover:bg-gray-100 focus:outline-none transition ease-in-out duration-300"
                                onClick={() => toggleSection(index)}>
                                {section.sectionTitle}
                            </button>

                            {/* Lessons List */}
                            {openSections[index] && (
                                <div className="flex flex-col gap-2 pl-1">
                                    {section.lessons.map(lesson => (
                                        <button
                                            key={lesson.id}
                                            className={`w-full flex items-center text-justify text-sm px-1 py-2 border-none focus:outline-none transition ease-in-out duration-300 ${
                                                activeLessonId === lesson.id
                                                    ? 'bg-gray-200 text-black'
                                                    : 'text-slate-800 hover:bg-gray-100'
                                            }`}
                                            onClick={() =>
                                                handleLessonClick(lesson.id)
                                            }>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 p-0.5 mr-2 bg-gray-300 rounded-full"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            {lesson.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CourseSideBar
