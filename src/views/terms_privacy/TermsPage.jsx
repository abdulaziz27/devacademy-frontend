import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Terms from '../../assets/images/terms.png'
import AOS from 'aos'
import 'aos/dist/aos.css'

const TermsPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        })
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="antialiased min-h-screen bg-white">
            <Navbar />
            <section className="max-w-[1200px] flex items-center gap-10 mx-auto mt-16 p-4 lg:py-10">
                <div
                    className="flex flex-col gap-6"
                    data-aos="fade-right"
                    data-aos-delay="200">
                    <h1 className="text-5xl font-extrabold text-slate-800 mt-4">
                        Terms & Conditions
                    </h1>
                    <p className="text-justify w-[750px] text-lg text-gray-700">
                        Welcome to DevAcademy! These terms and conditions
                        outline the rules and regulations for using our website,
                        services, and courses. By accessing or using DevAcademy,
                        you agree to be bound by these terms. Please read them
                        carefully.
                    </p>
                </div>

                <div
                    className="w-full"
                    data-aos="fade-left"
                    data-aos-delay="200">
                    <img height="400" width="400" src={Terms}></img>
                </div>
            </section>

            <section
                className="max-w-[1200px] flex flex-col gap-6 text-justify mx-auto p-4 lg:pb-10 pr-16"
                data-aos="fade-up"
                data-aos-delay="200">
                {/* General Terms */}
                <div className="flex flex-col">
                    <h1 className="text-slate-800 text-2xl font-semibold">
                        1. General Terms
                    </h1>
                    <div className="flex flex-col px-7 text-base font-normal text-gray-700">
                        <div className="flex gap-2 items-start">
                            <span className="font-bold">1.1.</span>
                            <span>
                                Eligibility: You must be at least 13 years old
                                to use DevAcademy. If you are under 18, you must
                                have permission from a parent or guardian.
                            </span>
                        </div>
                        <div className="flex gap-2 items-start">
                            <span className="font-bold">1.2.</span>
                            <span>
                                Account Responsibility: You are responsible for
                                maintaining the confidentiality of your account
                                and password and for restricting access to your
                                account.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Usage of Courses and Content */}
                <div className="flex flex-col">
                    <h1 className="text-slate-800 text-2xl font-semibold">
                        2. Usage of Courses and Content
                    </h1>
                    <div className="flex flex-col px-7 text-base font-normal text-gray-700">
                        <div className="flex gap-2 items-start">
                            <span className="font-bold">2.1.</span>
                            <span>
                                Personal Use Only: All courses, tutorials, and
                                materials provided by DevAcademy are for
                                personal, non-commercial use.
                            </span>
                        </div>
                        <div className="flex gap-2 items-start mt-2">
                            <span className="font-bold">2.2.</span>
                            <span>
                                Prohibited Activities: You agree not to
                                reproduce, distribute, or share any course
                                materials without written permission from
                                DevAcademy.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payments and Refunds */}
                <div className="flex flex-col">
                    <h1 className="text-slate-800 text-2xl font-semibold">
                        3. Payments and Refunds
                    </h1>
                    <div className="flex flex-col px-7 text-base font-normal text-gray-700">
                        <div className="flex gap-2 items-start">
                            <span className="font-bold">3.1.</span>
                            <span>
                                Payment: To access certain courses, payment is
                                required. Fees and payment methods are displayed
                                during checkout.
                            </span>
                        </div>
                        <div className="flex gap-2 items-start mt-2">
                            <span className="font-bold">3.2.</span>
                            <span>
                                Refund Policy: Refunds are only provided for
                                eligible requests made within 7 days of
                                purchase, provided less than 20% of the course
                                has been completed.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Certificates */}
                <div className="flex flex-col">
                    <h1 className="text-slate-800 text-2xl font-semibold">
                        4. Certificates
                    </h1>
                    <div className="flex flex-col px-7 text-base font-normal text-gray-700">
                        <div className="flex gap-2 items-start">
                            <span className="font-bold">4.1.</span>
                            <span>
                                Eligibility: Certificates are awarded only upon
                                successful completion of a course and meeting
                                all requirements.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Intellectual Property */}
                <div className="flex flex-col">
                    <h1 className="text-slate-800 text-2xl font-semibold">
                        5. Intellectual Property
                    </h1>
                    <div className="flex flex-col px-7 text-base font-normal text-gray-700">
                        <div className="flex gap-2 items-start">
                            <span className="font-bold">5.1.</span>
                            <span>
                                Ownership: All content, including text, images,
                                videos, and software on DevAcademy, is owned by
                                DevAcademy and protected by intellectual
                                property laws.
                            </span>
                        </div>
                        <div className="flex gap-2 items-start mt-2">
                            <span className="font-bold">5.2.</span>
                            <span>
                                Restrictions: You may not use our content for
                                commercial purposes without our written consent.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Termination */}
                <div className="flex flex-col">
                    <h1 className="text-slate-800 text-2xl font-semibold">
                        6. Termination
                    </h1>
                    <div className="flex flex-col px-7 text-base font-normal text-gray-700">
                        <div className="flex gap-2 items-start">
                            <span className="font-bold">6.1.</span>
                            <span>
                                DevAcademy reserves the right to suspend or
                                terminate your access if you violate these
                                terms.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Limitation of Liability */}
                <div className="flex flex-col">
                    <h1 className="text-slate-800 text-2xl font-semibold">
                        7. Limitation of Liability
                    </h1>
                    <div className="flex flex-col px-7 text-base font-normal text-gray-700">
                        <div className="flex gap-2 items-start">
                            <span className="font-bold">7.1.</span>
                            <span>
                                DevAcademy is not liable for any direct,
                                indirect, incidental, or consequential damages
                                resulting from your use of the platform.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Changes to These Terms */}
                <div className="flex flex-col">
                    <h1 className="text-slate-800 text-2xl font-semibold">
                        8. Changes to These Terms
                    </h1>
                    <div className="flex flex-col px-7 text-base font-normal text-gray-700">
                        <div className="flex gap-2 items-start">
                            <span className="font-bold">8.1.</span>
                            <span>
                                DevAcademy reserves the right to update or
                                modify these terms at any time. Continued use of
                                the platform indicates acceptance of the updated
                                terms.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Us */}
                <div className="flex flex-col">
                    <h1 className="text-slate-800 text-2xl font-semibold">
                        9. Contact Us
                    </h1>
                    <div className="flex flex-col px-7 text-base font-normal text-gray-700">
                        <div className="flex gap-2 items-start">
                            <span className="font-bold">9.1.</span>
                            <span>
                                If you have any questions about these terms,
                                please contact us at{' '}
                                <strong className="text-blue-500">
                                    support@devacademy.com
                                </strong>
                                .
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default TermsPage
