import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import thumbnail from '../assets/images/thumbnail.jpg';
import '../app.css';

function HomePage() {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const features = [
        {
            link: '/course',
            imgSrc: 'assets/icons/web.png',
            title: 'Web Developer',
            delay: 0,
        },
        {
            link: '/course',
            imgSrc: 'assets/icons/android.png',
            title: 'Android Developer',
            delay: 200,
        },
        {
            link: '/course',
            imgSrc: 'assets/icons/ml.png',
            title: 'Machine Learning',
            delay: 400,
        },
        {
            link: '/course',
            imgSrc: 'assets/icons/chart.png',
            title: 'Data Scientist',
            delay: 600,
        },
        {
            link: '/resume',
            imgSrc: 'assets/icons/resume.png',
            title: 'CV Optimization',
            delay: 800,
        },
    ];

    return (
        <div className="antialiased bg-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Navbar />
            {/* Hero Section */}
            <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8">
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

            <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {features.map((feature, index) => (
                    <a
                        key={index}
                        href={feature.link}
                        className="text-center"
                        data-aos="fade-up"
                        data-aos-delay={feature.delay}
                    >
                        <div className="relative w-20 h-20 mx-auto mb-4 icon-container">
                        <img
                            src={feature.imgSrc}
                            className="transition-transform duration-200 ease-out -mt-2 icon"
                            alt={feature.title}
                        />
                        </div>
                        <h3 className="mb-2">{feature.title}</h3>
                    </a>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default HomePage;