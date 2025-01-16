import { useQuery } from "@tanstack/react-query";
import useAxiosPiblic from "../../../AllHooks/useAxiosPiblic";
import UseAuth from "../../../AuthenTication/UseAuth/UseAuth";
import Loader from "../../../Page/Loader/Loader";

const MyPost = () => {
    const axiosPiblic = useAxiosPiblic();
    const { user } = UseAuth();

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
                await axiosPiblic.delete(`/addpost/${postId}`);
                alert("Post deleted successfully!");
            } catch (error) {
                alert("Failed to delete post.");
            }
        }
    };

    // Comment handler (Redirect or modal)
    const handleComment = (postId) => {
        alert(`Redirecting to comment section for Post ID: ${postId}`);
        
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">My Posts</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Post Title</th>
                            <th>Votes</th>
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
                                <tr key={item._id} className="hover">
                                    <td>{index + 1}</td>
                                    <td>{item.postTitle}</td>
                                    <td>
                                        Upvotes: {item.upVote} | Downvotes: {item.downVote}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm mr-2"
                                            onClick={() => handleComment(item._id)}
                                        >
                                            Comment
                                        </button>
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
