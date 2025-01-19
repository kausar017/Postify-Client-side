import { useParams } from "react-router-dom";
import useAxiosPiblic from "../../AllHooks/useAxiosPiblic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaFacebook, FaTwitter } from "react-icons/fa6";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { IoLogoLinkedin, IoLogoWhatsapp } from "react-icons/io5";
import UseAuth from "../../AuthenTication/UseAuth/UseAuth";


const PostDetals = () => {

    const axiosPiblic = useAxiosPiblic()
    const [upVote, setUpVote] = useState(0);
    const [downVote, setDownVote] = useState(0);
    const { id } = useParams()

    // const { user } = UseAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        // console.log(data);
        const info = {
            comentId: _id,
            email: UserEmail,
            ...data
        }

        try {

            await axiosPiblic.post(`/coment`, info);
            toast.success(`Coment successfuly`);
            reset()
            // navigate(from, { replace: true });
        } catch (errors) {
            toast.error("coment not added");
        }
    }


    const { data: detals = [], isLoading, error } = useQuery({
        queryKey: ['detals'],
        queryFn: async () => {
            const res = await axiosPiblic(`/addpost/${id}`)
            return res.data;
        }
    })

    console.log(detals);


    const { authorEmail, UserEmail, image, authorName, postTitle, postDescription, tag, carentTime, _id } = detals || {}

    if (isLoading) {
        return <Loader></Loader>
    }
    if (error) {
        <p>Error fetching post details!</p>;
    }

    const handleUpVote = async () => {
        try {
            const response = await axiosPiblic.put(`/upVote/${_id}`, {
                upVote: upVote + 1,
            });
            setUpVote(response.data.upVote);
            toast.success("Upvoted successfully!");
        } catch (error) {
            console.error("Upvote failed:", error);
            toast.error("Upvote failed!");
        }
    };

    const handleDownVote = async () => {
        try {
            const response = await axiosPiblic.put(`/downVote/${_id}`, {
                downVote: downVote + 1,
            });
            setDownVote(response.data.downVote);
            toast.success("Downvoted successfully!");
        } catch (error) {
            console.error("Downvote failed:", error);
            toast.error("Downvote failed!");
        }
    };


    const shareUrl = `${window.location.origin}/${_id}`
    const title = "Check this awesome website!";

    return (
        <>

            <div>
                {
                    !detals ? (
                        <div className='flex flex-col justify-center items-center'>
                            <h3 className="text-center my-10 text-3xl font-bold">Data not Found</h3>
                            <FaDatabase size={50}></FaDatabase>
                        </div>
                    ) : (
                        <div key={detals?._id} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl">
                            <div className="flex items-center mb-6">
                                <img referrerPolicy="no-referrer" src={image} alt={image} className="w-24 h-24 rounded-full mr-4 shadow-lg" />
                                <div>
                                    <h2 className="text-3xl font-semibold text-gray-800">{authorName}</h2>
                                    <p className="text-sm text-gray-600">{authorEmail}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-4xl font-extrabold text-gray-900">{postTitle}</h3>
                                <p className="text-lg text-gray-700 mt-4">{postDescription}</p>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <span className="text-md text-gray-500">{format(carentTime, 'hh:mm:ss a')}</span>
                                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{tag}</span>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center ">
                                    <button onClick={handleUpVote} className="btn btn-success btn-outline mr-4 text-white">
                                        <AiFillLike size={20}></AiFillLike>
                                        UpVote
                                    </button>
                                    <button onClick={handleDownVote} className="btn btn-error btn-outline text-white">
                                        <AiFillDislike size={20}></AiFillDislike>
                                        DownVote
                                    </button>
                                </div>

                                <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn btn-primary btn-outline">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 24 24" fill="#ffff" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                    Share</button>
                            </div>

                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <dialog id="my_modal_2" className="modal">
                                <div className="modal-box">
                                    <div className="share-buttons flex items-center justify-center space-x-7">
                                        <FacebookShareButton url={shareUrl} quote={title}>
                                            <FaFacebook size={40}></FaFacebook>
                                        </FacebookShareButton>
                                        <TwitterShareButton url={shareUrl} title={title}>
                                            <FaTwitter size={40}></FaTwitter>
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={shareUrl} title={title}>
                                            <IoLogoWhatsapp size={40}></IoLogoWhatsapp>
                                        </WhatsappShareButton>
                                        <LinkedinShareButton url={shareUrl} title={title}>
                                            <IoLogoLinkedin size={40}></IoLogoLinkedin>
                                        </LinkedinShareButton>
                                    </div>

                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                            {/* Open the modal using document.getElementById('ID').showModal() method */}

                            <div className="mt-8">
                                <h4 className="text-xl font-semibold mb-4">Comments</h4>
                                <form onSubmit={handleSubmit(onSubmit)} className="border-t pt-4">
                                    <textarea
                                        placeholder="Please comment"
                                        name="coment"
                                        {...register("coment", {
                                            required: "Comment is required",
                                            validate: {
                                                minWords: (value) => {
                                                    const wordCount = value.trim().split(/\s+/).length;
                                                    return wordCount >= 10 || "Comment must have at least 10 words";
                                                },
                                            },
                                        })}
                                        className="textarea textarea-bordered textarea-lg w-full"
                                    ></textarea>
                                    {errors.coment && (
                                        <p className="text-red-500 text-sm mt-1">{errors.coment.message}</p>
                                    )}
                                    <button className="btn btn-accent">Comment</button>
                                </form>

                            </div>
                        </div>
                    )
                }
            </div>

        </>
    );
};

export default PostDetals;