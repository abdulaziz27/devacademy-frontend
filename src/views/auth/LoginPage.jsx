import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { loginUser, loginWithGoogle } from '../../api'
import axios from 'axios'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    function iconPass() {
        setVisible(!visible)
    }

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const result = await loginUser(email, password)

            if (result?.token) {
                localStorage.setItem('accessToken', result.token)

                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${result.token}`

                swal('Success!', 'Login berhasil!', 'success').then(() => {
                    navigate('/')
                })
            } else {
                swal('Error!', 'Login gagal. Silakan coba lagi.', 'error')
            }
        } catch (error) {
            swal(
                'Error!',
                'Terjadi kesalahan selama proses login. Silakan coba lagi.',
                'error'
            )
            console.error('Error during login:', error)
        }
    }

    useEffect(() => {
        const link = document.createElement('link')
        link.href =
            'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
        link.rel = 'stylesheet'
        document.head.appendChild(link)

        return () => {
            document.head.removeChild(link)
        }
    }, [])

    return (
        <div
            className="flex h-screen bg-gray-100 select-none"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="hidden md:flex w-3/6 bg-gradient-to-br from-blue-700 to-blue-400 p-12 items-center justify-center relative overflow-hidden">
                <div className="relative z-10 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded p-12 lg:px-12 lg:py-24">
                    <div className="text-white max-w-lg">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-8">
                            DevAcademy:
                            <br />
                            Learn Programming and Build Your Future
                        </h1>
                        <p className="text-sm lg:text-lg w-3/4">
                            Master programming skills and advance your career
                            with our AI-powered platform designed for aspiring
                            developers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="w-full md:w-4/6 bg-white p-16 flex items-center justify-center md:justify-start">
                <div className="w-full max-w-md">
                    <a
                        href="/"
                        className="flex items-center w-max -ml-1.5 group">
                        <svg
                            className="w-6 transform transition-transform duration-300 group-hover:-translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15 18L9 12L15 6"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"></path>
                        </svg>
                        <span className="text-xl text-blue-500">Home</span>
                    </a>

                    <div className="mb-8">
                        <h2 className="mt-4 mb-2 text-5xl font-bold text-neutral-950">
                            Log In
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Hey, Welcome to DevAcademy!
                        </p>
                    </div>

                    {/* Form Login */}
                    <form onSubmit={handleLogin}>
                        {/* Email Address */}
                        <div className="mb-4">
                            <input
                                id="email"
                                type="email"
                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration duration-300"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)} // Update email state
                                required
                                autoFocus
                                autoComplete="username"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <input
                                id="password"
                                type={visible ? 'text' : 'password'}
                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)} // Update password state
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={iconPass}
                                className="absolute right-4 top-6">
                                {visible ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <a
                                className="text-sm relative text-blue-400 before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-blue-400 before:transition-all before:duration-300 hover:before:w-full"
                                href="/password/reset">
                                Forgot password?
                            </a>
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                                Login
                            </button>
                        </div>
                        <GoogleOAuthProvider clientId="535354501548-dnro50hoe6i5ha2r8nn16sr8n0adf5k6.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={async credentialResponse => {
                                    try {
                                        const result = await loginWithGoogle(
                                            credentialResponse.credential
                                        )
                                        if (result?.token) {
                                            localStorage.setItem(
                                                'accessToken',
                                                result.token
                                            )
                                            axios.defaults.headers.common[
                                                'Authorization'
                                            ] = `Bearer ${result.token}`
                                            swal(
                                                'Success!',
                                                'Google login successful!',
                                                'success'
                                            ).then(() => {
                                                navigate('/')
                                            })
                                        } else {
                                            swal(
                                                'Error!',
                                                'Google login failed. Please try again.',
                                                'error'
                                            )
                                        }
                                    } catch (error) {
                                        swal(
                                            'Error!',
                                            'An error occurred during Google login. Please try again.',
                                            'error'
                                        )
                                        console.error(
                                            'Error during Google login:',
                                            error
                                        )
                                    }
                                }}
                                onError={() => {
                                    swal(
                                        'Error!',
                                        'Google login failed. Please try again.',
                                        'error'
                                    )
                                }}
                                useOneTap
                            />
                        </GoogleOAuthProvider>
                    </form>

                    {/* Register Link */}
                    <div className="flex items-center justify-center my-10">
                        <div className="px-3 font-light text-sm text-gray-400">
                            Don&apos;t have an account?
                            <Link
                                to="/register"
                                className="ml-2 relative text-blue-500 before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
