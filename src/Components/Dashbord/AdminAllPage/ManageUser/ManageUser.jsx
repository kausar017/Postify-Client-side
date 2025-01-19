import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";
import useAxiosPiblic from "../../../AllHooks/useAxiosPiblic";
import Loader from "../../../Page/Loader/Loader";
import { FaDatabase } from "react-icons/fa6";
import toast from "react-hot-toast";

const ManageUser = () => {
    const axiosPiblic = useAxiosPiblic();
    const queryClient = useQueryClient();

    // Mutation for promoting user to admin
    const mutation = useMutation({
        mutationFn: async (info) => {
            return await axiosPiblic.post("/mackAdmin", info);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["admin"]); // Refresh admin data
            toast.success("User promoted to admin successfully 😎");
        },
        onError: (error) => {
            toast.error(`Oops! Couldn't promote user to admin 😔 ${error.message}`);
        },
    });

    // Handle admin promotion
    const handleAdmin = (id, name, email, bage) => {
        const info = {
            Makeadmin: "Admin",
            id,
            userName: name,
            userEmail: email,
            Bage: bage,
        };
        mutation.mutate(info);
    };

    // Fetching user data
    const { data: userData = [], isLoading: isUserLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPiblic.get("/users");
            return res.data;
        },
    });

    // Fetching admin data
    const { data: adminData = [], isLoading: isAdminLoading } = useQuery({
        queryKey: ["admin"],
        queryFn: async () => {
            const res = await axiosPiblic.get("/mackAdmin");
            return res.data;
        },
    });

    // Loader for pending data
    if (isUserLoading || isAdminLoading) {
        return <Loader />;
    }

    return (
        <>
            <DynamicTitle title="Manage User" />
            {userData.length === 0 ? (
                // If no user data is found
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-center my-10 text-3xl font-bold">Data not Found</h3>
                    <FaDatabase size={50} />
                </div>
            ) : (
                // Display user data in table
                <div className="overflow-x-auto w-full max-w-6xl mx-auto">
                    <table className="table">
                        {/* Table Head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Make Admin</th>
                                <th>Subscription Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user, index) => {
                                // Check if user is already an admin
                                const isAdmin = adminData.some(
                                    (adminUser) =>
                                        adminUser.id === user._id &&
                                        adminUser.Makeadmin === "Admin"
                                );

                                return (
                                    <tr key={user._id} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            {isAdmin ? (
                                                <span className="badge badge-success btn btn-sm">
                                                    Admin
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleAdmin(
                                                            user._id,
                                                            user.name,
                                                            user.email,
                                                            user.bage
                                                        )
                                                    }
                                                    className="badge badge-secondary cursor-pointer btn btn-sm"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                        </td>
                                        <td>{user?.bage || "N/A"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ManageUser;
