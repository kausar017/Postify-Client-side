
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../AuthenTication/UseAuth/UseAuth";
import useAxiosSecure from "../axiosSecure/useAxiosSecure";
import useAxiosPiblic from "../useAxiosPiblic";

const UseAdmin = () => {
    const { user, loading } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPiblic=useAxiosPiblic()
    const { data: isAdmins, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            // console.log(res.data);
            return res.data?.admin;
        },
        // enabled: !!user?.email,
    });
    return [isAdmins, isAdminLoading]
};

export default UseAdmin;