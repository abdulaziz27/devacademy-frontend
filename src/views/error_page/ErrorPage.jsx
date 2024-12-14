import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Error401 from '../../assets/images/401.png'
import Error403 from '../../assets/images/403.png'
import Error404 from '../../assets/images/404.png'

const ErrorPage = () => {
    const error = '403'

    let errorImage, errorMessage, errorCode

    switch (error) {
        case '401':
            errorImage = Error401
            errorMessage = 'Oops! Unauthorized access.'
            errorCode = '401'
            break
        case '403':
            errorImage = Error403
            errorMessage = 'Oops! Forbidden access.'
            errorCode = '403'
            break
        case '404':
        default:
            errorImage = Error404
            errorMessage = 'Oops! Page not found.'
            errorCode = '404'
            break
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <section className="max-w-[1200px] mx-auto my-20 p-4 py-6 lg:py-10">
                <div className="flex flex-col items-center text-gray-800">
                    <img
                        className="mb-6"
                        src={errorImage}
                        height="450"
                        width="450"
                        alt={`Error ${errorCode}`}
                    />
                    <h1 className="text-6xl font-bold text-gray-800 mt-4">
                        {errorCode}
                    </h1>
                    <p className="text-xl mt-4 text-center w-3/4">
                        {errorMessage}
                    </p>
                    <Link
                        to="/"
                        className="mt-8 inline-block border-none py-2 px-4 bg-blue-500 hover:bg-blue-600 focus:outline-none text-white hover:text-white rounded transition ease-in-out duration-300">
                        Back to Home
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default ErrorPage
