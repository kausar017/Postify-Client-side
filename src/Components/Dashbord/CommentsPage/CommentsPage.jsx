import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAxiosPiblic from "../../AllHooks/useAxiosPiblic";
import Loader from "../../Page/Loader/Loader";
import { FaDatabase } from "react-icons/fa6";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import toast from "react-hot-toast";

const CommentsPage = () => {
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [reported, setReported] = useState({});
    const [modalContent, setModalContent] = useState("");
    const axiosPiblic = useAxiosPiblic()

    const { id } = useParams()
    // console.log(id);

    // Comments data fetch with tanstack query
    const { data: coment = [], isLoading } = useQuery({
        queryKey: ['queary'],
        queryFn: async () => {
            const res = await axiosPiblic('/coment');
            return res.data;
        }
    });
    // console.log(coment);

    if (isLoading) {
        return <Loader></Loader>
    }

    const filteredComments = coment.filter(c => c.comentId === id);


    const feedbackOptions = [
        "Irrelevant content",
        "Offensive language",
        "Spam/Advertisement",
    ];

    const handleFeedbackChange = (id, feedback) => {
        setSelectedFeedback((prev) => ({ ...prev, [id]: feedback }));


    };

    const handleReport = async (id) => {
        const feedback = selectedFeedback[id];

        if (!feedback) {
            toast.error("Please select feedback before reporting!");
            return;
        }


        const feedbackInfo = {
            commentId: id,
            feedback: feedback,
            filteredComments: filteredComments,
        };

        try {
            // API call to report the comment
            await axiosPiblic.post(`/feedback/${id}`, feedbackInfo);
            setReported((prev) => ({ ...prev, [id]: true }));
            toast.success("Comment reported successfully!");
        } catch (error) {
            console.error("Error reporting comment:", error);
            toast.error("Failed to report comment.");
        }
    };


    return (
        <div className="container mx-auto p-4">
            <DynamicTitle title="Comment page"></DynamicTitle>
            <div className="overflow-x-auto">
                {
                    filteredComments.length == 0 ?


                        <div className='flex flex-col justify-center items-center'>
                            <h3 className="text-center my-10 text-3xl font-bold">Comment not Found</h3>
                            <FaDatabase size={50}></FaDatabase>
                        </div>
                        :
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Comment</th>
                                    <th>Feedback</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredComments?.map((comment, i) => (
                                    <tr key={i}>
                                        <td>{comment?.email}</td>
                                        <td>
                                            {comment.coment?.length > 20 ? (
                                                <>
                                                    {comment?.coment.substring(0, 20)}...
                                                    <button
                                                        className="text-blue-500 underline ml-2"
                                                        onClick={() => setModalContent(comment.coment)}
                                                    >
                                                        Read More
                                                    </button>
                                                </>
                                            ) : (
                                                comment.coment
                                            )}
                                        </td>
                                        <td>
                                            <select
                                                className="select select-bordered w-full max-w-xs"
                                                value={selectedFeedback[comment?._id] || ""}
                                                onChange={(e) =>
                                                    handleFeedbackChange(comment?._id, e.target.value)
                                                }
                                            >
                                                <option disabled value="">
                                                    Select Feedback
                                                </option>
                                                {feedbackOptions.map((feedback, index) => (
                                                    <option key={index} value={feedback}>
                                                        {feedback}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                disabled={!selectedFeedback[comment?._id] || reported[comment?._id]}
                                                onClick={() => handleReport(comment?._id)}
                                            >
                                                {reported[comment?._id] ? "Reported" : "Report"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                }

            </div>

            {/* Modal for Read More */}
            {modalContent && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Full Comment</h3>
                        <p className="py-4">{modalContent}</p>
                        <div className="modal-action">
                            <button
                                className="btn btn-sm btn-secondary"
                                onClick={() => setModalContent("")}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentsPage;
