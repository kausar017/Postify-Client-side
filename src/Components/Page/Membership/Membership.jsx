// import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";

// const Membership = () => {
//     return (
//         <>

//             <DynamicTitle title="Membership"></DynamicTitle>

//             <div>
//                 hello Membership
//             </div>
//         </>
//     );
// };

// export default Membership;

// PaymentCard.jsx
import React from 'react';

const Membership = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-96 bg-white shadow-xl p-5 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Membership Payment</h2>

                <p className="text-sm text-gray-600 text-center mb-4">
                    Become a member to receive the <span className="text-yellow-500 font-bold">Gold Badge</span> and unlock the ability to post more than 5 posts.
                </p>

                <form>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-gray-600">Card Number</span>
                        </label>
                        <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-yellow-400"
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-gray-600">Cardholder Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Full Name"
                            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-yellow-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-600">Expiry Date</span>
                            </label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-yellow-400"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-600">CVC</span>
                            </label>
                            <input
                                type="text"
                                placeholder="123"
                                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-gray-600">Amount</span>
                        </label>
                        <input
                            type="text"
                            placeholder="N Taka/Dollar"
                            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-yellow-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Membership;
