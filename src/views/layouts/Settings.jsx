import React, { useState } from 'react'
import Sidebar from '../components/SideBarDashboard'

const Settings = () => {
    const csrfToken = 'dummy_csrf_token'
    const passwordUpdateRoute = '/dummy-password-update'
    const status = 'password-not-updated'

    const [formData, setFormData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const [errors, setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(
        status === 'password-updated'
    )
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            console.log('Submitting data:', formData)
            // Simulate API call
            setTimeout(() => {
                if (formData.password !== formData.password_confirmation) {
                    setErrors({
                        password_confirmation: 'Passwords do not match.',
                    })
                } else {
                    setSuccessMessage(true)
                    setTimeout(() => setSuccessMessage(false), 2000)
                    setErrors({})
                }
            }, 1000)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }
    return (
        <div className="flex">
            <div className="w-[1200px] relative flex items-start mx-auto p-4 py-6 lg:py-8 gap-8">
                {/* Sidebar Component */}
                <Sidebar />

                {/* Main Content */}
                <div className="w-full lg:w-5/6 min-h-screen">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Settings
                        </h2>

                        <div className="bg-white p-4 sm:p-8 rounded-lg shadow">
                            <div className="max-w-xl">
                                <section>
                                    <header>
                                        <h2 className="text-xl font-medium text-gray-900">
                                            Update Password
                                        </h2>
                                        <p className="mt-2 text-base text-gray-600">
                                            Ensure your account is using a long,
                                            random password to stay secure.
                                        </p>
                                    </header>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-6 space-y-6">
                                        <div>
                                            <label
                                                htmlFor="update_password_current_password"
                                                className="block text-base font-medium text-gray-700">
                                                Current Password
                                            </label>
                                            <input
                                                id="update_password_current_password"
                                                name="current_password"
                                                type="password"
                                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition duration-300"
                                                autoComplete="current-password"
                                                value={
                                                    formData.current_password
                                                }
                                                onChange={handleInputChange}
                                            />
                                            {errors.current_password && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.current_password}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="update_password_password"
                                                className="block text-base font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <input
                                                id="update_password_password"
                                                name="password"
                                                type="password"
                                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition duration-300"
                                                autoComplete="new-password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                            {errors.password && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="update_password_password_confirmation"
                                                className="block text-base font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <input
                                                id="update_password_password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition duration-300"
                                                autoComplete="new-password"
                                                value={
                                                    formData.password_confirmation
                                                }
                                                onChange={handleInputChange}
                                            />
                                            {errors.password_confirmation && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    {
                                                        errors.password_confirmation
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <button
                                                type="submit"
                                                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white focus:outline-none transition duration-300">
                                                Save
                                            </button>

                                            {successMessage && (
                                                <p className="text-sm text-gray-600">
                                                    Saved.
                                                </p>
                                            )}
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>

                        <div className="bg-white sm:p-8 rounded-lg shadow">
                            <div className="max-w-xl">
                                <section className="space-y-6">
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Delete Account
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Once your account is deleted, all of
                                            its resources and data will be
                                            permanently deleted. Before deleting
                                            your account, please download any
                                            data or information that you wish to
                                            retain.
                                        </p>
                                    </header>

                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none transition duration-300"
                                        onClick={() => setIsModalVisible(true)}>
                                        Delete Account
                                    </button>

                                    {isModalVisible && (
                                        <div
                                            id="confirm-user-deletion-modal"
                                            className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                                <form
                                                    method="post"
                                                    action="/dummy-delete-account"
                                                    className="p-6">
                                                    <h2 className="text-lg font-medium text-gray-900">
                                                        Are you sure you want to
                                                        delete your account?
                                                    </h2>

                                                    <p className="mt-1 text-sm text-gray-600">
                                                        Once your account is
                                                        deleted, all of its
                                                        resources and data will
                                                        be permanently deleted.
                                                        Please enter your
                                                        password to confirm you
                                                        would like to
                                                        permanently delete your
                                                        account.
                                                    </p>

                                                    <div className="mt-6">
                                                        <label
                                                            htmlFor="delete_password"
                                                            className="sr-only">
                                                            Password
                                                        </label>

                                                        <input
                                                            id="delete_password"
                                                            name="password"
                                                            type="password"
                                                            className="block mt-1 w-full p-2 border rounded bg-white text-black hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition duration-300"
                                                            placeholder="Password"
                                                        />
                                                    </div>

                                                    <div className="mt-6 flex justify-end">
                                                        <button
                                                            type="button"
                                                            className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none transition duration-300"
                                                            onClick={() =>
                                                                setIsModalVisible(
                                                                    false
                                                                )
                                                            }>
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="ml-3 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none transition duration-300">
                                                            Delete Account
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
