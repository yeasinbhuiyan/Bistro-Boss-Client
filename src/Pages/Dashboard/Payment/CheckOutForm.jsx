import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
// import './checkOutForm.css'

const CheckOutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransaction] = useState('')
    

    useEffect(() => {


        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        console.log(card)
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {

            setCardError(error.message)
        }
        else {

            setCardError('')
        }
        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user.email || "anonymous",
                        name: user.displayName || "anonymous"
                    },
                },
            },
        );


        if (confirmError) {
            console.log(confirmError)
        }

        console.log('payment intent', paymentIntent)
        setProcessing(false)
        
        if (paymentIntent.status === "succeeded") {
            setTransaction(paymentIntent.id)
            const transactionId = paymentIntent.id
            // save payment information to the server 

            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item => item._id),

                // extraa 
                menuItems: cart.map(item => item.MenuItemId),
                


                status: 'service pending',
                itemName: cart.map(item => item.name),
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertResult.acknowledged) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Payment Succesfull',
                            showConfirmButton: false,
                            timer: 1500
                        })


                    }
                })





        }

    }
    return (
        <>
            <form className='w-2/3 m-8' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn-primary mt-8 btn btn-sm' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>


            {
                cardError && <p className='text-red-600'>
                    {cardError}
                </p>
            }
            {
                transactionId && <p className='text-green-600'>
                    transaction complete with transaction id : {transactionId}
                </p>
            }



        </>
    );
};

export default CheckOutForm;