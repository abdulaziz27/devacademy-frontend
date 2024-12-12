import React, { useState } from 'react';
import Sidebar from '../components/SideBarDashboard';

const ProfilePage = () => {
    // Dummy user data
    const dummyUser = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        avatar: 'https://via.placeholder.com/150',
        email_verified_at: null, // Assuming email is not verified
        status: 'profile-updated',
    };

    // Setting state from dummy data
    const [user, setUser] = useState(dummyUser);
    const [avatar, setAvatar] = useState(user.avatar || 'assets/images/profile1.png');
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isEmailVerified, setIsEmailVerified] = useState(!user.email_verified_at);
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showEmailVerificationMessage, setShowEmailVerificationMessage] = useState(isEmailVerified);

    // Handle avatar change
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            setIsAvatarChanged(true);
        }
    };

    // Handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        // Simulate saving data (e.g., making an API call)
        console.log('Profile saved', { name, email, avatar: isAvatarChanged ? avatar : user.avatar });
        
        // Update user state with new profile info
        setUser({ ...user, name, email, avatar: isAvatarChanged ? avatar : user.avatar });

        // Simulate success message display
        setShowSuccessMessage(true);

        // Hide the success message after 3 seconds
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000); // 3 seconds
    };

    const handleResendVerification = () => {
        console.log('Resend verification email to', email);
        // Here you would make an API call to resend the email verification
    };

    return (
        <div className="flex">
            <div className="w-[1200px] relative flex items-start mx-auto p-4 py-6 lg:py-8 gap-8">
                <Sidebar />
                
                {/* Main Content */}
                <div className="w-full lg:w-5/6 min-h-screen">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Profile
                        </h2>

                        <div className="bg-white p-4 sm:p-8 rounded-lg shadow">
                            <div className="max-w-xl">
                                <section>
                                    <header>
                                        <h2 className="text-xl font-medium text-gray-900">Profile Information</h2>
                                        <p className="mt-1 text-base text-gray-600">
                                            Update your account's profile information and email address.
                                        </p>
                                    </header>

                                    <form method="post" onSubmit={handleSubmit} className="mt-6 space-y-6" encType="multipart/form-data">
                                        <div className="flex items-center space-x-6">
                                            <div className="shrink-0">
                                                <img
                                                    id="avatar-preview"
                                                    className="h-20 w-20 object-cover rounded-full"
                                                    src={avatar}
                                                    alt="User Avatar"
                                                />
                                            </div>
                                            <label className="block">
                                                <span className="sr-only">Choose profile photo</span>
                                                <input
                                                    type="file"
                                                    name="avatar"
                                                    id="avatar"
                                                    onChange={handleAvatarChange}
                                                    className="block w-full text-sm text-slate-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-full file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-violet-50 file:text-violet-700
                                                        hover:file:bg-violet-100"
                                                />
                                            </label>
                                        </div>

                                        <div>
                                            <label htmlFor="name" className="block text-base font-medium text-gray-700">Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            {errors.name && <div className="mt-2 text-sm text-red-600">{errors.name}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-base font-medium text-gray-700">Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition duration-300"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            {errors.email && <div className="mt-2 text-sm text-red-600">{errors.email}</div>}

                                            {showEmailVerificationMessage && isEmailVerified && (
                                                <div className="mt-4 text-sm text-gray-800">
                                                    Your email address is unverified.
                                                    <button
                                                        onClick={handleResendVerification}
                                                        className="text-sm ml-1 text-blue-600 hover:underline border-none transition duration-300"
                                                    >
                                                        Click here to re-send the verification email.
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center mt-12 gap-4">
                                            <button
                                                type="submit"
                                                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white focus:outline-none transition duration-300"
                                            >
                                                Save
                                            </button>

                                            {/* Success message */}
                                            {showSuccessMessage && (
                                                <p className="text-sm text-gray-600">Saved.</p>
                                            )}
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
