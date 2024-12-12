import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { registerUser } from '../../api';

const RegisterPage = () => {
    const navigate = useNavigate(); // For navigation after registration
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }
        if (formData.password !== formData.passwordConfirmation) {
            newErrors.passwordConfirmation = 'Passwords do not match';
        }
        if (!formData.email.includes('@')) {
            newErrors.email = 'Please enter a valid email address';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Register user
            const response = await registerUser(formData.name, formData.email, formData.password);

            if (response.token) {
                // If registration successful, show success message and redirect to login
                localStorage.setItem("accessToken", response.token);
                swal("Success!", "Registration successful!", "success").then(() => {
                    navigate('/login'); // Redirect to login page after successful registration
                });
            }
        } catch (error) {
            // Handle registration error
            setErrors(error.response?.data?.errors || {});
            swal("Error!", "Registration failed. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div className="flex h-screen bg-gray-100 select-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="hidden md:flex w-3/6 bg-gradient-to-br from-blue-700 to-blue-400 p-12 items-center justify-center relative overflow-hidden">
                <div className="relative z-10 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded p-12 lg:px-12 lg:py-24">
                    <div className="text-white max-w-lg">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-8">DevAcademy:<br />Learn Programming and Build Your Future</h1>
                        <p className="text-sm lg:text-lg w-3/4">
                            Master programming skills and advance your career with our AI-powered platform designed for aspiring developers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Registration form */}
            <div className="w-full md:w-4/6 bg-white p-16 flex items-center justify-center md:justify-start">
                <div className="w-full max-w-md">
                    <Link to="/" className="flex items-center w-max -ml-1.5 group">
                        <svg
                            className="w-6 transform transition-transform duration-300 group-hover:-translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 18L9 12L15 6"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-xl text-blue-500">Home</span>
                    </Link>

                    <div className="mb-8">
                        <h2 className="mt-4 mb-2 text-5xl font-bold text-neutral-950">Register</h2>
                        <p className="mt-2 text-gray-600">Create your account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-4">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                                placeholder="Name"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                        </div>

                        {/* Email Address */}
                        <div className="mb-4">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                                placeholder="Email"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                                placeholder="Password"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-9">
                            <input
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                type="password"
                                value={formData.passwordConfirmation}
                                onChange={handleChange}
                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                                placeholder="Confirm Password"
                                required
                            />
                            {errors.passwordConfirmation && (
                                <p className="text-red-500 text-sm mt-2">{errors.passwordConfirmation}</p>
                            )}
                        </div>
                        <div className="mb-5">
                            <button
                                type="submit"
                                className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Registering..." : "Register"}
                            </button>
                        </div>
                        <div className="flex items-center justify-center my-2">
                            <div className="px-3 font-light text-sm text-gray-400">
                                Have an account?
                                <Link
                                    to="/login"
                                    className="ml-2 relative text-blue-500 before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
                                >
                                    Log In
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;