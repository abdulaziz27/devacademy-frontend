import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Privacy from '../../assets/images/privacy.png'
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
                        Privacy Policy
                    </h1>
                    <p className="text-justify w-[750px] text-lg text-gray-700">
                        At DevAcademy, we value your privacy and are committed
                        to protecting your personal information. This privacy
                        policy outlines the types of data we collect, how we use
                        it, and the steps we take to safeguard it. By using our
                        website, you consent to the collection and use of
                        information in accordance with this policy. We may
                        collect personal data such as your name, email address,
                        and browsing behavior to improve your experience and
                        offer relevant content. Rest assured, we do not share
                        your personal information with third parties without
                        your consent, unless required by law. For any questions
                        or concerns about your privacy, please feel free to
                        contact us.
                    </p>
                </div>

                <div
                    className="w-full"
                    data-aos="fade-left"
                    data-aos-delay="200">
                    <img height="400" width="400" src={Privacy}></img>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default TermsPage
