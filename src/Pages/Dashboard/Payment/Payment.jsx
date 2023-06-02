import React from 'react';
import SectionTitle from '../../../Componentes/SectionTitle/SectionTitle';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../../hooks/useCart';



// todo publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_pk);
const Payment = () => {
    const [cart] = useCart()
    const total = cart.reduce((sum , item)=> sum + item.price ,0)
    const price = parseFloat(total.toFixed(2))
    return (
        <div>
            <SectionTitle subHeading={"Please Process"} heading={"Payment"}></SectionTitle>
            <h1 className='text-3xl'>Takaa takaa o taka</h1>
            <Elements stripe={stripePromise}>
                <CheckOutForm cart={cart} price={price}></CheckOutForm>

            </Elements>
        </div>
    );
};

export default Payment;