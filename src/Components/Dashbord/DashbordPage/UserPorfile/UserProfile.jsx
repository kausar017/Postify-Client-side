import React from 'react';
import UseAuth from '../../../AuthenTication/UseAuth/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPiblic from '../../../AllHooks/useAxiosPiblic';
import { FaDatabase } from 'react-icons/fa6';
import Loader from '../../../Page/Loader/Loader';
import { format } from 'date-fns';
import DynamicTitle from '../../../Shared/DynamicTitle/DynamicTitle';

const UserProfile = () => {

    const axiosPiblic = useAxiosPiblic()
    //   const[]=useRole  
    const { user } = UseAuth()
    // console.log(user.email);

    // recent data fatching
    const { isLoading, error, data: recent = [] } = useQuery({
        queryKey: ['recentData'],
        queryFn: async () => {
            const res = await axiosPiblic.get(`/addpost?=${user?.email}`);
            return res.data;
        }
    });

    const recentPost = recent.filter(c => c.UserEmail === user?.email);
    // console.log(recentPost);

    // Comments data fetch with tanstack query
    const { data: coment = [], isLoading: lodaer } = useQuery({
        queryKey: ['queary'],
        queryFn: async () => {
            const res = await axiosPiblic('/coment');
            return res.data;
        }
    });

    const { data: userData = [], isLoading: loader } = useQuery({
        queryKey: ['bage'],
        queryFn: async () => {
            const res = await axiosPiblic.get('/users')
            return res.data;
        }
    })

    if (isLoading || loader) {
        return <p>loding.....</p>
    }

    console.log(userData);
    const bageData = userData.filter(c => c.email === user?.email);


    return (
        <>

            <div className='bg-gray-100 py-10'>
                <DynamicTitle title='My Profile'></DynamicTitle>
                <div className="flex flex-col justify-center items-center">
                    <div className="card w-96 bg-white shadow-lg border border-gray-200 rounded-lg">

                        <div className="card-body items-center text-center">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img referrerPolicy='no-referrer' src={user?.photoURL} alt="User Image" />
                                </div>
                            </div>

                            <h2 className="card-title mt-4 text-xl font-semibold">{user?.displayName}</h2>
                            <p className="text-gray-600 mb-4">{user?.email}</p>


                            <div className="flex justify-center gap-4">

                                {bageData && Array.isArray(bageData) && bageData.map((user, i) => {
                                    console.log(user?.bage);

                                    return (
                                        <div key={i}>
                                            {user?.bage === "Bronze" && (
                                                <button className="flex items-center border-2 w-32 h-16 justify-center bg-[#d6985a] rounded-lg">
                                                    <img className="w-11" src="https://i.postimg.cc/q7pwZqzh/coin.png" alt="" />
                                                    <div className="text-lg font-bold text-white">Bronze</div>
                                                </button>
                                            )}
                                            {user?.bage === "Gold" && (
                                                <button className="flex items-center border-2 w-32 h-16 justify-center bg-[#ebda7c] rounded-lg">
                                                    <img className="w-11" src="https://i.postimg.cc/yWq2bRg4/trophy.png" alt="" />
                                                    <div className="text-lg font-bold text-orange-800">Gold</div>
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>


                    {isLoading ? (
                        <div className="text-center my-10">
                            <Loader></Loader>;
                        </div>
                    ) :



                        // {
                        //     "_id": "6788010ae6899dfa8b5471ef",
                        //     "image": "https://t3.ftcdn.net/jpg/02/31/48/54/360_F_231485475_5XH3Qu3SXO2MbyHyqa60kSOO3z2YyE4u.jpg",
                        //     "authorName": "Erica Bruce",
                        //     "authorEmail": "doqogeh@mailinator.com",
                        //     "postTitle": "Laudantium veniam ",
                        //     "postDescription": "Monotonectally evisculate scalable resources rather than global e-tailers. Uniquely develop alternative alignments with B2C expertise. Proactively aggregate user-centric catalysts.",
                        //     "tag": "health",
                        //     "carentTime": "2025-01-15T18:40:10.305Z",
                        //     "upVote": 1,
                        //     "downVote": 0,
                        //     "UserEmail": "mdkousarmia71@gmail.com",
                        //     "UserName": "MD:Kausar Mia",
                        //     "userPhoto": "https://lh3.googleusercontent.com/a/ACg8ocJBAjHsJzAHA_n9p6jMCUkEiahSCGKLpp5SztPj_R-WHOuS8uPabA=s96-c"
                        // }

                        <div className='min-h-[500px]'>
                            {
                                recentPost?.length > 0 ?

                                    recentPost.slice(0, 3).map((item, index) => {
                                        const filteredComments = coment.filter(c => c.comentId === item._id);
                                        return < div key={index} className='my-5 border shadow-lg'>
                                            <div className="">
                                                <div className="hero-content flex-col lg:flex-row">
                                                    <img
                                                        src={item?.image}
                                                        className="w-full max-w-sm h-52 rounded-lg shadow-2xl object-cover" />
                                                    <div className='space-y-2'>
                                                        <h1 className="text-5xl font-bold">{item?.postTitle}</h1>
                                                        <p className='text-xl py-2'> Name:{item?.authorName}</p>
                                                        <p className="">{item?.postDescription}</p>
                                                        <div className="flex flex-wrap gap-2 items-center space-x-4">
                                                            <button className="btn btn-sm ">
                                                                upVote
                                                                <div className="badge badge-secondary">{item?.upVote}</div>
                                                            </button>
                                                            <button className="btn btn-sm">
                                                                downVote
                                                                <div className="badge badge-secondary">{item?.downVote}</div>
                                                            </button>
                                                            <button className="btn btn-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                                                <div className="badge badge-secondary">{filteredComments.length}</div>
                                                            </button>
                                                            <div className='flex items-center space-x-3'>
                                                                <span className="text-md text-gray-500 ">{format(new Date(item?.carentTime), 'hh:mm:ss a')}</span>
                                                                <span className='bg-lime-500/50  rounded-full font-bold text-center px-2'>{item?.tag}</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    }

                                    )
                                    :

                                    <div className='flex flex-col justify-center items-center'>
                                        <h3 className="text-center my-10 text-3xl font-bold">Data not Found</h3>
                                        <FaDatabase size={50}></FaDatabase>
                                    </div>


                            }
                        </div>
                    }
                </div>
            </div >




        </>
    )
};

export default UserProfile;