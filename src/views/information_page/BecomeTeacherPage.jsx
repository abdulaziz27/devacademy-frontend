import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Teaching from '../../assets/images/teaching.jpg'
import Education from '../../assets/images/education.png'
import Thumbail from '../../assets/images/thumbnail.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'

const BecomeTeacherPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        })
        window.scrollTo(0, 0)
    }, [])

    const joinus = [
        {
            title: 'Flexibility',
            description: 'Teach at your own pace and on your schedule.',
        },
        {
            title: 'Global Reach',
            description:
                'Share your expertise with learners from all over the world.',
        },
        {
            title: 'Impact',
            description:
                'Make a difference by helping aspiring developers achieve their goals.',
        },
        {
            title: 'Support',
            description:
                'Access our resources, tools, and a collaborative community to help you create high-quality courses.',
        },
        {
            title: 'Revenue Opportunities',
            description:
                'Earn rewards and income by sharing your knowledge and skills.',
        },
        {
            title: 'Recognition',
            description:
                'Build your personal brand as an expert and thought leader in the tech education space.',
        },
    ]

    const becomeTeacher = [
        {
            title: 'Professional Growth',
            description:
                'Enhance your teaching and presentation skills while solidifying your expertise in programming and technology.',
        },
        {
            title: 'Work-Life Balance',
            description:
                "Enjoy the freedom to teach from anywhere, whether it's from the comfort of your home or on the go.",
        },
        {
            title: 'Collaborative Community',
            description:
                'Join a network of like-minded educators, share ideas, and learn from others to create meaningful learning experiences.',
        },
        {
            title: 'Impactful Contribution',
            description:
                'Help shape the future of tech by preparing learners to succeed in their careers.',
        },
        {
            title: 'Monetary Rewards',
            description:
                'Get paid for creating and delivering engaging, high-quality courses.',
        },
    ]

    return (
        <div className="antialiased min-h-screen bg-white">
            <Navbar />
            <section className="max-w-[1200px] mx-auto mt-10 p-4 py-6 lg:py-10">
                <div
                    className="flex flex-col  items-center"
                    data-aos="fade-right"
                    data-aos-delay="200">
                    <h1 className="text-6xl text-center font-extrabold text-slate-800 mb-10 mt-20">
                        Become a Teacher at DevAcademy
                    </h1>
                    <p className="text-center w-[800px] text-lg text-gray-700 mb-12">
                        At DevAcademy, we believe in empowering learners with
                        the best educational experiences. As a teacher, you’ll
                        have the opportunity to inspire and shape the next
                        generation of developers and tech professionals. Share
                        your knowledge, create impactful courses, and make a
                        lasting difference in students’ lives.
                    </p>
                    <div
                        className="relative rounded-lg h-[400px] overflow-hidden shadow-lg mb-12"
                        data-aos="fade-right"
                        data-aos-delay="200">
                        <img
                            src={Teaching}
                            alt="Hero Thumbnail"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 w-full bg-gradient-to-r from-blue-500 to-transparent"></div>
                        <div className="relative flex items-center h-full">
                            <div className="p-12 w-2/3">
                                <h1 className="text-4xl w-3/5 font-semibold mb-4 text-white">
                                    Empower Others, Inspire Innovation
                                </h1>
                                <p className="text-white w-4/5">
                                    Join DevAcademy as a teacher and inspire the
                                    next generation of developers. Share your
                                    expertise, create impactful courses, and
                                    help students succeed in tech.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col max-w-[1200px] mx-auto p-4 py-6 lg:py-8">
                <div className="flex items-center gap-10 mx-auto p-4 lg:py-10">
                    <div
                        className="flex flex-col gap-6"
                        data-aos="fade-right"
                        data-aos-delay="200">
                        <h1 className="text-3xl font-semibold text-black">
                            Why Join Us?
                        </h1>
                        <p className="text-justify w-[750px] text-lg text-gray-800">
                            At DevAcademy, we are dedicated to your success. We
                            focus on providing you with certificates to
                            recognize your achievements, tutorials to guide your
                            learning, and projects to help you build real-world
                            skills. Our commitment is to ensure you gain the
                            knowledge and hands-on experience necessary to
                            thrive.
                        </p>
                    </div>

                    <div
                        className="w-full"
                        data-aos="fade-left"
                        data-aos-delay="200">
                        <img height="400" width="400" src={Education}></img>
                    </div>
                </div>
                <div
                    className="flex flex-row flex-wrap justify-center w-[1200px] text-black gap-4"
                    data-aos="fade-up"
                    data-aos-delay="200">
                    {joinus.map((join, index) => (
                        <div
                            key={index}
                            className="border rounded-lg h-auto w-2/5 p-5 hover:shadow-lg hover:-translate-y-2 transition duration-300 ease-in-out">
                            <div className="flex flex-col lg:flex-row">
                                <div>
                                    <p className="font-semibold mb-1">
                                        {join.title}
                                    </p>
                                    <span className="text-gray-500">
                                        {join.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="flex flex-col max-w-[1200px] mx-auto mt-10 p-4 py-6 lg:py-8">
                <div className="flex items-center gap-10 mx-auto p-4 lg:py-10">
                    <div
                        className="w-full"
                        data-aos="fade-right"
                        data-aos-delay="200">
                        <img height="400" width="400" src={Education}></img>
                    </div>
                    <div
                        className="flex flex-col gap-6"
                        data-aos="fade-left"
                        data-aos-delay="200">
                        <h1 className="text-3xl font-semibold text-black">
                            Benefits of Becoming a Teacher
                        </h1>
                        <p className="text-justify w-[750px] text-lg text-gray-800">
                            Becoming a teacher at DevAcademy is more than just a
                            role-it’s an opportunity to inspire, grow, and make
                            a lasting impact. By sharing your knowledge, you can
                            transform lives while enjoying personal and
                            professional rewards.
                        </p>
                    </div>
                </div>
                <div
                    className="flex flex-row flex-wrap justify-center w-[1200px] text-black gap-4"
                    data-aos="fade-up"
                    data-aos-delay="200">
                    {becomeTeacher.map((become, index) => (
                        <div
                            key={index}
                            className="border rounded-lg h-auto w-2/5 p-5 hover:shadow-lg hover:-translate-y-2 transition duration-300 ease-in-out">
                            <div className="flex flex-col lg:flex-row">
                                <div>
                                    <p className="font-semibold mb-1">
                                        {become.title}
                                    </p>
                                    <span className="text-gray-500">
                                        {become.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Become Teacher */}
            <section className="max-w-[1200px] mx-auto mt-12 p-4 py-6 lg:py-8 mb-24">
                <div
                    className="rounded-lg h-max md:h-[400px] overflow-hidden bg-gradient-to-br from-cyan-200 to-blue-400 shadow-lg"
                    data-aos="fade-up">
                    <div className="flex flex-col md:flex-row items-center h-full w-full justify-between gap-8 p-12 lg:p-24">
                        <div className="w-full md:w-[500px] lg:w-[570px]">
                            <h1 className="text-center text-black md:text-left text-4xl lg:text-5xl font-bold mb-8">
                                Become a teacher, inspire future developers!
                            </h1>
                            <p className="text-center md:text-left text-gray-700">
                                Become a part of our expert teaching team and
                                inspire the next generation of learners with
                                your knowledge and passion.
                            </p>
                        </div>
                        <a
                            href="https://api.whatsapp.com/"
                            className="bg-blue-500 text-white hover:text-white px-6 py-3 rounded font-semibold hover:bg-blue-600 transition duration-300">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default BecomeTeacherPage
