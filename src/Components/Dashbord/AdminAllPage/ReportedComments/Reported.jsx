import { useQuery } from "@tanstack/react-query";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";

const Reported = () => {

    // const { data: reports = [], isLoading } = useQuery(['reports'], async () => {
    //     const res = await axios.get('/api/reports');
    //     return res.data;
    // });



    return (
        <>
            <DynamicTitle title="Reported Comments"></DynamicTitle>
            <div>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Commenter Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {reports?.map((report) => (
                            <tr 
                                <td>{report?.commenterEmail}</td>
                                <td>{report?.commentText}</td>
                                <td>{report?.feedback}</td>
                                <td>{report?.status}</td>
                                <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleAction(report?._id, 'Resolved')}
                                    >
                                        Resolve
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleAction(report?._id, 'Rejected')}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default Reported;