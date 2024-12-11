import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { loginUser } from '../../api';
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false); // For password visibility toggle
  const navigate = useNavigate();

  // Toggle password visibility
  function iconPass() {
    setVisible(!visible);
  }

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Call loginUser API
      const result = await loginUser(email, password);

      // Check if result contains accessToken
      if (result?.token) {
        // Store token in localStorage
        localStorage.setItem("accessToken", result.token);
        
        // Set the token in axios headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;

        // Display success message and navigate to home
        swal("Success!", "Login berhasil!", "success").then(() => {
          navigate("/"); // Navigate to home or dashboard after successful login
        });
      } else {
        swal("Error!", "Login gagal. Silakan coba lagi.", "error");
      }
    } catch (error) {
      // Improved error handling for failed login
      swal("Error!", "Terjadi kesalahan selama proses login. Silakan coba lagi.", "error");
      console.error("Error during login:", error);
    }
  };

  // Adding Google Fonts in the head tag
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

      {/* Right side - Login form */}
      <div className="w-full md:w-4/6 bg-white p-16 flex items-center justify-center md:justify-start">
        <div className="w-full max-w-md">
          <a href="/" className="flex items-center w-max -ml-1.5 group">
            <svg className="w-6 transform transition-transform duration-300 group-hover:-translate-x-1"
              viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round"></path>
            </svg>
            <span className="text-xl text-blue-500">Home</span>
          </a>

          <div className="mb-8">
            <h2 className="mt-4 mb-2 text-5xl font-bold text-neutral-950">Log In</h2>
            <p className="mt-2 text-gray-600">Hey, Welcome to DevAcademy!</p>
          </div>

          {/* Form Login */}
          <form onSubmit={handleLogin}>
            {/* Email Address */}
            <div className="mb-4">
              <input
                id="email"
                type="email"
                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
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
                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
                autoComplete="current-password"
              />
              <button type="button" onClick={iconPass} className="absolute right-4 top-6">
                {visible ? 'Hide' : 'Show'}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="remember_me" className="inline-flex items-center">
                <input id="remember_me" type="checkbox"
                  className="bg-white rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  name="remember" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>

              <a className="text-sm relative text-blue-400 before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-blue-400 before:transition-all before:duration-300 hover:before:w-full" href="/password/reset">
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
          </form>

          {/* Google Login */}
          <div className="flex items-center my-3">
            <div className="grow">
              <hr />
            </div>
            <div className="text-center px-3 text-gray-400 transparent">
              or
            </div>
            <div className="grow">
              <hr />
            </div>
          </div>
          <div className="mt-4">
            <a href="/auth/google"
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335" />
              </svg>
              Continue with Google
            </a>
          </div>

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
  );
}

export default LoginPage;
