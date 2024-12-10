import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import thumbnail from '../../assets/images/thumbnail.jpg';

const CoursesPage = () => {
    // Dummy categories and courses data
    const categories = [
        { id: 1, name: 'Web Development' },
        { id: 2, name: 'Data Science' },
        { id: 3, name: 'Machine Learning' },
        { id: 4, name: 'Graphic Design' },
    ];

    const coursesByCategory = {
        1: [
            {
                id: 1,
                name: 'Frontend Web Development',
                about: 'Learn the fundamentals of frontend web development using HTML, CSS, and JavaScript.',
                thumbnail,
                teacher: { name: 'John Doe' },
                students_count: 120,
            },
            {
                id: 2,
                name: 'React for Beginners',
                about: 'Dive into React.js, one of the most popular JavaScript libraries for building user interfaces.',
                thumbnail,
                teacher: { name: 'Jane Smith' },
                students_count: 80,
            },
            {
                id: 3,
                name: 'React for Beginners',
                about: 'Dive into React.js, one of the most popular JavaScript libraries for building user interfaces.',
                thumbnail,
                teacher: { name: 'Jane Smith' },
                students_count: 80,
            },
            {
                id: 4,
                name: 'React for Beginners',
                about: 'Dive into React.js, one of the most popular JavaScript libraries for building user interfaces.',
                thumbnail,
                teacher: { name: 'Jane Smith' },
                students_count: 80,
            },
            {
                id: 5,
                name: 'React for Beginners',
                about: 'Dive into React.js, one of the most popular JavaScript libraries for building user interfaces.',
                thumbnail,
                teacher: { name: 'Jane Smith' },
                students_count: 80,
            },
            {
                id: 6,
                name: 'React for Beginners',
                about: 'Dive into React.js, one of the most popular JavaScript libraries for building user interfaces.',
                thumbnail,
                teacher: { name: 'Jane Smith' },
                students_count: 80,
            },
        ],
        2: [
            {
                id: 7,
                name: 'Data Analysis with Python',
                about: 'Master data analysis techniques using Python and popular libraries like Pandas and Matplotlib.',
                thumbnail,
                teacher: { name: 'Alice Johnson' },
                students_count: 150,
            },
        ],
        3: [
            {
                id: 8,
                name: 'Introduction to Machine Learning',
                about: 'Learn the basics of machine learning, including supervised and unsupervised learning algorithms.',
                thumbnail,
                teacher: { name: 'Mike Brown' },
                students_count: 200,
            },
        ],
        4: [
            {
                id: 9,
                name: 'Graphic Design Masterclass',
                about: 'Get hands-on experience with design tools like Photoshop and Illustrator in this graphic design course.',
                thumbnail,
                teacher: { name: 'Sara Lee' },
                students_count: 50,
            },
        ],
    };

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (categoryId) => {
        setActiveTab(categoryId);
    };

    return (
        <div className="bg-white select-none">
            <Navbar />

            {/* Hero Section */}
            <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8 mt-12 mb-20" data-aos="fade-up">
                <h1 className="text-6xl text-black text-center font-extrabold bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 my-12">
                    Courses
                </h1>
                <p className="w-full lg:w-2/4 text-gray-700 mx-auto text-center text-lg">
                    Build your career as a professional developer. Choose from a wide variety of professional development courses designed to enhance your skills and improve your career.
                </p>
            </section>

            {/* Course selection section */}
            <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8 mb-20" data-aos="fade-up" data-aos-delay="400">
                <div className="flex justify-center mb-8 space-x-10 ">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`py-2 text-lg font-medium focus:outline-none border-none text-gray-600 hover:text-blue-700 relative text-blue-500 before:absolute before:-bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full 
                                ${activeTab === category.id ? 'sm:text-blue-700 before:w-full' : ''}`}
                            onClick={() => handleTabClick(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Tab Contents */}
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`tab-content ${activeTab === category.id ? 'active' : 'hidden'}`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {coursesByCategory[category.id] && coursesByCategory[category.id].map(course => (
                                <div
                                    key={course.id}
                                    className="bg-white border rounded-lg p-3 hover:shadow-lg hover:-translate-y-2 transition duration-300 ease-in-out transform flex flex-col justify-between"
                                >
                                    <img
                                        src={course.thumbnail}
                                        alt={course.name}
                                        className="w-full h-48 shadow-md object-cover rounded-lg mb-4"
                                        loading="lazy"
                                    />

                                    <div className="flex flex-col flex-grow">
                                        <h1 className="font-semibold text-xl text-black mb-2">{course.name}</h1>

                                        <div className="flex flex-col justify-between h-full">
                                            <p className="text-md text-gray-600 min-h-16">{course.about}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className='flex-row mt-3'>
                                                <p className="text-sm text-gray-600 ml-1 mb-1">By {course.teacher.name}</p>
                                                <div className="flex items-center">
                                                    <svg className="h-4 w-4 mr-2 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span className="text-xs text-gray-800">{course.students_count} Students</span>
                                                </div>
                                            </div>

                                            <Link
                                                to={`/courses/${course.id}`}
                                                className="text-center font-semibold bg-blue-500 text-sm hover:bg-blue-600 text-white hover:text-white px-4 py-2 rounded transition duration-300 ease-in-out w-1/2"
                                            >
                                                Learn Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <Footer />
        </div>
    );
};

export default CoursesPage;
