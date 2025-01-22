import { useQuery, useQueryClient } from "@tanstack/react-query";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";
import useAxiosPiblic from "../../../AllHooks/useAxiosPiblic";
import Loader from "../../../Page/Loader/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../AllHooks/axiosSecure/useAxiosSecure";
import TabilPagination from "../../../AllHooks/TabilPagination";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Reported = () => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(1);
    const [postParPage, setPostParPage] = useState(10);


    const lastPostIndex = currentPage * postParPage;
    const firstPostIndex = lastPostIndex - postParPage;



    const { data: report = [], isLoading } = useQuery({
        queryKey: ['comentsReport'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reported')
            return res.data;
        }
    })

    const currentReport = report.slice(firstPostIndex, lastPostIndex);

    if (isLoading) {
        return <Loader></Loader>
    }

    const handaleDelet = async (id) => {
        // console.log(id);
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            try {
                await axiosSecure.delete(`/deletFeedback/${id}`)
                toast.success('Delet Success')
                queryClient.invalidateQueries(['comentsReport', report])
            } catch (error) {
                toast.error('opss! data not deleted')
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>Postify | Reported</title>
            </Helmet>
            <DynamicTitle title="Reported Comments"></DynamicTitle>
            <div className="overflow-x-auto w-full max-w-7xl mx-auto min-h-[750px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-black ">
                            <th></th>
                            <th>Commenter Emall</th>
                            <th>coment</th>
                            <th></th>
                            <th>Feedback</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {currentReport.map((item, i) => {
                            const filteredComment = item?.filteredComments?.[0];
                            return (
                                <tr key={i} className="hover">
                                    <th>{i + 1}</th>
                                    <td>{filteredComment?.email || "N/A"}</td>
                                    <td>{filteredComment?.coment.slice(0, 10) || "N/A"} <span onClick={() => document.getElementById('my_modal_2').showModal()} className="text-green-800 text-md font-bold"> See all coment.......</span> </td>
                                    <td >
                                        <dialog id="my_modal_2" className="modal">
                                            <div className="modal-box">
                                                {filteredComment?.coment || "N/A"}
                                            </div>
                                            <form method="dialog" className="modal-backdrop">
                                                <button>close</button>
                                            </form>
                                        </dialog >
                                    </td>

                                    <td>{item?.feedback || "N/A"}</td>
                                    <td>{new Date(item?.createdAt).toLocaleString() || "N/A"}</td>
                                    <td>{item?.Status}</td>
                                    <td >
                                        <button onClick={() => handaleDelet(item?._id)} className=" rounded-lg btn-sm text-red-600 hover:scale-125"><AiOutlineDelete size={20}></AiOutlineDelete> </button>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>

            </div>
            <div>
                <TabilPagination
                    totalPost={report.length}
                    postParPage={postParPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    Total='Total Report'
                />
            </div>

        </>
    );
};

export default Reported;