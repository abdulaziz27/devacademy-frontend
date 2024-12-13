/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
    getSubscriptionPlans,
    subscribeToPlan,
    handleSubscriptionCallback,
    getSignatureKey,
} from '../../api'

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

        fetchPlans()
    }, [])

    const handleSubscribe = async planId => {
        try {
            const response = await subscribeToPlan(planId, 'bank_transfer')
            alert(`Payment initiated. Snap Token: ${response.snap_token}`)

            // Get signature key for the transaction
            const signatureResponse = await getSignatureKey(
                response.transaction.order_id,
                '200',
                response.transaction.amount
            )

            // Handle subscription callback
            const callbackData = {
                transaction_status: 'settlement',
                order_id: response.transaction.order_id,
                status_code: '200',
                gross_amount: response.transaction.amount,
                signature_key: signatureResponse.signature_key,
                payment_type: 'bank_transfer',
                transaction_id: response.transaction.id,
                transaction_time: new Date().toISOString(),
            }
            const callbackResponse = await handleSubscriptionCallback(
                callbackData
            )
            alert(callbackResponse.message)
        } catch (err) {
            alert('Failed to subscribe to the plan. Please try again later.')
        }
    }

    if (loading) return <p>Loading subscription plans...</p>
    if (error) return <p>{error}</p>

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
