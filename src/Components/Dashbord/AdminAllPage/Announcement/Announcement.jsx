import { useForm } from "react-hook-form";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";
import React, { useState } from 'react';
import useAxiosPiblic from "../../../AllHooks/useAxiosPiblic";
import toast from "react-hot-toast";
import UseAuth from "../../../AuthenTication/UseAuth/UseAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Page/Loader/Loader";
const axiosPiblic = useAxiosPiblic()
const Announcement = () => {
    const { user } = UseAuth()
    const { photoURL, displayName } = user;


    const { data: announcements = [], refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPiblic.get('/announcement')
            refetch()
            return res.data;
        }
    })
    // console.log(announcements);



    // Handle Form Submission
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async data => {
        // console.log(data)
        try {
            await axiosPiblic.post('/announcement', data);
            toast.success(`Announcement successfully`);
            reset()
            // navigate(from, { replace: true });
        } catch (error) {
            toast.error("Error announcement post.");
        }

    };


    return (
        <>
            <DynamicTitle title="Announcement" />
            <div className="p-4 w-full max-w-5xl mx-auto">
                {/* Notification Icon */}
                {announcements.length > 0 && (
                    <div className="alert alert-info mb-4">
                        <span>Announcements: {announcements?.length}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-2 p-3 bg-base-200 rounded-xl">
                    <div>
                        <input
                            type="url"
                            name="image"
                            defaultValue={photoURL}
                            readOnly
                            placeholder="Author Image URL"
                            {...register("image", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    {errors.image && <span className="text-red-500">This field is required ana valid URL</span>}

                    <div>
                        <input
                            type="text"
                            name="name"
                            defaultValue={displayName}
                            readOnly
                            placeholder="Author_Name"
                            {...register("Author_Name", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    {errors.Author_Name && <span className="text-red-500">This field is required</span>}
                    <div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            {...register("Title", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    {errors.Title && <span className="text-red-500">This field is required</span>}
                    <div>
                        <textarea
                            name="description"
                            placeholder="Description"
                            {...register("Description", { required: true })}
                            className="textarea textarea-bordered w-full"
                        ></textarea>
                    </div>
                    {errors.Description && <span className="text-red-500">This field is required</span>}
                    <button type="submit" className="btn btn-primary w-full">Add Announcement</button>
                </form>

                {/* Announcement Section */}
                {announcements?.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
                        {announcements?.map((announcement, index) => (
                            <div key={index} className="card card-bordered mb-4 shadow-lg">
                                <div className="card-body">
                                    <div className="flex items-center">
                                        <img
                                            src={announcement?.image}
                                            alt="Author"
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div>
                                            <h3 className="font-medium">{announcement?.Title}</h3>
                                            <p className="text-sm text-gray-500">By: {announcement?.Author_Name
                                            }</p>
                                        </div>
                                    </div>
                                    <p className="mt-2">{announcement?.Description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Announcement;
