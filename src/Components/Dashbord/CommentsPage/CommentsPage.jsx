import React, { useState } from "react";

const CommentsPage = () => {
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [reported, setReported] = useState({});
    const [modalContent, setModalContent] = useState("");

    const comments = [
        { id: 1, email: "user1@example.com", text: "This is a sample comment which is long and needs truncation." },
        { id: 2, email: "user2@example.com", text: "Short comment" },
        { id: 3, email: "user3@example.com", text: "Another example comment which will be truncated." },
    ];

    const feedbackOptions = [
        "Irrelevant content",
        "Offensive language",
        "Spam/Advertisement",
    ];

    const handleFeedbackChange = (id, feedback) => {
        setSelectedFeedback((prev) => ({ ...prev, [id]: feedback }));
    };

    const handleReport = (id) => {
        setReported((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Comments Page</h1>
            <div className="overflow-x-auto">
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
                        {comments.map((comment) => (
                            <tr key={comment.id}>
                                <td>{comment.email}</td>
                                <td>
                                    {comment.text.length > 20 ? (
                                        <>
                                            {comment.text.substring(0, 20)}...
                                            <button
                                                className="text-blue-500 underline ml-2"
                                                onClick={() => setModalContent(comment.text)}
                                            >
                                                Read More
                                            </button>
                                        </>
                                    ) : (
                                        comment.text
                                    )}
                                </td>
                                <td>
                                    <select
                                        className="select select-bordered w-full max-w-xs"
                                        value={selectedFeedback[comment.id] || ""}
                                        onChange={(e) =>
                                            handleFeedbackChange(comment.id, e.target.value)
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
                                        disabled={!selectedFeedback[comment.id] || reported[comment.id]}
                                        onClick={() => handleReport(comment.id)}
                                    >
                                        {reported[comment.id] ? "Reported" : "Report"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
