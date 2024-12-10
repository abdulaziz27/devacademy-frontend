import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import thumbnail from '../assets/images/thumbnail.jpg';
import advantage from '../assets/images/keunggulan.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../app.css';

function HomePage() {
        const categories = [
        { id: 1, name: 'Programming' },
        { id: 2, name: 'Design' },
        { id: 3, name: 'Business' },
        { id: 4, name: 'Personal Development' },
    ];

    const coursesByCategory = {
        1: [
            { id: 1, name: 'JavaScript Basics', about: 'Learn JavaScript.', teacher: { user: { name: 'John' } }, students: [{}, {}], thumbnail: null },
            { id: 2, name: 'Advanced Python', about: 'Master Python.', teacher: { user: { name: 'Alice' } }, students: [{}, {}, {}], thumbnail: null },
        ],
        2: [
            { id: 3, name: 'UI/UX Design Principles', about: 'Create great designs.', teacher: { user: { name: 'Jane' } }, students: [{}, {}], thumbnail: null },
            { id: 4, name: 'Graphic Design Essentials', about: 'Design foundations.', teacher: { user: { name: 'Mike' } }, students: [{}], thumbnail: null },
        ],
        3: [
            { id: 5, name: 'Marketing 101', about: 'Intro to marketing.', teacher: { user: { name: 'Sarah' } }, students: [{}, {}], thumbnail: null },
            { id: 6, name: 'Startup Growth Hacks', about: 'Startup tips.', teacher: { user: { name: 'David' } }, students: [{}, {}, {}], thumbnail: null },
        ],
        4: [
            { id: 7, name: 'Time Management', about: 'Boost productivity.', teacher: { user: { name: 'Laura' } }, students: [{}], thumbnail: null },
            { id: 8, name: 'Public Speaking', about: 'Speak confidently.', teacher: { user: { name: 'Robert' } }, students: [{}, {}], thumbnail: null },
        ],
    };

    const [openedAdvantageId, setOpenedAdvantageId] = useState(null);

    const advantages = [
        {
            id: 1,
            title: 'Personalized Learning Path',
            description: 'Our platform creates a tailored learning path to help you reach your career goals, ensuring the courses you take align with your professional aspirations.',
        },
        {
            id: 2,
            title: 'Career Directed Training',
            description: 'Tailored learning paths based on your career goals and current job market trends.',
        },
        {
            id: 3,
            title: 'Flexible Learning',
            description: 'Learn at your own pace with our on-demand courses and adaptive learning platform.',
        },
        {
            id: 4,
            title: 'Direct Support',
            description: 'Get personalized guidance from experienced teachers, ensuring you stay on track with your learning goals.',
        },
    ];

    const toggleAdvantage = (id) => {
        setOpenedAdvantageId(prevId => (prevId === id ? null : id));
    };

    const [isVisible, setIsVisible] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 300) {
          setIsVisible(true); // Show button if scrolled more than 300px
        } else {
          setIsVisible(false); // Hide button if at the top of the page
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
        
        const link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        window.addEventListener('scroll', handleScroll);
    
        return () => {
            document.head.removeChild(link);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="antialiased bg-white select-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Navbar />
            {/* Hero Section */}
            <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-10">
                <div
                    className="relative rounded-lg h-[400px] overflow-hidden shadow-lg"
                    data-aos="fade-right"
                    data-aos-delay="200"
                >
                    {/* Background Image */}
                    <img
                    src={thumbnail}
                    alt="image by wallhaven"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                    />

                    {/* Blur Overlay */}
                    <div className="absolute inset-0 w-3/4 bg-gradient-to-r from-blue-500 to-transparent"></div>

                    {/* Content */}
                    <div className="relative flex items-center h-full">
                    <div className="p-12">
                        <h1 className="text-4xl font-semibold mb-4 text-white">Course Program</h1>
                        <p className="text-white w-3/6">Unlock your potential and build a successful career in software development through our expertly designed course.</p>
                    </div>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="max-w-[1200px] mx-auto mb-24 mt-10 p-4 py-6 lg:py-8">
                <div className="flex justify-between mb-8">
                    <div data-aos="fade-right">
                        <h1 className="text-3xl text-black font-semibold">Featured Courses</h1>
                        <p className="text-sm text-gray-600">Find the right course for you</p>
                    </div>
                    <Link to="/courses" className="flex items-center w-max group" data-aos="fade-left">
                        <span className="text-xl text-blue-500">More</span>
                        <svg
                            className="w-6 transform transition-transform duration-300 group-hover:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 6L15 12L9 18"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-aos="fade-up">
                    {categories.map((category) =>
                        coursesByCategory[category.id]?.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white border rounded-lg p-3 hover:shadow-lg hover:-translate-y-2 transition duration-300 ease-in-out transform flex flex-col justify-between"
                            >
                                <img
                                    src={course.thumbnail || thumbnail}
                                    alt={course.name}
                                    className="w-full h-48 shadow-md object-cover rounded-lg mb-4"
                                    loading="lazy"
                                />
                                <div className="flex flex-col flex-grow">
                                    <h1 className="text-black font-semibold text-xl mb-2">{course.name}</h1>
                                    <p className="text-md text-gray-600 min-h-16">{course.about}</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className='flex-row items-center'>
                                            <p className="ml-1 text-sm text-gray-600 mb-2">
                                                By {course.teacher.user.name}
                                            </p>
                                            <div className="flex items-center">
                                                <svg
                                                    className="h-4 w-4 mr-2 text-gray-800"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                <span className="text-xs text-gray-800">
                                                    {course.students.length} Students
                                                </span>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/details/${course.id}`}
                                            className="text-center font-semibold bg-blue-500 text-sm hover:bg-blue-600 text-white hover:text-white px-4 py-2 rounded transition duration-300 ease-in-out w-1/2"
                                        >
                                            Learn Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Advantages section */}
            <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8 my-12 lg:mb-24">
                <h1 className="text-4xl text-black font-bold text-center mb-6" data-aos="fade-up">
                    The Advantages of Our Course Learning Program
                </h1>
                <div className="flex justify-center" data-aos="fade-up">
                    <p className="text-center text-gray-500 mb-4 w-3/4 lg:w-2/4">
                        Explore personalized learning paths and dynamic content designed to build expertise in your chosen field and achieve your career aspirations.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="w-full lg:w-5/12 flex flex-col justify-center p-12 lg:p-0" data-aos="fade-right">
                        <div className="space-y-2 lg:mt-12">
                            {advantages.map((advantage) => (
                                <div
                                    key={advantage.id}
                                    className="bg-white text-black rounded-lg border overflow-hidden hover:shadow-lg focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-2"
                                >
                                    <button
                                        className="focus:outline-none overflow-hidden border-transparent focus:border-transparent hover:border-transparent focus:ring-0 w-full p-6 text-left"
                                        onClick={() => toggleAdvantage(advantage.id)}
                                    >
                                        <h3 className="text-lg font-semibold flex items-center justify-between">
                                            <span>{advantage.title}</span>
                                            <svg
                                                className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${openedAdvantageId === advantage.id ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </h3>
                                    </button>
                                    <div
                                        id={`content-${advantage.id}`}
                                        style={{ maxHeight: openedAdvantageId === advantage.id ? `${document.getElementById(`content-${advantage.id}`).scrollHeight}px` : '0px' }}
                                        className="overflow-hidden transition-all duration-300 ease-in-out"
                                    >
                                        <div className="px-6 pb-6">{advantage.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden lg:block w-full lg:w-7/12 relative">
                        <div className="relative" data-aos="fade-left">
                            {/* Background gradient */}
                            <div className="absolute bottom-0 left-12 right-12 h-3/4 bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-100 rounded-3xl"></div>

                            {/* Image container */}
                            <div className="relative z-10 overflow-hidden">
                                <img
                                    src={advantage}
                                    alt="Advantages"
                                    className="w-full h-auto"
                                    loading="lazy"
                                />

                                {/* Overlay to create crop effect */}
                                <div className="absolute bottom-0 left-12 right-12 h-1/4 bg-gradient-to-t from-blue-500 via-blue-400 to-transparent rounded-b-3xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Subscribe section */}
            <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8 mt-12 mb-12 lg:mb-17">
                <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="hidden lg:block w-full lg:w-6/12 relative">
                    <div className="relative" data-aos="fade-right">
                        {/* Background Gradient */}
                        <div className="absolute bottom-0 left-12 right-16 top-8 bg-gradient-to-tl from-cyan-500 via-cyan-400 to-blue-100 rounded-3xl"></div>

                        {/* Image Container */}
                        <div className="relative z-10 overflow-hidden">
                        <img
                            src={advantage}
                            alt="Course Subscription"
                            className="w-full h-auto"
                            loading="lazy"
                        />

                        {/* Overlay to Create Crop Effect */}
                        <div className="absolute bottom-0 left-12 right-16 h-1/4 bg-gradient-to-t from-cyan-500 via-cyan-400 to-transparent rounded-b-3xl"></div>
                        </div>
                    </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-6/12 flex flex-col justify-center p-12">
                    <div className="w-10/12" data-aos="fade-left">
                        <h1 className="text-4xl text-black font-bold mb-4">Unlock Courses & Boost Your Career</h1>
                        <p className="text-gray-500 mb-2">
                        Subscribe now to access a wide range of courses designed to enhance your skills and help you
                        achieve your career goals. Start learning and improving today!
                        </p>
                        <ul className="list-disc text-black ml-5 mb-[2.25rem]">
                        <li className="mb-2">Unlimited access to all courses on the platform</li>
                        <li className="mb-2">Get certified in various in-demand technologies</li>
                        <li>Gain valuable skills for a successful career</li>
                        </ul>
                        <Link
                        to="/pricing"
                        className="bg-blue-500 text-white w-max py-3 px-6 rounded font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
                        >
                        Subscribe Now
                        </Link>
                    </div>
                    </div>
                </div>
            </section>
            
            {/* Become Teacher */}
            <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8 mb-20">
                <div className="rounded-lg h-max md:h-[400px] overflow-hidden bg-gradient-to-br from-cyan-200 to-blue-400 shadow-lg" data-aos="fade-up">
                    <div className="flex flex-col md:flex-row items-center h-full w-full justify-between gap-8 p-12 lg:p-24">
                    <div className="w-full md:w-[500px] lg:w-[570px]">
                        <h1 className="text-center text-black md:text-left text-4xl lg:text-5xl font-bold mb-8">
                        Become a teacher, inspire future developers!
                        </h1>
                        <p className="text-center md:text-left text-gray-700">
                        Become a part of our expert teaching team and inspire the next generation of learners with your knowledge and passion.
                        </p>
                    </div>
                    <a
                        href="https://api.whatsapp.com/"
                        className="bg-blue-500 text-white hover:text-white px-6 py-3 rounded font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        Contact Us
                    </a>
                    </div>
                </div>
            </section>

            {/* Up Button */}
            <div
                id="scrollToTopBtn"
                onClick={scrollToTop}
                className={`fixed bottom-7 right-7 cursor-pointer transition-all duration-300 rounded-lg p-4 bg-blue-500 hover:bg-blue-700 text-white shadow-lg ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } transform hover:-translate-y-2`}
                >
                {/* SVG Icon for Up Arrow */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;