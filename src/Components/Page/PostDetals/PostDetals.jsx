import { useParams } from "react-router-dom";
import useAxiosPiblic from "../../AllHooks/useAxiosPiblic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

const PostDetals = () => {



    const { id } = useParams()
    // console.log(id);

    const axiosPiblic = useAxiosPiblic()

    const { data: detals = [], isLoading, error } = useQuery({
        queryKey: ['detals'],
        queryFn: async () => {
            const res = await axiosPiblic(`/addpost/${id}`)
            return res;
        }
    })
    // console.log(detals?.data?.userPhoto);

    const { authorEmail, image, authorName, postTitle, postDescription, tag, carentTime, upVote, downVote } = detals?.data || {}

    if (isLoading) {
        return <Loader></Loader>
    }
    if (error) {
        <p>Error fetching post details!</p>;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data);

    }
    

    return (
        <>

            <div>
                {
                    !detals ? (
                        <p className="text-center text-black text-4xl">Data not found</p>
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
                                <span className="text-md text-gray-500">{format(carentTime, 'HH:mm:ss')}</span>
                                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{tag}</span>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center ">
                                    <button className="btn btn-success btn-outline mr-4 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 24 24" fill="#ffff" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>

                                        UpVote {upVote}</button>
                                    <button className="btn btn-error btn-outline text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 24 24" fill="#ffff" stroke="#000000" strokeWidth="2" strokeWinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                                        DownVote {downVote}</button>
                                </div>
                                <button className="btn btn-primary btn-outline">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 24 24" fill="#ffff" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                    Share</button>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-xl font-semibold mb-4">Comments</h4>
                                <form onSubmit={handleSubmit(onSubmit)} className="border-t pt-4">
                                    <textarea placeholder="Please coment" name="coment" {...register("coment")} className="textarea textarea-bordered textarea-lg w-full"></textarea>
                                    {/* <input type="text" name="text" id="" className="input input-bordered" /> */}
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