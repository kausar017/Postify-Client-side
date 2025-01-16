import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../AuthenTication/UseAuth/UseAuth';
import useAxiosPiblic from '../../../AllHooks/useAxiosPiblic';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const AddPost = () => {

    const { user } = UseAuth()

    const axiosPiblic = useAxiosPiblic()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

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
            carentTime: new Date(),
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

    return (
        <div className='w-full max-w-2xl mx-auto my-5 '>
            <div className="card bg-base-100 shadow-lg">
                <h3 className='text-3xl font-bold text-center py-3'>Add food</h3>
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
                        <input type="text"{...register("name")} placeholder="password" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Author Email</span>
                        </label>
                        <input type="email"{...register("Email")} placeholder="password" className="input input-bordered" required />
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
                        <select {...register("Tag")} className="select select-bordered w-full">
                            <option disabled selected>Who shot first?</option>
                            <option value={'technology'}>technology</option>
                            <option value={'science'}>science</option>
                            <option value={'health'}>health</option>
                            <option value={'education'}>education</option>
                        </select>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;