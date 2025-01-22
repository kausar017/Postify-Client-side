import DynamicTitle from '../../../Shared/DynamicTitle/DynamicTitle';
import { PieChart } from 'react-minimal-pie-chart';
import useAxiosPiblic from '../../../AllHooks/useAxiosPiblic';
import UseAuth from '../../../AuthenTication/UseAuth/UseAuth';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Page/Loader/Loader';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdOutlinePostAdd } from 'react-icons/md';
import { FaCommentAlt, FaUser, FaUsers } from "react-icons/fa";
import useAxiosSecure from '../../../AllHooks/axiosSecure/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const AdminProfile = () => {
    const axiosPublic = useAxiosPiblic();
    const axiosSecure = useAxiosSecure()
    const { user } = UseAuth();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async data => {
        // console.log(data)

        try {

            await axiosPublic.post('/tags', data);
            toast.success(`Tag added successfully`);
            reset()
            // navigate(from, { replace: true });
        } catch (errors) {
            toast.error("Error tags post.");
        }

    };


    const { data: totalUser = [], isLoading: userLoading } = useQuery({
        queryKey: ['bage'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    const { data: coment = [] } = useQuery({
        queryKey: ['queary'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coment');
            return res.data;
        }
    });

    const { data: posts = [], isLoading: postsLoading } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adminProfile');
            return res.data;
        }
    });
    // console.log(posts);

    if (userLoading || postsLoading) return <Loader />;


    return (
        <>
            <Helmet>
                <title>Postify | Admin Profile</title>
            </Helmet>
            <DynamicTitle title='Admin Profile' />
            <div className="container mx-auto ">
                <div className="bg-white shadow-lg rounded-lg p-6 min-h-screen">
                    <div className="flex items-center justify-center mb-6">
                        <img
                            referrerPolicy='no-referrer'
                            src={user?.photoURL}
                            alt={user?.photoURL}
                            className="w-32 h-32 rounded-full border-4 border-gray-300 mb-4 object-cover"
                        />
                    </div>
                    <div className='flex lg:flex-row md:flex-col max-sm:flex-col items-center justify-around'>
                        <div className="space-y-3 mb-6">
                            <p className="text-2xl font-semibold text-gray-600">Name: {user?.displayName}</p>
                            <p className="text-lg font-semibold text-gray-600">Email: {user?.email}</p>
                            <div className="stat w-full max-w-96  bg-red-500 rounded-xl">
                                <div className="stat-figure text-white">
                                    <MdOutlinePostAdd size={30}></MdOutlinePostAdd>
                                </div>
                                <div className="stat-title text-white">Total Posts</div>
                                <div className="stat-value text-white">{posts?.length}</div>

                            </div>
                            <div className="stat w-full max-w-96  bg-pink-700 rounded-xl">
                                <div className="stat-figure text-white">
                                    <FaCommentAlt size={25}></FaCommentAlt>
                                </div>
                                <div className="stat-title text-white">Total Comments</div>
                                <div className="stat-value text-white">{coment?.length}</div>

                            </div>
                            <div className="stat w-full max-w-96 bg-lime-600 rounded-xl">
                                <div className="stat-figure text-white">
                                    <FaUsers size={30}></FaUsers>
                                </div>
                                <div className="stat-title text-white">Total Users</div>
                                <div className="stat-value text-white">{totalUser?.length}</div>

                            </div>

                        </div>
                        <div className="flex justify-center">
                            <PieChart
                                data={[
                                    { title: 'Posts', value: posts?.length || 0, color: '#4CAF50' },
                                    { title: 'Comments', value: coment?.length || 0, color: '#FFC107' },
                                    { title: 'Users', value: totalUser?.length, color: '#2196F3' }
                                ]}
                                radius={50}
                                label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`}
                                labelStyle={{
                                    fontSize: '5px',
                                    fill: '#000000',
                                    fontWeight: 'bold',
                                }}
                                animate={true}
                                animationDuration={1000}
                                animationEasing="ease-out"
                                style={{ height: '250px', width: '250px' }}
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="md:flex items-end justify-center md:space-x-3 lg:space-x-4 space-y-4">
                        <label className="form-control w-full max-w-xl">
                            <div className="label">
                                <span className="label-text">Add Tag</span>
                            </div>
                            <input
                                type="text"
                                {...register("tages", { required: true })}
                                placeholder="add tag"
                                className="input input-bordered w-full max-w-xl"
                            />

                        </label>
                        <button className="btn btn-primary btn-outline max-sm:w-full">Add Tag</button>

                    </form>
                    <div className='flex items-center justify-center'>
                        {errors.tages && <span className='text-red-500 '>This field is required</span>}
                    </div>


                </div>
            </div>
        </>
    );
};

export default AdminProfile;
