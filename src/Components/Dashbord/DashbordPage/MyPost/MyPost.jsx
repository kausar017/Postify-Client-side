import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPiblic from "../../../AllHooks/useAxiosPiblic";
import UseAuth from "../../../AuthenTication/UseAuth/UseAuth";
import Loader from "../../../Page/Loader/Loader";
import toast from "react-hot-toast";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";
import { Link } from "react-router-dom";
import { useState } from "react";
import TabilPagination from "../../../AllHooks/TabilPagination";
import { Helmet } from "react-helmet-async";

const MyPost = () => {
    const axiosPiblic = useAxiosPiblic();
    const { user } = UseAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const [postParPage, setPostParPage] = useState(10);

    const lastPostIndex = currentPage * postParPage;
    const firstPostIndex = lastPostIndex - postParPage;


    const queryClient = useQueryClient();

    // Fetching user's posts
    const { isLoading, error, data: recent = [] } = useQuery({
        queryKey: ['recentData', user?.email],
        queryFn: async () => {
            const res = await axiosPiblic.get(`/addpost?email=${user?.email}`);
            return res.data;
        },
        // enabled: !!user?.email,
    });

    const postData = recent.filter(c => c.UserEmail === user?.email);
    // console.log(postData?._id);

    // Delete post handler
    const handleDelete = async (postId) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            try {
                await axiosPiblic.delete(`/delete/${postId}`);
                toast.success("Post deleted successfully!");
                queryClient.invalidateQueries(['recentData', user?.email]);
            } catch (error) {
                toast.error("Failed to delete post.");
            }
        }
    };

    // Comments data fetch with tanstack query
    const { data: coment = [] } = useQuery({
        queryKey: ['queary'],
        queryFn: async () => {
            const res = await axiosPiblic('/coment');
            return res.data;
        }
    });
    // console.log(coment);

    // const filteredComments = coment.filter(c => c.comentId === item?._id);


    const currentPosts = postData.slice(firstPostIndex, lastPostIndex);


    return (
        <>
            <div className="p-10 min-h-[800px]">
                <Helmet>
                    <title>Postify | My Post</title>
                </Helmet>
                <DynamicTitle title="My Posts"></DynamicTitle>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr className="text-md font-bold">
                                <th></th>
                                <th>Post Title</th>
                                <th>Votes</th>
                                <th></th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <Loader />
                                    </td>
                                </tr>
                            ) : postData.length > 0 ? (
                                currentPosts.map((item, index) => {
                                    // Filter comments for this post
                                    const filteredComments = coment.filter((comment) => comment.comentId === item._id);

                                    // Pass filtered comments via Link
                                    return (
                                        <tr key={item._id} className="hover w-full overflow-x-scroll">
                                            <td>{index + 1}</td>
                                            <td className="overflow-hidden">{item.postTitle}</td>
                                            <td className="flex items-center space-x-2">
                                                <p className="badge badge-primary btn btn-sm"> upVote {item?.upVote}</p>
                                                <p className="badge badge-secondary btn btn-sm"> Downvotes: {item.downVote}</p>
                                            </td>
                                            <td></td>
                                            <td className="flex items-center space-x-2">
                                                <Link
                                                    className="btn btn-primary btn-sm mr-2"
                                                    to={{
                                                        pathname: `/dasbord/comment/${item._id}`,
                                                        state: { comments: filteredComments },
                                                    }}
                                                >
                                                    Comment
                                                </Link>
                                                <button
                                                    className="btn btn-error btn-sm"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })

                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-red-500">
                                        No posts found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <TabilPagination
                    totalPost={postData.length}
                    postParPage={postParPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    Total='Total Post'
                />
            </div>
        </>
    );
};

export default MyPost;
