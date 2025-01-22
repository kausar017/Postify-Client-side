import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './chackOut.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPiblic from '../../AllHooks/useAxiosPiblic';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../AuthenTication/UseAuth/UseAuth';
import useAxiosSecure from '../../AllHooks/axiosSecure/useAxiosSecure';

const ChackOut = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [errors, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const axiosPiblic = useAxiosPiblic();
    // const axiosSecure = useAxiosSecure()

    const { user } = UseAuth()

    const card = [
        { price: 50 },

    ];

    // price
    const price = card.reduce((total, item) => total + item.price, 0);

    const { data: userData = [] } = useQuery({
        queryKey: ['bage'],
        queryFn: async () => {
            const res = await axiosPiblic.get('/users')
            return res.data;
        }
    })

    const bageData = userData.filter(c => c?.email === user?.email);
    // console.log(bageData[0]?.email);



    useEffect(() => {

        axiosPiblic.post('/payment-intent', { price })
            .then(response => {
                setClientSecret(response.data.clientSecret);
            })
            .catch(error => {
                console.error("Error creating payment intent:", error);
            });
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axiosPiblic.put(`/users/${bageData[0]?.email}`, {
                bage: 'Gold',
            });
            // console.log(res);
        } catch (error) {
            console.error("failed:", error);
        }


        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement == null) {
            return;
        }

        // PaymentMethod
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            // ClientSecret 
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setError(confirmError.message);
            } else {
                if (paymentIntent.status === 'succeeded') {
                    toast.success("Payment successful!");
                }
            }
        }
    };

    useEffect(() => {
        if (errors) {
            toast.error(errors);
        }
    }, [errors]);

    return (
        <form onSubmit={handleSubmit}>
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
            <button className="btn btn-primary w-full bg-yellow-500 text-white hover:bg-yellow-600" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
    );
};

export default ChackOut;
