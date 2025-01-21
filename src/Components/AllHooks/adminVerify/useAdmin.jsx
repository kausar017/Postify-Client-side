
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../AuthenTication/UseAuth/UseAuth";
import useAxiosSecure from "../axiosSecure/useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const { data: isAdmins, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            console.log(res.data);
            return res.data?.admin;
        }
    });
    return [isAdmins, isAdminLoading]
};

export default useAdmin;