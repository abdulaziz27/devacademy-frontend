import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from "react-router-dom";

const SubscriptionPage = () => {
    return (
        <div className="bg-white select-none">
            <Navbar />

            <div className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8 mt-12 mb-20">
                <div className="w-full flex flex-col justify-center items-center text-black">
                    <h1 className="text-4xl font-semibold text-center w-full md:w-2/4">
                    Choose a Plan to Unlock All Our Courses and Resources
                    </h1>
                    <div className="flex flex-col md:flex-row w-full md:w-7/12 mt-20 h-full md:h-[400px] border-2 rounded-lg">
                    {/* Free Plan Section */}
                    <div className="lg:w-1/2 p-6 space-y-6 border-b-2 md:border-b-0">
                        <div className="relative flex flex-col">
                        <div className="flex flex-col gap-1">
                            <p className="flex items-center gap-2 text-xl font-semibold">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon-md"
                            >
                                <path
                                d="M12.001 1.75C12.4972 1.75051 12.9141 2.12323 12.97 2.61632C13.2763 5.32075 14.096 7.2769 15.4108 8.61588C16.7197 9.9489 18.6326 10.7853 21.3602 11.0276C21.8643 11.0724 22.2506 11.495 22.25 12.0011C22.2494 12.5072 21.8622 12.9289 21.358 12.9726C18.6758 13.2047 16.7215 14.0404 15.381 15.381C14.0404 16.7215 13.2047 18.6758 12.9726 21.358C12.9289 21.8622 12.5072 22.2494 12.0011 22.25C11.495 22.2506 11.0724 21.8643 11.0276 21.3602C10.7853 18.6326 9.9489 16.7197 8.61588 15.4108C7.2769 14.096 5.32075 13.2763 2.61632 12.97C2.12323 12.9141 1.75051 12.4972 1.75 12.001C1.74949 11.5048 2.12137 11.0871 2.61434 11.0302C5.36466 10.713 7.27893 9.89303 8.58598 8.58598C9.89303 7.27893 10.713 5.36466 11.0302 2.61434C11.0871 2.12137 11.5048 1.74949 12.001 1.75Z"
                                fill="currentColor"
                                ></path>
                            </svg>
                            Free Plan
                            </p>
                            <div className="flex gap-1.5">
                            <p>IDR 0/month</p>
                            </div>
                        </div>
                        </div>
                        <div className="px-4 py-2 rounded text-center border border-slate-500 w-full">
                        Current
                        </div>
                        <div className="flex flex-col flex-grow gap-4">
                        <div className="relative">
                            <div className="text-l flex justify-start gap-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mt-0.5 h-4 w-4 shrink-0"
                            >
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z"
                                fill="currentColor"
                                ></path>
                            </svg>
                            <span>Access to a selection of free courses</span>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="text-l flex justify-start gap-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mt-0.5 h-4 w-4 shrink-0"
                            >
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z"
                                fill="currentColor"
                                ></path>
                            </svg>
                            <span>Limited access to advanced features</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Subscribe Plan Section */}
                    <div className="lg:w-1/2 p-6 space-y-6 md:border-l-2">
                        <div className="relative flex flex-col">
                        <div className="flex flex-col gap-1">
                            <p className="flex items-center gap-2 text-xl font-semibold">
                            <svg
                                className="h-8 w-8 text-blue-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            Premium Plan
                            </p>
                            <div className="flex items-baseline gap-1.5">
                            <p>IDR 100.000/month</p>
                            </div>
                        </div>
                        </div>
                        <Link
                            to="/checkout"
                            className="flex justify-center px-4 py-2 rounded w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white transition duration-300 ease-in-out"
                        >
                        Subscribe Now
                        </Link>
                        <div className="flex flex-col flex-grow gap-4">
                        <div className="relative">
                            <div className="text-l flex justify-start gap-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mt-0.5 h-4 w-4 shrink-0"
                            >
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z"
                                fill="currentColor"
                                ></path>
                            </svg>
                            <span>Unlimited access to all courses</span>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="text-l flex justify-start gap-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mt-0.5 h-4 w-4 shrink-0"
                            >
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z"
                                fill="currentColor"
                                ></path>
                            </svg>
                            <span>Full access to all AI-driven learning tools</span>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="text-l flex justify-start gap-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mt-0.5 h-4 w-4 shrink-0"
                            >
                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z"
                                fill="currentColor"
                                ></path>
                            </svg>
                            <span>Free course completion certificates</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default SubscriptionPage;