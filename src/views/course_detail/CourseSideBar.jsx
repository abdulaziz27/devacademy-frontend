import React, { useState, useEffect } from 'react'
import { FileText, Video } from 'lucide-react'
import { getLessons, getAssignments } from '../../api'

const CourseSideBar = ({ courseSlug, onItemSelect }) => {
    const [openSections, setOpenSections] = useState({})
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
    const [activeItemId, setActiveItemId] = useState(null)
    const [courseData, setCourseData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [initialLoadDone, setInitialLoadDone] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (!courseSlug || initialLoadDone) return

            setIsLoading(true)
            setError(null)

            try {
                const [lessonsResponse, assignmentsResponse] =
                    await Promise.all([
                        getLessons(courseSlug),
                        getAssignments(courseSlug),
                    ])

                const lessons = lessonsResponse.data || []
                const assignments = assignmentsResponse.data || []

                const newCourseData = [
                    {
                        title: 'Lessons',
                        type: 'lesson',
                        items: lessons.map(lesson => ({
                            ...lesson,
                            icon: lesson.video_url ? 'video' : 'text',
                        })),
                    },
                    {
                        title: 'Assignments',
                        type: 'assignment',
                        items: assignments,
                    },
                ]

                setCourseData(newCourseData)
                setOpenSections({ 0: true })

                if (lessons.length > 0 && !initialLoadDone) {
                    setActiveItemId(lessons[0].id)
                    onItemSelect(lessons[0].id, 'lesson')
                    setInitialLoadDone(true)
                }
            } catch (error) {
                setError(
                    'Failed to load course content. Please try again later.'
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [courseSlug, initialLoadDone]) // Removed onItemSelect from dependencies

    const toggleSection = sectionIndex => {
        setOpenSections(prevState => ({
            ...prevState,
            [sectionIndex]: !prevState[sectionIndex],
        }))
    }

    const handleItemClick = (itemId, type) => {
        setActiveItemId(itemId)
        onItemSelect(itemId, type)
    }

    const renderIcon = (item, sectionType) => {
        if (sectionType === 'lesson') {
            return item.icon === 'video' ? (
                <Video className="h-4 w-4 mr-2" />
            ) : (
                <FileText className="h-4 w-4 mr-2" />
            )
        }
        return <FileText className="h-4 w-4 mr-2" />
    }

    if (isLoading) {
        return (
            <div className="select-none bg-white min:w-auto max:w-64 ml-4 p-4 lg:block rounded-lg shadow flex-shrink-0">
                <div className="flex justify-center items-center h-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="select-none bg-white min:w-auto max:w-64 ml-4 p-4 lg:block rounded-lg shadow flex-shrink-0">
                <div className="text-red-500 text-center p-4">{error}</div>
            </div>
        )
    }

    return (
        <div className="select-none bg-white min:w-auto max:w-64 ml-4 p-4 lg:block rounded-lg shadow flex-shrink-0">
            <button
                className="w-full flex flex-row gap-3 items-center text-sm text-blue-600 border-none focus:outline-none hover:text-blue-800 transition ease-in-out duration-300"
                onClick={() => setIsMenuCollapsed(prev => !prev)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-300 ${
                        isMenuCollapsed ? 'transform rotate-180' : ''
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
                <span>{isMenuCollapsed ? 'Show Menu' : 'Hide Menu'}</span>
            </button>

            {!isMenuCollapsed && (
                <div className="mt-4">
                    {courseData.map(
                        (section, index) =>
                            section.items.length > 0 && (
                                <div
                                    key={section.title}
                                    className="w-full mt-2 flex flex-col">
                                    <button
                                        className="w-full text-justify text-base p-2 text-black border-none hover:bg-gray-100 focus:outline-none transition ease-in-out duration-300 flex items-center justify-between"
                                        onClick={() => toggleSection(index)}>
                                        <span>{section.title}</span>
                                        <svg
                                            className={`w-4 h-4 transform transition-transform duration-200 ${
                                                openSections[index]
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>

                                    {openSections[index] && (
                                        <div className="mt-2 space-y-2">
                                            {section.items.map(item => (
                                                <button
                                                    key={item.id}
                                                    className={`w-full flex items-center text-justify text-sm px-1 py-2 border-none focus:outline-none transition ease-in-out duration-300 ${
                                                        activeItemId === item.id
                                                            ? 'bg-gray-200 text-black'
                                                            : 'text-slate-800 hover:bg-gray-100'
                                                    }`}
                                                    onClick={() =>
                                                        handleItemClick(
                                                            item.id,
                                                            section.type
                                                        )
                                                    }>
                                                    {renderIcon(
                                                        item,
                                                        section.type
                                                    )}
                                                    <span className="truncate">
                                                        {item.title}
                                                    </span>
                                                    {/* {section.type ===
                                                        'lesson' &&
                                                        item.duration && (
                                                            <span className="ml-auto text-xs text-gray-500">{' '}
                                                                {item.duration}{' '}
                                                                min
                                                            </span>
                                                        )} */}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                    )}
                </div>
            )}
        </div>
    )
}

export default CourseSideBar
