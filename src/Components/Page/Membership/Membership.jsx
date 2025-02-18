import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ChackOut from './ChackOut';
import { Helmet } from 'react-helmet-async';
const stripePromiz = loadStripe(import.meta.env.VITE_STRIP_KEY)
const Membership = () => {



    return (
        <div className="flex justify-center items-center min-h-screen">
            <Helmet>
                <title>Postify | Membership</title>
            </Helmet>
            <div className="card w-full max-w-[500px] bg-white shadow-xl m-2 p-5 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Membership Payment</h2>
                <p className="text-sm text-gray-600 text-center mb-4">
                    <span className="text-red-600 text-xl font-bold animate-bounce"> 50$ </span>taka or Become a member to receive the <span className="text-yellow-500 font-bold">Gold Badge</span> and unlock the ability to post more than 5 posts.
                </p>


                {/* chack out frome */}
                <Elements stripe={stripePromiz}>
                    {/* frome component */}
                    <ChackOut></ChackOut>
                </Elements>

            </div>
        </div>
    );
};

export default Membership;
