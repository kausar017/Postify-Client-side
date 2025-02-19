import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";
import Loader from "../../../Page/Loader/Loader";
import { FaDatabase, FaUsers } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useState } from "react";
import UseAxiosSecure from "../../../AllHooks/axiosSecure/useAxiosSecure";
import { GrUserAdmin } from "react-icons/gr";
import TabilPagination from '../../../AllHooks/TabilPagination'
import { Helmet } from "react-helmet-async";

const ManageUser = () => {
    // const axiosPiblic = useAxiosPiblic();
    const queryClient = useQueryClient();
    const axiosSecure = UseAxiosSecure()
    const [search, setSearch] = useState('')


    const [currentPage, setCurrentPage] = useState(1);
    const [postParPage, setPostParPage] = useState(10);

    const lastPostIndex = currentPage * postParPage;
    const firstPostIndex = lastPostIndex - postParPage;




    // Fetching user data
    const { data: userData = [], isLoading, refetch } = useQuery({
        queryKey: ["users", search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            queryClient.invalidateQueries(["users", search])
            return res.data;
        },
    });
    // console.log(userData);
    const currentPosts = userData.slice(firstPostIndex, lastPostIndex);


    const handaleAdmin = async (id) => {
        // console.log(id);
        try {
            // Optimistically update the userData in the UI
            queryClient.setQueryData(["users", search], (oldData) => {
                return oldData.map((user) =>
                    user._id === id ? { ...user, role: "admin" } : user
                );
            });

            // API call to update role on the server
            const res = await axiosSecure.put(`/adminUpdate/${id}`, {
                role: 'admin',
            });
      
            

            queryClient.invalidateQueries(["users", search]);
            toast.success("Make admin success");
        } catch (error) {
            toast.error("Make admin not success");
        }
    };



    return (
        <>
            <Helmet>
                <title>Postify | Manage User</title>
            </Helmet>
            <DynamicTitle title="Manage User" />
            <div>
                <div className="flex flex-col items-center justify-center py-3 ">
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search user name" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                {isLoading ? (
                    <div className="text-center my-10">
                        <Loader />
                    </div>
                ) : userData.length === 0 ? (
                    // If no user data is found
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="text-center my-10 text-3xl font-bold">Data not Found</h3>
                        <FaDatabase size={50} />
                    </div>
                ) : (
                    // Display user data in table
                    <div className="overflow-x-auto w-full max-w-6xl mx-auto min-h-[700px]">
                        <table className="table">
                            {/* Table Head */}
                            <thead>
                                <tr className="font-bold">
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>User Email</th>
                                    <th>Make Admin</th>
                                    <th>Subscription Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPosts.map((user, index) => {
                                    return (
                                        <tr key={user._id} className="hover">
                                            <th>{index + 1}</th>
                                            <td>{user?.name}</td>
                                            <td>{user?.email}</td>
                                            <td>
                                                {user?.role === 'admin' ?
                                                    <button className="badge-ghost btn btn-sm badge-primary"> <GrUserAdmin></GrUserAdmin></button>

                                                    :

                                                    <button onClick={() => handaleAdmin(user._id)} className="badge-ghost btn btn-sm badge-primary">
                                                        <FaUsers size={20}></FaUsers>
                                                    </button>
                                                }

                                            </td>
                                            <td>{user?.bage || "N/A"}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div>
                <TabilPagination
                    totalPost={userData.length}
                    postParPage={postParPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    Total='Total user'
                />
            </div>


        </>
    );
};

export default ManageUser;
