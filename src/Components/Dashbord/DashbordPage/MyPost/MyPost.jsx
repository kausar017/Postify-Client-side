import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPiblic from "../../../AllHooks/useAxiosPiblic";
import UseAuth from "../../../AuthenTication/UseAuth/UseAuth";
import Loader from "../../../Page/Loader/Loader";
import toast from "react-hot-toast";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";
import { Link } from "react-router-dom";

const MyPost = () => {
    const axiosPiblic = useAxiosPiblic();
    const { user } = UseAuth();

    const queryClient = useQueryClient();

    // Fetching user's posts
    const { isLoading, error, data: recent = [] } = useQuery({
        queryKey: ['recentData', user?.email],
        queryFn: async () => {
            const res = await axiosPiblic.get(`/addpost?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const postData = recent.filter(c => c.UserEmail === user?.email);

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

    // Comment handler (Redirect or modal)
    // const handleComment = (postId) => {
    //     alert(`Redirecting to comment section for Post ID: ${postId}`);

    // };

    return (
        <div className="p-10">
            <DynamicTitle title="My Posts"></DynamicTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* Table Head */}
                    <thead>
                        <tr>
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
                            postData.map((item, index) => (
                                <tr key={item._id} className="hover w-full overflow-x-scroll">
                                    <td>{index + 1}</td>
                                    <td className="overflow-hidden">{item.postTitle}</td>
                                    <td className="flex items-center space-x-2">
                                        <p className="badge badge-primary btn btn-sm"> upVote {item?.upVote}</p>  <p className="badge badge-secondary btn btn-sm"> Downvotes: {item.downVote}</p>
                                    </td>
                                    <td></td>
                                    <td className="flex items-center space-x-2">
                                        <Link
                                            className="btn btn-primary btn-sm mr-2"
                                            to={`/dasbord/comment/${item._id}`}
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
                            ))
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
    );
};

export default MyPost;
