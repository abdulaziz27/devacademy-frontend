import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
    getSubscriptionPlans,
    subscribeToPlan,
    handleSubscriptionCallback,
} from '../../api'
import { ClipLoader } from 'react-spinners'
import swal from 'sweetalert'

const SubscriptionPage = () => {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await getSubscriptionPlans()
                setPlans(response.data)
            } catch (err) {
                setError(
                    'Failed to load subscription plans. Please try again later.'
                )
            } finally {
                setLoading(false)
            }
        }

        const script = document.createElement('script')
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
        script.type = 'text/javascript'
        script.setAttribute('data-client-key', 'SB-Mid-client-yTb4hQknvTM4U0qb')
        document.head.appendChild(script)

        fetchPlans()

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script)
            }
        }
    }, [])

    const handleSubscribe = async planId => {
        try {
            const response = await subscribeToPlan(planId, 'bank_transfer')
            const { snap_token } = response

            if (!window.snap) {
                swal(
                    'Error',
                    'Payment system is not ready. Please try again.',
                    'error'
                )
                return
            }

            window.snap.pay(snap_token, {
                onSuccess: async function (result) {
                    await processTestPayment(response.transaction)
                },
                onPending: async function (result) {
                    // For testing, treat pending as success too
                    await processTestPayment(response.transaction)
                },
                onError: function (result) {
                    console.error('Payment error:', result)
                    swal(
                        'Payment Error',
                        'Something went wrong with the payment',
                        'error'
                    )
                },
                onClose: async function () {
                    // Auto settle on close in test mode
                    await processTestPayment(response.transaction)
                },
            })
        } catch (err) {
            console.error('Subscription error:', err)
            const errorMessage =
                err.response?.data?.message ||
                'Failed to initiate subscription. Please try again later.'
            swal('Error', errorMessage, 'error')
        }
    }

    const processTestPayment = async transaction => {
        try {
            const callbackData = {
                transaction_status: 'settlement',
                order_id: transaction.order_id,
                status_code: '200',
                gross_amount: transaction.amount,
                payment_type: 'bank_transfer',
                transaction_id: transaction.id,
                transaction_time: new Date().toISOString(),
            }

            await handleSubscriptionCallback(callbackData)

            swal('Success', 'Payment completed successfully!', 'success').then(
                () => {
                    window.location.href = '/dashboard'
                }
            )
        } catch (error) {
            console.error('Error processing test payment:', error)
            swal('Error', 'Failed to process payment confirmation', 'error')
        }
    }

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader size={50} color="#4fa94d" loading={loading} />
            </div>
        )

    if (error) return <div>Error: {error}</div>

    return (
        <div className="bg-white select-none">
            <Navbar />
            <div className="max-w-[1200px] mx-auto p-4 py-6 lg:py-8 mt-12 mb-20">
                <div className="w-full flex flex-col justify-center items-center text-black">
                    <h1 className="text-4xl font-semibold text-center w-full md:w-2/4">
                        Choose a Plan to Unlock All Our Courses and Resources
                    </h1>
                    <div className="flex flex-col md:flex-row w-full md:w-7/12 mt-20 h-full md:h-[400px] border-2 rounded-lg">
                        {plans.map(plan => (
                            <div
                                key={plan.id}
                                className="lg:w-1/2 p-6 space-y-6 border-b-2 md:border-b-0">
                                <div className="relative flex flex-col">
                                    <div className="flex flex-col gap-1">
                                        <p className="flex items-center gap-2 text-xl font-semibold">
                                            {plan.name}
                                        </p>
                                        <div className="flex gap-1.5">
                                            <p>
                                                IDR{' '}
                                                {parseFloat(
                                                    plan.price
                                                ).toLocaleString()}
                                                /{plan.duration_in_days} days
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleSubscribe(plan.id)}
                                    className="flex justify-center px-4 py-2 rounded w-full bg-blue-500 hover:bg-blue-700 text-white transition duration-300 ease-in-out">
                                    Subscribe Now
                                </button>
                                <div className="flex flex-col flex-grow gap-4">
                                    <div className="relative">
                                        <div className="text-l flex justify-start gap-2">
                                            <span>
                                                Access to all premium courses
                                                for {plan.duration_in_days} days
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SubscriptionPage
