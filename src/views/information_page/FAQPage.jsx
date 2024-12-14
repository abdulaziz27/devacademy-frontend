import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FAQs from '../../assets/images/FAQs.png'
import AOS from 'aos'
import 'aos/dist/aos.css'

const FAQPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        })
        window.scrollTo(0, 0)
    }, [])

    const [openedFAQsId, setOpenedFAQsId] = useState(null)

    const faqs = [
        {
            id: 1,
            title: 'What is DevAcademy?',
            description:
                "DevAcademy is a comprehensive learning platform that offers programming courses designed to help individuals at all skill levels master coding. Whether you're a beginner or looking to improve your skills, we provide hands-on learning and expert guidance to help you succeed in the ever-changing tech industry.",
        },
        {
            id: 2,
            title: 'What courses do you offer at DevAcademy?',
            description:
                'At DevAcademy, we offer a variety of programming courses covering multiple programming languages, frameworks, and tools. Our courses are designed to provide practical, real-world knowledge that will help you excel in your career.',
        },
        {
            id: 3,
            title: 'Will I get a certificate after completing a course?',
            description:
                'Yes, after completing a course at DevAcademy, you will receive a certificate of completion. This certificate serves as recognition of your achievements and can be added to your portfolio or resume to demonstrate your skills.',
        },
        {
            id: 4,
            title: 'Are there video tutorials for the courses?',
            description:
                'Yes, we provide comprehensive video tutorials for each course. These tutorials are taught by experienced instructors, ensuring that you gain a deep understanding of the concepts and skills required for each topic.',
        },
        {
            id: 5,
            title: 'Do I have to build projects as part of the course?',
            description:
                'Absolutely! One of the key features of DevAcademy is that we encourage learners to apply their knowledge by building their own projects. This hands-on experience is essential for reinforcing what you learn and developing the skills necessary to work on real-world applications.',
        },
        {
            id: 6,
            title: 'How can I join the DevAcademy team?',
            description:
                'We are always looking for passionate and talented individuals to join our team. If you are driven to help shape the future of education and have a passion for creating impactful learning experiences, we would love to hear from you! Check out our "Join Us" page for more information on open positions.',
        },
        {
            id: 7,
            title: 'What makes DevAcademy different from other coding platforms?',
            description:
                'DevAcademy stands out because we focus on a hands-on, project-based learning experience. In addition to offering detailed tutorials, we emphasize the importance of practical experience through projects. Our mission is to ensure that students not only gain theoretical knowledge but also develop the real-world skills needed to succeed in the tech industry.',
        },
        {
            id: 8,
            title: 'Can I learn at my own pace?',
            description:
                'Yes! At DevAcademy, you have the flexibility to learn at your own pace. Our courses are designed to fit into your schedule, allowing you to progress through the content as you feel comfortable.',
        },
        {
            id: 9,
            title: 'What kind of support will I receive during the course?',
            description:
                'We provide robust support throughout your learning journey. If you encounter challenges or have questions, our instructors and community are here to help. We also offer resources such as forums and group discussions to foster collaborative learning.',
        },
    ]

    const toggleFAQs = id => {
        setOpenedFAQsId(openedFAQsId === id ? null : id)
    }

    return (
        <div className="antialiased min-h-screen bg-white">
            <Navbar />
            <section className="max-w-[1200px] flex items-center gap-10 mx-auto mt-16 p-4 lg:py-10">
                <div
                    className="flex flex-col"
                    data-aos="fade-right"
                    data-aos-delay="200">
                    <h1 className="text-5xl font-extrabold text-slate-800 mb-10 mt-4">
                        Frequently Asked Question
                    </h1>
                    <p className="text-justify w-[750px] text-lg text-gray-700">
                        Have questions about DevAcademy or our courses? Below
                        are some frequently asked questions that will help you
                        better understand how we can support your learning
                        journey. If you need more information, feel free to
                        reach out to us!
                    </p>
                </div>
                <div
                    className="w-full"
                    data-aos="fade-left"
                    data-aos-delay="200">
                    <img height="400" width="400" src={FAQs}></img>
                </div>
            </section>

            <section className="flex flex-col lg:flex-row gap-12 max-w-[1200px] mx-auto p-4  mb-24">
                <div
                    className="w-full flex flex-col justify-center lg:p-0"
                    data-aos="fade-right"
                    data-aos-delay="200">
                    <div className="space-y-4">
                        {faqs.map(faq => (
                            <div
                                key={faq.id}
                                className="bg-white text-black rounded-lg border overflow-hidden hover:shadow-lg focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-2">
                                <button
                                    className="focus:outline-none border-none w-full p-6 text-left"
                                    onClick={() => toggleFAQs(faq.id)}>
                                    <h3 className="text-lg font-semibold flex items-center justify-between">
                                        <span>{faq.title}</span>
                                        <svg
                                            className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${
                                                openedFAQsId === faq.id
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
                                    id={`content-${faq.id}`}
                                    style={{
                                        maxHeight:
                                            openedFAQsId === faq.id
                                                ? `${
                                                      document.getElementById(
                                                          `content-${faq.id}`
                                                      ).scrollHeight
                                                  }px`
                                                : '0px',
                                    }}
                                    className="overflow-hidden transition-all duration-300 ease-in-out">
                                    <div className="px-6 pb-6 w-4/5 text-justify text-gray-700">
                                        {faq.description}
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

export default FAQPage
