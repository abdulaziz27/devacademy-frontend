import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBarDashboard';
import { getUserProfile, updateUserProfile } from "../../api";
import Swal from 'sweetalert2';
import isAuthenticated from '../../auth'; 
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [errors, setErrors] = useState({}); 
    const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setUser(response.data);
                setAvatar(response.data.avatar || 'assets/images/profile1.png');
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setErrors({ global: 'Failed to fetch user profile.' });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        if (!isAuthenticated()) {
            swal("Warning!", "Login terlebih dahulu!", "warning").then(() => {
                navigate("/login");
            });
        }
    }, [navigate]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            setIsAvatarChanged(true);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedProfile = {
            name,
            email,
            avatar: isAvatarChanged ? avatar : user.avatar,
        };

        try {
            const formData = new FormData();
            formData.append('name', updatedProfile.name);

            if (isAvatarChanged) {
                const avatarFile = document.getElementById('avatar').files[0];
                formData.append('avatar', avatarFile);
            }

            const response = await updateUserProfile(formData);

            // Log the response for debugging
            console.log("API Response:", response);

            // Check if response contains the expected success message
            if (response.message === 'Profile updated successfully' && response.user) {
                const updatedUser = {
                    ...user,
                    name: updatedProfile.name,
                    avatar: isAvatarChanged ? avatar : user.avatar,
                };

                // Save the updated user info to localStorage
                localStorage.setItem("user", JSON.stringify(updatedUser));

                // Update the user state
                setUser(updatedUser);

                // Show success message using SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Profile updated successfully!',
                    text: 'Your profile has been updated.',
                }).then(() => {
                    // After the success message, navigate back to the same page
                    navigate(0);  // This will reload the current page
                });
            } else {
                // Show error message using SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to update profile',
                    text: 'Please try again later.',
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            // Show error message using SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Failed to update profile',
                text: 'Please try again later.',
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex">
            <div className="w-[1200px] relative flex items-start mx-auto p-4 py-6 lg:py-8 gap-8">
                <Sidebar />

                <div className="w-full lg:w-5/6 min-h-screen">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>

                        {errors.global && <p className="text-red-600">{errors.global}</p>}

                        <div className="bg-white p-4 sm:p-8 rounded-lg shadow">
                            <div className="max-w-xl">
                                <section>
                                    <header>
                                        <h2 className="text-xl font-medium text-gray-900">Profile Information</h2>
                                        <p className="mt-1 text-base text-gray-600">
                                            Update your account&apos;s profile information and email address.
                                        </p>
                                    </header>

                                    <form
                                        method="post"
                                        onSubmit={handleSubmit}
                                        className="mt-6 space-y-6"
                                        encType="multipart/form-data"
                                    >
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
                                            <label htmlFor="name" className="block text-base font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-base font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="block mt-1 w-full p-2 border rounded bg-gray-100 text-gray-500"
                                                value={email}
                                                readOnly
                                            />
                                        </div>

                                        <div className="flex items-center mt-12 gap-4">
                                            <button
                                                type="submit"
                                                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white focus:outline-none transition duration-300"
                                            >
                                                Save
                                            </button>
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
