import React from 'react';
import UseAuth from '../../../AuthenTication/UseAuth/UseAuth';

const UserProfile = () => {


    const { user } = UseAuth()
    console.log(user);

    return (
        <>
            <div>
                {/* <div className='border max-w-xl shadow-md'>
                    <div className='grid grid-cols-2'>
                        <div className="flex flex-col items-center  space-y-5">
                            <div className="w-24 rounded-full border-2 border-lime-300 ">
                                <img referrerPolicy='no-referrer' className='rounded-full' src={user?.photoURL} />
                            </div>
                            <div>
                                <h1 className='text-xl font-bold'>{user?.displayName}</h1>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div> */}

                <div class="flex justify-center items-center min-h-screen bg-gray-100">
                    <div class="card w-96 bg-white shadow-lg border border-gray-200 rounded-lg">

                        <div class="card-body items-center text-center">
                            <div class="avatar">
                                <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="https://via.placeholder.com/150" alt="User Image" />
                                </div>
                            </div>

                            <h2 class="card-title mt-4 text-xl font-semibold">John Doe</h2>
                            <p class="text-gray-600 mb-4">john.doe@example.com</p>


                            <div class="flex justify-center gap-4">
                                <button className="flex items-center border-2 w-32 h-16 justify-center bg-[#d6985a] rounded-lg">
                                    <img className='w-11' src="https://i.postimg.cc/q7pwZqzh/coin.png" alt="" />
                                    <div className="text-lg font-bold text-white">Bronze</div>
                                </button>
                                <button className="btn">
                                    Gold
                                    <div className="badge badge-secondary">+99</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserProfile;