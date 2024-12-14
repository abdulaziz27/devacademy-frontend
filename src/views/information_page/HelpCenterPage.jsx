import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HelpCenter from '../../assets/images/helpcenter.png'
import AOS from 'aos'
import 'aos/dist/aos.css'

const HelpCenterPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        })
        window.scrollTo(0, 0)
    }, [])

    const [openedSectionId, setOpenedSectionId] = useState(null)

    const toggleSection = id => {
        setOpenedSectionId(openedSectionId === id ? null : id)
    }

    const sections = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            description: (
                <div className="flex flex-col gap-2">
                    <p>
                        At DevAcademy, we make it easy to start learning. Here’s
                        a quick guide to help you get going:
                    </p>
                    <ol className="list-disc list-inside flex flex-col gap-2">
                        <li>
                            <b>Creating an Account:</b> To access our courses,
                            you need to create an account. Simply click on the
                            "Sign Up" button in the top right corner of the
                            website and follow the instructions.
                        </li>
                        <li>
                            <b>Choosing a Course:</b> Browse our wide selection
                            of programming courses. You can filter courses by
                            category, difficulty level, or instructor.
                        </li>
                        <li>
                            <b>Enrolling in a Course:</b> Once you've found the
                            course you'd like to take, click on it, and hit the
                            "Enroll Now" button to get started.
                        </li>
                        <li>
                            <b>Accessing Course Materials:</b> After enrolling,
                            you'll have full access to the course content,
                            including video tutorials, quizzes, and project
                            assignments.
                        </li>
                    </ol>
                </div>
            ),
        },
        {
            id: 'account-management',
            title: 'Account and Profile Management',
            description: (
                <div className="flex flex-col gap-2">
                    <p>
                        To manage your account or update your personal details:
                    </p>
                    <ul className="list-disc list-inside flex flex-col gap-2">
                        <li>
                            <b>Updating Profile:</b> Click on your profile icon
                            in the top-right corner, and then select "My
                            Profile." Here, you can edit your personal
                            information and upload a profile picture.
                        </li>
                        <li>
                            <b>Changing Password:</b> If you forgot your
                            password or need to change it, go to "Account
                            Settings" and follow the password reset
                            instructions.
                        </li>
                        <li>
                            <b>Subscription and Billing:</b> For any questions
                            about your subscription, billing, or payments,
                            please refer to the "Subscription" section in your
                            account settings.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'course-access',
            title: 'Courses and Tutorials',
            description: (
                <div className="flex flex-col gap-2">
                    <p>
                        Need help with courses or tutorials? Here's what you can
                        do:
                    </p>
                    <ul className="list-disc list-inside flex flex-col gap-2">
                        <li>
                            <b>Course Progress:</b> Track your progress on any
                            course you're enrolled in. You can see the
                            percentage completed and resume from where you left
                            off.
                        </li>
                        <li>
                            <b> Accessing Videos:</b> All video tutorials are
                            accessible within the course dashboard. Ensure you
                            have a stable internet connection for seamless
                            viewing.
                        </li>
                        <li>
                            <b>Project Submissions:</b> Once you finish your
                            course project, submit it through the course
                            dashboard. You'll receive feedback and a certificate
                            if eligible.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'technical-support',
            title: 'Technical Support',
            description: (
                <div className="flex flex-col gap-2">
                    <p>
                        If you're encountering technical issues, try the
                        following steps:
                    </p>
                    <ul className="list-disc list-inside flex flex-col gap-2">
                        <li>
                            <b>Clear Browser Cache:</b> Sometimes, a browser's
                            cache can cause issues. Try clearing it and
                            reloading the page.
                        </li>
                        <li>
                            <b>Device Compatibility:</b> Ensure you're using an
                            up-to-date browser and device for the best
                            experience. We recommend using Chrome or Firefox.
                        </li>
                        <li>
                            <b>Video Playback Issues:</b> If you can’t play a
                            video, make sure you have the latest version of your
                            browser and that you're connected to the internet.
                        </li>
                        <li>
                            <b>Contacting Support:</b> If the issue persists,
                            reach out to our support team. Provide as much
                            detail as possible (error messages, steps leading to
                            the issue, etc.) so we can assist you faster.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'contact-us',
            title: 'Contact Us',
            description: (
                <div className="flex flex-col gap-2">
                    <p>
                        If you need further assistance, please don’t hesitate to
                        reach out to us. Our support team is here to help!
                    </p>
                    <ul className="list-disc list-inside flex flex-col gap-2">
                        <li>
                            <b>Email:</b> support@devacademy.com
                        </li>
                        <li>
                            <b>Phone:</b> +1 234-567-890
                        </li>
                    </ul>
                </div>
            ),
        },
    ]

    return (
        <div className="antialiased min-h-screen bg-white">
            <Navbar />
            <section className="max-w-[1200px] flex items-center gap-10 mx-auto mt-16 p-4 lg:py-10">
                <div
                    className="flex flex-col gap-6"
                    data-aos="fade-right"
                    data-aos-delay="200">
                    <h1 className="text-5xl font-extrabold text-slate-800 mt-4">
                        Help Center
                    </h1>
                    <p className="text-justify w-[750px] text-lg text-gray-700">
                        Welcome to the DevAcademy Help Center! We're here to
                        assist you in every step of your learning journey.
                        Whether you need help with navigating the website,
                        accessing course materials, or have any technical
                        issues, we're ready to support you.
                    </p>
                </div>

                <div
                    className="w-full"
                    data-aos="fade-left"
                    data-aos-delay="200">
                    <img
                        height="400"
                        width="400"
                        src={HelpCenter}
                        alt="Help Center"
                    />
                </div>
            </section>

            <section className="flex flex-col lg:flex-row gap-12 max-w-[1200px] mx-auto p-4 mb-24">
                <div
                    className="w-full flex flex-col justify-center lg:p-0"
                    data-aos="fade-up"
                    data-aos-delay="200">
                    <div className="space-y-4">
                        {sections.map(section => (
                            <div
                                key={section.id}
                                className="bg-white text-black rounded-lg border overflow-hidden hover:shadow-lg focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-2">
                                <button
                                    className="focus:outline-none border-none w-full p-6 text-left"
                                    onClick={() => toggleSection(section.id)}>
                                    <h3 className="text-lg font-semibold flex items-center justify-between">
                                        <span>{section.title}</span>
                                        <svg
                                            className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${
                                                openedSectionId === section.id
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </h3>
                                </button>
                                <div
                                    id={`content-${section.id}`}
                                    style={{
                                        maxHeight:
                                            openedSectionId === section.id
                                                ? `${
                                                      document.getElementById(
                                                          `content-${section.id}`
                                                      ).scrollHeight
                                                  }px`
                                                : '0px',
                                    }}
                                    className="overflow-hidden h-auto transition-all duration-300 ease-in-out">
                                    <div className="px-6 pb-6 pr-24 text-justify text-gray-700">
                                        {section.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default HelpCenterPage
