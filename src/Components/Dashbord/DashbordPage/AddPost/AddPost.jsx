import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../AuthenTication/UseAuth/UseAuth';
import useAxiosPiblic from '../../../AllHooks/useAxiosPiblic';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DynamicTitle from '../../../Shared/DynamicTitle/DynamicTitle';
import Loader from '../../../Page/Loader/Loader';
import { Helmet } from 'react-helmet-async';

const AddPost = () => {

    const { user } = UseAuth()

    const axiosPiblic = useAxiosPiblic()
    const [allData, setAllData] = useState()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/dasbord/myPost';

    const { data: tags = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosPiblic.get('/tags')
            return res.data;
        }
    })
    // console.log(tags);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        // console.log(data)

        const userInfo = {
            image: data.photoUrl,
            authorName: data.name,
            authorEmail: data.Email,
            postTitle: data.Title,
            postDescription: data.Description,
            tag: data.Tag,
            carentTime: new Date().toISOString(),
            upVote: 0,
            downVote: 0,
            UserEmail: user?.email,
            UserName: user?.displayName,
            userPhoto: user?.photoURL
        }
        // console.log(userInfo);

        try {

            const response = await axiosPiblic.post('/addpost', userInfo);
            toast.success(`Post created successfully`);
            reset()
            navigate(from, { replace: true });
        } catch (errors) {
            toast.error("Error creating post.");
        }

    }

    // recent data fatching
    const { isLoading, error, data: recent = [] } = useQuery({
        queryKey: ['recentData'],
        queryFn: async () => {
            const res = await axiosPiblic.get(`/count?=${user?.email}`);
            return res.data;
        }
    });

    const postData = recent.filter(c => c.UserEmail === user?.email);
    // console.log(postData[0]?.UserEmail);

    const { data: userData, isLoading: loader } = useQuery({
        queryKey: ['bage'],
        queryFn: async () => {
            const res = await axiosPiblic.get('/users')
            return res.data;
        }
    })
    if (loader || isLoading) {
        return <Loader></Loader>
    }
    const bageData = userData.filter(c => c.email === user?.email);
    // console.log(bageData[0]?.bage);
    return (

        <>
            <Helmet>
                <title>Postify | Add Post</title>
            </Helmet>
            <DynamicTitle title='Add Post'></DynamicTitle>

            {bageData[0]?.bage == 'Gold' || postData?.length < 5 ?


                <div className='w-full max-w-2xl mx-auto my-5 '>
                    <div className="card bg- shadow-xl border">

                        <form onSubmit={handleSubmit(onSubmit)} className=" p-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Author Image</span>
                                </label>
                                <input type="url" placeholder="photoUrl" {...register("photoUrl")} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Author Name</span>
                                </label>
                                <input type="text"{...register("name")} placeholder="Author Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Author Email</span>
                                </label>
                                <input type="email"{...register("Email")} placeholder="Author Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Post Title</span>
                                </label>
                                <input type="text"{...register("Title")} placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Post Description</span>
                                </label>
                                <textarea
                                    {...register("Description")} placeholder="Description"
                                    className="textarea textarea-bordered textarea-lg w-full"></textarea>

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Tag </span>
                                </label>
                                <select
                                    {...register("Tag")}
                                    className="select select-bordered w-full"
                                    defaultValue="Tag">
                                    <option disabled value="Tag">Select Your Tag</option>
                                    {tags.map((tag, index) => (
                                        <option className='text-black' key={index} value={tag.tages}>
                                            {tag.tages}
                                        </option>
                                    ))}
                                </select>


                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Add post</button>
                            </div>
                        </form>
                    </div>
                </div>

                :

                <div className='flex flex-col justify-center items-center min-h-screen'>
                    <p className='text-2xl text-lime-500'>You have reached the maximum post limit. Become a member to add more posts!</p>
                    <Link to={'/member'} className='btn btn-primary'>Become a Member</Link>
                </div>
            }

        </>

    );
};

export default AddPost;