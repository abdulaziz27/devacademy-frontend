import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Working from '../../assets/images/working.jpg'
import Thumbail from '../../assets/images/thumbnail.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'

const AboutUs = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        })
    }, [])

    const benefits = [
        {
            title: 'Certificate',
            description: 'Get your certificate after finishing the course.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256">
                    <path d="M128,140a12,12,0,0,1-12,12H72a12,12,0,0,1,0-24h44A12,12,0,0,1,128,140ZM116,88H72a12,12,0,0,0,0,24h44a12,12,0,0,0,0-24Zm120,79.14V228a12,12,0,0,1-17.95,10.42L196,225.82,174,238.42A12,12,0,0,1,156,228V204H40a20,20,0,0,1-20-20V56A20,20,0,0,1,40,36H216a20,20,0,0,1,20,20V88.86a55.87,55.87,0,0,1,0,78.28ZM196,160a32,32,0,1,0-32-32A32,32,0,0,0,196,160Zm-40,20V167.14a56,56,0,0,1,56-92.8V60H44V180Zm56,27.32V181.66a55.87,55.87,0,0,1-32,0v25.66l10.05-5.74a12,12,0,0,1,11.9,0Z"></path>
                </svg>
            ),
        },
        {
            title: 'Tutorial',
            description: 'Get video tutorial for this course from our teacher.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256">
                    <path d="M216,36H40A20,20,0,0,0,20,56V160a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A20,20,0,0,0,216,36Zm-4,120H44V60H212Zm24,52a12,12,0,0,1-12,12H32a12,12,0,0,1,0-24H224A12,12,0,0,1,236,208ZM104,128V88a12,12,0,0,1,18.36-10.18l32,20a12,12,0,0,1,0,20.36l-32,20A12,12,0,0,1,104,128Z"></path>
                </svg>
            ),
        },
        {
            title: 'Project',
            description: 'Build your own project from learning the course.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256">
                    <path d="M220,32H76A20,20,0,0,0,56,52V72H36A20,20,0,0,0,16,92V204a20,20,0,0,0,20,20H180a20,20,0,0,0,20-20V184h20a20,20,0,0,0,20-20V52A20,20,0,0,0,220,32ZM176,96v16H40V96Zm0,104H40V136H176Zm40-40H200V92a20,20,0,0,0-20-20H80V56H216Z"></path>
                </svg>
            ),
        },
    ]

    return (
        <div className="antialiased min-h-screen bg-white">
            <Navbar />
            <section className="max-w-[1200px] mx-auto mt-20 p-4 py-6 lg:py-10">
                <div
                    className="flex flex-col  items-center"
                    data-aos="fade-right"
                    data-aos-delay="200">
                    <span className="text-sky-700 text-lg font-bold">
                        Know Everything... About Us
                    </span>
                    <h1 className="text-6xl text-center font-extrabold text-slate-800 mb-10 mt-4">
                        DevAcademy
                    </h1>
                    <p className="text-center w-[750px] text-lg text-gray-700 mb-12">
                        Welcome to DevAcademy, your gateway to mastering
                        programming. Whether you're a beginner or looking to
                        level up your skills, our courses are designed to
                        provide hands-on learning and expert guidance. Start
                        your coding journey with us today and unlock the skills
                        to succeed in the ever-evolving world of technology!
                    </p>
                </div>

                <div
                    className="flex flex-wrap gap-5 w-[1000px] h-[400px] rounded-lg content-center overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay="200">
                    <img
                        className="object-contain"
                        src={Working}
                        alt="Post Content"
                    />
                </div>
            </section>

            <section className="flex max-w-[1200px] mx-auto p-4 py-6 lg:py-8">
                <div
                    className="flex flex-col flex-wrap gap-3"
                    data-aos="fade-right"
                    data-aos-delay="200">
                    <h1 className="text-3xl font-semibold text-black">
                        What We Care About The Most
                    </h1>
                    <p className="text-gray-800 text-lg">
                        At DevAcademy, we are dedicated to your success. We
                        focus on providing you with certificates to recognize
                        your achievements, tutorials to guide your learning, and
                        projects to help you build real-world skills. Our
                        commitment is to ensure you gain the knowledge and
                        hands-on experience necessary to thrive.
                    </p>
                </div>
                <div className="flex flex-col w-[1200px] ml-24 text-black gap-2">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="border rounded-lg h-max md:h-[120px] p-5 hover:shadow-lg hover:-translate-y-2 transition duration-300 ease-in-out"
                            data-aos="fade-left"
                            data-aos-delay={`${index * 200}`}
                            data-aos-duration={
                                index === 0
                                    ? '500'
                                    : index === 1
                                    ? '1000'
                                    : '1500'
                            } // Different durations for each benefit
                        >
                            <div className="flex flex-col lg:flex-row">
                                <div className="mr-3 mb-2 lg:mb-0">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <p className="font-semibold mb-1">
                                        {benefit.title}
                                    </p>
                                    <span className="text-gray-500">
                                        {benefit.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-[1200px] mx-auto p-4 py-6 lg:py-10">
                <div
                    className="relative rounded-lg h-[400px] overflow-hidden shadow-lg"
                    data-aos="fade-right"
                    data-aos-delay="200">
                    <img
                        src={Thumbail}
                        alt="Hero Thumbnail"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 w-full bg-gradient-to-r from-blue-500 to-transparent"></div>
                    <div className="relative flex items-center h-full">
                        <div className="p-12 w-2/3">
                            <h1 className="text-4xl font-semibold mb-4 text-white">
                                Join The DevAcademy Team
                            </h1>
                            <p className="text-white">
                                Help us shape the future of learning at
                                DevAcademy. We're looking for passionate
                                individuals to create impactful learning
                                experiences. If you're driven to make a
                                difference, join us and be part of something
                                special!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default AboutUs
