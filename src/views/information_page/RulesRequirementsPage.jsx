import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Rules from '../../assets/images/rules.png'
import AOS from 'aos'
import 'aos/dist/aos.css'

const RulesRequirementsPage = () => {
    // useEffect(() => {
    //     AOS.init({
    //         duration: 1000,
    //         easing: 'ease-in-out',
    //         once: true,
    //     })
    //     window.scrollTo(0, 0)
    // }, [])

    return (
        <div className="antialiased min-h-screen bg-white">
            <Navbar />
            <section className="max-w-[1200px] flex items-center gap-10 mx-auto mt-16 p-4 lg:py-10">
                <div
                    className="flex flex-col gap-6"
                    data-aos="fade-right"
                    data-aos-delay="200">
                    <h1 className="text-5xl font-extrabold text-slate-800 mt-4">
                        Rules and Requirements
                    </h1>
                    <p className="text-justify w-[750px] text-lg text-gray-700">
                        At DevAcademy, we are committed to providing a positive
                        and supportive learning environment for all of our
                        students. To ensure that everyone has the best
                        experience possible, we ask that all students adhere to
                        the following rules and requirements:
                    </p>
                </div>

                <div
                    className="w-full"
                    data-aos="fade-left"
                    data-aos-delay="200">
                    <img height="400" width="400" src={Rules}></img>
                </div>
            </section>

            <section className="max-w-[1200px] flex flex-col items-center gap-10 mx-auto p-16 lg:py-10">
                <div className="flex flex-col gap-2 text-jutify">
                    <h1 className="text-xl font-bold text-slate-800">
                        Respectful and Professional Conduct
                    </h1>
                    <p className="text-base font-normal text-gray-700">
                        We believe that mutual respect is the cornerstone of a
                        productive learning community. All students are expected
                        to treat their peers, instructors, and support staff
                        with kindness, professionalism, and courtesy at all
                        times. Harassment, offensive language, or disruptive
                        behavior will not be tolerated.
                    </p>
                </div>
                <div className="flex flex-col gap-2 text-jutify">
                    <h1 className="text-xl font-bold text-slate-800">
                        Commitment to Course Completion
                    </h1>
                    <p className="text-base font-normal text-gray-700">
                        To successfully complete a course and earn your
                        certification, students are required to engage fully
                        with the course content, complete assignments, and
                        participate in assessments within the designated
                        timelines. We encourage all students to stay committed
                        to the course and pace themselves to ensure a thorough
                        understanding of the material.
                    </p>
                </div>
                <div className="flex flex-col gap-2 text-jutify">
                    <h1 className="text-xl font-bold text-slate-800">
                        Technical Requirements
                    </h1>
                    <p className="text-base font-normal text-gray-700">
                        A stable internet connection and a reliable computer are
                        essential to participate in our online courses. We
                        recommend using a computer with updated software and
                        browsers for the best experience. Please ensure that you
                        meet the technical requirements to avoid interruptions
                        during lessons and assignments.
                    </p>
                </div>
                <div className="flex flex-col gap-2 text-jutify">
                    <h1 className="text-xl font-bold text-slate-800">
                        Active Participation
                    </h1>
                    <p className="text-base font-normal text-gray-700">
                        Engaging with course materials, participating in
                        discussions, and completing projects are key to your
                        success at DevAcademy. Active participation helps deepen
                        your understanding and provides valuable interaction
                        with instructors and fellow students.
                    </p>
                </div>
                <div className="flex flex-col gap-2 text-jutify">
                    <h1 className="text-xl font-bold text-slate-800">
                        Academic Integrity
                    </h1>
                    <p className="text-base font-normal text-gray-700">
                        We expect all students to uphold the highest standards
                        of academic integrity. This includes completing
                        assignments and projects independently, properly citing
                        sources, and avoiding plagiarism. Any form of cheating
                        or dishonesty will result in disciplinary action.
                    </p>
                </div>
            </section>

            <section className="max-w-[1200px] flex flex-col gap-10 mx-auto mb-24 p-4 lg:py-10">
                <div className="text-slate-900 text-justify text-lg font-semibold">
                    By following these guidelines, you help maintain a
                    respectful and effective learning environment. We are
                    confident that by meeting these requirements, you will gain
                    the skills and knowledge necessary to succeed in your course
                    and beyond.
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default RulesRequirementsPage
